/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const list = fs.readFileSync(path.join(__dirname, 'rewrite-import-list.txt')).toString().trim();

list
  .split('\n')
  .filter(Boolean)
  .map(item => item.trim().split(/\s/))
  .forEach(item => {
    const [targetNamedImport, targetSpecifier, filePattern] = item;
    const rewriteScriptPath = path.join(__dirname, 'rewrite-import.js');
    execSync(
      `node ${rewriteScriptPath} --targetNamedImport ${targetNamedImport} --targetSpecifier ${targetSpecifier} --filePattern ${filePattern}`,
      { stdio: 'inherit' }
    );
  });
