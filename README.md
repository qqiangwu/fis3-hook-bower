# fis3-hook-bower
Bower module integraion for fis3.

Fis3是一个很优秀的网络前端编译器. 而模块化问题又是所有前端项目避不开的问题. Bower是一个包含重多包的管理平台, 虽然其包的质量参差不齐, 但也聊胜于无了.

此Hook只是一个很简单的对Bower模块的一个引用. 其语义是Best Effort.

## 安装
```
npm install fis3-hook-bower
```

## 配置
由于bower_components通常都特别在, 所以最好在一开始就不要将其包含在`project.files`中.

```
// 默认使用bower_components
fis.hook('bower');

// or

fis.hook('bower', {
    bower: 'bower_dir'
});
```

## 使用
在代码中声明依赖即可. 会自动查找到bower中main所指定的文件, 并且同时载入所有依赖.

```
// @require angular
```

## 示例
+ 见demo文件夹
+ [复杂示例](https://github.com/qqiangwu/reins-ssh)

## TODO
+ 处理`bower.json`中main为数组的情况
