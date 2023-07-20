// filterWorker.js

onmessage = function(e) {

    const csvLines = e.data[0];
    const filterText = e.data[1];
  
    const filtered = filterCaseInsensitiveSecondColumn(csvLines, filterText);
    
    postMessage([getSummary(filtered), getResultsHTML(filtered)]);
  
  }
  
  function filterCaseInsensitiveSecondColumn(csvLines, filterText){
  
    var output = [];
  
    for(var i=1; i<csvLines.length; i++) {
      let cols = csvLines[i];
      let lower = cols[2].toLowerCase();
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
    const MAX = 25;
    let TOO_MANY = filtered.length > MAX;
    filtered = filtered.slice(0, MAX);
    let html = "<table>";
    for (let row of filtered) {
      html += "<tr>";
      for (let i = 2; i < 5; i++) {
        html += `<td>${row[i]}</td>`;
      }
      html += "</tr>";
    }
    if(TOO_MANY){
        html += `<tr><td colspan="3">...more...</td></tr>`;
    }
    html += "</table>";
    return html;
}