#! /usr/bin/env node

import { program } from 'commander';
import { addAllKeys, init, merge, create, uiStart } from './commands/index';

program.command('init').description('Init .i18nfnrc.js file').action(init);
program
  .command('create <fileName>')
  .description(
    'Create new file `fileName` with all the same keys as in mainLocale file'
  )
  .action(create);

program
  .command('add-all-keys')
  .description(
    'Add all keys from main translation file to all the others files'
  )
  .action(addAllKeys);

program
  .command('merge <fileName1> [fileName2]')
  .description(
    "Merge `fileName2` file keys to `fileName1`. If `fileName1` doesn't exist it will be created with all keys from `fileName2`. `fileName2` is `localeToMerge` file by default."
  )
  .action(merge);

program
  .command('ui-start')
  .description(
    'Start the server to work with locale management through the UI. Default address `localhost:3000`'
  )
  .action(uiStart);

program.parse();

export { addAllKeys, init, merge, create };
