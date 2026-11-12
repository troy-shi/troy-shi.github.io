# 史张倬悦 Troy · 个人主页

网址：https://troy-shi.github.io

## 用可视化界面修改内容（推荐）

网站内容用 [Pages CMS](https://app.pagescms.org) 编辑，不用改代码：

1. 打开 https://app.pagescms.org ，点 **Sign in with GitHub**
2. 首次使用会让你安装 Pages CMS 的 GitHub App，选择只授权 `troy-shi.github.io` 这个仓库即可
3. 进入仓库后，左侧有 5 个栏目：**个人信息、关于我、学历、个人项目、实习**
4. 填写表单（中英文各一栏，英文不填会自动显示中文），点 **Save**
5. 约 1 分钟后刷新网站即可看到更新

头像、简历 PDF 可以直接在表单里上传。

## 文件结构

| 文件 | 内容 |
| --- | --- |
| `data/*.json` | 网站内容（由 Pages CMS 修改） |
| `.pages.yml` | Pages CMS 编辑表单的配置 |
| `index.html` / `education.html` / `projects.html` / `internship.html` | 四个页面 |
| `assets/site.js` | 读取内容并渲染页面、语言菜单 |
| `assets/style.css` | 全站样式 |
| `assets/uploads/` | 上传的图片和文件 |
