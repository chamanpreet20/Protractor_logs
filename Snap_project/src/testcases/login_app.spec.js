describe('to login to Pitchflow applicaton', function () {
    var login = require("../page-objects/login-page.page.js");
    var datav = require("../data_files/project_data.js");
    var log4js = require('log4js');
    var MailListener = require("mail-listener2");

    /*    var logger = log4js.getLogger();
        logger.level = 'debug';
        logger.debug("Some debug messages"); */

    log4js.configure({
        appenders: { logfile: { type: 'file', filename: 'log4j.log' } },
        categories: { default: { appenders: ['logfile'], level: 'debug' } }
    });

    var logger = log4js.getLogger('logfile');
    logger.debug("Some debug messages");

    //using(employee.twitterInfo, function (data, description) {

    beforeEach(function () {
        browser.waitForAngularEnabled(false);
        login.getURL(datav.datadrive.url);
        logger.info('opened the url');
    });

    it('login to application', function () {  //login to a application by entering a username and password
        var EC = protractor.ExpectedConditions;
        var buttonClickable = EC.elementToBeClickable(login.userName);
        browser.wait(buttonClickable, 5000).then(function () {
            login.setuserName(datav.datadrive.username);
            logger.info('Enter username');
            login.setPassword(datav.datadrive.password);
            logger.warn('Enter password');
            login.submitClick();
            logger.info('logged in to SNAP');
            browser.sleep(6000);
        });
        expect(login.getTitle()).toContain(datav.datadrive.pagetitle);
    }, 60000);
});

xit('connect to mail', function () {
    var mailListener = new MailListener({
        username: "chamanpr@gmail.com",
        password: "",
        host: "imap.gmail.com",
        port: 993,
        tls: true,
        tlsOptions: { rejectUnauthorized: false },
        mailbox: "INBOX",
        //markSeen: true,
        fetchUnreadOnStart: true,
        attachments: true,
        attachmentOptions: { directory: "attachments/" }
    });
    
    mailListener.start();

    mailListener.on("server:connected", function () {
        console.log("imap gmail Connected");
        logger.info('connected to gmail');
    });

    mailListener.on("server:disconnected", function () {
        console.log("imap gmail Disconnected");
        logger.info('disconnect gmail');
    });

    mailListener.on("error", function (err) {
        console.log(err);
        logger.warn(err);
    });

    mailListener.on("mail", function (mail) {
        console.log(mail);
        console.log(mail.html);

    });
    mailListener.on("attachment", function (attachment) {
        console.log(attachment);
    });
});


    /*    browser.controlFlow().await(login.getLastEmail()).then(function (email) {
            expect(email.subject).toEqual("invoice");
            expect(email.headers.to).toEqual("EVSGLOBAL@evalueserve.com");

           // extract registration code from the email message
          // var pattern = /Registration code is: (\w+)/g;
          //  var regCode = pattern.exec(email.text)[1];

          //  console.log(regCode);
            console.log(email.text);
        });
    });*/

    afterEach(function () {
         return logger.verify();
    });
//});