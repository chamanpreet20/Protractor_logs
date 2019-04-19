var LoginPage=function(){
    this.userName=element(by.id('txtField'));
    this.password=element(by.id('passField'));
    this.submitbtn=element(by.css("button[type='submit']"));

this.getURL = function (url) {
    browser.get(url)
};

this.setuserName = function (name) {
    this.userName.sendKeys(name);
};

this.setPassword = function (pswd) {
    this.password.sendKeys(pswd);
};

this.submitClick=function()
{
    this.submitbtn.click();
};

this.getTitle=function()
{
    return browser.getTitle();
};

this.logintoapp=function()
{
this.getURL();
this.setuserName();
this.setPassword();
this.submitClick();
};

this.getLastEmail=function()
{
    var deferred = protractor.promise.defer();
    console.log("Waiting for an email...");

    mailListener.on("mail", function(mail){
        deferred.fulfill(mail);
    });
    return deferred.promise;
};


};
module.exports= new LoginPage();