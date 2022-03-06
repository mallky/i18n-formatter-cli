#! /usr/bin/env node

const { program } = require('commander');
const addAllKeys = require('./utils/addAllKeys');
const {init} = require('./utils/init');

program
  .command('addAllKeys')
  .description(
    'add all keys from main translation file to all the others files'
  )
  .action(addAllKeys);

program
.command('init').description('Init .i18nfnrc.js file').action(init);
