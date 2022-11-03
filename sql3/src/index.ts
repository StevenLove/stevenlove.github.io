const MAX_RESULTS = 1000;
const LOADING_STRING = "loading dictionary...";
const DICTIONARY_PATH = "./466kDictionary.txt";
const NO_RESULTS_STRING = "no results";

async function init() {
  let predicate = RegExp.prototype.test.bind(
    new RegExp(decodeURIComponent(document.location.search).substring(1))
  );

  document.write(LOADING_STRING);
  let results = 
    (await (await fetch(DICTIONARY_PATH)).text())
      .split("\n")
      .filter(predicate)
      .slice(0,MAX_RESULTS);

  document.write(results.join("<br>")||NO_RESULTS_STRING);
}
init();
