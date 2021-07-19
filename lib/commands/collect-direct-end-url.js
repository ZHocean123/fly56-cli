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
class CollectDirectUrl extends command_1.Command {
    async run() {
        const { args, flags } = this.parse(CollectDirectUrl);
        const dirPath = path.join('./', args.file);
        const files = allFilesInDir(dirPath);
        const urls = [];
        files.forEach(filePath => {
            const fileContent = String(fs.readFileSync(filePath));
            // axios url
            // 直采
            const directUrls = fileContent.match(/(?<=\surl:\s*')\S*(?=')/g);
            if (directUrls) {
                urls.push(...directUrls === null || directUrls === void 0 ? void 0 : directUrls.map(url => '直采,' + url));
            }
        });
        const outFilePath = path.join('./', `urls-${args.file.replace(/:|(\/)|\\/g, '-')}.csv`);
        fs.writeFileSync(outFilePath, urls.join('\n'));
        if (args.file && flags.force) {
            this.log(`you input --force and --file: ${args.file}`);
        }
    }
}
exports.default = CollectDirectUrl;
CollectDirectUrl.description = '收集项目接口url';
CollectDirectUrl.examples = [
    `$ fly56-cli collect-url
hello world from ./src/hello.ts!
`,
];
CollectDirectUrl.flags = {
    help: command_1.flags.help({ char: 'h' }),
    // flag with a value (-n, --name=VALUE)
    name: command_1.flags.string({ char: 'n', description: 'name to print' }),
    // flag with no value (-f, --force)
    force: command_1.flags.boolean({ char: 'f' }),
};
CollectDirectUrl.args = [{ name: 'file' }];
