const path = require('path')

module.exports = {
    i18n: {
        defaultLocale: 'en',
        locales: ['en', 'ru','am'],
        localePath: path.resolve('./public/locales')
    },
}