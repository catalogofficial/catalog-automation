let common = require ('../../../Utils/common.js');
let data = require ('../../../Utils/dataFile_React.js');
const idArray = [];
let isDescending = true;
let isAscending = true;
const success = true;
let message;
let sgpt = require('sg-protractor-tools');
let fakeData = require('../../../Utils/FakeData.js');
let globalData = data.globalListingPage;
let globalNames = globalData.names;

function globalListingPage() {

    this.createGlobal =  function (component) {
        return new Promise(function(resolve, reject) {
            common.waitForElement(globalData.createNew);
            globalData.createNew.click();
            common.waitForElement(globalData.placeholder);
            globalData.placeholder.sendKeys(globalNames[component]);
            common.isElementPresent(globalData.uploadFile);
            resolve();
        })
    };

};

module.exports = new globalListingPage();
