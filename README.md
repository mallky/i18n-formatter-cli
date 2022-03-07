# i18n-formatter-cli
cli tool for i18n library

# Features
- Create new locale file with all keys from already existed file
- Add all keys from main locale file to all the others locales
- Merge translations from json to locale file

# Instalation
`npm i i18n-formatter-cli -D`

# How to use
After instalation you can check all the command by running `i18n-cli --help`;

1. At first you need to create `.i18nfnrc.js` file with fields `localesDir`, `mainLocale` and `localeToMerge`. For example:
`
module.exports = {\n
  localesDir: './mocks',\n
  mainLocale: 'en-gb.json',\n
  localeToMerge: './mocks/externalTranslation.json'\n
}
`
(You can create `.i18nfnrc.js` by running `i18n-cli init`)
2. Try to use cli!
Example: 
`
i18n-cli init\n
i18n-cli create fileName\n
i18n-cli addAllKeys\n
i18n-cli merge fileName1 fileName2\n
`

# Thank you!

email: makarkuz@yandex.ru

