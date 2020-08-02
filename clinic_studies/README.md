clinic_studies
==============

this app automates the task of inserting XML data to relational db

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/clinic_studies.svg)](https://npmjs.org/package/clinic_studies)
[![Downloads/week](https://img.shields.io/npm/dw/clinic_studies.svg)](https://npmjs.org/package/clinic_studies)
[![License](https://img.shields.io/npm/l/clinic_studies.svg)](https://github.com/jkvoulgaridis/appathonNTUA/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g clinic_studies
$ clinic_studies COMMAND
running command...
$ clinic_studies (-v|--version|version)
clinic_studies/0.0.0 linux-x64 node-v10.19.0
$ clinic_studies --help [COMMAND]
USAGE
  $ clinic_studies COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`clinic_studies bye [FILE]`](#clinic_studies-bye-file)
* [`clinic_studies filldb [FILE]`](#clinic_studies-filldb-file)
* [`clinic_studies hello [FILE]`](#clinic_studies-hello-file)
* [`clinic_studies help [COMMAND]`](#clinic_studies-help-command)

## `clinic_studies bye [FILE]`

describe the command here

```
USAGE
  $ clinic_studies bye [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print
```

_See code: [src/commands/bye.ts](https://github.com/jkvoulgaridis/appathonNTUA/blob/v0.0.0/src/commands/bye.ts)_

## `clinic_studies filldb [FILE]`

describe the command here

```
USAGE
  $ clinic_studies filldb [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print
```

_See code: [src/commands/filldb.ts](https://github.com/jkvoulgaridis/appathonNTUA/blob/v0.0.0/src/commands/filldb.ts)_

## `clinic_studies hello [FILE]`

describe the command here

```
USAGE
  $ clinic_studies hello [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ clinic_studies hello
  hello world from ./src/hello.ts!
```

_See code: [src/commands/hello.ts](https://github.com/jkvoulgaridis/appathonNTUA/blob/v0.0.0/src/commands/hello.ts)_

## `clinic_studies help [COMMAND]`

display help for clinic_studies

```
USAGE
  $ clinic_studies help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.1.0/src/commands/help.ts)_
<!-- commandsstop -->
