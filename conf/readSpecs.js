const fs = require('fs');
let confProperties = require('./configuration');
const specs = [];

readSpecs = function() {

    this.returnSpecs =  function()
    {
        for(i=0; i<confProperties.conf.spec.length; i++){
            specs.push(confProperties.conf.dirName + confProperties.conf.spec[i]);
        }
        console.log("Specification that is running is: " + specs)
        return specs;
    }
}

module.exports = new readSpecs();

