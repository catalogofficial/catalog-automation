let dataDictionary = require ('../../../Utils/DataFile.js');

function contentLibrary() {

    this.blankInvoiceDetails = function () {
        dataDictionary.sendInvoiceButton.click();
        browser.switchTo().alert().accept();
    };

    this.invalidInvoiceDetails = function () {
        dataDictionary.invoiceAmount.clear().sendKeys('-1');
        dataDictionary.sendInvoiceButton.click();
        browser.switchTo().alert().accept();
    }

    this.validInvoiceDetails = function(amount) {
        dataDictionary.invoiceAmount.clear().sendKeys(amount);
        dataDictionary.sendInvoiceButton.click();
        browser.sleep(3000);
        browser.switchTo().alert().accept();
    };

    this.verifyInvoiceEmail = function (extendedUrl) {

        let mailinatorUrl = 'https://www.mailinator.com/v3/index.jsp?zone=public&query=' + extendedUrl + '#/#inboxpane';
        browser.executeScript("return window.open(arguments[0], '_blank')", mailinatorUrl);

        browser.getAllWindowHandles().then(function (handles) {
            browser.switchTo().window(handles[1]).then(function () {
                browser.waitForAngular();
                browser.refresh();
                dataDictionary.waitForElement(dataDictionary.emailSubject);
                if(dataDictionary.emailSubject.isDisplayed()){
                    dataDictionary.emailSubject.click();
                    browser.switchTo().frame('msg_body');
                    dataDictionary.waitForElement(dataDictionary.completePaymentButton);
                    if(dataDictionary.completePaymentButton.isDisplayed()) {
                        browser.logger.info("Brand user received invoice email!!");
                    }
                }

            });
        });
    };

    this.completePaymentClick = function () {
        dataDictionary.completePaymentButton.click();
        browser.getAllWindowHandles().then(function (handles) {
            browser.switchTo().window(handles[2]).then(function () {
                browser.waitForAngular();
                browser.refresh();
                dataDictionary.waitForElement(dataDictionary.creditCardNumber);
                expect(browser.getCurrentUrl()).toContain('https://staging.catalog.cc/invoices');
                dataDictionary.brandNameOnInvoice.getText().then(function (value) {
                    if(dataDictionary.existingBrand === value){
                        dataDictionary.amountOnInvoice.getText().then(function (fees) {
                            if ('$'+dataDictionary.amount === fees) {
                                browser.logger.info('Brand name on invoice screen is ' + value + '& amount mentioned on invoice is' + fees);
                            }
                        });
                    }
                });
            });
        });
    };

    this.placeInvalidOrder = function () {

        dataDictionary.creditCardNumber.clear().sendKeys(dataDictionary.validCard);
        dataDictionary.expiryDate.clear().sendKeys(dataDictionary.invalidExpiryDate);
        dataDictionary.cvv.clear().sendKeys(dataDictionary.validCvv);
        dataDictionary.placeOrderButton.click();
        dataDictionary.waitForElement(dataDictionary.invalidCardDetailsError);
        if(dataDictionary.invalidCardDetailsError.isDisplayed()){
            browser.logger.info("User entered invalid card details)");
        }

    };

    this.placeFailedOrder = function () {

        dataDictionary.creditCardNumber.clear().sendKeys(dataDictionary.failedCard);
        dataDictionary.expiryDate.clear().sendKeys(dataDictionary.validExpiryDate);
        dataDictionary.cvv.clear().sendKeys(dataDictionary.validCvv);
        dataDictionary.placeOrderButton.click();
        dataDictionary.waitForElement(dataDictionary.errorOnFailedCard);
        //dataDictionary.waitForElement(dataDictionary.closeError).click();
        if(dataDictionary.errorOnFailedCard.isDisplayed()){
            browser.logger.info("Transaction failed!!)");
        }

    };

    this.placeValidOrder = function () {

        dataDictionary.creditCardNumber.clear().sendKeys(dataDictionary.validCard);
        dataDictionary.expiryDate.clear().sendKeys(dataDictionary.validExpiryDate);
        dataDictionary.cvv.clear().sendKeys(dataDictionary.validCvv);
        dataDictionary.placeOrderButton.click();
        dataDictionary.waitForElement(dataDictionary.paymentCompleted);
        dataDictionary.paymentCompleted.getText().then(function (message) {
            if(dataDictionary.paymentCompletedMessage === message){
             browser.logger.info("Payment made successfully!!")
            }
        });

    };

    this.placeSameOrder = function () {

        browser.refresh();
        dataDictionary.waitForElement(dataDictionary.paymentCompleted);
        dataDictionary.paymentCompleted.getText().then(function (message) {
            if(dataDictionary.paymentAlreadyMadeMessage === message){
                browser.logger.info("Payment already made!!")
            }
        });

    };

    this.viewInvoicesClick = function () {

        dataDictionary.viewInvoicesButton.click();
        browser.getAllWindowHandles().then(function (handles) {
            browser.switchTo().window(handles[1]);
            browser.refresh();
            dataDictionary.waitForElement(dataDictionary.statusOnInvoicesScreen);
            dataDictionary.statusOnInvoicesScreen.getText().then(function (status) {
                if(status === 'Paid'){
                    browser.logger.info("Invoice has been paid successfully!!");
                }
            });
            browser.close();
            browser.switchTo().window(handles[0]);
        });

    };
}


module.exports = new contentLibrary();
