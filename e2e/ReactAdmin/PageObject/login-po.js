let common = require ('../../../Utils/common.js');
let data = require ('../../../Utils/dataFile_React.js');
let dictionary = require ('../../../Utils/DataFile.js');
let dJangoAdminLogin = require('../../Admin/PageObject/adminLogin_po.js');
let queries = require('../../../Utils/queriesToRun');
let pg = require('../../../Utils/postgresDB.js');
let waitForUrl = common.getAdminUrl('admin-login')

function loginPage() {


    this.loginAdmin =  function (email, password) {
        return new Promise(function (resolve, reject) {
            data.reactLogin.userName.sendKeys(email);
            data.reactLogin.password.sendKeys(password);
            data.reactLogin.logInButton.click();
            resolve();
        });
    };

    this.verifyLoggedUser = function() {

        let successCallback2 =  response => {
            browser.logger.info("Result of query 2 is:" + response['fullname']);

            data.reactLogin.loggedUser.isDisplayed().then(async function (result) {
                if (result) {
                    data.reactLogin.loggedUser.getText().then(function (value) {
                        if (value.includes() === response['fullname']) {
                            browser.logger.info('Correct user has logged into the platform!');
                            browser.logger.info("Logged in user is: " + value);
                        }
                        else{
                            browser.logger.info('Something went wrong with the login!');
                        }
                    })
                }
            });
        }
        pg.pgAdmin.ExecuteQuery(queries.queries.GET_USER_NAME,  successCallback2);
    }

    this.dJangoLogin = function (email, password) {
        return new Promise(function (resolve, reject) {

            common.waitForElement((data.reactLogin.analyticsNavigation));
            data.reactLogin.analyticsNavigation.click();
            browser.getAllWindowHandles().then(function (handles) {
                browser.switchTo().window(handles[1]);
                dJangoAdminLogin.adminLogin(email, password);
                browser.driver.close();
                browser.switchTo().window(handles[0]);
                resolve();
            });
        })
    };

};

function logoutUser() {

    data.reactGlobal.userProfile.click().then(function(){
        common.waitForElement(data.reactGlobal.logoutButton);
        data.reactGlobal.logoutButton.click();
        dictionary.dataDictionary.waitForUrlToChange(waitForUrl);
    })

};


module.exports = new loginPage();
module.exports.logoutUser = logoutUser;





