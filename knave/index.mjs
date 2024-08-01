// import jsyaml from 'js-yaml';


const results = {};
async function fetchFile(name){
    const path = `./working/${name}.txt`;
    const text = await (await fetch(path)).text();
    let result = text.split("\n").map(t=>t.trim()).filter(t=>t);
    results[name] = result;
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}



document.addEventListener("DOMContentLoaded", async () => {

    const container = document.getElementById('grid-container');

    // Function to fetch and parse the YAML file
    async function fetchAndParseYAML(url) {
        const response = await fetch(url);
        const yamlText = await response.text();
        const data = jsyaml.load(yamlText);
        return data;
    }

    // Function to generate the flex grid
    function generateGrid(data) {
        for (const [category, items] of Object.entries(data)) {
            const row = document.createElement('div');
            row.className = 'row';

            const categoryCell = document.createElement('div');
            categoryCell.className = 'cell category';
            categoryCell.textContent = category;
            row.appendChild(categoryCell);

            items.forEach(item => {
                const itemCell = document.createElement('div');
                itemCell.className = 'cell';
                itemCell.textContent = item;

                fetchFile(item);
                itemCell.onpointerdown = function(){
                    let r = getRandomInt(100);
                    itemCell.innerHTML = item + '\r\n' + r+": "+(results[item][r]);
                }

                row.appendChild(itemCell);
            });

            container.appendChild(row);
        }
    }

    // Fetch the YAML data and generate the grid
    const data = await fetchAndParseYAML('sections.yaml');

    generateGrid(data);
    // Fetch the lists

});