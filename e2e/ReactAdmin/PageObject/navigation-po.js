let common = require ('../../../Utils/common.js');
let data = require ('../../../Utils/dataFile_React.js');



function navigationPage() {

    this.goToPage = function (navigationElement, verifyElement, page) {

        return new Promise(function(resolve, reject){

            common.waitForElement(navigationElement);
            navigationElement.click();
            common.waitForElement(verifyElement);
            verifyElement.isDisplayed().then(async function(result){
                if(result){
                    browser.logger.info("Admin is on " + page + " page!!");
                }
                else{
                    browser.logger.info("Admin could not reach " + page + " page!!");

                }
            })
        });

    };

};

module.exports = new navigationPage();
