# Easy AppMock

[Easy AppMock](http://58.87.124.224:8080/easyAppMock)  是一个简单的能快速生成**模拟数据**的持久化服务。
如果你还在使用下面的Mock方式，欢迎你试用一下[Easy AppMock](http://58.87.124.224:8080/easyAppMock) 。
如果Easy AppMock不能满足你的需求的话，可以尝试一下[Easy Mock](https://www.easy-mock.com/) 。

### 常见Mock方式

- 将模拟数据直接写在代码里；
- 利用 Charles、 Fiddler 等代理工具拦截请求

# 特性

- 支持一键切换数据来源（Mock，真实数据）；
- 支持设置多个返回值，可快速切换；
- 返回值支持任意格式；

# 快速开始

## 创建项目

1. 点击**首页**右下角的加号可进入**添加项目**页面，输入参数参数后点击保存即可成功创建项目;
1. 创建成功后点击**详情**按钮可查看项目配置信息；
1. **项目基础URL**是一个很关键的参数，这个地址即为我们真实数据的来源；<br/>PS：最后没有 /

![](./images/createProject.png)

## 添加Api

1. 创建成功后点击**列表**按钮可查看项目Api列表；
1. 点击右下角**添加**按钮可进入**添加API**页面；
1. 在列表页面点击**开关**可切换状态，关闭时将获取真实数据；
1. 在列表页面点击**预览**按钮可预览返回值；
1. 在列表页面点击**编辑**按钮可进入**编辑Api**页面；

![](./images/apiList.png)

## 编辑Api

1. 按提示输入参数即可，URL以 / 开始；
1. 点击**添加返回值**可进入**添加返回值**页面；
1. 点击**保存更改**可保存本次修改；

![](./images/editApi.png)

## 编辑返回值

1. 按提示输入参数，输入完成后点击**保存更改**即可；
1. 返回数据支持任意格式；

![](./images/editResponse.png)

## 在APP端使用

1. 无论用的哪种网络请求框架，我们的请求应该都是BASEURL+PATH的形式，在这种情况下我们完全可以这样写。
    ``` 
    API_HOST = BuildConfig.DEBUG ? "http://58.87.124.224:8080" : "http://wanandroid.com";
    ```
1. 在请求参数或者header中加入**mockProjectId = your projectId**
1. projectId可在**项目详情**页面看到

## 完事了

1. [使用链接](http://58.87.124.224:8080/easyAppMock)
1. 代码我都放在了[GitHub](https://github.com/wangzhizy/java_mock)上，有兴趣的话可以部署在自己的服务器上；
1. 有问题可以随时联系我：w_z_n_w@163.com;
