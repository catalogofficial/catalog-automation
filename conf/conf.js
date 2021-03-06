//let dirname = process.env['FOLDER_PATH'];

let dirname = '/var/lib/jenkins/workspace/Protractor-Automation-Test-Suite/';
let log4js = require('log4js');
let Jasmine2HtmlReporter = require('protractor-jasmine2-html-reporter');
// let nodeMailer = require('nodemailer');

exports.config = {

    directConnect: true,

    // Capabilities to be passed to the webdriver instance.
    multiCapabilities: [
        {

            'browserName': 'chrome',
            chromeOptions: {

                args: ["--headless", "--disable-gpu", "--window-size=1600x1000"]

                // {
                //     'browserName':'firefox'
                //
                //
            }
        }

    ],
//
//     params: {
// allContent    },

    // Framework to use. Jasmine is recommended.
    framework: 'jasmine2',
    suites: {
        SanitySuite: [
            //Brand Portal
            //dirname + 'e2e/FrontEnd/Spec/home.spec.js',
            dirname + 'e2e/FrontEnd/Spec/signUp.spec.js',
            //dirname + 'e2e/FrontEnd/Spec/gmail.spec.js',
            dirname + 'e2e/FrontEnd/Spec/login.spec.js',
            dirname + 'e2e/FrontEnd/Spec/brandDetails.spec.js',
            dirname + 'e2e/FrontEnd/Spec/brandChannels.spec.js',
            dirname + 'e2e/FrontEnd/Spec/shotSelection.spec.js',
            dirname + 'e2e/FrontEnd/Spec/styling.spec.js',

            //Admin Panel
            // dirname + 'e2e/Admin/Spec/adminLogin.spec.js',
            dirname + 'e2e/Admin/Spec/brandListing.spec.js',
            dirname + 'e2e/Admin/Spec/contentRequestListing.spec.js',
            // dirname + 'e2e/Admin/Spec/contentListing.spec.js',
            // dirname + 'e2e/Admin/Spec/bulkEdit.spec.js',
            // dirname + 'e2e/Admin/Spec/contentLibrary.spec.js',
            dirname + 'e2e/Admin/Spec/deleteFromAdmin.spec.js',

        ]

    },

    //helpers: ["../node_modules/jasmine-expect/index.js"],

    // Options to be passed to Jasmine.
    jasmineNodeOpts: {
        defaultTimeoutInterval: 90000
    },

    beforeLaunch: function () {
        log4js.configure({
            appenders: {
                cheeseLogs: {type: 'file', filename: 'cheese.log'},
                console: {type: 'console'}
            },
            categories: {
                cheese: {appenders: ['cheeseLogs'], level: 'error'},
                another: {appenders: ['console'], level: 'trace'},
                default: {appenders: ['console', 'cheeseLogs'], level: 'trace'}
            }
        });
    },

    onPrepare: function () {
         console.log(' set path = ' + dirname);
         console.log(dirname +'e2e/Admin/Spec');

        // For initializing the Console Logs
        browser.logger = log4js.getLogger('protractorLog4js');

        //For Url loading...
        browser.ignoreSynchronization = true;
        //browser.waitForAngularEnabled = true;
        browser.logger.info("Starting Test With Logs");
        browser.driver.manage().window().maximize();
        browser.logger.info("Url is loading....");

        //Initializing the reports
        jasmine.getEnv().addReporter(
            new Jasmine2HtmlReporter({
                savePath: dirname + 'Reports',
                takeScreenshots: true,
                takeScreenshotsOnlyOnFailures: true,
                cleanDestination: true
            })
        );
    },

    // onComplete: function () {
    //     return new Promise(function (fulfill, reject) {
    //
    //         var transport = nodeMailer.createTransport({
    //             service: 'Gmail',
    //             auth: {
    //                 user: "quovantis1@gmail.com",
    //                 pass: "quovantis@123"
    //             }
    //         });
    //
    //         var mailOptions = {
    //             from: 'quovantis1@gmail.com', // sender address
    //             to: 'parul.adhikari@quovantis.com', // receiver address
    //             subject: 'Catalog| Automation Report(Admin Panel)',
    //             //text: info.body,
    //             text: 'This email contains report generated after running the automation suite. Please find below the test result in html file attached.',
    //             attachments: [
    //                 {
    //                     'path':'/home/parul/catalog_auto/Reports/htmlReport.html'
    //                 }]
    //         };
    //
    //
    //         transport.sendMail(mailOptions, function (error, info) {
    //             if (error) {
    //                 console.log(error);
    //                 response.send(err);
    //             }
    //             else {
    //                 console.log("Message sent: " + info.response);
    //                 response.send(info);
    //             }
    //         });
    //     });
    // }
};
