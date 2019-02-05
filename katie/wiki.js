var wtf_wikipedia = require("wtf_wikipedia")

const Wiki = (()=>{
    const docs = {}
    const oneOf = arr => {
        return arr[Math.floor(Math.random()*arr.length)];
    }
    const startsWith = (str,val)=> str.indexOf(val) == 0;
    const badSections = ["See also","References",""]


    const getDecadeSection = (doc,number) => {
        number = Number(number);
        console.log("number",number);
        let decade = Math.floor(number/10)*10 +"";
        console.log("decade",decade);
        let exactMatches = doc.sections().filter(s=>s._title.indexOf(decade)>-1);
        if(exactMatches.length > 0){
            return exactMatches[0];
        }
    }
    const getCenturySection = (doc,number)=> {
        number = Number(number);
        console.log("number",number);
        let century = Math.floor(number/100)*100;
        let mil = millenium(number);
        let diff = number - mil;
        // looking for 1015 in the 1000s will be in a category like
        // 1001-1099 rather than 1000-1099.
        // but looking for 1115 in 1000s will be like
        // 1100-1199.  So we make an adjustment if we are in the first century
        if(diff < 100){
            century+=1;
        }
        century += "";
        console.log("century",century);
        let exactMatches = doc.sections().filter(s=>startsWith(s._title,century));
        if(exactMatches.length > 0){
            return exactMatches[0];
        }
    }
    const getMilleniumSection = (doc,number)=>{
        number = Number(number);
        console.log("number",number);
        let mil = millenium(number);
        let dmil = decamillenium(number);
        let diff = number - dmil;
        // looking for 1015 in the 1000s will be in a category like
        // 1001-1099 rather than 1000-1099.
        // but looking for 1115 in 1000s will be like
        // 1100-1199.  So we make an adjustment if we are in the first century
        if(diff < 1000){
            mil+=1;
        }
        mil += "";
        console.log("millenium",mil);
        let exactMatches = doc.sections().filter(s=>startsWith(s._title,mil));
        if(exactMatches.length > 0){
            return exactMatches[0];
        }
    }
    const millenium = number => {
        return Math.floor(Number(number)/1000)*1000;
    }
    const decamillenium = number => {
        return Math.floor(Number(number)/10000)*10000;

    }
    const getSentenceInList = (list,str) => {
        let sentences = list.filter(li=>startsWith(li.text,str));
        console.log("sentences",sentences,str);
        if(sentences.length>0){
            return sentences[0];
        }
        else{
            return false;
            // return getSentenceInList(list,Number(str)-1);
        }
    }
    const getSentenceInSection = (section,str) => {
        let lists = section.json().lists;
        console.log("json",section.json());
        console.log("lists",lists);
        let result = lists.reduce((acc,curr)=>{
            console.log("curr",curr);
            if(acc) return acc;
            return getSentenceInList(curr,str);
        },false);

        if(result){
            return result;
        }
        let other = oneOf(oneOf(lists));
        return {
            text:str+" is not interesting 🙁<br>"+other.text
        };
    }
    const getSectionFromDoc = (doc,number) => {
        let allSections = doc.sections()
        if(Number(number) % 100 == 0){
            let preferred = allSections.filter(s=>{
                if(startsWith(s._title,"Integers from")){
                    return false;
                }
                if(startsWith(s._title,"Selected numbers")){
                    return false;
                }
                if(s._title == ""){
                    return false;
                }
                if(s.depth > 0){
                    return false;
                }
                return true;
            })
            if(preferred.length>0){
                return oneOf(preferred);
            }
            else{
                return allSections.filter(s=>s._title=="")[0];
            }
        }
        console.log("all sections",allSections);
        let goodSections = allSections.filter(s=>{
            if(badSections.includes(s._title)){
                return false;
            }
            return true;
        });
        console.log("good sectiosn",goodSections);
        let listSections = goodSections.filter(s=>{
            let l = s.lists();
            console.log("lists",l);
            return l.length>0;
        });
        console.log("list sections",listSections);
        if(listSections.length > 0){
            return oneOf(listSections);
        }
        else if(goodSections.length > 0){
            return oneOf(goodSections);
        }
        else{
            return oneOf(allSections);
        }
    }

    const isFullArticle = (doc,number)=>{
        console.log(doc.title(),"ittle");
        return startsWith(doc.title(),number);
    }
    const validNumber = number => {
        return Math.floor(Number(number));
    }
    /* requests the wikipedia page for a number */
    const getDoc = (number) => {
        if(docs[number]){
            return new Promise((resolve,reject)=>{
                resolve(docs[number]);
            })
        }
        else{
            let url = number + "_(number)";
            if(Number(number) > 10000){
                let d = decamillenium(number);
                url = d + "_(number)";
            }
            else if(Number(number) > 1000){
                let m = millenium(number);
                url = m + "_(number)";
            }
            console.log("url",url);

            return wtf_wikipedia.fetch(url, 'en').then(doc=>{
                docs[number] = doc; // cache it
                return doc;
            })
        }
    }

    /* tries to get a section with a title that starts with the given number */
    const getExactSection = (doc,number)=>{
        let matches = doc.sections().filter(s=>{
            return startsWith(s._title,number+"")
        });
        console.log("matches",matches,number+"");
        if(matches.length>0){
            return matches[0];
        }
    }
    const getFactWTF = (number,cb) => {
        number = validNumber(number);
        console.log("number",number);

        // if(number > 1000)

        return getDoc(number).then(doc=>{
            let html;
            console.log("sections",doc.sections());

            if(isFullArticle(doc,number)){
                console.log("full article");
                let section = getSectionFromDoc(doc,number);
                html = section.html();
                console.log("html",html);
            }
            else{
                let exact = getExactSection(doc,number);
                if(exact){
                    console.log("exact section",exact);
                    html = exact.html();
                }
                else if(Number(number) < 1000){
                    let section = getDecadeSection(doc,number);
                    console.log("decade",section);
                    let sentence = getSentenceInSection(section,number+"");
                    console.log("sentence",sentence);
                    html = sentence.text;//.html();
                }
                else if(Number(number) < 10000){
                    let section = getCenturySection(doc,number);
                    console.log("century",section);
                    let sentence = getSentenceInSection(section,number+"");
                    console.log("sentence",sentence);
                    html = sentence.text;//.html();
                }
                else{
                    let section = getMilleniumSection(doc,number);
                    console.log("millenium",section);
                    let sentence = getSentenceInSection(section,number+"");
                    console.log("sentence",sentence);
                    html = sentence.text;//.html();
                }
                
            }
            cb(html);
            
        });
    }

    return({
        getFact:getFactWTF
    })
})()

module.exports = Wiki;