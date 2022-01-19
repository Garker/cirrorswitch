#! /usr/bin/env node

// npm config set registry https://registry.npm.taobao.org
// yarn config set registry https://registry.yarnpkg.com
// npm config set registry

import chalk from "chalk";
import shell from "shelljs";
import inquirer from "inquirer";

const exec = shell.exec;

const cirrorObj = {
  taobao: "https://registry.npm.taobao.org",
  npm: "https://registry.npmjs.org/",
  yarn: "https://registry.yarnpkg.com",
};

const init = async () => {
  const { type } = await inquirer.prompt([
    {
      type: "list",
      name: "type",
      message: "yarn or npm",
      choices: [
        {
          name: "yarn",
        },
        {
          name: "npm",
        },
      ],
    },
  ]);

  const { cirror } = await inquirer.prompt([
    {
      type: "list",
      name: "cirror",
      message: `taobao or ${type}`,
      choices: [
        {
          name: `taobao(${cirrorObj.taobao})`,
          value: `${cirrorObj.taobao}`,
        },
        {
          name: `${type}(${cirrorObj[type]})`,
          value: `${cirrorObj[type]}`,
        },
      ],
    },
  ]);

  console.log(chalk.yellow(`${type} config set registry ${cirror}`));
  // if(type === 'yarn' && exec(`${type} config set registry ${cirror}`).code == 0){
  // 	console.log(chalk.blue(`${type}当前镜像源为`));
  // exec(`${type} config get registry`)
  // }
  if (exec(`${type} config set registry ${cirror}`).code != 0) {
    console.log(chalk.red("Error"));
  }
};
init();
