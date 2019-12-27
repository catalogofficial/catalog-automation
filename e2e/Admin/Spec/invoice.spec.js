let invoicePage = require('../PageObject/invoice-po');
let adminLoginPage = require('../PageObject/adminLogin-po.js');
let dataDictionary = require ('../../../Utils/DataFile.js');

describe('Verify invoice functionality', function () {

    beforeAll(function () {
    dataDictionary.getUrl('content requests');
        browser.isElementPresent(dataDictionary.emailTextBox).then( function (result) {
            if (result) {
                adminLoginPage.adminLogin();
            }
        });
        dataDictionary.selectRequestedValueInDropDown(dataDictionary.brandDropDown, dataDictionary.existingBrand);
        dataDictionary.selectDropdownbyNum(dataDictionary.paymentDropDown, 1);
        dataDictionary.editButton.click();
    });

    // afterAll(function() {
    //
    //
    //     STORE TAB HANDLES IN ARRAY LIST FOR EASY ACCESS
    //     tabs = new ArrayList<String> (browser.getWindowHandles());
    //     browser.switchTo().window(tabs.get(1));
    //
    //
    //
    //     // NOW PERFORM DESIRED TASKS WITH FIRST BROWSER IN ANY TAB
    //             for(i = 0; ; i++) {
    //                 browser.switchTo().window(tabs.get(i));
    //                 // LOGIC FOR THAT DRIVER'S CURRENT TAB
    //             }
    // });

    it('Verify alert on entering blank invoice amount', function () {
        invoicePage.blankInvoiceDetails();
    });

    it('Verify alert on entering invalid invoice amount', function () {
        invoicePage.invalidInvoiceDetails();
    });


    it('Verify alert on entering valid invoice amount', function () {
        invoicePage.validInvoiceDetails(dataDictionary.amount);
    });

    it('Verify that brand user receives invoice email', () => {
        invoicePage.verifyInvoiceEmail(dataDictionary.extendedUrl);
    });

    it('Verify clicking on Complete Payment button in invoice email takes user to the invoice generated', () => {
        expect(browser.getCurrentUrl()).toContain('#/#msgpane');
        invoicePage.completePaymentClick();
    });

    it('Verify clicking on Place your order button while entering invalid card details', () => {
        expect(browser.getCurrentUrl()).toContain('invoices');
        invoicePage.placeInvalidOrder();
    });

    it('Verify clicking on Place your order button while entering failed card details', () => {
        expect(browser.getCurrentUrl()).toContain('invoices');
        invoicePage.placeFailedOrder();
    });

    it('Verify clicking on Place your order button', () => {
        expect(browser.getCurrentUrl()).toContain('invoices');
        invoicePage.placeValidOrder();
    });

    it('Verify trying to place the same order again', () => {
        expect(browser.getCurrentUrl()).toContain('invoices');
        invoicePage.placeSameOrder();
        browser.getAllWindowHandles().then(function (handles) {
            browser.driver.close();
            browser.switchTo().window(handles[1]);
            browser.driver.close();
            browser.switchTo().window(handles[0]);
            browser.refresh();
        });
    });

    it('Verify clicking on View invoices opens another page', () => {
        expect(browser.getCurrentUrl()).toContain('admin/content/contentrequest');
        invoicePage.viewInvoicesClick();
    });



});
