# 指南

## 安装

```bash
# 安装 vant 业务组件库
yarn add gupo-vant-ui
# 安装 antdv 业务组件库
yarn add gupo-antdv-ui
```

## 按需引入

可以使用 `unplugin-auto-import` 插件来自动导入 API。

如果使用模板方式进行开发，可以使用 `unplugin-vue-components` 插件来按需自动加载组件，插件会自动解析模板中的使用到的组件，并导入组件。

## 全局引入(不推荐)

失去 `tree-shaking` 的能力，打包有冗余代码。

## volar 支持

```json
// tsconfig.json
{
    "compilerOptions": {
        // ...
        "types": ["gupo-ui/volar"]
    }
}
```
