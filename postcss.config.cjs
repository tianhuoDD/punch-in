module.exports = {
  plugins: {
    'postcss-pxtorem': {
      rootValue: 37.5, // 设计稿的基准值，一般为 37.5 或 75，具体看设计稿的大小
      propList: ['*'], // 需要转换的属性，['*'] 表示全部属性都转换
      unitPrecision: 5, // rem的小数点位数
      minPixelValue: 2, // 最小的像素值，只有大于2px的值才会被转换
      selectorBlackList: ['.norem'], // 忽略的选择器，带有 `.norem` 类名的元素不会被转换
      mediaQuery: false // 允许在媒体查询中转换 `px`
    }
  }
}
