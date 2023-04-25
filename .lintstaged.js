const path = require('node:path')

const buildEslintCommand = (filenames) => {
  return `next lint --fix --file ${filenames
    .map((filename) => path.relative(process.cwd(), filename))
    .join(' --file ')}`
}

module.exports = {
  '*.{js,jsx,ts,tsx}': [buildEslintCommand]
}
