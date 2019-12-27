let loginPage = require('../PageObject/login-po.js');
let fakeData = require('../../../Utils/FakeData.js');
let common = require ('../../../Utils/common.js');
let data = require ('../../../Utils/dataFile_React.js');
let pg = require('../../../Utils/postgresDB.js');
let queries = require('../../../Utils/queriesToRun');
const EC = protractor.ExpectedConditions;


const password = data.reactLogin.validPassword;

describe('Verify Login functionality', function () {

    beforeAll(function () {
        browser.get(common.getAdminUrl('admin-home'));
        common.waitForElement(data.reactLogin.logInButton);
        browser.isElementPresent(data.reactLogin.logInButton).then( function (result) {
            if (result) {
                console.log('Login Page successfully loaded!');

            };
        });
    });

    // beforeEach(function () {
    //     browser.refresh();
    // });

    // it('Login button should be initially disabled!', function () {
    //     common.waitForElement(data.reactLogin.logInButton);
    //     if(expect(data.reactLogin.logInButton).toBe(data.reactLogin.logInButton.isDisabled)){
    //         browser.logger.info("Login button is disabled");
    //     }else{
    //         browser.logger.info("Login button is enabled!")
    //     }
    // });

    // it('Wrong credentials check', function () {
    //     loginPage.loginAdmin(fakeData.randomFirstName + "@mailinator.com", password);
    //     common.waitForElement(data.reactLogin.errorOnLogin);
    //     if(expect(data.reactLogin.errorOnLogin.isDisplayed()).toBeTruthy()){
    //         browser.logger.info('User entered wrong login credentials!');
    //     }
    // });

    it('Verify successful login', async function () {
        function  login (response) {
            browser.logger.info("Result of query 1 is:" + response['username']);
            loginPage.loginAdmin(response['username'], password).then(function(){
                browser.wait(EC.not(EC.presenceOf(data.reactGlobal.loaderOnPages))).then(function(){
                    common.waitForElement(data.reactGlobal.tenantDropDown);
                    data.reactGlobal.tenantDropDown.isDisplayed().then(async function (result) {
                        if (result) {
                            browser.logger.info('Tenant drop down present! User was successfully logged in!');
                            // loginPage.verifyLoggedUser();
                        }
                        else {
                            console.log("User could not log in to React admin!")
                        }
                    })
                })

            })

        };

        pg.pgAdmin.ExecuteQuery(queries.queries.SELECT_USER_QUERY, login);
    });

    // it('Verify Django login and its impact on React logged in user', function () {
    //
    //     loginPage.dJangoLogin(data.reactLogin.validUser, password).then(function(){
    //         browser.logger.info('User is still logged in on React!');
    //     })
    // });

});
