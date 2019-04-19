var CreateProject = function () {
this.linkText1=element(by.linkText('New Project'));


//for clicking new project link case

this.clickLinktext=function()
{
    this.linkText1.click();
};
};
module.exports=new CreateProject();