# Overview
This project is a simple tool to help play the game, Knave. Knave is a rules-light OSR game by Ben Milton. It is available at https://questingbeast.itch.io/knave-second-edition. This tool allows you to retrieve a random value from one of the various tables in the game with a single tap. 


# Typical Usage
Go to http://stevenlove.github.io/knave/
Click on any button to get a new random value from the corresponding table.
For instance, the first button is labeled 'Careers' and corresponds to a table in the Knave book of 100 different careers. After clicking the button you'll see a random career name and the associated items for the career. The random number (1-100) is also displayed in case you want it.



# Customization
If you want to make changes to this tool, you'll have to do some local development

## Local Development
Clone the repo \
Install node.js \
Install dependencies with `npm install` \
Run a local web server with `npx http-server .` \
Navigate to `http://localhost:8080/` in your browser to see the page

## Likely Changes
 - Reorder the buttons by modifying `sections.yaml`
 - Manually add tables to the `tables/` directory. This requires modifying `sections.yaml` as well to describe where the table should go.
 - If you have a table that you'd like to add, but the format isn't quite right, you can make use of the script, `process.mjs`. It reads the contents of your clipboard and searches for a series of numbers from 1 to 99 and then 00 and captures the contents between those numbers and outputs it to a new file in the `processed/` directory. This helped me copy tables from the Knave pdf and convert them into the simple text files that you see in the `tables/` directory. About 80% of the tables required no further editing after running this script. The other 20% required some manual editing.


