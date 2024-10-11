# 实时协作项目平台使用手册
### 由于项目环境配置步骤繁琐，难免会有各种各样的意外，如果有什么无法解决的问题，请及时联系我们:
### qq:  梁锦盛-2896685056  张静雯-2567478418    
## 安装和配置所需的软件
#### 1.安装及其配置node.js
Node.js 是运行后端代码和前端构建工具的环境。所以是十分重要的
##### 1.根据如下教程来下载node.js[安装node.js](http://blog.csdn.net/WHF__/article/details/129362462 "安装node.js")
##### 2.安装完成后需要在命令行检查node.js是否安装成功。注意：一定要在node,js的安装目录下进入命令行否则会报错！！！（在安装时一定要注意选择安装路径以免后面找不到安装路径）
##### 3.输出node.js版本号，恭喜你安装成功可以进行下一步了！
##### 4.安装成功自然还有配置啦。要注意在教程中的配置命令都要以管理员的身份打开命令框不然就会报错
#### 安装及其配置MongoDB
MonggoDB是项目所需要的数据库
##### 1.同样的，先根据这个教程来安装和配置MongoDB吧[MongoDB安装教程](http://blog.csdn.net/qq_48490554/article/details/137683278?utm_medium=distribute.pc_relevant.none-task-blog-2~default~baidujs_baidulandingword~default-5-137683278-blog-88371232.235^v43^pc_blog_bottom_relevance_base9&spm=1001.2101.3001.4242.4&utm_relevant_index=8 "MongoDB安装教程")
##### 2.安装完成后需要在浏览器中输入本地地址。如何找到自己的本地地址呢？可以进入MongoDB的地址下的命令行然后输入mongod就可以在输出中找到自己的本地地址
注意：这次的安装和配置还是和上次一样一定要在安装时选择好自己的安装目录以免像我一样后面找不到自己安装在哪里导致没有办法去正确的地址打开命令行
##### 3.已经安装好MongoDB后我们要启动它。重点来啦！！！一定要以管理员的身份去打开这个数据库，不然就会一直报错！
## 获取项目的代码
###### 如果你已经拥有了项目代码那么可以直接跳转到下一步。如果项目代码在GitHub等平台上，可以使用"git clone"来下载它
##### 1.首先你需要已知项目的地址。如何知道项目的地址呢？你可以先fork一下代码然后code可以找到代码的HTTPS这就是项目仓库的地址，也就是URL
##### 2.现在你已经获得了项目代码，接下来需要进入项目文件夹。使用命令cd project-web-platform
## 配置JWT和MongoDB
###配置环境变量文件'.env'
##### 1.在项目的根目录下，创建一个'.env'文件，里面定义'JWT_SECRET'和'MONGODB_URL'
##### 2.最终的'.env'文件内容如下：
###### JWT_SECRET=myverysecretkey12345
###### MONGODB_URI=mongodb://localhost:27017/project-platform
其中的myverysecretkey12345是可以替换为自己的密钥
## 安装项目依赖（项目分为前端和后端）
#### 安装后端依赖
##### 1.以管理员身份进入'backend/'目录
##### 2.使用'npm’安装依赖。命令：npm install
这会安装'express'、'mongoose'、'jsonwebtoken'、'bcryptjs'等所需的后端依赖
##### 3.如果提示网络连接或者代理存在问题，可能是校园网的问题，可以把网络换成手机热点，或者如果你有搭梯子，可以试着把梯子关掉再尝试npm install命令
#### 安装前端依赖
##### 1.回到项目根目录然后以管理员身份进入'frontend/'
##### 2.使用'npm install'安装前端依赖
#### 在安装前后端依赖时可能会出现以下问题：
##### 1.在install的时候起先是很多次都失败，原因是因为node.js没有安装和配置成功，导致一直修改一直找问题，但是最后发现什么解决方法都没有重新安装和配置快。
##### 2.安装的node.js与你install的包会有一些版本冲突，这边建议下载最新版的，因为我就是下载了最新版才解决这个报错的问题
##### 3.解决报错的问题之后就是要解决会有一些警告的问题。这些是不会使你的install不成功，只是在后面启动前后端的时候会发现很多包都没有安装成功，这就需要你们一个一个npm install。这边建议最好使用淘宝源地址或者npm源地址，其实按照我的经验来说除了cors这个包要用npm源地址比较快，其他的都是淘宝源地址比较快
##### 4.如果提示网络连接或者代理存在问题，可能是校园网的问题，可以把网络换成手机热点，或者如果你有搭梯子，可以试着把梯子关掉再尝试npm install命令
## 启动MongoDB服务
如果你已经安装了MongoDB，那么直接在这个安装目录下的根目录运行'mongod'命令
## 启动后端服务器
##### 1.以管理员身份进入后端目录
##### 2.启动后端服务器。以管理员身份运行：npm start
##### 3.成功运行会提示数据库连接成功
##### 4.如果提示端口被占用
***在 Windows 系统中***

1. 使用命令提示符：
   - 打开命令提示符（以管理员身份运行）。
   - 运行命令 `netstat -ano | findstr :3000`，这将列出所有正在使用 3000 端口的进程信息，包括进程 ID（PID）。
   - 记下要关闭的进程的 PID。
   - 然后运行 `taskkill /PID <PID> /F`，将 `<PID>` 替换为你刚才记下的进程 ID，强制关闭该进程从而关闭 3000 端口。
## 启动前端开发服务器
##### 1.以管理员身份进入前端目录
##### 2.以管理员身份运行：npm start serve
##### 3.成功运行会显示网址
##### 3.前端开发服务器会在  'http://localhost:8080'  启动。现在你可以通过谷歌浏览器访问  'http://localhost:8080'  来查看网站(第一次进入网站首先应该进入登录页面注册登录生成令牌，如果不是可能会导致功能无法使用，提示操作失败，而令牌存在有效期，当令牌过期后，那么你可以在谷歌浏览器打开 'http://localhost:8080/login' 重新登录)

### 启动时一定要注意启动这三个服务是需要开三个命令框，而且都是要以管理员身份打开和运行否则会出很多错
### 在启动后端时遇到了下面的错误：
##### 1.系统提示找不到safer-buffer中的safer.js文件，可能是兼容问题也有可能是安装时候导致包破损了。解决方案：重新安装相关模块，先尝试用npm官方源发现安装成功，但是还是找不到safer-buffer中的safer.js文件。于是我就先进入了后端的目录，然后删除了node_modules文件夹；接着清除了npm缓存，使用npm cache clead --force命令；最后重新安装项目依赖，运行npm install命令。解决！
###在启动前端的时候遇到了下面的错误：
##### 1.提示系统找不到指定的路径
首先先删除了node_modules文件夹和package_lockjson文件夹，然后在根目录下执行npm install。首先我使用的是[淘宝镜像源]( npm config set registry https://registry.npm.taobao.org/ )， 发现一直install不了，然后我们就去切换到了[官方npm源]( npm config set registry https://registry.npmjs.org/ )， 然后再运行npm install后就成功了
# 现在我们已经完成了项目的启动，可以开始测试和使用平台啦！！！
# 项目使用指南

## 一、启动 MongoDB
在打开前后端之前，需前往安装 MongoDB 的路径下以管理员身份进入命令框，并输入`net start MongoDB`。此时若命令框出现“服务器已经启动成功的字样”，则说明启动成功。

## 二、打开后端
安装后可能会出现`cors`包未安装成功的情况，此时使用`npm install cors`命令安装该包。安装成功后，使用`npm start`进入后端。

## 三、打开前端
根据安装教程安装所有所需包后，输入`npm run serve`命令即可进入前端。

## 四、前端网址操作
进入前后端后，前端会有两个网址，可选择任意网址。有些人可直接按`Ctrl`点击网址，若不行则需将网址复制粘贴到谷歌浏览器中。若前端出现的网址是`http://localhost:8080/`，则不能进行注册与登录。此时需将该网址后面加上`login`，即改为`http://localhost:8080/login`，这样就可以进行注册和登陆了。

## 五、登录与注册
1. 成功登陆网页后首先进入“登录”页面，若已有账号密码可直接登录，此时会跳出“登陆成功”弹窗，点击确定后进入“首页”。
2. 若没有账号用于登录，需点击“没有账号？注册”链接，进入注册页面，填入所需信息后点击注册按钮，会跳转到登陆页面，输入刚刚注册的邮箱和密码，若正确会跳出登陆成功弹窗，点击确定后登陆到平台主页。

## 六、首页操作
进入“首页”后，页面左上角有几个按钮可链接到对应页面。
1. 首页会展示自己和其他同学发布的项目。可点击项目进入页面，查看项目说明和要求，还可点击“申请加入项目”按钮，填写申请理由后提交申请，若提交成功会有“申请提交成功，请等待管理员审批(请不要重复提交申请！)”弹窗，点击确定即可。

## 七、我的项目页面
在“我的项目”页面，可以点击“退出项目”按钮，也可点击项目查看项目描述和要求。

## 八、项目管理页面
1. 可点击“发布新项目”，进入页面填写项目标题、项目描述、项目要求等信息，填写完成后点击“发布项目”按钮，会看到“项目发布成功,您可在我的项目和项目管理页面中查询”弹窗，点击确定后自动跳转到项目管理主页面，可看到刚刚发布的项目。
2. 在该页面还可点击每个项目右下方的“修改”按钮修改项目标题、描述和要求，旁边的“删除”按钮可删除发布的项目，点击“查看详情”按钮可查看项目详情。

## 九、交流协作页面
回到首页，点击“交流协作”页面，可点击所发布的项目与项目成员聊天，输入内容后点击发送，项目成员即可看到消息。

## 十、“我”页面
在“我”页面可看到个人信息，包括用户名、邮箱和专业，还可点击“退出登录”按钮，回到“登陆”页面。
## 遇到问题时的调试方法
#### 如果项目在运行过程中遇到问题，可以按照以下步骤进行调试
##### 1.确保MongoDB正常启动并且正在运行
##### 2.使用浏览器的开发者工具查看控制台中的错误信息（通常可以通过按 `F12` 打开）
查看网络请求（Network），确认 API 请求是否成功
##### 3.如果前端无法访问后端，可能会遇到跨域问题，确保后端 `server.js` 文件中启用了 `cors`
如果显示错误那么可能是'cors'安装依赖时出现了问题可以试着再次安装（如果安装有问题，可以尝试多个源地址）
## 总结
通过这些步骤你能够成功启动并运行项目：
##### 1.安装 Node.js、MongoDB 并获取项目代码
##### 2.配置环境变量，确保 JWT 和 MongoDB 正常工作
##### 3.安装前后端依赖，并分别启动前后端服务器，并且使其一直处于运行状态
