import {Command, flags} from '@oclif/command'
import * as path from 'path'
import * as fs from 'fs'

function allFilesInDir(dir: string): string[] {
  const list: string[] = []

  const files = fs.readdirSync(dir)
  files.forEach(fileName => {
    const filePath = path.join(dir, fileName)
    if (fs.existsSync(filePath)) {
      if (fs.lstatSync(filePath).isDirectory()) {
        const subPaths = allFilesInDir(filePath)
        list.push(...subPaths)
      } else if (/^((js)|(ts)|(vue))$/.test(fileName.split('.').pop() as string)) {
        list.push(filePath)
      }
    }
  })
  list.concat(list)

  return list
}

export default class CollectUrl extends Command {
  static description = '收集项目接口url'

  static examples = [
    `$ fly56-cli collect-url
hello world from ./src/hello.ts!
`,
  ]

  static flags = {
    help: flags.help({char: 'h'}),
    // flag with a value (-n, --name=VALUE)
    name: flags.string({char: 'n', description: 'name to print'}),
    // flag with no value (-f, --force)
    force: flags.boolean({char: 'f'}),
  }

  static args = [{name: 'file'}]

  async run() {
    const {args, flags} = this.parse(CollectUrl)

    const dirPath = path.join('./', args.file)
    const files = allFilesInDir(dirPath)

    const urls: string[] = []
    files.forEach(filePath => {
      const fileContent = String(fs.readFileSync(filePath))
      // axios url
      // 直采
      const directUrls = fileContent.match(/directClient\.request\({\s*url:\s*"\S*"/g)
      if (directUrls) {
        urls.push(...directUrls?.map(url => '直采,' + url.match(/(?<=\surl:\s*")\S*(?=")/)![0]))
      }
      // 飞象
      const flyUrls = fileContent.match(/(axios|axiosClient)\.request\({\s*url:\s*"\S*"/g)
      if (flyUrls) {
        urls.push(...flyUrls?.map(url => '飞象,' + url.match(/(?<=\surl:\s*")\S*(?=")/)![0]))
      }
      // 飞象
      const flyMixUrls = fileContent.match(/(?<=((\s=)|(\s\?)|(\s:))\s")\/?[a-zA-X]+\/[a-zA-X/]*(?=")/g)
      if (flyMixUrls) {
        urls.push(...flyMixUrls?.map(url => '飞象,' + url.split('?').shift() as string))
      }
      // http curl url
      // 直采
      const curlDirectUrls = fileContent.match(/(?<=\sdirectBaseUrl\s\+\s*")\S*(?=")/g)
      if (curlDirectUrls) {
        urls.push(...curlDirectUrls.map(item => '直采,' + item.split('?').shift() as string))
      }
      const curlDirectMixUrls = fileContent.match(/(?<=`\${directBaseUrl})\S*(?=`)/g)
      if (curlDirectMixUrls) {
        urls.push(...curlDirectMixUrls.map(item => '飞象,' + item.split('?').shift() as string))
      }
      // 飞象
      const curlFlyUrls = fileContent.match(/(?<=\sbaseUrl\s\+\s*")\S*(?=")/g)
      if (curlFlyUrls) {
        urls.push(...curlFlyUrls.map(item => '飞象,' + item.split('?').shift() as string))
      }
      const curlFlyMixUrls = fileContent.match(/(?<=`\${baseUrl})\S*(?=`)/g)
      if (curlFlyMixUrls) {
        urls.push(...curlFlyMixUrls.map(item => '飞象,' + item.split('?').shift() as string))
      }
    })

    const outFilePath = path.join('./', `urls-${args.file.replace(/:|(\/)|\\/g, '-')}.csv`)
    fs.writeFileSync(outFilePath, urls.join('\n'))
    if (args.file && flags.force) {
      this.log(`you input --force and --file: ${args.file}`)
    }
  }
}
