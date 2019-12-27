var excel = require('../../Utils/excelReader');
var dirname = '/home/parul/Protractor Automation/catalog-automation/';
var common = require ('../../Utils/common.js');
var elements = require ('../../Utils/elements.js');
var loginPage = require('../PageObject/login-po');
var loginUrl = common.getAdminUrl('admin-login')

describe('Verify various cases of login functionality', function () {

    var fromExcel = excel.readFromExcel('Sheet1' , dirname + 'CatalogData.xlsx');

    fromExcel.forEach(function(excelData){
        it('Verify login via invalid credentials', function () {
            loginPage.adminLogin(excelData.invalidUsername,excelData.invalidPassword);
            common.verifyText(excelData.expectedErrorMessage, elements.reactLogin.errorOnLogin, 'Messages');

        });
    });

    fromExcel.forEach(function(excelData){
        it('Verify the landing page while logging in through valid collaborators and staff users', function () {
            loginPage.adminLogin(excelData.validUsername,excelData.validPassword);
            expect(browser.getCurrentUrl()).toContain(excelData.expectedPage);
            common.waitForElement(elements.reactGlobal.userProfile);
            elements.reactGlobal.userProfile.click()
            browser.sleep(2000)
            elements.reactGlobal.logoutButton.click();
            common.waitForUrlToChange(loginUrl);

        });
    });

});
