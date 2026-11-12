# 个人主页（GitHub Pages）

纯静态单文件网站：只有一个 `index.html`，不需要安装任何东西。

## 1. 修改内容

用任意文本编辑器（VS Code、记事本都行）打开 `index.html`：

- 搜索 `张三`，全部替换成你的名字
- 搜索 `✏️`，按注释修改（名字、头像）
- 把各个板块里的示例文字换成你自己的经历；不需要的板块整段 `<section>...</section>` 删掉即可，顶部导航里对应的 `<a>` 也一起删
- 左侧链接：把 `you@example.com`、`your-username` 等换成你的真实地址
- 头像：把照片命名为 `avatar.jpg` 放在同一目录，按 `index.html` 里的注释启用
- 简历：把 PDF 命名为 `cv.pdf` 放在同一目录（不需要就删掉那一行）
- 最后删掉顶部黄色的「这是一份模板」提示

## 2. 发布到 GitHub Pages（网页操作，不需要命令行）

1. 登录 GitHub，点右上角 **+ → New repository**
2. 仓库名**必须**填：`你的用户名.github.io`（例如用户名是 `zhangsan`，就填 `zhangsan.github.io`），设为 **Public**，点 **Create repository**
3. 在新仓库页面点 **uploading an existing file**，把 `index.html`（以及 `avatar.jpg`、`cv.pdf`）拖进去，点 **Commit changes**
4. 进入仓库 **Settings → Pages**，确认 Source 是 **Deploy from a branch**，Branch 选 `main` / `(root)`，保存
5. 等 1–2 分钟，访问 `https://你的用户名.github.io` 就能看到了

以后想改内容：在仓库里点 `index.html` → 右上角铅笔图标 → 修改 → Commit，几分钟后网站自动更新。

### 想要 `/xxx` 这种子路径？

参考链接 `ctsilva.github.io/2026-InfoVis-CSE/syllabus` 是用「普通仓库」做的：仓库名随便起（比如 `homepage`），同样在 Settings → Pages 里开启，网址就是 `https://你的用户名.github.io/homepage/`。

## 3. 用命令行发布（可选）

```bash
git init && git add . && git commit -m "My homepage"
git branch -M main
git remote add origin https://github.com/你的用户名/你的用户名.github.io.git
git push -u origin main
```

## 文件结构

| 文件 | 内容 |
| --- | --- |
| `index.html` | 关于我（首页） |
| `education.html` | 学历 |
| `projects.html` | 个人项目 |
| `internship.html` | 实习 |
| `assets/site.js` | 顶部导航、左侧个人信息栏、语言菜单（**名字、链接、头像都在这里改一次即可**） |
| `assets/style.css` | 全站样式 |

每个页面的内容写在各自文件的 `<main>` 里，文件中有注释掉的示例格式可以照抄。

## 中英文切换

右上角 🌐 按钮打开语言菜单，可选「中文」或「English」。每段文字都写两份：

```html
<p class="zh">中文内容</p>
<p class="en">English content</p>
```

`class="zh"` 只在中文模式显示，`class="en"` 只在英文模式显示。访客第一次打开时按浏览器语言选择，之后在所有页面记住他们的选择。
