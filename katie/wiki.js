var wtf_wikipedia = require("wtf_wikipedia")

const Wiki = (()=>{
    const getMarkupFromAPI = (title,section,cb) => {
        console.log("using wiki API");

        
        const parseWikiResponse = obj => {
            const id = Object.keys(obj.query.pages)[0];
            var markup = obj.query.pages[id].revisions[0]["*"]
            console.log(obj,markup);
            return markup;
        }

        const request = {
            url: "https://en.wikipedia.org/w/api.php?origin=*&format=json&action=query&prop=revisions&rvprop=content&rvsection="+section+"&titles="+title,
            method: "GET",
            headers: {
                'Api-User-Agent': 'testing v1' 
            },
        }
        $.ajax(request).then(response=>{
            cb(parseWikiResponse(response));
        });
    }

    const getTitle = number => {
        const suffix = "_(number)";
        if(number <= 10){
            return number+"";
        }
        if(number < 260){
            return number+suffix;
        }
        if(number < 300){
            var roundToTen = 10*Math.floor(number / 10);
            return roundToTen+suffix;
        }
        else{
            var roundToHundred = 100*Math.floor(number/100);
            return roundToHundred+suffix;
        }
    }
    const getSection = number => {
        if(number < 260){
            return 1;
        }
        if(number == 260){
            return 0;
        }
        if(number <= 300){
            if(number % 10 == 0){ //270, 280, 290, 300
                return 1;
            }
            return number % 10 + 3;
        }
        else{ // 301 - ...
            var base = number%100;
            var numTens = Math.floor(base/10);
            return base + 4 + numTens;
        }
    }

    const parseMarkup = markup => {
        var parsed = wtf_wikipedia.plaintext(markup);
    return parsed;
    }


    const facts = {};
    const getFact = (number,cb) => {
        if(facts[number]){
            cb(facts[number]);
            return;
        }

        if(number < 10){
            getFullFacts(number,cb);
            return;
        }



        var title = getTitle(number);
        var section = getSection(number);
        console.log("title",title,"section",section);
        getMarkupFromAPI(title,section,function(markup){
            console.log("markup",markup);
            var html = parseMarkup(markup);
            facts[number] = html;
            console.log("html",html);
            cb(html);
        })
    }

    const getFullFacts = (number,cb) => {
        const title = getTitle(number);
        wtf_wikipedia.from_api(title,"en",function(obj){
            cb(wtf_wikipedia.plaintext(obj));
        })
    }

    return({
        getFact:getFact,
        parseMarkup:parseMarkup,
        getFullFacts:getFullFacts
    })
})()

module.exports = Wiki;