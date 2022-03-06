#!/usr/bin/env node
"use strict";const r=require("fs"),e=require("path"),n=[".git",".hg"],i=i=>n.some((n=>r.existsSync(e.join(i,n))));function o(r){for(;!i(r);){const n=e.resolve(r,"..");if(n===r)break;r=n}return r}const s=require("path"),t=require("fs"),c=(r,{root:e})=>t.existsSync(`${e}/${r}`)?require(`${e}/${r}`):console.error("config file not found. You can try `i18n-cli init` to create config file"),a=((r,e)=>r&&e(r,{root:o(s.dirname(s.resolve(r)))}))(".i18nfnrc.js",c);const l=require("path"),f=require("fs"),{program:d}=require("commander");d.command("addAllKeys").description("add all keys from main translation file to all the others files").action(a),d.command("init").description("Init .i18nfnrc.js file").action((()=>{const r=o(l.dirname(l.resolve(".i18nfnrc.js")));if(f.existsSync(r+"/.i18nfnrc.js"))return chalk.red.bold("file .i18nfnrc.js already exists");f.writeFileSync(r+"/.i18nfnrc.js","module.exports = {\n  translationsDir: './mocks',\n  mainTranslation: './mocks/en-gb.json'\n}",((r,e)=>{if(r)throw new Error(r);console.log(e)}))})),d.parse();
