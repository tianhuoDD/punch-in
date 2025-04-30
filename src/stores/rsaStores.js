// store/userStores.js
import { defineStore } from "pinia";
import JSEncrypt from "jsencrypt";

export const useRSAStore = defineStore("rsa", () => {
	let publicKey = null; // 初始为空

	/**
	 * 从 public 文件夹加载 PEM 公钥
	 * @returns {Promise<void>}
	 */
	const loadPublicKey = async () => {
		if (publicKey) return; // 已加载则跳过

		try {
			const response = await fetch("/publickey.pem"); // 你的 PEM 文件路径
			if (!response.ok) throw new Error("无法加载公钥");
			publicKey = await response.text();
		} catch (error) {
			console.error("加载公钥失败：", error);
		}
	};

	/**
	 * 使用RSA公钥加密
	 * @param {string} data 要加密的数据
	 * @returns {Promise<string|null>} 加密后的内容
	 */
	const encryptWithRSA = async (data) => {
		await loadPublicKey(); // 确保已加载公钥

		if (!publicKey) {
			console.warn("公钥未加载，无法加密。");
			return null;
		}
		const encryptor = new JSEncrypt();
		encryptor.setPublicKey(publicKey);
		const encrypted = encryptor.encrypt(data);
		return encrypted;
	};

	return {
		encryptWithRSA,
	};
});
