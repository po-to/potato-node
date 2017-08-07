# potato-node
potato-node是NodeJS版本的potato，由于使用JS作服务端语言，所以它与客户端有着更天然的同构关系。potato-node实现并扩展了potato，可作为web服务Connect的中间件使用，或者作为模块单独调用。从应用层来说potato-node还是一个通用的基础框架，具体应用还需在它基础上进一步扩展和具体化。

# 项目主页
[www.po-to.org](http://www.po-to.org/page/articles/potato_node/s01)

# 仓库
[Github](https://github.com/po-to/potato-node)

# 兼容
potato-node采用Typescript开发，编译成为ES6标准的JS，如果你需要兼容更广的ES5语法，请自行下载源码编译。 

# 依赖
无外部依赖

# 安装
- 使用NPM安装：npm install @po-to/potato-node
- 手动下载安装：[Github](https://github.com/po-to/potato-node)

# 引入
使用NodeJS通用的CommonJS模块化标准引入

# 文档
[API](http://www.po-to.org/static/api/potato_node)

# 设置
potato-node中的设置主要通过其对外函数setConfig()来实现：
```
export declare function setConfig(options: {
    core?: Core;
    amdPaths?: {
        [key: string]: string;
    };
    amdCaches?: {
        [key: string]: any;
    };
}): void;　
```
- core?: Core;   
core为核心处理器，它实现了potato.ICore接口，在应用层需要用子类来扩展
- amdPaths?: {[key: string]: string;};  
对加载amd模块进行路径映射，类似于requireJS中的paths
- amdCaches?: {[key: string]: any;};  
对加载amd模块使用缓存，如果amdCaches中有该模块的缓存则不再请求