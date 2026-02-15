# MaiPal - 中医健康陪伴 APP

**MaiPal（脉脉）** 是一款结合中医"四诊"理论的智能健康陪伴应用，通过仪式感的检测流程和温暖的陪伴对话，帮助用户建立健康生活习惯。

## ✨ 核心特性

### 🏥 中医四诊检测
- **望诊** - 面部和舌苔智能识别（需摄像头）
- **闻诊** - 声音状态分析
- **问诊** - 智能对话式问诊
- **切诊** - 脉搏测量（使用手机摄像头）

### 💬 关系型陪伴
- 每日定时陪伴对话
- 个性化健康建议
- 温暖的情感支持
- 长期陪伴关系建立

### 🎨 优雅的设计
- 遵循思源黑体字体规范
- 8pt 栅格系统
- 品牌色 #ECD1B4
- 单一主行为设计

## 🚀 快速开始

### 在线部署（推荐）

**一键部署到 Vercel：**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/tlswa-123/maipal-app)

或访问：[https://vercel.com/new](https://vercel.com/new) 手动导入本仓库

### 本地运行

```bash
# 1. 克隆项目
git clone https://github.com/tlswa-123/maipal-app.git
cd maipal-app

# 2. 安装依赖
npm install

# 3. 启动开发服务器
npm run dev

# 4. 访问应用
# 浏览器自动打开 http://localhost:5173
```

### 构建生产版本

```bash
# 构建
npm run build

# 预览构建结果
npm run preview
```

## 📱 摄像头功能说明

望诊和切诊功能需要使用摄像头，请注意：

- ✅ **本地开发**：使用 `http://localhost:5173` 可正常使用摄像头
- ✅ **在线部署**：必须使用 HTTPS 网址（Vercel/Netlify 自动提供）
- ❌ **HTTP 网址**：浏览器安全策略不允许摄像头访问

详细说明请查看 `README_CAMERA_FIX.md`

## 🏗️ 技术栈

- **框架**: React 18 + TypeScript
- **构建工具**: Vite
- **路由**: React Router v7
- **样式**: Tailwind CSS v4
- **动画**: Motion (Framer Motion)
- **UI 组件**: Radix UI + 自定义 MaiPalUI 组件库
- **图标**: Lucide React
- **后端**: Supabase (可选)

## 📁 项目结构

```
maipal-app/
├── src/
│   ├── app/
│   │   ├── pages/              # 页面组件
│   │   │   ├── SplashScreen.tsx
│   │   │   ├── HomePage.tsx
│   │   │   ├── WangDiagnosisPage.tsx  # 望诊
│   │   │   ├── WenDiagnosisPage.tsx   # 闻诊
│   │   │   ├── QieDiagnosisPage.tsx   # 切诊
│   │   │   ├── WenQuestionPage.tsx    # 问诊
│   │   │   └── ...
│   │   ├── components/         # 组件
│   │   │   ├── MaiPalUI.tsx   # MaiPal UI 组件库
│   │   │   ├── MaiPalBottomNav.tsx
│   │   │   └── ui/            # shadcn/ui 组件
│   │   ├── context/           # React Context
│   │   ├── App.tsx
│   │   └── routes.tsx         # 路由配置
│   ├── styles/                # 样式文件
│   │   ├── index.css
│   │   ├── theme.css         # 主题变量
│   │   ├── fonts.css         # 字体导入
│   │   └── tailwind.css      # Tailwind 配置
│   └── imports/              # Figma 导入资源
├── package.json
├── vite.config.ts
├── vercel.json              # Vercel 部署配置
├── netlify.toml             # Netlify 部署配置
└── README.md
```

## 🎯 核心页面

### 用户流程
1. **启动页** (`/`) → 欢迎屏幕
2. **登录/注册** (`/login`, `/register`) → 用户认证
3. **资料设置** (`/profile-setup`) → 完善个人信息
4. **主页** (`/home`) → 每日状态和快捷操作

### 检测流程
1. **开始检测** (`/check-start`) → 四诊引导
2. **望诊** (`/check/wang`) → 面部和舌苔检测
3. **闻诊** (`/check/wen`) → 声音状态
4. **切诊** (`/check/qie`) → 脉搏测量
5. **问诊** (`/check/wen-question`) → 智能问答
6. **结果页** (`/check/result`) → 综合分析

### 陪伴功能
- **对话页** (`/companion`) → 日常陪伴
- **总结页** (`/companion/summary`) → 对话回顾
- **告别页** (`/companion/goodbye`) → 温馨道别

## 🎨 设计系统

### 颜色规范
- **品牌主色**: `#ECD1B4` (米驼色)
- **黑色**: `#000000`
- **白色**: `#FFFFFF`
- **灰色**: `#808080`

### 字体规范
- **中文**: 思源黑体 (Noto Sans SC)
- **英文/数字**: Lexend Deca
- **Fallback**: system-ui, -apple-system

### 布局规范
- **栅格系统**: 8pt grid
- **容器宽度**: 最大 428px (iPhone 尺寸)
- **间距**: 8pt, 16pt, 24pt, 32pt...

详细设计规范请查看：
- `UI-SPEC.md` - UI 设计规范
- `DESIGN_SYSTEM.md` - 设计系统文档

## 📚 文档

- **`QUICK_DEPLOY.md`** - 5分钟快速部署指南
- **`DEPLOYMENT_GUIDE.md`** - 完整部署教程
- **`README_CAMERA_FIX.md`** - 摄像头问题解决方案
- **`CHANGES_SUMMARY.md`** - 最新更新总结
- **`UI-SPEC.md`** - UI 设计规范
- **`DESIGN_SYSTEM.md`** - 设计系统完整文档

## 🔧 开发指南

### 添加新页面

1. 在 `src/app/pages/` 创建新页面组件
2. 在 `src/app/routes.tsx` 添加路由配置
3. 使用 MaiPalUI 组件库保持设计一致性

### 使用 MaiPalUI 组件库

```tsx
import { 
  MaiPalPage, 
  MaiPalButton, 
  MaiPalInput,
  MaiPalCard,
  MaiPalProgress
} from '../components/MaiPalUI';

export default function MyPage() {
  return (
    <MaiPalPage>
      <MaiPalCard>
        <h2 className="text-[20pt] font-bold">标题</h2>
        <MaiPalInput placeholder="请输入内容" />
        <MaiPalButton variant="primary">
          确认
        </MaiPalButton>
      </MaiPalCard>
    </MaiPalPage>
  );
}
```

### 样式指南

使用 Tailwind CSS，遵循 8pt 栅格：

```tsx
// ✅ 推荐：使用 8 的倍数
<div className="p-4 mt-6 mb-8">

// ❌ 避免：不规则数值
<div className="p-3 mt-5 mb-7">
```

字体大小使用 pt 单位：

```tsx
// ✅ 使用 pt 单位
<h1 className="text-[24pt]">标题</h1>
<p className="text-[14pt]">正文</p>

// ❌ 避免使用 px
<h1 className="text-[32px]">标题</h1>
```

## 🚀 部署选项

### Vercel（推荐）
- 自动 HTTPS
- 全球 CDN
- 零配置部署
- GitHub 集成

### Netlify
- 自动 HTTPS  
- 持续部署
- 表单处理
- 无服务器函数

### 其他平台
- GitHub Pages
- Cloudflare Pages
- Railway
- Render

查看 `DEPLOYMENT_GUIDE.md` 获取详细部署教程

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License

## 🔗 相关链接

- **GitHub**: https://github.com/tlswa-123/maipal-app
- **Vercel 部署**: [一键部署](https://vercel.com/new/clone?repository-url=https://github.com/tlswa-123/maipal-app)

## 📞 支持

如有问题，请查看：
- [常见问题](DEPLOYMENT_GUIDE.md#常见问题)
- [摄像头问题](README_CAMERA_FIX.md)
- [快速部署](QUICK_DEPLOY.md)

---

**Made with ❤️ for better health and wellness**