import type { CapacitorConfig } from "@capacitor/cli";
// Capacitor 配置文件
const config: CapacitorConfig = {
	appId: "com.romcere.app",
	appName: "PunchIn",
	webDir: "dist",
	server: {
		androidScheme: "http",
		cleartext: true,
	},
	android: {
		allowMixedContent: true,
	},
};

export default config;
