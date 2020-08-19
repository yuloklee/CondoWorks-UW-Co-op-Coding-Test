const path = require("path");
const puppeteer = require('puppeteer');

(async () => {
               //Function to click button based purely on text
               const clickText = (text) => {
                 return page.evaluate(
                   (text) =>
                     [...document.querySelectorAll("*")]
                       .find((e) => e.textContent.trim() === text)
                       .click(),
                   text
                 );
               };

               //Initialize browser
               const browser = await puppeteer.launch({
                 headless: false,
                 slowMo: 100,
                 defaultViewport: null,
               });

               const page = await browser.newPage();

               //Initializing download path for the PDF
               const downloadPath = path.resolve("./");
               await page._client.send("Page.setDownloadBehavior", {
                 behavior: "allow",
                 downloadPath: downloadPath,
               });
            
               //Enter login page
               await page.goto("https://app-dev.condoworks.co", {
                 waitUntil: "networkidle2",
               });

               //Logging in
               await page.waitFor("input[name=Email]");
               await page.$eval(
                 "input[name=Email]",
                 (el) => (el.value = "coop.test@condoworks.co")
               );
               await page.$eval(
                 "input[name=Password]",
                 (el) => (el.value = "MyTesting711")
               );
               await page.click('input[type="submit"]');

               //Navigate to invoices page
               await page.click("body > nav > button");
               await clickText("Invoices");
               await page.click(
                 "#navbarNavDropdown > ul.navbar-nav.mr-auto > li > div > a:nth-child(1)"
               );

               //Enter invoice number "123"
               await page.waitFor('input[id="gs_invoices.InvoiceNumber"]');
               await page.$eval(
                 'input[id="gs_invoices.InvoiceNumber"]',
                 (el) => (el.value = "123")
               );

               //Enter invoice page for invoice #123444
               await page.waitFor("#\\32  > td:nth-child(1) > a > button");
               await page.click("#\\32  > td:nth-child(1) > a > button");

               //Download invoice
               await page.waitFor(
                 "#thumb-InvoiceFile-init-0 > div.file-thumbnail-footer > div.file-actions > div > a"
               );
               await page.click(
                 "#thumb-InvoiceFile-init-0 > div.file-thumbnail-footer > div.file-actions > div > a"
               );
                
               //Output path to invoice file
               console.log("Path to downloaded invoice file: " + downloadPath + "\\Invoice file.pdf")
             })();
