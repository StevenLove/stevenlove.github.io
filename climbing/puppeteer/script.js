const puppeteer = require('puppeteer');
const FileReader = require('filereader');
const Papa = require('papaparse');
const fs = require('fs');
const lib = require('./lib.js');




async function searchFor(page,searchText){
    await page.goto('https://publications.americanalpineclub.org/');
    // Wait for page load
    await page.waitForSelector('#aaj');
    // Click first element
    await page.click('#aaj');
    // Click second element
    await page.click('#anac');
    // Type text into input 
    await page.type('input[name="search[keywords]"]', searchText);
    await page.keyboard.press('Enter');
    // Scroll to bottom over 2 seconds
    await lib.puppeteer.keepScrollingDown(page,2000);
}
async function parseResults(page){
    const articles = await page.$$('.article.card');
    const results = [];

    for(let article of articles) {
      const url = await article.$eval('.article-title a', link => link.href);
      const id = url.split('/articles/')[1];
    
      const titleLink = await article.$eval('.article-title a', link => link.innerHTML);
      const titleSmall = await article.$eval('.article-title small', small => small.innerHTML);
      
      const summary = await article.$eval('p.article-content', p => p.innerHTML);

      const year = await article.$eval('.details-published i', i => i.innerHTML);
    
      results.push({
        title: `${titleLink} ${titleSmall}`,
        year: year,
        summary:summary,
        id,
      });
    }
    
    return results;
}




  

async function updateCSV(filepath,results){
    let csvSet = await lib.papa.loadSetOfNthColumnFromCSV(filepath,0);
    // convert csvset tostring to display in console
    let str  = csvSet.entries();
    const newRows = []
    results.forEach(row => {
        if (!csvSet.has(row.id.toString())) {
          newRows.push([row.id, row.title, row.year, lib.collapseWhitespace(row.summary)]);
          csvSet.add(row.id); 
        }
    });

    if (newRows.length > 0) {
        const csvString = '\n'+Papa.unparse(newRows,{header:false});
        fs.appendFileSync(filepath, csvString);
    }
}


function testOnLocalFile(){
    updateCSV(
        './out/results.csv',
        [
            {id: 1, title: 'Row 1'},
            // {id: 2, title: 'World'},
            // {id:3, title:'go on...'},
            // {id:4, title:'keep going...'},
            {id: 9999, title: 'Row 9999', summary: 'This is a summary', year: 2020},
            {id: 9998, year:2020, summary: "what",title: 'Row 9999'},

        ]
    )
}

async function actuallySearchFor(searchText){
    console.log("searching for",searchText);
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await searchFor(page,searchText);
    let results = await parseResults(page);
    await updateCSV('./out/results.csv',results);
    await browser.close();
}

async function manuallyEditResultsFile(){
    let raw = await lib.papa.loadCSV('./out/results.csv');
    // go through and remove whitespace from summaries
    console.log("raw",raw);
    raw.forEach(row => {
        row[3] = collapseWhitespace(row[3]);
    });
    // write back to file
    const csvString = Papa.unparse(raw);
    fs.writeFileSync('./out/results.csv', csvString);
}


async function fillInSomeFulltexts(numberToDo){
    if(!numberToDo){ numberToDo = 5; }
    let raw = await lib.papa.loadCSV('./out/results.csv');
    // find some entries that have an ID but no fulltext
    let toFill = raw.filter(row => !row[4]);
    console.log("toFill",toFill);
    // load the page for the first two
    let ids = toFill.map(row => row[0]).slice(0,numberToDo);
    console.log("ids",ids);
    // grab the fulltext
    let fulltexts = await Promise.all(ids.map(async id => {return {
        id:id,
        fulltext:await grabFulltext(id)
    }}));
    console.log("fulltexts",fulltexts);
    // write the fulltext back to the csv
    fulltexts.forEach(obj=>{
        let row = raw.find(row => row[0] === obj.id);
        row[4] = obj.fulltext;
    });
    // write back to file
    const csvString = Papa.unparse(raw);
    fs.writeFileSync('./out/results.csv', csvString);
}

async function grabFulltext(id){
    let url = "http://publications.americanalpineclub.org/articles/"+id;
    console.log("grabbing fulltext from "+url);
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    // Wait for page load
    await page.waitForSelector('#article');
    // get the fulltext from .article
    let text = await page.$eval('#article', article => article.innerHTML);
    // remove html tags
    text = lib.removeHTMLTags(text);
    // collapse whitespace
    text = lib.collapseWhitespace(text);
    browser.close();
    return text;
}

async function updateIDWithFulltext(id,fulltext){
    let raw = await lib.papa.loadCSV('./out/results.csv');
    let row = raw.find(row => row[0] === id);
    row[4] = fulltext;
    console.log("raw",raw.slice(0,5));
    console.log("row",row)
    // write back to file
    const csvString = Papa.unparse(raw);
    fs.writeFileSync('./out/results.csv', csvString);
}

async function searchMultipleTerms(terms){
    for(let term of terms){
        await actuallySearchFor(term);
        // wait a small amount of time
        await new Promise(resolve => setTimeout(resolve, Math.random() * 5000));
    }
}

async function grabTheseFulltexts(){
    const HOW_MANY = 39;
    const DELAY_BETWEEN = 10000;
    // load CSV
    let raw = await lib.papa.loadCSV('./out/results.csv');
    // search for entries with title that includes "north carolina" case insesitive
    let nc = raw.filter(row => row[1].toLowerCase().includes("north carolina"));
    let needFulltexts = nc.filter(row => !row[4]).slice(-HOW_MANY).map(row => row[0]);
    let fulltexts = [];
    
    for(const id of needFulltexts) {
        const fulltext = await grabFulltext(id);
        fulltexts.push({id, fulltext});
        // wait a bit, but only if it's not the final iteration
        if(id !== needFulltexts[needFulltexts.length-1]){
            await new Promise(resolve => setTimeout(resolve, DELAY_BETWEEN * Math.random()));
        }
    }

    console.log("fulltexts",fulltexts)

    fulltexts.forEach(obj=>{
        let old = raw[raw.findIndex(row => row[0] === obj.id)];
        raw[raw.findIndex(row=>row[0] === obj.id)][4] = obj.fulltext
        console.log("updated",old,"to",raw[raw.findIndex(row=>row[0] === obj.id)]);
    });

    // console.log(raw);
    // // write back to file
    const csvString = Papa.unparse(raw);
    // console.log("raw",raw);
    fs.writeFileSync('./out/results.csv', csvString);

}

(async () => {
    // testOnLocalFile();
    // actuallySearchFor("north carolina");
    // searchMultipleTerms(["alabama","alaska","arizona","arkansas"]);
    // searchMultipleTerms(["california","colorado","connecticut","delaware"]);
    // searchMultipleTerms(["florida","georgia","hawaii","idaho"]);
    // searchMultipleTerms(["illinois","indiana","iowa","kansas"]);
    // searchMultipleTerms(["kentucky","louisiana","maine","maryland"]);
    // searchMultipleTerms(["massachusetts","michigan","minnesota","mississippi"]);
    // searchMultipleTerms(["missouri","montana","nebraska","nevada"]);
    // searchMultipleTerms(["new hampshire","new jersey","new mexico","new york"]);
    // searchMultipleTerms(["north dakota","ohio","oklahoma"]);
    // searchMultipleTerms(["oregon","pennsylvania","rhode island","south carolina"]);
    // wait a bit
    // searchMultipleTerms(["south dakota","tennessee","texas","utah"]);

    // searchMultipleTerms(["vermont","virginia","washington","west virginia"]);
    // await new Promise(resolve => setTimeout(resolve, Math.random() * 5000));

    // searchMultipleTerms(["wisconsin","wyoming"]);
    // manuallyEditResultsFile();
    // fillInSomeFulltexts(20);
    grabTheseFulltexts();
    // let t = await grabFulltext("13201216268");
    // updateIDWithFulltext("13201216268",t);
    // console.log("t",t);
})();
