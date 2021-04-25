//Reference : https://pptr.dev/ & npm website pe bhi se if any thing require
const puppeteer = require("puppeteer");
console.log("Caution: work under progress don't touch");
let browser;
let page;
let code;
f();//function mein dala meine
setInterval(function(){ f(); }, 60000);
function f(){
puppeteer
  .launch({
    headless: false, // for see chromuim or not ke vo open ho ya na
    defaultViewport: null, //for full screen
    args: ["--start-maximized"], //for full screen
    //slowMo:100
  })
  .then(function (b // this run when above promise return & resolve then run
  ) {
    browser = b; //global h further use liye
    return browser.pages(); //pages function give pages and resolve and give page array
  }) //pages is tab
  .then(function (pages) {
    page = pages[0]; //global mein store for further use
    return page.goto("https://www.hackerrank.com/auth/login");
  })
  .then(function () {
    return page.type("#input-1", "fijis27069@yncyjs.com");
  })
  .then(function () {
    return page.type("#input-2", "fijis27069@yncyjs.com");
  })
  .then(function () {
    return Promise.all([
      page.click(
        ".ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled"
      ),
      page.waitForNavigation(),
    ]);
  })
  .then(function () {
    return waitClickNavigate("[title='Interview Preparation Kit']");
  })

  //warmup ke liye ye
  .then(function () {
    return waitClickNavigate("[data-attr1='warmup']");
  })
  .then(function () {
    return waitClickNavigate(
      ".ui-btn.ui-btn-normal.primary-cta.ui-btn-primary.ui-btn-styled"
    );
  })
  .then(function () {
    //warmup first challenge
    return waitClickNavigate("[data-attr2='Editorial']");
  })

  .then(function () {
    //editorial
    return handleLockBtn();
  })
  .then(function () {
    return page.evaluate(function () {
      return document.querySelector(
        ".challenge-editorial-block.editorial-setter-code pre"
      ).innerText;
    });
  })
  .then(function (data) {
    code = data;
    return page.evaluate(function () {
      return document.querySelector(
        ".challenge-editorial-block.editorial-setter-code h3"
      ).innerText;//get language like c++
    });
  })
  .then(function (title) {
    language = title.trim();//remove space by trim
    console.log(language);
    return page.click("[data-attr2='Problem']");
  })
  .then(function () {
    return pasteCode();
  })
  .then(function(){
    return browser.close();
})
  .catch(function (err) {
    return console.log(err);
  }); //return jruri
// ye function bnane ki need for editorial because one time vo unlock then second time we go we get error bcz vo alrrady unlock so we resolve it in error through catch

function pasteCode() {
    return new Promise(function (resolve, reject) {
      page
        .waitForSelector("[type='checkbox']")
        .then(function () {
          return page.click("[type='checkbox']");
        })
        .then(function () {
          return page.waitForSelector("#input-1");
        })
        .then(function () {
          return page.type("#input-1", code);
        })
        .then(function () {
          return page.keyboard.down("Control");
        })
        .then(function () {
          return page.keyboard.press("A");
        })
        .then(function () {
          return page.keyboard.press("X");
        })
        .then(function () {
          return page.click(".css-1hwfws3");
        })
        .then(function () {
          return page.keyboard.up("Control");
        })
        .then(function () {
          return page.type(".css-1hwfws3", language);
        })
        .then(function () {
          return page.keyboard.press("Enter");
        })
        .then(function () {
          return page.keyboard.down("Control");
        })
        .then(function () {
          return page.click(".monaco-editor.no-user-select.vs");
        })
        .then(function () {
          return page.keyboard.press("A");
        })
        .then(function () {
          return page.keyboard.press("V");
        })
        .then(function () {
          return page.keyboard.up("Control");
        })
        .then(function () {
          return page.click(
            ".ui-btn.ui-btn-normal.ui-btn-primary.pull-right.hr-monaco-submit.ui-btn-styled"
          );
        })
        .then(function () {
          resolve();
        })
        .catch(function (err) {
          reject(err);
        });
    });
  }
function handleLockBtn() {
  return new Promise(function (resolve, reject) {
    page
      .waitForSelector(".ui-btn.ui-btn-normal.ui-btn-primary.ui-btn-styled", {
        visible: true,
      })
      .then(function () {
        return page.click(".ui-btn.ui-btn-normal.ui-btn-primary.ui-btn-styled");
      })
      .then(function () {
        resolve();
      })
      .catch(function (err) {
        resolve();
      });
  });
}

function waitClickNavigate(selector) {
  return new Promise(function (resolve, reject) {
    page
      .waitForSelector(selector, { visible: true })
      .then(function () {
        return Promise.all([page.click(selector), page.waitForNavigation()]);
      })
      .then(function () {
        resolve();
      })
      .catch(function (err) {
        reject(err);
      });
  });
}
}