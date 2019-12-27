var config = require ('../conf/configuration');
var EC = protractor.ExpectedConditions;


function getAdminUrl(type) {
    switch (type) {

        case 'admin-home': return config.conf.baseURLReact;
            break;
        case 'admin-login': return (config.conf.baseURLReact + "login");
            break;
        case 'admin-brands': return (config.conf.baseURLReact + "brands");
            break;
        case 'brand-home' : return config.conf.brandURL;
            break;
        case 'brand-login' : return config.conf.loginBrand;
            break;
        case 'django-tenant' : return (config.conf.baseURLDjango
            + '/tenant/tenant/add/');
            break;
        case 'django-user' : return (config.conf.baseURLDjango
            + 'user/user/add/');
            break;
        default:  browser.logger.info("Unknown Url type");
    }

};

function waitForElement(elem) {
    browser.wait(EC.visibilityOf(elem), 20000, elem + " was not visible!");
}


function isElementPresent(element, elementName){
    element.isDisplayed().then(function (result) {
        if (result) {
            console.log(elementName + " is present!")
        }
        else {
            console.log(elementName + " is not present!!")
        }
    })
}

function waitForUrlToChange(expectedUrl) {

    browser.wait(EC.urlContains(expectedUrl),40000);
}

function verifyText(expected, element, message, attrFlag){

    return new Promise(function(resolve, reject) {
        if(attrFlag === 'true'){
            element.getAttribute('value').then(function(actual) {
                if (actual === expected) {
                    // console.log(message + " matched!! Actual: " + actual + " Expected: " + expected)
                    resolve(actual);
                }
                else {
                    console.log(message + " don't match! Actual: " + actual + " Expected: " + expected)
                    reject(message + 'Values dont match!');
                }
            });
        }
        else {

            element.getText().then(function (actual) {
                if (actual === expected) {
                    console.log(message + " matched!! Actual: " + actual + " Expected: " + expected)
                    resolve(actual);
                }
                else {
                    console.log(message + " don't match! Actual: " + actual + " Expected: " + expected)
                    reject(message + 'Values dont match!');
                }

            });
        }
    });
}


module.exports.getAdminUrl = getAdminUrl;
module.exports.waitForElement = waitForElement;
module.exports.isElementPresent = isElementPresent;
module.exports.verifyText = verifyText;
module.exports.waitForUrlToChange = waitForUrlToChange;

