const puppeteer = require('puppeteer');


let browser;
let page;

puppeteer
    .launch({
        headless: false, 
        defaultViewport:null,
        args: ["--start-maximized"],
    })
    .then(function(b)
    {
        browser=b;
        return browser.pages();
    })
    .then(function(pages){
        page = pages[0];
        return page.goto("https://www.wikipedia.com/");
    })
    .then(function(){
        return page.waitForSelector("#searchInput",{visible:true});
    })
    .then(function(){
        return page.type("#searchInput","kota factory");
    })
    .then(function(){
        return page.waitForSelector(".pure-button.pure-button-primary-progressive",{visible:true});
    })
    .then(function(){
        return Promise.all([
            page.waitForNavigation(),
            page.click(".pure-button.pure-button-primary-progressive")])
    })
    .then(function () {
        return page.evaluate(function () {
          return document.querySelector(
            ".div-col"
          ).innerText;
        });
      })
      .then(function (data) {
        console.log(data);})
    // .then(function(){
    //     return browser.close();
    // })
    .catch(function(err){
        return console.log(err);
    });