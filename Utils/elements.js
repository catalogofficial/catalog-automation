exports.reactLogin = {

    userName : element(by.name('username')),
    password : element(by.name('password')),
    logInButton : $('button[type="button"]'),
    errorOnLogin : $("[class*='error']")

};

exports.reactGlobal = {

    userProfile : $("[class*='sb-avatar__image']"),
    logoutButton : $('div.header-right.d-flex.align-items-center > div > div > div:nth-child(4)'),
    tenantDropDown : $('div.header-left.tenant-dropdown > div > button'),
    username : $('div.logged-username.d-inline-block')

};
