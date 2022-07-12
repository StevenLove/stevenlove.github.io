


export function getQueryObject(): Record<string,string> {
    /* parse query string into an object */
    let query = window.location.search.substring(1); // remove the ? at the beginning
    // decode uri component
    query = decodeURIComponent(query); // convert from %20 to space and %22 to "
    console.log("query",query);
    const queryObject:Record<string,string> = {};
    query.split("&").forEach(function (part) {
        if(part.includes("=")){ // normal case, something like ?disabled=true
            const [key, value] = part.split("=");
            queryObject[key] = value;
        }else{
            queryObject[part] = ""; // no =, something like ?disabled
        }
    });
    return queryObject
}

export function updateQueryString(queryObject:Record<string,string>){
    /* update the query string with the given object */
    let entries = 
    Object.keys(queryObject)
    .filter(key=>queryObject[key]!=="") // don't bother with empty string values
    .map(key=>key+"="+queryObject[key]);
    if(entries.length>0){
        window.history.pushState({},"",window.location.pathname+"?"+entries.join("&"));
    }else{
        // clear query string
        window.history.pushState({},"",window.location.pathname);
    }
}
