// import jsyaml from 'js-yaml';


const results = {};
async function fetchFile(name) {
  const path = `./tables/${name}.txt`;
  const text = await (await fetch(path)).text();
  let result = text
    .split("\n")
    .map((t) => t.trim())
    .filter((t) => t);
  results[name] = result;
}


function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("grid-container");

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
    
        const overallRow = document.createElement("div");
        overallRow.className = "overallRow";
        container.appendChild(overallRow);

        const categoryContainer = document.createElement("div");
        categoryContainer.className = "categoryContainer";

        fetch(`./background_images/${category}.webp`).then((response) => {
          if (response.ok) {
            const bg = document.createElement("div");
            bg.className = "background";
            bg.style.backgroundImage =
              `url(./background_images/${category}.webp)`.replace(/ /g, "%20");
            itemsRow.appendChild(bg);
          }
        });

        const categoryCell = document.createElement("div");
        categoryCell.className = "cell category";
        categoryCell.textContent = category;
        categoryContainer.appendChild(categoryCell);
        overallRow.appendChild(categoryContainer);

        const itemsRow = document.createElement("div");
        itemsRow.className = "itemsRow";

        items.forEach((item) => {
          const itemCell = document.createElement("div");
          itemCell.className = "cell item";
          itemCell.textContent = item;

          fetchFile(item);
          itemCell.onpointerdown = function (event) {
            let r = getRandomInt(100);
            itemCell.innerHTML = item + "\r\n" + results[item][r];
          };

          itemsRow.appendChild(itemCell);
        });

        overallRow.appendChild(itemsRow);
    }
    // Add touch event listeners to ensure smooth scrolling
    document.querySelectorAll(".cell").forEach((cell) => {
      cell.addEventListener("touchstart", handleTouchStart, { passive: true });
      cell.addEventListener("touchmove", handleTouchMove, { passive: true });
      cell.addEventListener("touchend", handleTouchEnd, { passive: true });
    });

    // Variables to store touch positions
    let startX, startY;

    // Handle touch start
    function handleTouchStart(event) {
      startX = event.touches[0].clientX;
      startY = event.touches[0].clientY;
    }

    // Handle touch move
    function handleTouchMove(event) {
      const moveX = event.touches[0].clientX;
      const moveY = event.touches[0].clientY;

      // Calculate the distance moved
      const diffX = Math.abs(moveX - startX);
      const diffY = Math.abs(moveY - startY);

      // Allow scrolling if movement is detected
      if (diffX > 5 || diffY > 5) {
        event.preventDefault();
      }
    }

    // Handle touch end
    function handleTouchEnd(event) {
      // No special action needed on touch end
    }
  }

  // Fetch the YAML data and generate the grid
  const data = await fetchAndParseYAML("sections.yaml");

  generateGrid(data);
  // Fetch the lists
});