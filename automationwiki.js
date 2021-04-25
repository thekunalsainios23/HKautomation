//Reference : https://pptr.dev/ & npm website pe bhi se if any thing require
const puppeteer = require('puppeteer');


let browser;
let page;

puppeteer
    .launch({
        headless: false, // for see chromuim or not ke vo open ho ya na
        defaultViewport:null,//for full screen
        args: ["--start-maximized"],//for full screen
    })
    .then(function(b) // this run when above promise return & resolve then run
    {
        browser=b;//global h further use liye
        return browser.pages();//pages function give pages and resolve and give page array
    })//pages is tab
    .then(function(pages){
        page = pages[0];//global mein store for further use
        return page.goto("https://www.google.com/");
    })
    // .then(function(){
    //     return Promise.all([
    //         page.waitForNavigation(),
    //         page.click("[data-pid='2']"),]);
    // })
    .then(function(){
        return page.type(".gLFyf.gsfi","wikipedia");
    })

    // .then(function(){
    //     return page.screenshot({path:"example.png"});
    // })
    //.LC20lb.DKV0Md
    .then(function(){
        return page.waitForSelector(".gNO89b",{visible:true});
    })
    .then(function(){
        return Promise.all([
            page.waitForNavigation(),
            page.click(".gNO89b")])
    })
    .then(function(){
        return browser.close();
    })
    .catch(function(err){
        return console.log(err);
    });//return jruri