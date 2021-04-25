const puppeteer = require('puppeteer');

let browser;
let page;
puppeteer.launch({
        headless : false,
        defaultViewport : null,
        args: ["--start-maximized"]
    }).then(function (b) {
        browser = b;
        return browser.pages();
    }).then(function (pages) {
        page = pages[0] ;

        return page.goto("https://www.wikipedia.org/");
    }).then(function () {
        return page.type(".search-input #searchInput", "kota factory")
    }).then(function () {
        return Promise.all([
            page.waitForNavigation(),
            page.click(".pure-button.pure-button-primary-progressive")
        ]);      
    }).then(function () {
        return page.evaluate(function () {
            let titles = document.querySelectorAll(`td.summary`);
            let dateFinder = document.querySelectorAll(`tr.vevent>td[style="text-align:center"]`);
            let obj = {};
            for(let i=0; i<titles.length; i++) {
                let temp = titles[i].innerText.trim();
                let date = dateFinder[2+i*4].innerText.trim();
                obj[temp.slice(1, temp.length-1)] = date;
            }
            return obj;
        }); ``
    }).then(function (val) {
        console.log(val);
    }).then(function () {
        return browser.close();
    }).catch(function (err) {
        console.log(err);
    });