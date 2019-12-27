let data = require ('../../../../Utils/dataFile_React.js');
let common = require ('../../../../Utils/common.js');
const tenantNames =[];
let counter = 0;
let fakeData = require('../../../../Utils/FakeData.js');


function verifyTenantNames(namesFromDb) {
    return new Promise(function(resolve, reject) {
        let dbTenants = namesFromDb.split(',');
        getTenantNames().then(function(namesFromDropDown){
            for(let i=0;i<namesFromDropDown.length;i++){
                if(namesFromDropDown[i] === dbTenants[i]){
                    counter++
                }
            }
            counter ? resolve("Tenant names in drop down as in DB!! :)")
                : reject("Values in drop down and DB don't match!! :(");
        })
    });
}

function getTenantNames() {
    return new Promise(async function(resolve) {
        data.reactGlobal.tenantDropDown
            .click().then(function(){
            common.waitForElement(data.reactGlobal.tenantSearch);
            element.all(by.css('[class*="dropdown-item d-block"]')).map(function(elm) {
                return {
                    text: elm.getText()
                };
            }).then(function(list) {
                for(let i = 0; i<11; i++) {
                    tenantNames.push(list[i].text)
                }
                resolve(tenantNames);
            })

        })
    });
}

function searchTenant(search) {
    return new Promise(async function(resolve) {
        common.waitForElement(data.reactGlobal.tenantDropDown);
        data.reactGlobal.tenantDropDown.click();
        common.waitForElement(data.reactGlobal.tenantSearch);
        data.reactGlobal.tenantSearch.click();
        data.reactGlobal.tenantSearch.sendKeys(search);
        common.waitForElement(data.reactGlobal.returnTenantsInDropDown(2));
        data.reactGlobal.returnTenantsInDropDown(2).click()
            .then(function(){
                common.waitForElement(data.reactGlobal.noResultsPage);
                resolve();
            })
    })
}

function returnSelectedTenant() {
    return new Promise(async function(resolve, reject) {
        common.waitForElement(data.reactGlobal.tenantDropDown);
        data.reactGlobal.tenantDropDown.getText().then(function(selectedTenant){
            if(selectedTenant === fakeData.randomFirstName + " Tenant"){
            // if(selectedTenant === "Walter Tenant"){
                console.log("Tenant remains same even on page refresh!");
                resolve();
            }
            else{
                reject("Tenant name got changed after doing page refresh!")
            }
        });
    })
}

module.exports.verifyTenantNames = verifyTenantNames;
module.exports.searchTenant = searchTenant;
module.exports.returnSelectedTenant = returnSelectedTenant;
