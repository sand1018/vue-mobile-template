const simpleGit = require("simple-git");

// 创建一个SimpleGit实例来处理Git操作
const git = simpleGit();

// 定义要询问用户的问题
const questions = [
  {
    type: "list",
    name: "branch",
    message: "请选择要提交的Git分支：",
    choices: ["test", "test1"], // 根据需要添加更多选项
  },
];

// 使用动态import()导入inquirer.js
(async () => {
  const inquirer = await import("inquirer");
  const ora = await import("ora");

  console.log(ora);

  // 启动Inquirer询问
  inquirer.default.prompt(questions).then((answers) => {
    const { branch } = answers;

    // ...剩下的代码保持不变

    // 打包Vue项目

    const { exec } = require("child_process");

    const spinner = ora.default("Loading unicorns").start();

    exec("npm run build", (error, stdout) => {
      spinner.stop();
      if (error) {
        console.error(`打包时出现错误：${error.message}`);
        return;
      }
      console.log(stdout);

      // 将打包后的文件添加到Git仓库
      console.log("正在将打包后的文件添加到Git...");
      git.add(".", () => {
        console.log("文件已添加到Git。");

        // 提交更改
        console.log("正在提交更改...");
        git.commit("添加打包后的文件", () => {
          console.log("更改已提交。");

          // 推送到指定的分支
          console.log(`正在推送到分支${branch}...`);
          git.push("origin", branch, () => {
            console.log(`已推送到分支${branch}。`);
          });
        });
      });
    });
  });
})();
