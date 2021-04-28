module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
      ? '/nvidia-api-check/'
      : '/'
  }