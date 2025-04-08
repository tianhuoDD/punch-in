import type { CapacitorConfig } from "@capacitor/cli";

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
