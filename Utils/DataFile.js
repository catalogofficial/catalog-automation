exports.dataDictionary = {

    //General admin panel info
    adminUrl: "https://api-staging.catalog.cc/admin/",
    brandsUrl: "https://api-staging.catalog.cc/admin/brand/brand/",
    contentRequestsUrl: "https://api-staging.catalog.cc/admin/content/contentrequest/",
    userUrl : 'https://api-staging.catalog.cc/admin/user/user/',
    homeUrl : "http://staging.catalog.cc",
    loginUrl: "https://staging.catalog.cc/auth/login",
    adminEmail: "development@unityinfluence.com",
    adminPassword: "D3v3l0pm3nt",
    adminLogOut : $('a:nth-child(5)'),
    existingBrand: "Automation Brand : Do not Touch",
    existingBrandId: "401",
    orderTypeForPaymentReceived: "1",
    orderTypeForPaymentNotReceived: "2",
    paidContentRequest: "997",
    unPaidContentRequest: "999",
    saveAndContinueButton : $('input[type="submit"]:nth-child(4)'),
    saveButton : $('input[type="submit"]:nth-child(3)'),
    save : $('#user_form > div > div > input.default'),
    status1: "Un-published",
    status2: "Free",
    status3: "Available",
    status4: "Purchased with the request",
    brandAdmin: "brijesh.kumar@quovantis.com",
    brandPassword: "12345678",

    //Common page elements
    searchTextBox : $('#searchbar'),
    searchButton : $('#changelist-search > div > input[type="submit"]:nth-child(3)'),
    successMessage : $("[class*='success']"),
    warning : $("[class*='warning']"),
    error : $("[class*='error']"),

    //Admin login page
    emailTextBox : element(by.id('id_username')),
    passwordTextBox : element(by.id('id_password')),
    loginButton : element(by.xpath('.//*[@type=\'submit\']')),
    contentOnAdminHome : $('#content-main'),

    //Tenant page
    headerOnTenantPage : element(by.cssContainingText('#content > h1', 'Add tenant')),
    tenantNameTextField : $("#id_name"),
    tenantName : 'Automation Tenant',

    //User page
    headerOnUserPage : element(by.cssContainingText('#content > h1', 'Add user')),
    firstNameTextField : $("#id_first_name"),
    firstName : "Parul Automation",
    emailTextField : $("#id_email"),
    passwordTextField : $("#id_password1"),
    confirmPasswordTextField : $("#id_password2"),
    tenantDropDown : $("#select2-id_tenant-container"),
    searchTenant : $("[class='select2-search__field']"),
    searchResult : $("[class*='select2-results__option--highlighted']"),
    searchResultUserListing : $('th > a'),
    adminAccessFlag : $('#id_admin_access'),

    //Brand listing page
    brandsLink : $('tr.model-brand > th > a'),
    textOnBrandsListing : $('#content > h1'),
    brandLink : $('#result_list > tbody > tr > th > a'),
    brandName : $("#id_name"),
    createOnFrontEndButton : $('div.form-row.field-content_requests > div > div > a:nth-child(1)'),
    viewOnAdminButton : $('div.form-row.field-content_requests > div > div > a:nth-child(2)'),
    viewContentLibraryLink : $('#content_library_id_514'),

    //Content request listing page
    actionDropDown : $('label > select'),
    contentRequestLink : $('tr > th > a.button'),
    paymentDropDown : $('ul.admin-filter-paymentreceived > li > select'),
    statusOfContentRequest : $('[class="field-status"]'),
    idOfContentRequest : $('[class="field-id"]'),
    editButton : $('#result_list > tbody > tr > th > a.button'),
    brandDropDown : $('ul.admin-filter-brandname > li > select'),

    //Content request detail page
    firstRequestedShotType : $('#id_requestcontentitem_set-0-content_category'),
    shotDropDown : $('#category_type'),
    uploadLink : $('#upload_contents'),
    viewContentLink : $('#view_contents'),
    orderLink : $('div.form-row.field-order > div > div > a'),
    paymentReceivedFlag : $('#id_payment_received'),

    //Upload content screen
    addFileButton : $('div.ui-fileupload-buttonbar.ui-widget-header.ui-corner-top > span'),
    uploadButton : $('button:nth-child(2)'),
    progressBar : $('div.custom-progress > p-progressbar > div > div.ui-progressbar-value.ui-progressbar-value-animate.ui-widget-header.ui-corner-all'),
    crossIcon : $('div:nth-child(4) > button > span.ui-button-icon-left.ui-clickable.fa.fa-fw.fa-close'),
    fileElement : element(by.css('input[type="file"]')),
    successMessageAfterUpload : element(by.cssContainingText('[class*="sub-text small-text text-center"]', 'You’ve successfully uploaded content. You can exit this page now.')),

    //Content listing page
    firstEditLink : $('tr:nth-child(1) > td.field-file > div > a:nth-child(3)'),
    action : $('label > select'),
    goButton : $('div.actions > button'),
    selectAll : $('#action-toggle'),
    deleteButton : $('input[type="submit"]:nth-child(4)'),
    statusColumn : $('tr:nth-child(1) > td.field-status'),
    idOfContent : $('tr:nth-child(1) > th > a'),

    //Content detail page
    statusDropDown : $('#id_status'),

    //Order page
    orderID : $('div.form-row.field-id > div > div'),

    //Content Library (front-end)
    brandDropDownOnFrontEnd : $('app-searchable-dropdown > div > button'),
    closeDownloadDrawer : $('app-download-drawer > div > span'),
    originalImage : $('div:nth-child(1) > label > span.checkmark-text.source-san'),
    imageThumbnail : $('ngxmasonryitem > img'),
    downloadImage : $('div.lightbox-information-action > button > span.icon-download-content'),
    contentComponent : $('ngx-masonry > ngxmasonryitem:nth-child(1) > div'),
    freeTag : $('div.status-tag.text-center.source-san-semi.animated.delay-2s.fadeIn.free'),
    freeContentId : $('ngxmasonryitem:nth-child(1) > div > div.overlay-metadata > p'),
    availableContentId : $('ngxmasonryitem:nth-child(2) > div > div.overlay-metadata > p'),
    downloadedContentID : $('ngxmasonryitem:nth-child(3) > div > div > p'),
    downloadButton : $("[class*='brick-action brick-action-download']"),
    addToCart : $("[class*='brick-action brick-action-add']"),
    contentCategory : $("[class*='content-category rubik-semibold']"),
    contentId : $("[class*='content-code source-san']"),
    brandDropDownOption :  $("[class*='dropdown-trigger rubik-semibold d-block']"),
    createBrand : $("[class*='static-area-item d-block w-100']"),
    searchForBrand : $('div.search-area.source-san.position-relative > input'),
    brandNameToSearch : 'Verlie',
    filteredResult : $('div.listing-area.source-san-semi.position-relative > button'),
    filterButton : $("[class*='btn filter-btn']"),
    applyFilter : $('div.filter-list-btn.align-items-center > button.app-default-button'),
    contentID : $('ngxmasonryitem:nth-child(1) > div.grid-brick-overlay.align-items-end.justify-content-between.animated.slideInUp > div.overlay-metadata > p'),
    clearFilter : $("[class*='filter-options-clear']"),
    zoomIcon : $('span.icon-zoom'),

    returnImageOnLibrary : function(index){
        imageThumbnail = $("ngxmasonryitem:nth-child(" + index + ")");
        return imageThumbnail;
    },


    returnContentID : function(index) {
        contentID = $('ngxmasonryitem:nth-child(' + 1 + ') > div.grid-brick-overlay.align-items-end.justify-content-between.animated.slideInUp > div.overlay-metadata > p');
        return contentID;
    },

    returnFilterOptions : function(filter) {
        filterOption = element(by.cssContainingText('[class="checkmark-name"]', filter));
        return filterOption;
    },



    //Function to get different admin URLs based on screens
    getAdminUrl: function (type) {
        switch (type) {
            case 'admin': browser.get(this.adminUrl);
                break;

            case 'brands': browser.get(this.brandsUrl);
                break;

            case 'user' : browser.get(this.userUrl);
                break;

            case 'content requests': browser.get(this.contentRequestsUrl);
                break;

            default:  browser.logger.info("Unknown Url type");
        }

    },

    //Drop-down function
    selectDropdownbyNum: function ( element, optionNum ) {
        if (optionNum){
            var options = element.all(by.tagName('option')).then(function(options){
                options[optionNum].click();
            });
        }
    },

    //Get texts of elements
    getTextOfElement: function(element) {
        element.getText().then(function (value) {
            browser.logger.info('Value of elements is: ' + value);
            return value;
        })
    },

    //Click on given element
    clickOnElement : function (element) {
        element.click();
    },

    //Select a value from drop-down
    selectRequestedValueInDropDown : function (element, value) {

        element.sendKeys(value);
    },

    //Check multiple checkboxes
    selectMultipleChecks : function (array) {


        for (i=0; i<array.length; i++) {
            let checkBox = $('tr:nth-child('+array[i]+') > td.action-checkbox > input');
            checkBox.click();
        }
    },

    getDropDownValues : function (element, tag) {
        var values = element.all(by.tagName(tag)).getAttribute('value').then(function (values) {
            browser.logger.info(values);
            return values;
        })
    },

    //Wait for element
    waitForElement :function (elem) {

        var EC = protractor.ExpectedConditions;
        browser.wait(EC.visibilityOf(elem), 20000, "Element was not visible!");
    },

    waitForUrlToChange: function waitForUrlToChange(expectedUrl) {


        const EC = protractor.ExpectedConditions;
        browser.wait(EC.urlContains(expectedUrl),40000);
    },

    getBrandUrl: function (type) {
        switch (type) {
            case 'home': browser.get("https:/staging.catalog.cc/home");
                break;

            case 'login': browser.get(brandUrl.login);
                break;

            case 'content requests': browser.get(this.contentRequestsUrl);
                break;

            default:  browser.logger.info("Unknown Url type");
        }

    },

};

exports.brandUrl = {

     home : "staging.catalog.cc/home",


};

exports.loginPage = {

    scrollToSection : $('div.steps-section-header.text-center > h3'),
    topHeaderOnScroll : $('div.email-header.email-form-header.email-form-header-show'),
    photographersButtonOnHome : element(by.cssContainingText('#btn-login > button', 'Photographers')),
    loginOnHome : element(by.cssContainingText('#btn-login > button', 'Log In')),
    pageHeading : $('div.onboarding-form-header.text-center > h3'),
    headingText : "Log in to your Catalog Account",
    emailTextBox : $("input[formcontrolname*='email']"),
    passwordTextBox : $("input[formcontrolname*='password']"),
    loginOrSignUpButton : $('form > button'),
    errorOnLogin : $("[class*='msg fixed row align-items-center error']"),

};

exports.signUpPage = {

    signUpButtonOnHome : $('div.hero-primary-action.text-center > a'),
    headingText : "Create an account",
    nameTextBox : $("input[formcontrolname*='name']"),
    getPhotosButton : $('li:nth-child(2) > a > button'),
    termsAndConditionsCheckBox : $('label > span'),
    existingUser: 'parul.adhikari@quovantis.com',
    userPassword : '12345678',
    invalidPasswordError : element(by.cssContainingText('[class*="error-dialogue source-san"]', 'Please make sure you follow the guidelines.')),
    existingUserError : element(by.cssContainingText('[class*="error-dialogue source-san"]', 'Sorry! User with this email already exists!')),
};

exports.brandDetails = {

    contactUs : $("[class='contact-options-open']"),
    closeContactUs : $('div.text-right.contact-options-toggle-wrapper > div'),
    userProfileDropDown : $('div.brand-image'),
    signOutOption : $('a > div'),
    websiteName : $("input[formcontrolname*='website']"),
    brandInstagramHandle : $("input[formcontrolname*='instagramHandle']"),
    brandCategory : $('div:nth-child(2) > label > input[type="radio"]'),
    continueButton : $("[class*='app-default-button submit-button']"),
    errorOnBrandDetail : $("[class*='error-dialogue']"),
    channelSelection1 : $('div:nth-child(1) > label > div'),
    channelSelection2 : $('div:nth-child(2) > label > div'),
    shotCards : $("[class*='icon-plus']"),
    };

exports.shotScreen = {

    continueOnShots : $('div.shot-selection-action.text-center > div > button'),
    productTextBox : $('#name > div > ul > li > input'),
    crossOnProductTag : $("[class*='ui-chips-token-icon fa fa-fw fa-close']"),
    //allshots : div:nth-child(7) > div > div.shot-card-details > div > div.row.no-gutters.align-items-top > div.col-6.text-right > div > button.toggle-plus > span

    shotPlus1 : $('div:nth-child(1) > div > div.shot-card-details > div > div.row.no-gutters.align-items-top > div.col-6.text-right > div > button.toggle-plus > span'),
    shotPlus2 : $('div:nth-child(4) > div > div.shot-card-details > div > div.row.no-gutters.align-items-top > div.col-6.text-right > div > button.toggle-plus > span'),
    shotMinus : $('div:nth-child(1) > div > div.shot-card-details > div > div.row.no-gutters.align-items-top > div.col-6.text-right > div > button.toggle-minus > span'),
};

exports.stylingScreen = {

    continueOnStyling : $('div.styling-actions > div > div > button'),
    creativeSuggestions : $('div:nth-child(2) > div > div:nth-child(1) > div > textarea'),
    creativeSuggestionsText : 'Play With Shapes',
    files:{
        pdfFile : 'samplepdf.pdf',
        jpgFile1 : 'test1.jpeg',
        jpgFile2 : 'test2.jpeg',

    },
    colorSelection : 'div > div:nth-child(5) > label',
    favoriteInstagramHandle : $('div.ng-pristine.ng-valid.ng-touched > div > div > div > input'),
    favoriteInstagramHandleText : 'https://www.instagram.com/mamabunch/',
    onlineBlogs : $('div:nth-child(2) > div > div > div > input'),
    onlineBlogsText : 'https://www.wpbeginner.com/beginners-guide/how-to-choose-the-best-blogging-platform/',
    pinterestBoards : $('div:nth-child(3) > div > div > div > input'),
    pinterestBoardsText : 'https://www.postplanner.com/pinterest-board-name-ideas-to-get-more-clicks-pins-followers/',
    brandedWebsites : $('div:nth-child(4) > div > div > div > input'),
    brandWebsitesText : 'https://in.puma.com/',
    loaderOnStyling : $('app-loader > div > img'),
    headingOnPayment : $('div > h3'),
};

exports.gmail = {

    continueWithGmailButton : $('button.app-default-button.google-button.source-san-semi.w-100'),
    gmailTextBox : $('input[type="email"]'),
    gmailNextButton : $('#identifierNext'),
    gmailPasswordTextBox : $('input[type="password"]'),
    passwordNextButton : $('#passwordNext'),
    gmailEmail : 'quovantis1@gmail.com',
    gmailPassword: 'quovantis@123',
};




