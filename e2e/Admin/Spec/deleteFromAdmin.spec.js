let adminLoginPage = require('../PageObject/adminLogin_po.js');
let dictionary = require ('../../../Utils/DataFile.js');
let deleteFromAdminPage = require('../PageObject/deleteFromAdmin_po');
let fakeData = require('../../../Utils/FakeData.js');


describe('Verify deletion of all automated data created!', function () {

    beforeAll(function (done) {
        dictionary.dataDictionary.getAdminUrl('admin');
        browser.isElementPresent(dictionary.dataDictionary.emailTextBox).then( function (result) {
            if (result) {
                adminLoginPage.adminLogin(dictionary.dataDictionary.adminEmail, dictionary.dataDictionary.adminPassword);
            };
        });
        done();
    });


    afterAll(function() {
        browser.driver.close();

    });

    it('Verify deletion of brand from admin: that would delete all content requests, contents and orders created', function () {
        deleteFromAdminPage.deleteBrand(fakeData.randomFirstName);
        browser.logger.info("Brand  successfully!!")
    });

    it('Verify deletion of user from admin', function () {
        deleteFromAdminPage.deleteUser(fakeData.randomFirstName);
        browser.logger.info("User deleted successfully!!")
    });


});
