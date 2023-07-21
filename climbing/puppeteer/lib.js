const fs = require('fs');
const Papa = require('papaparse');

function removeHTMLTags(str) {
    return str.replace(/<[^>]*>/g, '');
}

function collapseWhitespace(text) {
    return text.replace(/\s+/g, ' ');
}

let puppeteer = {
    keepScrollingDown: async function keepScrollingDown(page,duration){
        if(!duration){
          duration = 2000;
        }
        while (true) {
          console.log("scrolling...");
          previousHeight = await page.evaluate('document.body.scrollHeight');
          await page.evaluate('window.scrollTo(0, document.body.scrollHeight)');
          await page.waitForTimeout(duration);
          const currentHeight = await page.evaluate('document.body.scrollHeight');
          if (currentHeight === previousHeight) {
            // wait another duration
              await page.waitForTimeout(duration);
              const currentHeight = await page.evaluate('document.body.scrollHeight');
              if (currentHeight === previousHeight) {
                  // we're at the bottom
                  return;
              }else{
                  // keep going
                  continue;
              }
          }
        }
      }
}

let papa = {
    loadCSV: async function loadCSV(filepath){
        // console.log("loading csv from " + filepath);
        try{
            const csvData = fs.readFileSync(filepath,'utf8'); 
            // console.log("csvData",csvData)
            let parsed = Papa.parse(csvData).data.map(row => row.map(col => col.toString()));
            // console.log("parsed",parsed.slice(0,5));
            return parsed;
        }catch(e){
            console.log(e);
            return [];
        }
    },
    loadSetOfNthColumnFromCSV:async function loadSetOfNthColumnFromCSV(filepath,nth){
        let raw = await papa.loadCSV(filepath);
        let ids = raw.map(row => row[nth]);
        return new Set(ids);
    },
}

module.exports = {
    removeHTMLTags,
    collapseWhitespace,
    puppeteer,
    papa,
};