---
title: 用tmoe来在android上安装Linux
date: 2025-1-11 18:33:00 +0800
categories: [玩机,Android]
tags: [Termux,tmoe]
---

# 用tmoe来在android上安装Linux

## 1.前言

家里有一台闲置的华为 _nova 4_，装上了HarmonyOS 3，就没管它了。今天发现很流畅，CPU性能还行，就来折腾一下。

## 2.准备

F-droid : [_download_](https://f-droid.org)

### 2.1 换更新源

1. [清华源](https://mirrors.tuna.tsinghua.edu.cn/help/fdroid) `https://mirrors.tuna.tsinghua.edu.cn/fdroid/repo/?fingerprint=43238D512C1E5EB2D6569F4A3AFBF5523418B82E0A3ED1552770ABB9A9C9CCAB`
2. [MirrorZ](https://help.mirrors.cernet.edu.cn/fdroid) `https://mirrors.cernet.edu.cn/fdroid/repo/?fingerprint=43238D512C1E5EB2D6569F4A3AFBF5523418B82E0A3ED1552770ABB9A9C9CCAB`

将后面的网址复制，打开F-Droid -> 设置 -> 存储库 -> F-Droid -> + -> 手动输入仓库URL，将其粘贴进去。
![Desktop View](/assets/img/source.jpg){: width="972" height="589" }
_换源_

### 2.2 下载Termux

在F-Droid里搜索Termux,安装 `Termux` 和 `Termux:Styling`。
![Desktop View](/assets/img/Search_Termux.jpg){: width="972" height="589" }
_搜索界面_
![Desktop View](/assets/img/Termux_detail.jpg){: width="972" height="589" }
_下载中_
![Desktop View](/assets/img/Installing_Termux.jpg){: width="972" height="589" }
_安装中_

## 3.正式开始

### 3.1 命令准备

``
termux-change-repo
``

选择`Mirror Group`->`Mirrors in China`,耐心等待。

### 3.2 下载、配置脚本

输入

```bash
curl -LO https://gitee.com/mo2/linux/raw/2/2.awk && awk -f 2.awk
```

提示：`您要继续吗？`[<u>Y</u>/n], 就选择Y
![Desktop View](/assets/img/Avccept.jpg){: width="972" height="589" }
![Desktop View]('/assets/img/Config (1).jpg'){: width="972" height="589" }
![Desktop View]('/assets/img/Config (2).jpg'){: width="972" height="589" }
![Desktop View]('/assets/img/Config (3).jpg'){: width="972" height="589" }

如果弹出权限弹窗：
`是否允许"Termux"访问您设备上的照片、媒体内容和文件？`, 选择允许
![Desktop View]('/assets/img/Config (4).jpg'){: width="972" height="589" }
_允许访问_

弹出提示：`Press enter to continue,type n to return`[<u>Y</u>/n],就回车.
![Desktop View]('/assets/img/Config (5).jpg'){: width="972" height="589" }
![Desktop View]('/assets/img/Config (8).jpg'){: width="972" height="589" }

### 3.3 配置

过了一会儿，终于弹出了一个可以操控的界面。

#### 3.3.1 语言

![Desktop View]('/assets/img/Config (6).jpg'){: width="972" height="589" }_语言菜单_

直接回车，选择`zh_CN: 简体中文_中国内地`

#### 3.3.2 菜单

![Desktop View]('/assets/img/Config (7).jpg'){: width="972" height="589" }
_tmoe菜单_

直接回车，选择proot容器

#### 3.3.3 终端配色

![Desktop View]('/assets/img/Config (12).jpg'){: width="972" height="589" }
_终端配色选择_

看个人喜好，不想折腾就直接回车

#### 3.3.4 字体
![Desktop View]('/assets/img/Config (13).jpg'){: width="972" height="589" }
_字体选择_

看个人喜好，不想折腾就直接回车
，我推荐的是`Fira Code Medium`。

#### 3.3.5 小键
![Desktop View]('/assets/img/Config (14).jpg'){: width="972" height="589" }
_是否启用小键？_

看个人喜好，不想折腾就直接回车

#### 3.3.6 DNS

选择第三个(`Google`)或第四个(`Ali`)。

#### 3.3.7 一言

看个人喜好，不想折腾就直接回车

#### 3.3.8 时区

直接回车

#### 3.3.9 共享SD目录、共享Home目录

看个人喜好，不想折腾就直接回车

#### 3.3.10 proot容器

选择Arm64发行版列表

#### 3.3.11 容器选择

不想有后续的麻烦就选Ubuntu,不需要特殊配置

#### 3.3.12 选择版本

建议选择`22.04(LTS)`,`24.04(LTS)`有很多莫名其妙的Bug。

### 3.4 跑脚本

在这个菜单上，选择`启动proot ubuntu-jammy_arm64`

脚本会自动开始，途中暂停就按回车
