let commonActions = require('../../../Common/CommonActions.js');


function loginPage() {


    //xpath locators


    var pageHeadingText = element(by.xpath('//div[@class="bold text-center login-head"]'))
    var alert = element(by.xpath('/html/body/app-root/app-success-dialog/div/div[2]/div'))

    //css locators
    var emailTextBox = $("div:nth-child(1) > div > input")
    var passwordTextBox = $("input[formcontrolname*='password']")
    var loginButton = $("button[type*='submit']")
    var myBrandsButton = element(by.css('#secondaryMenuButton'))
    var signOutOption = element(by.css('.sign-out'))
    var googleLoginButton = element(by.css('.google-btn'))
    var unityLoginButton = element(by.css('button[class*=\'login-button\']'))
    var errorMessage = element(by.css('.msg.fixed.row.align-items-center.error'))


    //text to be matched
    var alertMessage = 'Sorry! The login credentials are not valid.'
    var pageTitleAfterLogout = 'Influencer Advertising Simplified'
    var pageTitleAfterLogin = 'Unity Influence'
    var expectedPageHeadingText = 'Log in to your Unity account'
    var urlToBeChanged = 'https://staging.unityinfluence.com/brands'


    this.blankLoginCheck = function () {
        unityLoginButton.click();
        commonActions.waitForUrlToChange('https://staging.unityinfluence.com/auth/login');
        commonActions.waitElementToBeClickable(emailTextBox);
        emailTextBox.clear();
        passwordTextBox.clear();
        browser.logger.info('Blank check verified tried clicking on Login button without filling any value in username and password')
    },

        this.wrongCredentials = function () {
            unityLoginButton.click();
            commonActions.waitForUrlToChange('https://staging.unityinfluence.com/auth/login');
            emailTextBox.clear();
            passwordTextBox.clear();
            emailTextBox.sendKeys(browser.params.WrongEmail);
            passwordTextBox.sendKeys(browser.params.Password);
            loginButton.click().then(function () {

                commonActions.waitElementToBeVisible(element(by.css('.msg.fixed.row.align-items-center.error')));
                browser.logger.info('Wrong credentials check verified using following +"\n"' + browser.params.WrongEmail + '"\n"' + '"Password:"' + browser.params.Password)
            })
        }


    this.doLogin = function (UserEmail, Password) {
        unityLoginButton.click();
        commonActions.waitForUrlToChange('https://staging.unityinfluence.com/auth/login');
        commonActions.waitElementToBeClickable(emailTextBox);
        emailTextBox.sendKeys(UserEmail);
        passwordTextBox.sendKeys(Password);
        expect(loginButton.isEnabled).toBe(loginButton.isEnabled);
        loginButton.click();


    }


    this.logOut = function () {

        commonActions.waitElementToBeClickable(myBrandsButton);
        myBrandsButton.click();
        commonActions.browserWaitForElement(signOutOption);
        signOutOption.click().then(function () {
            commonActions.waitForUrlToChange(browser.params.Url + '/')
            browser.logger.info('logOut functionality verified')
        })
    }


    this.loginWithGmail = function () {
        commonActions.waitElementToBeClickable(googleLoginButton);
        googleLoginButton.click().then(function () {
            commonActions.waitElementToBeVisible(element(by.css('input[type="email"]')));
            element(by.css('input[type="email"]')).sendKeys(browser.params.GmailAddress);
            element(by.css('#identifierNext')).click().then(function () {
                // browser.sleep(6000)
                commonActions.waitElementToBeClickable(element(by.css('input[type="password"]')));
                element(by.css('input[type="password"]')).sendKeys(browser.params.GmailPswd);
                commonActions.waitElementToBeClickable(element(by.css('#passwordNext')));
                element(by.css('#passwordNext')).click().then(function () {
                    browser.logger.info('Login with google verified');
                    commonActions.waitForUrlToChange('https://staging.unityinfluence.com/brands')

                });
            })
        })


    }

    this.getPageTitleAfterLogout = function () {

        commonActions.waitForElement(pageTitleAfterLogout);

        return pageTitleAfterLogout;
    }

    this.getLoginButton = function () {
        commonActions.waitForElement(loginButton);
        return loginButton;
    }
    this.getAlertMessage = function () {
        commonActions.waitForElement(alertMessage);
        return alertMessage;
    }

    this.getUrlToBeChanged = function () {
        commonActions.waitForUrlToChange(urlToBeChanged);
        return urlToBeChanged;

    }

    this.getPageTitleAfterLogin = function () {
        commonActions.waitForElement(pageTitleAfterLogin);
        return pageTitleAfterLogin;

    }
    this.getErrorMessage= function () {
        commonActions.waitForElement(errorMessage);
        return errorMessage;

    }

};

module.exports = new loginPage();