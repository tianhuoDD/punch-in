# 项目介绍

PunchIn - 致力于做一款打卡、记账等功能的app.

## 项目基本架构

vue3(vite) + vant4 + amfe-flexible + postcss-pxtorem + svg-sprite-loader

## 项目使用辅助

1. 回退路由：`router.back()` 或 `history.back()`

## 项目依赖

> 这里列出的是后添加的依赖

1. 生产环境依赖：@capacitor/core + @rom/axios + vant
2. 开发环境依赖：@capacitor/cli + @capacitor/android + @vant/auto-import-resolver + unplugin-vue-components + unplugin-auto-import + vite-plugin-svg-icons

### Capacitor: vue => android

> 用于将 Web 程序跨平台运行；Vue 项目转 Android 移动app。

1. 生产环境依赖：@capacitor/core
2. 开发环境依赖：@capacitor/cli + @capacitor/android

#### 使用步骤

1. 进入到指定文件夹终端内，安装相关依赖

   ```shell
   pnpm -F=punch-in add -D @capacitor/cli @capacitor/android
   pnpm -F=punch-in add -P @capacitor/core
   ```

2. 第一次使用需构建app信息，会生成`capacitor.config.json`文件

   ```shell
   # [appName] 是你的应用名称
   # [appId] 是应用的唯一标识（通常是反向域名格式，如 com.example.app）
   # npx cap init [appName] [appId]
   npx cap init PunchIn com.romcere.app
   ```

3. 创建 Android 项目

   ```shell
   npx cap add android
   ```

4. 构建 vue 生产文件

   ```shell
   pnpm run build
   ```

5. 同步 dist 文件到 Android，并运行项目

   > `npx cap sync` = `npx cap copy` + `npx cap update`
   >
   > 同步操作已经完成了复制和更新。

   ```shell
   npx cap sync
   npx cap open android
   ```

按照官方教程，按照以上内容就可以成功运行 Android 项目；但是实际运行中，会出现一些其他问题，请参考下述步骤。

#### 其他步骤

1. 第一次运行项目可能需要下载 jar 包，但使用此方法可以避免下 jar 包：
   `capacitor.settings.gradle`文件，则修改`capacitor.settings.gradle`文件内容为：

```xml
// DO NOT EDIT THIS FILE! IT IS GENERATED EACH TIME "capacitor update" IS RUN
include ':capacitor-android'
```

然后启动 Android 项目：`npx cap open android`，会发现 Android 项目成功打开；
接着我们退出 Android 项目，执行`npx cap sync`同步项目，然后再运行`npx cap open android`，即可正常构建 Android 项目。

### postcss-pxtorem: px => rem

> px => rem ，用于移动端适配。一般和 `amfe-flexible`依赖一起使用。
>
> 暂时不使用`postcss-pxtorem`+`amfe-flexible`。推荐的其他方法：[浏览器适配](https://vant-ui.github.io/vant/#/zh-CN/advanced-usage#viewport-bu-ju)

```shell
# 安装方法
pnpm -F=punch-in add -P postcss-pxtorem amfe-flexible
```

```js
/* postcss.config.js */
export default {
	plugins: {
		"postcss-pxtorem": {
			rootValue: 37.5, // 设计稿的基准值，一般为 37.5 或 75，具体看设计稿的大小
			propList: ["*"], // 需要转换的属性，['*'] 表示全部属性都转换
			unitPrecision: 5, // rem的小数点位数
			minPixelValue: 2, // 最小的像素值，只有大于2px的值才会被转换
			selectorBlackList: [".norem"], // 忽略的选择器，带有 `.norem` 类名的元素不会被转换
			mediaQuery: false, // 允许在媒体查询中转换 `px`
		},
	},
};
```

### 按需引入配置

> 参考：[按需引入组件样式](https://vant-ui.github.io/vant/#/zh-CN/quickstart#fang-fa-er.-an-xu-yin-ru-zu-jian-yang-shi)

```shell
pnpm -F=punch-in add -D @vant/auto-import-resolver unplugin-vue-components unplugin-auto-import
```

```js
/* vite.config.js */
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { VantResolver } from "@vant/auto-import-resolver";

export default {
	plugins: [
		vue(),
		AutoImport({
			resolvers: [VantResolver()],
		}),
		Components({
			resolvers: [VantResolver()],
		}),
	],
};
```

### SVG图标引入

> 有待优化：[vite-plugin-svg-icons 插件导致项目打包慢了6倍](https://github.com/vbenjs/vite-plugin-svg-icons/issues/112)
>
> 可查找SVG图标的网站：https://www.iconfont.cn/

```shell
pnpm -F=punch-in add -D vite-plugin-svg-icons
```

#### 配置方法

**配置内容**

```js
/* main.js */
import "virtual:svg-icons-register";

/* vite.config.js */
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import path from "path";
export default defineConfig({
	plugins: [
		vue(),
		// 配置svg图标插件
		createSvgIconsPlugin({
			// 指定需要缓存的svg图标文件目录
			iconDirs: [path.resolve(process.cwd(), "src/assets/icons")], // 指定symbolId格式
			symbolId: "icon-[name]",
			// 设置为true时，可以自定义插入的位置
			inject: "body-first",
			// 自定义插入的内容
			customDomId: "svg-icons-dom",
		}),
	],
});
```

**自定义组件**

```vue
<!-- components/SvgIcon.vue -->
<template>
	<svg aria-hidden="true">
		<use :href="`#${prefix}-${name}`" />
	</svg>
</template>
<script setup>
defineProps({
	prefix: {
		type: String,
		default: "icon",
	},
	name: {
		type: String,
		required: true,
	},
});
</script>
```

**使用SVG图标组件**

在`assets/icons/`中添加你要使用的svg文件，其文件名，就是组件属性`name`的值：

```vue
<template>
	<svg-icon name="test" />
</template>
<script setup>
import SvgIcon from "@/components/SvgIcon.vue";
</script>
```

### IconPark 图标库引入

**1. 安装IconPark**

```shell
pnpm -F=punch-in add @icon-park/vue-next
```

**2. 在 main.js 中引入**

```shell
import "@icon-park/vue-next/styles/index.css";
```

**3. 使用方法**

浏览[IconPark图标库](https://iconpark.oceanengine.com/official)找到想使用的图标，直接复制使用：

```vue
<template>
	<bank-card theme="outline" size="24" fill="#333" :strokeWidth="3" />
</template>

<script setup>
import { BankCard } from "@icon-park/vue-next";
</script>
```

## 项目存在的问题

1. 优化svg图标引入，更换其他依赖；以减少build时间、fill颜色替换问题等。
2. punch-in/src/components/bill/InputBill.vue 及 punch-in/src/views/bill/AddBill.vue 输入金额的优化
