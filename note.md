# lerna 的使用

1. 初始化 monorepo 仓库
   1. 创建目录，进入目录后运行命令 `npx lerna init` 创建工程。
   2. 安装依赖，查看 `package.json` 我们可以发现 `private` 字段被设置为 `true`，因为 `monorepo` 架构的整个工程我们肯定是不需要发布的。还有就是 yarn1.x 也要求如果用到了 workspace 的特性，就必须设置该属性为 true。
   3. lerna.json 中的 packages 字段用来配置子包目录，支持 glob pattern 的模式。
2. 新建组件库子包
   1. 运行 lerna create xxx 命令，建立 xxx 子包
   2. 也可以直接自己手动创建目录，例如 play 子包

## 两种 version 策略的选择

先下结论，如果各个子包的联系性稍弱，对外提供多种独立的能力，比如 lint、utils、hooks、ui 等，那可以选择 independent mode。

#### fixed mode

意味着 `version` 字段对应具体的版本号，在这种模式下各个子包的版本号相对集中，一般来说可以理解为同一个版本号（也有例外），Lerna 会在执行 `lerna version` 命令时根据用户的选择自动更新 `version` 字段，同时会修改发生过代码变更的子包的 `package.json` 中的 `version` 字段。文档中提到，如果当前 major 版本号是 0，则认为所有变更都是破坏性的，这意味着修改任何一个包中的内容，lerna version 都会更新所有子包的版本号。`lerna version` 做版本变更时，只会让我们选择一次版本，这一次选择将作用到多个包上。

#### independent mode

在 `lerna.json` 中的 `version` 字段设置为 `independent` 即可开启该模式。顾名思义，独立的版本号控制，会在执行 lerna version 的时候逐个询问各个 package 的新版本号。

## 子包之间的引用

首先我们要改根目录下安装所有依赖包，包含子包。添加一条命令在根 package.json 中：

```json
{
  "scripts": {
    "bootstrap": "lerna bootstrap -- --hoist"
  }
}
```

然后运行它，就会发现所有子包都出现在根目录的 node_modules 中了。

然后给 play 子包添加 gupo-ui 这个子包：`lerna add gupo-ui --scope=play`

这样 play 子包就能引用到 gupo-ui 这个包的内容啦

## 运行子包的命令

首先由于我们将所有依赖都提升到了根目录下的 node_modules 中，我们不能直接进到子包里面去运行命令了，而需要通过 lerna 在根目录中运行。假设我们现在需要运行子包 play 中的 dev 命令，那首先我们需要在根 package.json 中添加运行脚本，之后就可以运行 dev 命令啦~

```json
{
  "scripts": {
    // ...
    "dev": "lerna run --scope play dev"
  }
}
```

为某个子包安装依赖：`yarn workspace @gupo/eslint-config add eslint-config-prettier eslint-plugin-prettier`
