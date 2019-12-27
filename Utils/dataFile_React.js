exports.reactGlobal = {

    searchIcon : $('div.title-right > div.search > button'),
    // searchIcon : $("[class*='icon-search']"),
    productionCalendarTitle : $('div.title-left > h3'),
    titleLeft : $("[class*= 'title-left']"),
    searchTextField : $("[class*= 'input-field undefined']"),
    // searchTextField : $("[class*= 'input-wrapper input-search position-relative']"),
    fakeData : 'Caesar Salad',
    loaderOnPages :$("[class= 'loader-container-indicator']"),
    datePicker : $('#general > div:nth-child(4) > div.react-datepicker-wrapper > div > input'),
    // datePicker : $('#general > div:nth-child(4) > div > div > input[type="text"]'),
    datePickerCalendar : $('#general > div:nth-child(4) > div.react-datepicker-popper > div'),
    // datePicker : By.xpath("//input[@class='react-datepicker-ignore-onclickoutside']"),
    calendarNextButton : $('div.react-datepicker-popper > div > button'),
    datePickerCross : $("[class*='react-datepicker__close-icon']"),
    // notes : $('#general > div:nth-child(5) > textarea'),
    notes : element(by.css('[placeholder = "Write notes"]')),
    notesText : 'A good shot list maximizes shooting time n this post.',
    closeDrawer : $('button.btn.btn-close > i'),
    selectedTodayDate : $("[class*= 'react-datepicker__day--keyboard-selected react-datepicker__day--today']"),
    selectedTime : element(by.cssContainingText('[class*="react-datepicker__time-list-item"]', '21:00')),
    userProfile : $("[class*='sb-avatar__image']"),
    logoutButton : $('div.header-right.d-flex.align-items-center > div > div > div:nth-child(2)'),
    tenantDropDown : $('div.header-left.tenant-dropdown > div > button'),
    tenantSearch : $('div.header-left.tenant-dropdown > div > div > div > input'),
    noResultsPage : $('div.table-body.table-vertical-scroll'),
    username : $('div.logged-username.d-inline-block'),

    returnTenantsInDropDown : function (i){
        return $('div.header-left.tenant-dropdown > div > div >button:nth-child(' + i + ')');
    },


    expectedCategories:
        [
            "Product: Stylized Hero",
            "Product: Flatlay",
            "Product: Swatch",
            "Product: Lifestyle",
            "Product: Behind-The-Scenes",
            "Model: Lifestyle",
            "Model: Close-Up",
            "Model: E-Commerce",
            "Model: Action"

            // [
            //     "Model: Action",
            //     "Model: Behind-The-Scenes",
            //     "Model: E-Commerce",
            //     "Model: Close-Up",
            //     "Model: How-To",
            //     "Model: Lifestyle",
            //     "Product: Behind-The-Scenes",
            //     "Product: Ingredient Story",
            //     "Product: Lifestyle",
            //     "Product: Swatch",
            //     "Product: E-Commerce",
            //     "Product: Flatlay",
            //     "Product: Stylized Hero"
        ],

    setup: {
        setup1: 'P1',
        setup2: 'P2',
        setups3: 'P3',
        setup4: 'P4'
    },

    contentStatus: {
        status1 : 'Un-publish',
        status2: 'Available',
        status3: 'Free',
        status4: 'Purchased-request'
    },

    CRStatus: {
        status1: 'Draft',
        status2: 'Submitted',
        status3: 'Ship products',
        status4: 'Complete shot list',
        status5: 'Photoshoot',
        status6: 'Editing',
        status7: 'Ready'
    },

    shotStatus: {
        status1: 'Backlog',
        status2: 'Done',
        status3: 'Photoshoot',
    },
};

exports.placeholder = {
    shots : {
        product : 'Enter products',
        shotNotes : 'Enter shot notes',
        productStyling : 'Enter product styles',
        props : 'Enter props',
        propLocationNotes : 'Add notes',
        lighting : 'Lighting reference',
        shadows : 'Shadows',
        background : 'Choose colored, textured, white or original..',
        colors : 'Colors',
        cameraAngle : 'What angle you want',
        cropping : 'Select value',
        location : 'Enter location',
        addTalent : 'Add Talent',
        addPhotographer : 'Select Photographer',
        addModel : 'Select Model'
    },
},

    exports.bulkUpdate = {

        bulkActions : $('div.title-right > button'),

        selectCheckBox : function(pos) {
            checkBox = element.all(by.css('div:nth-child(1) > div > div > label > span')).get(pos);
            return checkBox;
        },

        saveCancelBackCta : function(pos) {
            saveCancelBack = element.all(by.css('div.bulk-update-panel-footer > button:nth-child(2)')).get(pos);
            return saveCancelBack;
            //pos = 1, 2, 3 in order of appearance of buttons inside the bulk update drawer
        },

        warningOnConfirmationPage : $('div.bulk-update-panel-content.read-only-state > div > spandiv > span'),

        selectFieldsToUpdate : function(index) {

            selectFields = $('div:nth-child(' + index + ') > label > span.checkbox-content');
            return selectFields;
        },

        selectEditableField : function(placeholder, pos) {
            checkBox = element(by.css('[placeholder =' + placeholder + ']')).get(pos);
            return checkBox;
        },

        selectSetup : $('#selectsetup > div > button'),
        selectStatus : $('#selectstatus > div > button'),
        colorLabel : $('div.bulk-update-panel-content.edit-state > div.color-tooltip.position-relative.tooltip-collapsed > button > span.color-tooltip-selection'),
        addTalentCta : $('div.add-more-items > button'),

    },


    exports.comments = {

        cancelCta : $('div.add-comment-actions.d-flex.align-items-center.justify-content-start > button.secondary-cta'),
        saveCta : $('div.add-comment-actions.d-flex.align-items-center.justify-content-start > button.primary-cta'),
        textArea : element(by.css('[placeholder = "Write your comments here"]')),
        lightboxTextArea : $('#comments > div > div > div > textarea'),
        testComment : "This is a test comment",
        bellIcon : $("[class*='icon-bell']"),
        closeNotificationPanel : $('div.notifications-panel-header.position-relative > button > i'),
        lightboxCrossIcon : $('div.lightbox-wrapper > i'),

        commentLightBoxFrontEnd : $('div.marker-container'),
        frontEndCommentCta : $('span.icon-comment-view'),
        previewModeFrontEnd : $('div.comment-view > button > span.icon-view-lite'),
        textAreaFrontEnd : $('app-text-area > textarea'),
        cancelCtaFrontEnd : $('button.cancel-comment'),
        addCtaFrontEnd : $('button.add-comment.app-default-button'),
        closeLightBoxFrontEnd : $('app-overlay > div > div > span'),
        userNameFrontEnd : $('div.user-name.source-san-semi'),

        returnCommentBody : function(pos) {
            commentBody = $('div:nth-child(' + pos + ') > div.comment-body');
            return commentBody;
        },

        returnCommentInNotificationPanel : function(pos) {
            notificationComment = $('div.notifications-section.new-notifications > ' +
                'div:nth-child(' + pos + ') > div.notification-content')
            return notificationComment;
        },

        returnUserNameInNotificationPanel : function(pos) {
            userName = $('div.notifications-section.new-notifications > div:nth-child(' + pos + ') > ' +
                'div.notification-header.d-flex.align-items-center > ' +
                'div.notification-header-left.d-flex.align-items-center > ' +
                'div.profile-details.d-flex.align-items-center > div.profile-name');
            return userName;
        },

        returnTagInNotificationPanel : function(pos) {
            tag = $('div.notifications-section.new-notifications > div:nth-child(' + pos + ') > span');
            return tag;
        }
    },

    exports.categories = {

        category_1 : 'Action',
        category_2 : 'E-Commerce',
        category_3 : 'Close-Up',
        category_4 : 'Lifestyle',
        category_5 : 'Behind-The-Scenes',
        category_6 : 'Lifestyle',
        category_7 : 'Swatch',
        category_8 : 'Flatlay',
        category_9 : 'Stylized Hero',

        //Without fake data
        // category_1 : 'Action',
        // category_2 : 'Behind-The-Scenes',
        // category_3 : 'E-Commerce',
        // category_4 : 'Close-Up',
        // category_5 : 'How-To',
        // category_6 : 'Lifestyle',
        // category_7 : 'Behind-The-Scenes',
        // category_8 : 'Ingredient Story',
        // category_9 : 'Lifestyle',
        // category_10 : 'Swatch',
        // category_11 : 'E-Commerce',
        // category_12 : 'Flatlay',
        // category_13 : 'Stylized Hero'
    }

exports.reactLogin = {

    userName : element(by.name('username')),
    password : element(by.name('password')),
    logInButton : $('button[type="button"]'),
    errorOnLogin : $("[class*='error']"),
    validPassword : '12345678',
    validPassword2: 'quovantis@123',
    validUser : 'quovantis1@gmail.com',
    headerLogo : $("[class*='logo']"),
    admin : 'https://admin-staging.catalog.cc/',
    loggedUser : $("[class*='logged-username d-inline-block']"),
    loggedUserName : 'Parul 1807 Adhikari',
    analyticsNavigation : $("[class*='analytics']"),
    viewCommentEmailCta : $('div:nth-child(2) > table > tbody > tr > td > table > tbody > tr > td > table > tbody > tr:nth-child(1) > td > table > tbody > tr:nth-child(3) > td > a'),

    gmailInbox : function (index) {
        inbox = element.all(by.css('[class="zA zE"]')).get(index);
        return inbox;
    }

};

exports.brands = {
    brandsTitle : 'Brands',
    createBrand : $('div.create-area > button'),
    addBrandField : element(by.css('[placeholder = "Type the brand name"]')),
    brandNotes: $('#branddetails > div:nth-child(7) > textarea'),
    brandDropDown: $('div.title-right > div.searchable-dropdown.position-relative.collapsed-dropdown > button'),
    createBrandCTA: $('div.title-right > button'),

    returnBrandField : function(pos){
        field = $('#branddetails > div:nth-child(' + pos + ') > input');
        return field;
    },

    returnBrandDropDown : function(pos){
        dropDown = $('div:nth-child(' + pos + ') > ' +
            'div > div.dropdown-display > input');
        return dropDown;
    },

    returnDropDownValue : function(pos){
        dropDownValue = $('div:nth-child(' + pos + ') > div > div.dropdown-options > ' +
            'button:nth-child(1) > div > span');
        return dropDownValue;
    },

    returnBrandNameInDrawer : function(contains){
        status = element(by.cssContainingText('div > h4', contains));
        return status;
    },
}

exports.globalPages = {

    inventoryNavigation : $("[class*='navigation-icon icon-inventory']"),
    productsTitle : 'Products',
    propTitle : 'Props',

    returnProductsPropsNavigation : function(pos){
        ProdPropNavigation = $('div.navigation-option.d-flex.align-items-center.justify-' +
            'content-center.position-relative.navigation-expanded > ' +
            'div > a:nth-child(' + pos + ') > div')
    },
}


exports.reactContentRequest = {

    crNavigation : $("[class*='content-requests']"),
    crTitle : 'Content requests',
    brandName : $('div.table-column.large-column > span:nth-child(1)'),
    crCreator : $('div:nth-child(3) > span'),
    categories : $('div:nth-child(1) > div:nth-child(3) > span'),
    status : $('div:nth-child(1) > div:nth-child(5) > span'),
    submissionDate : $('div:nth-child(1) > div:nth-child(5) > span'),
    viewShotList : $('div > div:nth-child(4) > div > a'),
    status_1 : 'Ship products',
    channel : 'Instagram',
    addNewCr : $('div.title-right > a'),
    searchFieldCR : element(by.css('[placeholder = "Search for Brands, CR ID\'s, Channel"]')),
    brandInCRListing : $('div:nth-child(1) > div:nth-child(2) > span'),

    //Edit drawer
    crId : $('div.content-request-meta.d-flex.align-items-center > h4'),
    crIDListing : $('div:nth-child(1) > div.table-column.small-column > span'),
    crStatusDropDown : $('div.content-request-controls.d-flex.align-items-center > div > button'),

    returnCRStatus : function (pos){
        CRStatus = $('div > div > button:nth-child(' + pos + ')');
        return CRStatus;
    },

    statusDropDown : $("div.content-request-controls.d-flex.align-items-center > div"),
    selectedBrand : $('div:nth-child(2) > div > div.dropdown-display > div'),
    selectedChannel : $('#general > div:nth-child(3) > div > div.dropdown-display > div:nth-child(1)'),
    channelPill : $('#general > div:nth-child(3) > div > div.dropdown-display > div'),
    deleteChannel : $('div:nth-child(3) > div > div.dropdown-display > div:nth-child(1) > i'),
    addBrand : element(by.css('[placeholder = "Select brand"]')),
    selectFilteredOption : $('div.dropdown-options > button > div > span'),
    selectFilteredOptionTwo : $('#shotdetails > div:nth-child(3) > div > div.dropdown-options > button:nth-child(2)'),
    propSelectedFilter : $('div:nth-child(6) > div > div.dropdown-options > button > div > span'),
    locationSelectedFilter : $('div:nth-child(12) > div > div.dropdown-options > button > div > span'),
    talentSelectedFilter : $('div:nth-child(4) > div > div.dropdown-options > button > div > span'),
    photographerSelectedFilter : $('div:nth-child(5) > div > div.dropdown-options > button:nth-child(1) > div > span'),
    addChannels : element(by.css('[placeholder = "Select channels"]')),
    // selectFirstChannel : $('div:nth-child(3) > div > div.dropdown-options > button:nth-child(1) > div > span'),
    selectFirstChannel : element(by.cssContainingText('span.param-name', 'Instagram')),
    crossIconSingle : $('div:nth-child(2) > div > div.dropdown-display > div > i'),
    commentButton : $('#comments > div.comment-area > button'),
    dueDateLabel : $('div.input-wrapper.null > label'),
    hambuger : $("[class='icon-vertical-hamburger']"),
    dateToBeSelected : $("[class*='react-datepicker__day--012']"),
    addShotCategory : $('#requesteditems > div > button'),
    shotCategoryDropDown : $('#requesteditems > div > div > div > div > button'),
    shotCount : $('#requesteditems > div > div > input'),
    readyStatus : $('div.content-request-controls.d-flex.align-items-center > div > div > button:nth-child(7)'),

    returnLightboxCommentButton : function(index){
        lightboxComment = element.all(by.css('#comments > div.comment-area > button')).get(index);
        return lightboxComment;
    },

    returnSelectedCategory : function (pos){
        selectedCategory = $('#requesteditems > div > div > div > div > div > button:nth-child(' + pos + ')')
        return selectedCategory
    },

    selectStatusOfCR : function(contains){
        status = element(by.cssContainingText('[class*="dropdown-item d-block "]', contains));
        return status;
    },

    returnCrActions : function(index){
        crActions = $('div.header-right.d-flex.align-items-center.justify-content-end' +
            ' > div > div > a:nth-child(' + index + ')');
        return crActions;
    },


};

exports.reactShotList = {

    //shot listing
    shotTitle : 'Shots',
    shotStatus : $('div.table-body > div:nth-child(1) > div:nth-child(4)'),

    //shot drawer
    shotStatusDrawer : $('div.shot-meta.d-flex.align-items-center > div > button'),
    dueOn : $('div:nth-child(2) > div.react-datepicker-wrapper > div > input'),
    scheduledOn : $('div:nth-child(3) > div.react-datepicker-wrapper > div > input'),
    scheduledOnCrossIcon : $('#schedule > div:nth-child(3) > div > div > button'),
    statusOfShot : $('div.shot-meta.d-flex.align-items-center > div > button'),
    backlogStatus : element(by.cssContainingText('[class*="dropdown-item d-block "]', 'Backlog')),
    doneStatus : element(by.cssContainingText('[class*="dropdown-item d-block "]', 'Done')),
    shotCategory : $('div.shot-controls.d-flex.align-items-center > div:nth-child(1) > button'),
    shotSetup : $('div.shot-controls.d-flex.align-items-center > div:nth-child(3) > button'),
    selectedCategory : $('div:nth-child(1) > div > button:nth-child(5)'),
    selectedSetup : $('div:nth-child(3) > div > button:nth-child(4)'),
    referenceImage : element(by.buttonText('Reference images')),
    navigateToSchedule : $('div.icon-navigation > a:nth-child(3)'),
    navigateToEdit : $('div.icon-navigation > a:nth-child(1)'),
    navigateToUploadShotImage : $('a[href*="#photos"]'),
    CRShotID : $('div.shot-meta.d-flex.align-items-center > h4'),
    // addNewShotDropDown : element(by.buttonText('Create new shot')),
    addNewShotDropDown : $('div.title-right > div > button'),
    notes : element(by.css('[placeholder = "Write notes"]')),
    propNotes: $('div:nth-child(7) > textarea'),
    locationNotes : $('div:nth-child(13) > textarea'),
    talentNotes : $('div:nth-child(2) > textarea'),
    modelApparelNotes : $('div:nth-child(3) > textarea'),
    addTalent : $('div:nth-child(4) > div > div.dropdown-display > input'),
    addLocation : $('div:nth-child(12) > div > div.dropdown-display > input'),
    updateCategory : $('div.shot-controls.d-flex.align-items-center > div:nth-child(1) > div > button:nth-child(3)'),
    producer : element(by.css('[placeholder = "Enter producer name"]')),

    returnSearchedProducer : function(contains) {
        searchedProducer = element(by.cssContainingText('div:nth-child(3) > div > div.dropdown-options > button:nth-child(1)',contains));
        return searchedProducer
    },

    returnproducerPill : function(contains) {
        producerPill = $('div:nth-child(3) > div > div.dropdown-display > div')
        return producerPill
    },

    removeProductOrProp : function (i, j) {
        removeProductOrProp = $('div:nth-child(' + i + ') > div > div.dropdown-display > div:nth-child(' + j + ') > i');
        return removeProductOrProp;
    },

    returnNewShotCategory : function(category){
        selectedCategoryDropDown = element(by.cssContainingText('[class*="dropdown-item d-block "]',category));
        return selectedCategoryDropDown;
    },

    returnShotDrawerFields : function(placeholder){
        shotDrawerField = element(by.css('[placeholder = "' + placeholder + '"]'));
        return shotDrawerField;
    },

    returnShotDetail : function(contains){
        shotDetail =  element(by.cssContainingText('[class="section-details"]', contains));
        return shotDetail;
    },

    returnShotNavigation : function(i){
        navigateTo = $('div.icon-navigation > a:nth-child(' + i + ')');
        return navigateTo;
    },

    returnCrossIcon : function(i){
        scheduledOnCrossIcon = $('#schedule > div:nth-child(' + i + ') > div > div > button');
        return scheduledOnCrossIcon;
    },

    returnShotIds : function(i) {

        shotID = $('div:nth-child(' + i + ') > div:nth-child(2) > span');
        return shotID;
    },

    returnShotColumn : function(i, j) {
        shotColumn = $('div:nth-child(' + i + ') > div:nth-child(' + j + ') > span');
        return shotColumn;
    },

    returnProductPill : function(i){
        shotPill = $('div:nth-child(3) > div > div.dropdown-display > div:nth-child(' + i + ')');
        return shotPill;
    },

    returnPropPill : function(i){
        propPill = $('#shotdetails > div:nth-child(6) > div > div.dropdown-display > div:nth-child(' + i + ')');
        return propPill
    },

    returnLocationPill : function(){
        locationPill = $('div:nth-child(12) > div > div.dropdown-display > div');
        return locationPill;
    },

    returnPhotographerPill : function(i){
        photographerPill = $('#talent > div:nth-child(5) > div > div.dropdown-display > div:nth-child(' + i + ')');
        return photographerPill
    },

    values : {
        fakeProduct : 'dressings',
        fakeProduct2 : 'caesar product',
        fakeProduct3 : 'Z-Automation test product',
        shotNotes : 'This is test shot notes',
        productStyling : 'This is test product styling',
        fakeProp : 'avocado',
        fakeProp2 : 'bamboo',
        fakeProp3 : 'basil leave',
        fakeProp4 : 'blender',
        propNotes : 'This is test prop notes',
        lighting : '50%',
        shadows : 'Light',
        background : 'Keep the background a little dark',
        colors : 'Red, white, yellow, blue',
        cameraAngle : '30 degrees',
        cropping : 'No cropping please',
        location : 'London Dreams',
        locationNotes : 'This is test location notes',
        talentNotes : 'This is test talent notes',
        modelApparelNotes : 'This is test model apparel notes',
        addTalent : 'Photographer',
        photographer1 : 'Jared Schlachet',
        photographer2 : 'Suzie Morales',
        photographer3 : 'Trinette Reed & Chris Gamly',
        photographer4 : 'Jennifer O’Dell',
        photographer5 : 'Danin Jacquay',
        addTalent2 : 'Model',
        model1: 'Sarah Ellis',
    }
};

exports.shotCard = {

    returnShotNumber : function(i, j) {
        shotNumber = $('section:nth-child(' + i + ') > div.swimlane-content > article:nth-child(' + j + ') > div.shot-meta > span');
        return shotNumber;
    },

    returnBrandName : function(i, j) {

        brandName = $('section:nth-child(' + i + ') > div.swimlane-content > article:nth-child(' + j + ') > div.shot-meta > h3');
        return brandName;
    },

    returnShotCategory : function(i, j){
        shotCategory = $('section:nth-child(' + i + ') > div.swimlane-content > article:nth-child(' + j + ') > div.shot-config > div > span.shot-category.d-block');
        return shotCategory;
    },



    returnShotSetup : function(i, j){
        shotSetup = $('section:nth-child(' + i + ') > div.swimlane-content > article:nth-child(' + j + ') > div.shot-config > div > span.shot-setup.d-block');
        return shotSetup;
    },

    returnShotCountInSwimlane : function(i){
        shotCount = $('section:nth-child(' +  i + ') > div.swimlane-header.d-flex.align-items-center.justify-content-between > div.swimlane-header-count > span');
        return shotCount;
    },

}

exports.kanban = {

    kanbanNavigation : $("[class*='production-board']"),
    kanbanTitle : 'Production board',
    swimlane : $("[class*='vertical-swimlane position-relative']"),


    returnDraggableElement: function (i , j) {
        draggable = $('section:nth-child(' + i + ') > div.swimlane-content > article:nth-child(' + j + ')');
        return draggable;
    },

    returnDroppableElement: function (i) {
        droppable = $('section:nth-child(' + i + ') > div.swimlane-content');
        return droppable;
    },
}

exports.productionCalendar = {

    productionCalendarNavigation : $("[class*='production-calendar']"),
    productionCalendarTitle : 'Production calendar',
    searchCalendar : $('div.input-wrapper.input-search.position-relative > input'),

    returnSpilledLine : function(index) {
        spilledLine = element.all(by.css('[class*="status-light status-red"]')).get(index);
        return spilledLine;
    },

    returnBacklogLine : function(index) {
        backlogLine = element.all(by.css('[class*="status-light status-grey"]')).get(index);
        return backlogLine;
    },

    spilledLine : $("[class*='status-light status-red']"),
    backlogLine : $("[class*='status-light status-grey']"),

    returnShotNumberOnCard : function(index) {
        shotNumberOnCard = element.all(by.css('div.shot-meta > span')).get(index);
        return shotNumberOnCard;
    },

    returnGeneralBrandOnCard : function(index){
        generalBrandOnCard = element.all(by.css('div.shot-meta > h3')).get(index);
        return generalBrandOnCard;
    },

    returnShotCardInCalendar: function (id) {
        card = element(by.xpath('//*[@id="' + id + '"]'));
        return card;
    },

    backlogCount : $('h3 > span'),
    currentSlot : $('section.timeslot.d-flex.current-slot'),

    returnShotNumberOnProductionCalendar : function(id) {
        shotNumber =  element(by.xpath('//*[@id="'+ id + '"]/div[2]/span'));
        return shotNumber;
    },

    returnCalendarSlot : function (slot){
        calendarSlot = $('section:nth-child(' + slot + ')');
        return calendarSlot;
    },
    datePickerOnCalendar : $('div.calendar-header.d-flex.align-items-center.justify-content-center > div > div > div > div > button'),
    selectedDate : element(by.cssContainingText('[class*="react-datepicker__day react-datepicker__day--018"]', '18')),
}

exports.uploadWidget = {

    uploadButton : element(by.cssContainingText('[class*="photo-widget-cta"]', "Photo widget")),
    // closeWidget : $('div.widget-header > div > button:nth-child(3)'),
    CRShotIDWidget : $('div.widget-header > h4'),
    progressLoader : $("[class*='CircularProgressbar-text']"),
    searchOnWidget : $('div.widget-header > div > div > button'),
    fileNameInWidget : $('div.content-card-filename'),
    ctaOnWidget : element(by.id('widget:onSelection')),
    selectedImageOverlay : $("[class*='content-card content-card-selected d-inline-block position-relative']"),
    loaderOnSubmitting : $("[class*='loader-container-indicator']"),
    selectsTab : element(by.cssContainingText('[class*="widget-tab"]', 'Selects')),
    captureTab : element(by.cssContainingText('[class*="widget-tab"]', 'Capture')),
    editsTab : element(by.cssContainingText('[class*="widget-tab"]', 'Edits')),
    emptyContentView : $("[class*='empty-content-title']"),
    minimizedWidget : $('#app > div > div'),
    titleOfMinimized : $('#app > div > div > h4'),
    editOriginalFirstThumbnail : $('div.original-image > div > div:nth-child(1) > img'),
    editOriginalThumbnail : $('div.photo-version-original.position-relative'),
    downloadOnHover : $("[class*='download-overlay-icon']"),
    closeOnHover : $("[class*='content-card-cancel']"),
    uniqueIDOnHover : $("[class*='content-id']"),
    commentIcon : $('div.features-wrapper > div > button > span'),
    previewMode : $("[class='comment-icon active']"),
    lightboxImage : $("[class='marker-container']"),
    textOnUploadQueue : element(by.cssContainingText('div.queue-status', '/')),
    firstPublicThumbnail : $('div.edited-versions > div > section > div:nth-child(2) > div:nth-child(1) > img'),

    returnStatusInDrawer : function(i, j){
        statusInDrawer = $('section:nth-child(' + i + ') > div.photo-version-status > div:nth-child(' + j + ') > label > span.input-radio-text');
        return statusInDrawer
    },

    returnCloseOnHover : function(index){
        closeOnHover = element.all(by.css('[class*="content-card-cancel"]')).get(index);
        return closeOnHover;
    },

    returnUniqueIDOnHover : function(index){
        uniqueIDOnHover = element.all(by.css('[class="content-id"]')).get(index);
        return uniqueIDOnHover;
    },

    returnPublicThumbnail : function(index){
        editThumbnail = element.all(by.css('div.edited-versions > div > section > div:nth-child(2) > div:nth-child(1) > img')).get(index);
        return editThumbnail;
    },

    returnEditedRawThumbnail : function(index) {
        editThumbnail = element.all(by.css('div.edited-versions > div > section > div:nth-child(1) > div:nth-child(1) > img')).get(index);
        return editThumbnail;
    },

    returnZoomIconOnThumbnail : function(index){
        zoomIcon = element.all(by.css('[class*="icon-zoom-in"]')).get(index);
        return zoomIcon;
    },

    returnFileUploadElement : function(index){
        fileUploadElement = element.all(by.css('input[type="file"]')).get(index);
        return fileUploadElement;
    },

    returnAddVersionButton : function(index){
        addVersionButton = element.all(by.css('[class*="version-cta"]')).get(index);
        return addVersionButton;
    },

    getWidgetTab : function(tab){
        widgetTab = element(by.cssContainingText('[class*="widget-tab"]', tab));
        return widgetTab;
    },

    getContentWithFileName : function(fileName){
        element = element(by.cssContainingText('[class*="content-card-filename"]', fileName));
        return element;
    },

    getThumbnailsUnderWidget : function(i){
        imageThumbnail = $('div:nth-child(' + i + ') > img');
        return imageThumbnail;
    },

    getSelectedImageCheck : function (i){
        selectedCheck = $('div:nth-child(' + i + ') > div.content-card-overlay.align-items-center.justify-content-center > span');
        return selectedCheck;
    },

    getCloseOnWidget : function(from) {
        if(from === 'Capture'){
            closeWidget = $('div.widget-header > div > button > span');
            return closeWidget;
        }
        else if(from === 'Selects' || from === 'Edits'){
            closeWidget = $('div.widget-header > div > button > span');
            return closeWidget;
        }

    },

    getMinimizeOnWidget : function(from) {

        if(from === 'Capture'){
            closeWidget = $('div.widget-header > div > button:nth-child(2)');
            return closeWidget;
        }
        else if(from === 'Selects' || from === 'Edits'){
            closeWidget = $('div.widget-header > div > button:nth-child(1)');
            return closeWidget;
        }

    },

    getMinimizedWidgetStates : function(type) {

        if(type === 'Maximize'){
            maximizeWidget = $('button:nth-child(1) > span');
            return maximizeWidget;
        }
        else if(type === 'Close'){
            closeMinimized = $('button:nth-child(2) > span');
            return closeMinimized;
        }
    },

}

exports.globalListingPage = {

    createNew : $("[class*='create-area']"),
    placeholder : element(by.css('[placeholder = "Please type "]')),
    uploadFile : $('div.add-area > button'),

    navigation : {
        location : $("[class*='icon-locations']"),
        inventory : $("[class*='icon-inventory']"),
        products : element(by.cssContainingText('[class*="navigation-submenu-item"]', 'Products')),
        props : element(by.cssContainingText('[class*="navigation-submenu-item"]', 'Props')),
        talent : $("[class*='icon-talent']"),
    },

    names : {
        location : 'Location Automation',
        products : 'Product Automation',
        props : 'Props Automation',
        model : 'Model Automation',
        photographers : 'Photographer Automation',
        manicurist : 'Manicurist Automation',
        hairMakeup : 'Hair&Makeup Automation',
        stylist : 'Stylist Automation',
        videographer :'Videographer Automation'
    },

}

