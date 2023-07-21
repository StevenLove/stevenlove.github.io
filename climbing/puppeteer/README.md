script.js contains code to scrape the american alpine club's website for climbing accident reports. It uses puppeteer to do this. 
We can't search the site for every single accident, so instead I search for each state one at a time and store the values in a CSV file.
We get about 50 results in a search, and then have to scroll down to the bottom of the page to get the next 50 results.
puppeteer does a great job of simulating this user input

Unfortunately, we don't get the full text description of the accident from these search results.
So there's a separate procedure to take some of the accidents, look at their IDs, and go request the full text of the accident.
So script.js has some functions that are for the first step, grabbing the overview of the accident, and then there's a separate script that is for the second step, grabbing the full text of the accident.

out/results.csv has a mixture of complete and incomplete accident reports. It's our main output file.
backup.csv exists in case we mess up out/results.csv, it has all of the overviews from searching each US state, and a couple of full text reports.
testdata.csv is available for testing out some functionality when it comes to parsing/writing to a CSV file.

When this project becomes out of date, perhaps we'll need to add a step to engage the advanced search options on the site and choose a new year like 2023 publication and... well we may still have to search each state. It's really not too bad.
