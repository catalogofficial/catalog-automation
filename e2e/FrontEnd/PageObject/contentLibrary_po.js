let dictionary = require ('../../../Utils/DataFile.js');
brandDictionary = dictionary.dataDictionary;
let common = require ('../../../Utils/common.js');
let data = require ('../../../Utils/dataFile_React.js');
let shortCardPage = require('../../ReactAdmin/PageObject/shotCard-po');



function brandDetailsPage() {

    this.searchForBrand = function (brandName) {
        common.waitForElement(brandDictionary.brandDropDownOnFrontEnd);
        brandDictionary.brandDropDownOnFrontEnd.click();
        brandDictionary.searchForBrand.click();
        browser.sleep(900);
        brandDictionary.searchForBrand.sendKeys(brandName);
        brandDictionary.filteredResult.click();
        common.waitForElement(brandDictionary.returnImageOnLibrary(1));
        common.isElementPresent(brandDictionary.returnImageOnLibrary(1), 'Thumbnail on Library');
    };

    this.applyFilter = function (filter) {
        common.waitForElement(brandDictionary.filterButton)
        brandDictionary.filterButton.click();
        brandDictionary.clearFilter.click();
        common.waitForElement(brandDictionary.returnFilterOptions(filter));
        brandDictionary.returnFilterOptions(filter).click();
        brandDictionary.applyFilter.click();
        browser.sleep(2000);
        common.waitForElement(brandDictionary.returnImageOnLibrary(1));
        common.isElementPresent(brandDictionary.returnImageOnLibrary(1), 'Thumbnail on Library');
    };


};


module.exports = new brandDetailsPage();
