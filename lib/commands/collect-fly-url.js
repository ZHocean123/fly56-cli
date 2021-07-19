"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = require("@oclif/command");
const path = require("path");
const fs = require("fs");
function allFilesInDir(dir) {
    const list = [];
    const files = fs.readdirSync(dir);
    files.forEach(fileName => {
        const filePath = path.join(dir, fileName);
        if (fs.existsSync(filePath)) {
            if (fs.lstatSync(filePath).isDirectory()) {
                const subPaths = allFilesInDir(filePath);
                list.push(...subPaths);
            }
            else if (/^((js)|(ts)|(vue))$/.test(fileName.split('.').pop())) {
                list.push(filePath);
            }
        }
    });
    list.concat(list);
    return list;
}
class CollectUrl extends command_1.Command {
    async run() {
        const { args, flags } = this.parse(CollectUrl);
        const dirPath = path.join('./', args.file);
        const files = allFilesInDir(dirPath);
        const urls = [];
        files.forEach(filePath => {
            const fileContent = String(fs.readFileSync(filePath));
            // axios url
            // 直采
            const directUrls = fileContent.match(/directClient\.request\({\s*url:\s*"\S*"/g);
            if (directUrls) {
                urls.push(...directUrls === null || directUrls === void 0 ? void 0 : directUrls.map(url => '直采,' + url.match(/(?<=\surl:\s*")\S*(?=")/)[0]));
            }
            // 飞象
            const flyUrls = fileContent.match(/(axios|axiosClient)\.request\({\s*url:\s*"\S*"/g);
            if (flyUrls) {
                urls.push(...flyUrls === null || flyUrls === void 0 ? void 0 : flyUrls.map(url => '飞象,' + url.match(/(?<=\surl:\s*")\S*(?=")/)[0]));
            }
            // 飞象
            const flyMixUrls = fileContent.match(/(?<=((\s=)|(\s\?)|(\s:))\s")\/?[a-zA-X]+\/[a-zA-X/]*(?=")/g);
            if (flyMixUrls) {
                urls.push(...flyMixUrls === null || flyMixUrls === void 0 ? void 0 : flyMixUrls.map(url => '飞象,' + url.split('?').shift()));
            }
            // http curl url
            // 直采
            const curlDirectUrls = fileContent.match(/(?<=\sdirectBaseUrl\s\+\s*")\S*(?=")/g);
            if (curlDirectUrls) {
                urls.push(...curlDirectUrls.map(item => '直采,' + item.split('?').shift()));
            }
            const curlDirectMixUrls = fileContent.match(/(?<=`\${directBaseUrl})\S*(?=`)/g);
            if (curlDirectMixUrls) {
                urls.push(...curlDirectMixUrls.map(item => '飞象,' + item.split('?').shift()));
            }
            // 飞象
            const curlFlyUrls = fileContent.match(/(?<=\sbaseUrl\s\+\s*")\S*(?=")/g);
            if (curlFlyUrls) {
                urls.push(...curlFlyUrls.map(item => '飞象,' + item.split('?').shift()));
            }
            const curlFlyMixUrls = fileContent.match(/(?<=`\${baseUrl})\S*(?=`)/g);
            if (curlFlyMixUrls) {
                urls.push(...curlFlyMixUrls.map(item => '飞象,' + item.split('?').shift()));
            }
        });
        const outFilePath = path.join('./', `urls-${args.file.replace(/:|(\/)|\\/g, '-')}.csv`);
        fs.writeFileSync(outFilePath, urls.join('\n'));
        if (args.file && flags.force) {
            this.log(`you input --force and --file: ${args.file}`);
        }
    }
}
exports.default = CollectUrl;
CollectUrl.description = '收集项目接口url';
CollectUrl.examples = [
    `$ fly56-cli collect-url
hello world from ./src/hello.ts!
`,
];
CollectUrl.flags = {
    help: command_1.flags.help({ char: 'h' }),
    // flag with a value (-n, --name=VALUE)
    name: command_1.flags.string({ char: 'n', description: 'name to print' }),
    // flag with no value (-f, --force)
    force: command_1.flags.boolean({ char: 'f' }),
};
CollectUrl.args = [{ name: 'file' }];
