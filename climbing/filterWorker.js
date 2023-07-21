// filterWorker.js

onmessage = function(e) {

    const csvLines = e.data[0];
    const filterText = e.data[1];
    // console.log("csvlines",csvLines);
  
    const filtered = filterCaseInsensitiveByNthColumn(csvLines, filterText,1);
    
    postMessage([getSummary(filtered), getResultsHTML(filtered)]);
  
  }
  
  function filterCaseInsensitiveByNthColumn(csvLines, filterText, nth){
  
    var output = [];
  
    for(var i=1; i<csvLines.length; i++) {
      let cols = csvLines[i];
      let lower = cols[nth].toLowerCase();
      if(lower.includes(filterText.toLowerCase())){
        output.push(csvLines[i]);
      }
    }
  
    return output;
  
  }

  function getSummary(filtered){
    return `Found ${filtered.length} rows`;
  }

  function getResultsHTML(filtered){
    const MAX = 150;
    let TOO_MANY = filtered.length > MAX;
    filtered = filtered.slice(0, MAX);
    let html = `<table>`;
    // ensure we loop over every row of filtered in order
    for(let i=0; i<filtered.length; i++){
    let row = filtered[i];
      html += `<tr id=${row[0]}>`;
      html += `<td>${row[1]}<br>Published <span style="font-size:1.5em">${row[2]}</span></td>`;
    //   html += `<td>${row[2]}</td>`;
      if(row[4]){
        html += `<td class="summary hasfulltext">${row[3]}<a href='#0'>[expand]</a></td>`;
      }else{
        html += `<td class="summary nofulltext">${row[3]}<a href='http://publications.americanalpineclub.org/articles/${row[0]}'>[link to source]</a></td>`;
      }
      html += "</tr>";
    }
    if(TOO_MANY){
        html += `<tr><td colspan="3">...more...</td></tr>`;
    }
    html += "</table>";
    return html;
}