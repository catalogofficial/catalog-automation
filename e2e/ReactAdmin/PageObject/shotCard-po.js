let common = require ('../../../Utils/common.js');
let data = require ('../../../Utils/dataFile_React.js');
let sgpt = require('sg-protractor-tools');


function shotCardPage() {

    this.verifyShotNumber = function (waitElement, element) {

        return new Promise(function(resolve, reject){
            sgpt.scroll.scrollTo(waitElement);
            browser.actions().mouseMove(waitElement).perform();
            common.waitForElement(waitElement);
                element.getText().then(function (value) {
                    resolve(value);
                });
        });

    };

};

    module.exports = new shotCardPage();
