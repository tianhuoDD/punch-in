import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

/* 按需引入插件 */
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { VantResolver } from "@vant/auto-import-resolver";

/* SVG 图标插件 */
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import path from "path";

/* 其他插件 */
import vueDevTools from "vite-plugin-vue-devtools";
// 引入打包体积分析插件
import { visualizer } from "rollup-plugin-visualizer";
// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		// 配置按需引入插件
		AutoImport({
			resolvers: [VantResolver()],
		}),
		Components({
			resolvers: [VantResolver()],
		}),
		// 配置svg图标插件
		createSvgIconsPlugin({
			// 指定需要缓存的svg图标文件目录
			iconDirs: [
				path.resolve(process.cwd(), "src/assets/icons/bill-icons"),
				path.resolve(process.cwd(), "src/assets/icons"),
			],
			symbolId: "icon-[name]",
			// 设置为true时，可以自定义插入的位置
			inject: "body-first",
			// 自定义插入的内容
			customDomId: "svg-icons-dom",
		}),
		// 配置 vue-devtools，vue优化工具：ctrl+shift+alt+D打开
		vueDevTools(),
		// 配置打包体积分析
		visualizer({
			open: true, //注意这里要设置为true，否则无效
			filename: "stats.html", //分析图生成的文件名
			gzipSize: true, // 收集 gzip 大小并将其显示
			brotliSize: true, // 收集 brotli 大小并将其显示
			// template: "network",
		}),
	],
	server: {
		// 开发环境使用该代理设置
		proxy: {
			"/api": {
				target: "http://127.0.0.1:5000", // 后端服务器地址
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api/, ""),
			},
		},
	},
	resolve: {
		alias: {
			"@": fileURLToPath(new URL("./src", import.meta.url)), // 使用 @ 来引入 src 目录下的文件
		},
	},
});
