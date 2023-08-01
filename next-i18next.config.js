const path = require('path')

module.exports = {
    i18n: {
        defaultLocale: 'en',
        locales: ['en', 'am'],
        localePath: path.resolve('./public/locales')
    },
}