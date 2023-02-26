# lerna 的使用

1. 创建目录，进入目录后运行命令 `npx lerna init` 创建工程。
2. 安装依赖，查看 `package.json` 我们可以发现 `private` 字段被设置为 `true`，因为 `monorepo` 架构的整个工程我们肯定是不需要发布的。还有就是 yarn1.x 也要求如果用到了 workspace 的特性，就必须设置该属性为 true。
3. lerna.json 中的 packages 字段用来配置子包目录，支持 glob pattern 的模式。
