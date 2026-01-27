---
title: SAP GUI 安装与配置
slug: installation-and-configuration-SAPGUI
publishDate: 27 Jan 2026
description: 安装和配置 SAP GUI 客户端
---

# 1. SAPGui安装（windows系统）

如果你的系统里已经安装了SAPGui，可以跳过这一节

![img](/assets/blog/installation-and-configuration-SAPGUI/65640cbef94916489e5bed387de0523295f2dc29.png) 

若果没有安装，双击下载好的安装包，选择第一个项目，或者Select all，然后下一步

![img](/assets/blog/installation-and-configuration-SAPGUI/d6f2e86ed82b3304b351e4449492304a2dc0cc79.png) 

等待安装完毕即可，暂时无需重启电脑。

## 连接配置

启动SAPGUI，点击“新建连接”（截图中的界面可能与你自己电脑上的不一样，但功能都有）

![img](/assets/blog/installation-and-configuration-SAPGUI/a04133ff26a8bc4b3cb6dc25c459bd317b3f9be0.png) 

在弹出的窗口中选用户指定系统，点击下一步

![img](/assets/blog/installation-and-configuration-SAPGUI/45e91382ce90f3cc7127f5ffabf82fae4cfaf102.png) 

在界面中依次填入配置信息，**应用服务器**填SAP服务器地址，**实例号**通常为两位数字，**系统标识**为3位，**描述**可自定义，其他不用填，点击完成即可

![img](/assets/blog/installation-and-configuration-SAPGUI/d4f1bfe2cb4d0bd93a4f96e5559565928314fb37.png) 

# 2.  JavaGUI安装（Mac系统）

\- 下载对应系统的JavaGUI版本

\- Mac版本区分Intel芯片和M系列芯片，安装包后缀为.dmg

![img](/assets/blog/installation-and-configuration-SAPGUI/77f99a5cbe28a2921923e8810966ec94ca7b89b5.png) 

挂载文件后，把上方**SAP Clients**拖放到下方**Applications**就行。

等待复制完毕，在启动台中就可以看到对应文件夹，点击打开。

## 连接配置

![img](/assets/blog/installation-and-configuration-SAPGUI/10fe384a42fb2c4565545b67b76111968b580e80.png) 

新建一条连接，**描述**自定义，勾选**专家模式（Expert Mode）**，下方填入

```
Conn=/H/<ip地址>/S/3200
```

把 <ip地址> 替换为你要连接的SAP系统地址，不要忘记填写描述，否则“保存”是灰色的。

![img](/assets/blog/installation-and-configuration-SAPGUI/f1f523386d6cec0a16c743cdf0241c2a924d0171.png) 

保存后即可双击登录系统。

# 3. JavaGUI安装（其他系统）

找到对应系统的jar包，或者zip格式的压缩包，根据程序指引安装，zip解压的文件件可能有sapinst程序，可双击执行安装。

配置连接可参考上方mac中的配置。
