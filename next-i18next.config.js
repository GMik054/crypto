const path = require('path')

module.exports = {
    i18n: {
        defaultLocale: 'en',
        locales: ['en', 'am', 'ru'],
        localePath: path.resolve('./public/locales')
    },
}