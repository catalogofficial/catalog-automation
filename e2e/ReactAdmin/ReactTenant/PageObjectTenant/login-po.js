var common = require ('../../Utils/common.js');
var elements = require ('../../Utils/elements.js');

function adminLogin(username, password) {

    return new Promise(function (resolve, reject) {
        browser.get(common.getAdminUrl('admin-home'));
        common.waitForElement(elements.reactLogin.logInButton);
        elements.reactLogin.userName.sendKeys(username);
        elements.reactLogin.password.sendKeys(password);
        elements.reactLogin.logInButton.click();
        browser.sleep(4000);
    });

};

module.exports.adminLogin = adminLogin;
