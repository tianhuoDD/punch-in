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
			iconDirs: [path.resolve(process.cwd(), "src/assets/icons")], // 指定symbolId格式
			symbolId: "icon-[name]",
			// 设置为true时，可以自定义插入的位置
			inject: "body-first",
			// 自定义插入的内容
			customDomId: "svg-icons-dom",
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
