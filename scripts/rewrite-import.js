/* eslint-disable @typescript-eslint/no-var-requires */
const { Project } = require('ts-morph');

const args = require('minimist')(process.argv.slice(2));

const project = new Project({ tsConfigFilePath: 'tsconfig.json' });

const { targetNamedImport, targetSpecifier, filePattern } = args;

const targetNamedImports = targetNamedImport.split(',');

project
  .getSourceFiles(filePattern === 'undefined' ? undefined : filePattern)
  .forEach(sourceFile => {
    targetNamedImports.forEach(targetNamedImport => {
      const importDeclaration = sourceFile.getImportDeclarations().find(declaration => {
        return declaration
          .getNamedImports()
          .some(namedImport => namedImport.getText() === targetNamedImport);
      });

      if (importDeclaration) {
        sourceFile.addImportDeclaration({
          namedImports: [targetNamedImport],
          moduleSpecifier: targetSpecifier,
        });

        if (importDeclaration.getNamedImports().length === 1) {
          importDeclaration.remove();
        } else {
          importDeclaration
            .getNamedImports()
            .find(namedImport => namedImport.getText() === targetNamedImport)
            .remove();
        }
      }
    });

    sourceFile.save();
  });
