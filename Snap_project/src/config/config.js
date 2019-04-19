const { SpecReporter } = require('jasmine-spec-reporter');  // for logs in terminal
var Jasmine2HtmlReporter = require('protractor-jasmine2-html-reporter'); //for reporting
var MailListener = require("mail-listener2"); //for reading mails
var HTMLReport = require('protractor-html-reporter');

exports.config = {
  specs: ['../testcases/login_app.spec.js'],

  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 6000000,
    print: function () { }
  },

  /* email:{
   username: "chamanpr@gmail.com",
   password: "",
   host:"imap.gmail.com",
   port: 993,
   //host: "mail.smtp.host",
  // port: 587, // imap port 
   tls: true,
   connTimeout: 10000, // Default by node-imap
   authTimeout: 5000,
   debug: console.log,
   tlsOptions: { rejectUnauthorized: false },
   mailbox: "INBOX", // mailbox to monitor 
   /*searchFilter: ["UNSEEN", "FLAGGED"], // the search filter being used after an IDLE notification has been retrieved 
   markSeen: true, // all fetched email willbe marked as seen and not fetched next time 
   fetchUnreadOnStart: true, // use it only if you want to get all unread email on lib start. Default is `false`, 
   mailParserOptions: {streamAttachments: true}, // options to be passed to mailParser lib. 
   attachments: true, // download attachments as they are encountered to the project directory 
   attachmentOptions: { directory: "attachments/" } 
   },
*/
  onPrepare: function () {
    browser.driver.manage().window().maximize();
    jasmine.getEnv().addReporter(
      new Jasmine2HtmlReporter({
        savePath: 'target/screenshots',
        fixedScreenshotName: true,
        cleanDestination: true,
        showSummary: true,
        fileName: 'Myreportname',
        FileNameSeperator: '-',
        showQuickLinks: true
      })
    );
    jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: true } }));
  },
  /*   var config = require("../config/config.js");
    // for configuring mails
     var mailListener = new MailListener(config.email);
 
   mailListener.start();
 
   mailListener.on("server:connected", function(){
       console.log("Mail listener initialized");
   });

   mailListener.on("server:disconnected", function(){
     console.log("imapDisconnected");
   });

   mailListener.on("error", function(err){
     console.log(err);
   });

   global.mailListener = mailListener;
 },  
 
 onCleanUp: function () {
   mailListener.stop();
 },*/


  onComplete: function () {
    var browserName, browserVersion;
    var capsPromise = browser.getCapabilities();

    capsPromise.then(function (caps) {
      browserName = caps.get('browserName');
      browserVersion = caps.get('version');
      testConfig = {
        reportTitle: 'Test Execution Report',
        outputPath: './',
        screenshotPath: './screenshots',
        testBrowser: browserName,
        browserVersion: browserVersion,
        modifiedSuiteName: false,
        screenshotsOnlyOnFailure: true
      };
      new HTMLReport().from('xmlresults.xml', testConfig);
    });
  }
};

