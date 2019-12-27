// let dirname = process.env['FOLDER_PATH'];
var dirname = '/home/parul/Protractor Automation/catalog-automation/'
var log4js = require('log4js');
var Jasmine2HtmlReporter = require('protractor-jasmine2-html-reporter');
var nodeMailer = require('nodemailer');
var readSpecs = require('./readSpecs');


exports.config = {

    directConnect: true,

// Capabilities to be passed to the webdriver instance.
    multiCapabilities: [
        {
            'browserName': 'chrome',
            chromeOptions: {

                // args: ["--headless", "--disable-gpu", "--window-size=800x600"]
                args: ['--incognito']
            }
        }

    ],

    // Framework to use. Jasmine is recommended.
    framework: 'jasmine',

    suites: {
        SanitySuite:
        //Test cases to run
            readSpecs.returnSpecs()
    },

    helpers: ["../node_modules/jasmine-expect/index.js"],

    // Options to be passed to Jasmine.
    jasmineNodeOpts: {
        defaultTimeoutInterval: 50000
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
        // For initializing the Console Logs
        browser.logger = log4js.getLogger('protractorLog4js');

        //For Url loading...
        browser.ignoreSynchronization = true;
        browser.logger.info("Starting Test With Logs");
        browser.driver.manage().window().maximize();
        browser.logger.info("Url is loading....");

        //Initializing the reports
        jasmine.getEnv().addReporter(
            new Jasmine2HtmlReporter({
                savePath: dirname + 'Reports',
                takeScreenshots: true,
                takeScreenshotsOnlyOnFailures: true,
                // cleanDestination: true
            })
        );
    },

    onComplete: function () {
        return new Promise(function (fulfill, reject) {

            var transport = nodeMailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: "quovantis1@gmail.com",
                    pass: "quovantis@123"
                }
            });

            var mailOptions = {
                from: 'quovantis1@gmail.com', // sender address
                to: 'parul.adhikari@quovantis.com', // receiver address
                subject: 'Catalog| Automation Report(Admin Panel)',
                //text: info.body,
                text: 'This email contains report generated after running the automation suite. Please find below the test result in html file attached.',
                attachments: [
                    {
                        'path':'/home/parul/Protractor Automation/catalog-automation/Reports/htmlReport.html'
                    }]
            };


            transport.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                    response.send(err);
                }
                else {
                    console.log("Message sent: " + info.response);
                    response.send(info);
                }
            });
        });
    }

};
