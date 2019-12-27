let data = require ('../../../../Utils/dataFile_React.js');
let common = require ('../../../../Utils/common.js');
let fakeData = require('../../../../Utils/FakeData.js');
let queries = require('../../../../Utils/queriesToRun');
let pg = require('../../../../Utils/postgresDB.js');


function createBrand(brandName) {
    return new Promise(function(resolve, reject) {
        data.brands.createBrand.click()
        data.brands.addBrandField.sendKeys(brandName);
        data.reactGlobal.titleLeft.click();
        common.waitForElement(data.brands.returnBrandNameInDrawer(brandName));
        browser.isElementPresent(data.brands.returnBrandNameInDrawer(brandName))
            .then( function (result) {
                if (result) {
                    resolve(brandName + " added successfully under selected tenant!")
                }
                else{
                    reject('Some error occurred while creating brand!')
                }
            });
    });
}

function addBrandDetails(brand) {
    return new Promise(function(resolve, reject) {
        data.brands.returnBrandField(2).click();
        data.brands.returnBrandField(2).sendKeys("www." + brand + ".com");
        data.brands.returnBrandField(3).sendKeys("#" + brand);
        data.brands.returnBrandDropDown(4).click().then(function(){
            common.waitForElement(data.brands.returnDropDownValue(4));
            data.brands.returnDropDownValue(4).click();
        });

        browser.actions().mouseMove(data.brands.brandNotes).perform();
        browser.sleep(3000);
        data.brands.returnBrandDropDown(5).click().then(function(){
            common.waitForElement(data.brands.returnDropDownValue(5));
            data.brands.returnDropDownValue(5).click();
        });
        data.brands.returnBrandField(6).sendKeys("#111111");
        data.brands.brandNotes.sendKeys("Notes for brand " + brand);
        data.reactGlobal.titleLeft.click();
        resolve();
    });
}

function verifyDbTenant(queryToRun, page) {
    return new Promise(function(resolve) {
        function getDbTenantName (response) {
            console.log("Tenant of " + page + " is :"+ response['name']);
            resolve(response['name']);
        };
        pg.pgAdmin.ExecuteQuery((queryToRun), getDbTenantName);
    });
}

module.exports.createBrand = createBrand;
module.exports.addBrandDetails = addBrandDetails;
module.exports.verifyDbTenant = verifyDbTenant;
