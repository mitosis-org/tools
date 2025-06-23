/** @type {import("prettier").Config} */
const config = {
  importOrder: ['^[./]'],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  plugins: [
    require.resolve('@trivago/prettier-plugin-sort-imports'),
    require.resolve('prettier-plugin-solidity'),
    require.resolve('prettier-plugin-sort-json'),
  ],
  printWidth: 80,
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'all',
  useTabs: false,
};

module.exports = config;
