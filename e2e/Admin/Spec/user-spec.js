let adminLoginPage = require('../PageObject/adminLogin_po.js');
let dictionary = require ('../../../Utils/DataFile.js');
let common = require ('../../../Utils/common.js');
let fakeData = require('../../../Utils/FakeData.js');


describe('Verify creating a new user from Django', function () {

    beforeAll(function () {
        browser.get(common.getAdminUrl('django-user'));
        browser.isElementPresent(dictionary.dataDictionary.emailTextBox).then( function (result) {
            if (result) {
                adminLoginPage.adminLogin(dictionary.dataDictionary.adminEmail,
                    dictionary.dataDictionary.adminPassword);
            };
        });
    });

    it('Verify that user successfully lands on user page!', function () {
        console.log("***********Verifying admins lands on user page on Django.....***********");
        browser.isElementPresent(dictionary.dataDictionary.headerOnUserPage).then( function (result) {
            if (result) {
                console.log("Admin is on add user page!!");
            };
        });
    });

    it('Verify by creating a new user in the newly created tenant!', function () {
        console.log("***********Verifying adding new users to the created tenant.....***********");
        dictionary.dataDictionary.firstNameTextField.sendKeys(fakeData.randomFirstName);
        dictionary.dataDictionary.emailTextField.sendKeys(fakeData.randomFirstName + "@mailinator.com");
        dictionary.dataDictionary.passwordTextField.sendKeys(dictionary.dataDictionary.brandPassword);
        dictionary.dataDictionary.confirmPasswordTextField.sendKeys(dictionary.dataDictionary.brandPassword);
        dictionary.dataDictionary.tenantDropDown.click();
        dictionary.dataDictionary.searchTenant.sendKeys(fakeData.randomFirstName + " Tenant");
        common.waitForElement(dictionary.dataDictionary.searchResult);
        dictionary.dataDictionary.searchResult.click();
        dictionary.dataDictionary.save.click();
        browser.isElementPresent(dictionary.dataDictionary.successMessage).then( function (result) {
            if (result) {
                console.log("User added successfully!")
                dictionary.dataDictionary.save.click();
            };
        });
    });

    it('Verify by giving admin access to user!', function () {
        console.log("***********Verifying granting admin access to the new user.....***********");
        common.waitForElement(dictionary.dataDictionary.searchTextBox);
        dictionary.dataDictionary.searchTextBox.click();
        dictionary.dataDictionary.searchTextBox.sendKeys(fakeData.randomFirstName + "@mailinator.com");
        dictionary.dataDictionary.searchButton.click();
        dictionary.dataDictionary.searchResultUserListing.click();
        common.waitForElement(dictionary.dataDictionary.adminAccessFlag);
        dictionary.dataDictionary.adminAccessFlag.click();
        dictionary.dataDictionary.saveButton.click();
        browser.isElementPresent(dictionary.dataDictionary.successMessage).then( function (result) {
            if (result) {
                console.log("User given admin access!")
            };
        });

    });


});
