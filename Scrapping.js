const pandas = require('pandas');
const puppeteer = require('puppeteer');
const fs = require('fs');
const fetch = require('node-fetch');

corr = [[46.784485, -71.255592], 
        [46.811999, -71.206312]]

scrapeData(corr)
async function scrapeData(arr) {
    for (var i = 0; i < arr.length - 1; i++) {
        longtitude_start = arr[i][1]
        latitude_start = arr[i][0]
        longtitude_end = arr[i + 1][1]
        latitude_end = arr[i + 1][0]
        Months = ["January", "February", "March", "April", "May", "June", "July", "August", "sebtember", "October", "November", "Decemeber"]
        const url_Janauary = "https://www.google.com/maps/dir/" + latitude_start + "," + longtitude_start + "/" + latitude_end + "," + longtitude_end + "/data=!3m1!4b1!4m6!4m5!2m3!6e0!7e2!8j1640995200!3e0"
        const url_February = "https://www.google.com/maps/dir/" + latitude_start + "," + longtitude_start + "/" + latitude_end + "," + longtitude_end + "/data=!3m1!4b1!4m6!4m5!2m3!6e0!7e2!8j1643673600!3e0"
        const url_March = "https://www.google.com/maps/dir/" + latitude_start + "," + longtitude_start + "/" + latitude_end + "," + longtitude_end + "/data=!3m1!4b1!4m6!4m5!2m3!6e0!7e2!8j1646092800!3e0"
        const url_April = "https://www.google.com/maps/dir/" + latitude_start + "," + longtitude_start + "/" + latitude_end + "," + longtitude_end + "/data=!3m1!4b1!4m6!4m5!2m3!6e0!7e2!8j1648771200!3e0"
        const url_May = "https://www.google.com/maps/dir/" + latitude_start + "," + longtitude_start + "/" + latitude_end + "," + longtitude_end + "/data=!3m1!4b1!4m6!4m5!2m3!6e0!7e2!8j1651363200!3e0"
        const url_June = "https://www.google.com/maps/dir/" + latitude_start + "," + longtitude_start + "/" + latitude_end + "," + longtitude_end + "/data=!3m1!4b1!4m6!4m5!2m3!6e0!7e2!8j1654041600!3e0"
        const url_July = "https://www.google.com/maps/dir/" + latitude_start + "," + longtitude_start + "/" + latitude_end + "," + longtitude_end + "/data=!3m1!4b1!4m6!4m5!2m3!6e0!7e2!8j1656633600!3e0"
        const url_August = "https://www.google.com/maps/dir/" + latitude_start + "," + longtitude_start + "/" + latitude_end + "," + longtitude_end + "/data=!3m1!4b1!4m6!4m5!2m3!6e0!7e2!8j1659312000!3e0"
        const url_Sebtember = "https://www.google.com/maps/dir/" + latitude_start + "," + longtitude_start + "/" + latitude_end + "," + longtitude_end + "/data=!3m1!4b1!4m6!4m5!2m3!6e0!7e2!8j1661990400!3e0"
        const url_October = "https://www.google.com/maps/dir/" + latitude_start + "," + longtitude_start + "/" + latitude_end + "," + longtitude_end + "/data=!3m1!4b1!4m6!4m5!2m3!6e0!7e2!8j1664582400!3e0"
        const url_November = "https://www.google.com/maps/dir/" + latitude_start + "," + longtitude_start + "/" + latitude_end + "," + longtitude_end + "/data=!3m1!4b1!4m6!4m5!2m3!6e0!7e2!8j1667260800!3e0"
        const url_Decemeber = "https://www.google.com/maps/dir/" + latitude_start + "," + longtitude_start + "/" + latitude_end + "," + longtitude_end + "/data=!3m1!4b1!4m6!4m5!2m3!6e0!7e2!8j1669852800!3e0"
        urls = [url_Janauary, url_February, url_March, url_April, url_May, url_June, url_July, url_August, url_Sebtember, url_October, url_November, url_Decemeber]
        for (let index = 3; index < urls.length; index++) {
            const browser = await puppeteer.launch({ headless: true });
            const page = await browser.newPage();
            await page.goto(urls[index]);
            const secondButtonSelector = `span > button.oafJhe `;
            let data = [];
            for (let j = 0; j < 31; j++) {
                await page.click(secondButtonSelector);
                for (let h = 0; h < 98; h++) {
                    console.log(`this is the submition of hour + ${h} in the day + ${j +1 } for the semgent ${i + 1} in Month : ${Months[index]}`)

                    await page.click('button.oafJhe');
                    const time = await page.waitForSelector('input.LgGJQc');
                    const element = await page.waitForSelector('.MespJc');
                    const day = await page.waitForSelector('.O4EvX');

                    const text = await page.evaluate(el => el.textContent, element);
                    const currentTime = await page.evaluate(el => el.value, time);
                    const currentDay = await page.evaluate(el => el.textContent, day);

                    data.push({
                        day: currentDay,
                        time: currentTime,
                        details: text
                    });
                    fs.writeFile("ULaval_OldQuebec_/" + Months[index] + ".txt", JSON.stringify(data), err => {
                        if (err) throw err;
                        console.log('Data has been saved to data.txt file.');
                    });
                }
            }

        }

    }
    await browser.close();
}












