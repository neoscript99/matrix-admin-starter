## 介绍
1. 编译本模块`yarn build`
1. 到lib目录中运行`yarn link`，将编译后的代码作为本地包发布
1. 到mcc-admin-ui和mcc-cus-taro中运行`yarn link mcc-ui-lib`
1. 如需自动编译，在本模块中启动`yarn watch`

## 更新日志
- v1.0.0
    - 通过yarn workspace支持本地依赖处理
