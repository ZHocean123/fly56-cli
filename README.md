fly56-cli
==========

飞象前端cli工具

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/fly56-cli.svg)](https://npmjs.org/package/fly56-cli)
[![Downloads/week](https://img.shields.io/npm/dw/fly56-cli.svg)](https://npmjs.org/package/fly56-cli)
[![License](https://img.shields.io/npm/l/fly56-cli.svg)](https://github.com/ZHocean123/fly56-cli/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g fly56-cli
$ fly56-cli COMMAND
running command...
$ fly56-cli (-v|--version|version)
fly56-cli/1.1.8 win32-x64 node-v14.17.1
$ fly56-cli --help [COMMAND]
USAGE
  $ fly56-cli COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`fly56-cli collect-direct-end-url [FILE]`](#fly56-cli-collect-direct-end-url-file)
* [`fly56-cli collect-direct-url [FILE]`](#fly56-cli-collect-direct-url-file)
* [`fly56-cli collect-fly-url [FILE]`](#fly56-cli-collect-fly-url-file)
* [`fly56-cli collect-weapp-url [FILE]`](#fly56-cli-collect-weapp-url-file)
* [`fly56-cli hello [FILE]`](#fly56-cli-hello-file)
* [`fly56-cli help [COMMAND]`](#fly56-cli-help-command)

## `fly56-cli collect-direct-end-url [FILE]`

收集项目接口url

```
USAGE
  $ fly56-cli collect-direct-end-url [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ fly56-cli collect-url
  hello world from ./src/hello.ts!
```

_See code: [src/commands/collect-direct-end-url.ts](https://github.com/ZHocean123/fly56-cli/blob/v1.1.8/src/commands/collect-direct-end-url.ts)_

## `fly56-cli collect-direct-url [FILE]`

收集项目接口url

```
USAGE
  $ fly56-cli collect-direct-url [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ fly56-cli collect-url
  hello world from ./src/hello.ts!
```

_See code: [src/commands/collect-direct-url.ts](https://github.com/ZHocean123/fly56-cli/blob/v1.1.8/src/commands/collect-direct-url.ts)_

## `fly56-cli collect-fly-url [FILE]`

收集项目接口url

```
USAGE
  $ fly56-cli collect-fly-url [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ fly56-cli collect-url
  hello world from ./src/hello.ts!
```

_See code: [src/commands/collect-fly-url.ts](https://github.com/ZHocean123/fly56-cli/blob/v1.1.8/src/commands/collect-fly-url.ts)_

## `fly56-cli collect-weapp-url [FILE]`

收集项目接口url

```
USAGE
  $ fly56-cli collect-weapp-url [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ fly56-cli collect-url
  hello world from ./src/hello.ts!
```

_See code: [src/commands/collect-weapp-url.ts](https://github.com/ZHocean123/fly56-cli/blob/v1.1.8/src/commands/collect-weapp-url.ts)_

## `fly56-cli hello [FILE]`

describe the command here

```
USAGE
  $ fly56-cli hello [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ fly56-cli hello
  hello world from ./src/hello.ts!
```

_See code: [src/commands/hello.ts](https://github.com/ZHocean123/fly56-cli/blob/v1.1.8/src/commands/hello.ts)_

## `fly56-cli help [COMMAND]`

display help for fly56-cli

```
USAGE
  $ fly56-cli help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.2/src/commands/help.ts)_
<!-- commandsstop -->
