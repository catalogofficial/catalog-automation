let adminLoginPage = require('../PageObject/adminLogin_po.js');
let dictionary = require ('../../../Utils/DataFile.js');


function deleteData() {

    this.deleteUser = function (User) {
        dictionary.dataDictionary.getAdminUrl('user');
        // browser.isElementPresent(dictionary.dataDictionary.emailTextBox).then( function (result) {
        //     if (result) {
        //         adminLoginPage.adminLogin();
        //     };
        // });
        this.deleteData(User);
    };

    this.deleteBrand=function (Brand) {
        dictionary.dataDictionary.getAdminUrl('brands');
        // browser.isElementPresent(dictionary.dataDictionary.emailTextBox).then( function (result) {
        //     if (result) {
        //         adminLoginPage.adminLogin();
        //     };
        // });
        this.deleteData(Brand);
    };

    this.deleteData=function (dataToBeDeleted) {

        dictionary.dataDictionary.waitForElement(dictionary.dataDictionary.searchTextBox);
        dictionary.dataDictionary.searchTextBox.sendKeys(dataToBeDeleted)
        dictionary.dataDictionary.searchButton.click();
        dictionary.dataDictionary.selectAll.click();
        dictionary.dataDictionary.actionDropDown.click();
        dictionary.dataDictionary.selectDropdownbyNum(dictionary.dataDictionary.action,1);
        dictionary.dataDictionary.goButton.click().then(function(){
            dictionary.dataDictionary.waitForElement(dictionary.dataDictionary.deleteButton);
            dictionary.dataDictionary.deleteButton.click();
            dictionary.dataDictionary.waitForElement(dictionary.dataDictionary.successMessage);
        });

    }
}

module.exports = new deleteData();
