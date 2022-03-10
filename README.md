# i18n-formatter-cli
cli tool for i18n library

# Features
- Create new locale file with all keys from already existed file
- Add all keys from main locale file to all the others locales
- Merge translations from json to locale file

# Instalation
```
npm i i18n-formatter-cli -D
```

# How to use
After instalation you can check all the command by running ```$ i18n-cli --help```;

1. At first you need to create `.i18nfnrc.js` file with fields `localesDir`, `mainLocale` and `localeToMerge`. For example:
```
    module.exports = {
      localesDir: './locales',
      mainLocale: 'en-gb.json',
      localeToMerge: './translation/externalTranslation.json'
    }
```

You can create `.i18nfnrc.js` by running 
```
$ i18n-cli init
```

2. Try to use cli!
Example: 
```
$ i18n-cli init
```
```
$ i18n-cli create fileName  
```
```
$ i18n-cli addAllKeys  
```
```
$ i18n-cli merge fileName1 fileName2  
```
# Restrictions
cli can work only with `json` files.

# Thank you!

email: makarkuz@yandex.ru

