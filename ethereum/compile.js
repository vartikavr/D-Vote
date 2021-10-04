const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');
//fs => file system

const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);

const electionPath = path.resolve(__dirname, 'contracts', 'Election.sol');
//console.log(electionPath)
const source = fs.readFileSync(electionPath, 'utf8');
//console.log(source)
const input = {
    language: 'Solidity',
    sources: {
      'Election': {
        content: source
      }
    },
    settings: {
      outputSelection: {
        '*': {
          '*': ['*']
        }
      }
    }
  };
   
const output = JSON.parse(solc.compile(JSON.stringify(input))).contracts;
//console.log(output)

fs.ensureDirSync(buildPath); //checks to see if a directory exists, if it doesn't then creates one

for (let contract in output) {
    let name = contract.replace(':', '');
    fs.outputJSONSync(
        path.resolve(buildPath, name + '.json'),
        output[contract]
    );
}
