let adminLoginPage = require('../PageObject/adminLogin_po.js');
let dictionary = require ('../../../Utils/DataFile.js');
let common = require ('../../../Utils/common.js');
let fakeData = require('../../../Utils/FakeData.js');

describe('Verify creating a new tenant from Django', function () {

    beforeAll(function () {
        browser.get(common.getAdminUrl('django-tenant'));
        browser.isElementPresent(dictionary.dataDictionary.emailTextBox).then( function (result) {
            if (result) {
                adminLoginPage.adminLogin(dictionary.dataDictionary.adminEmail,
                    dictionary.dataDictionary.adminPassword);
            };
        });
    });

    it('Verify that user successfully lands on tenant page!', function () {
        console.log("***********Verifying that user lands on tenant page in Django admin.....***********");
        browser.isElementPresent(dictionary.dataDictionary.headerOnTenantPage).then( function (result) {
            if (result) {
                console.log("Admin is on add tenant page!!");
            };
        });
    });

    it('Verify by creating a new tenant!', function () {
        console.log("***********Verifying creating a new tenant.....***********");
        dictionary.dataDictionary.tenantNameTextField.sendKeys(fakeData.randomFirstName + " Tenant");
        dictionary.dataDictionary.saveButton.click();
        browser.isElementPresent(dictionary.dataDictionary.successMessage).then( function (result) {
            if (result) {
                console.log("Tenant added successfully!")
            };
        });
    });


});
