/* ESLint 配置文件 进行代码检查 */
/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true, // 表示这个配置文件是项目的根配置文件，防止 ESLint 自动查找并应用更高层级目录的配置文件。
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-prettier/skip-formatting'
  ], // 扩展 ESLint 的规则集。
  parserOptions: {
    ecmaVersion: 'latest'
  }
}
