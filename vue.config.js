module.exports = {
  chainWebpack: config => {
    // run lint on save
    config.module.rule('eslint').use('eslint-loader').options({
      fix: true
    })
  }
}
