// read in from the user's clipboard
// and process the text by performing a regex replace of (\d+)\n with $1:
// then remove any lines that don't start with a number between 00 and 99
// then sort the lines in ascending order from 1,2,3,...,98,99,00
// then remove the numbers from each line
// write the result to a file called output.txt

import clipboardy from 'clipboardy';
import { writeFile } from 'fs/promises';

async function processClipboardText() {
    // Read from the user's clipboard
    const clipboardText = await clipboardy.read();

    // Process the text with regex and transformations
    let sections = clipboardText
        // clear everything before the first match of 1\n
        .split(/(?=^1\n)/m)
        .slice(1);

    // console.log("sections",sections);
    let promises = sections.map((section, index) => {
        let result = section
        .split('\n')
        .slice(0,200)
        .join('\n')
        // .split(/(?=^00\n)/m)[0]
        // clear everything after the first match of 00\n.*\n
        // .replace(/(?=^00\n).*\n/m, '')
        .replace(/(\d+)\n/g, '$1:') // Replace (\d+)\n with $1:
        .split('\n')                // Split text into lines
        .filter(line => /^\d\d?/.test(line)) // Keep only lines starting with a number between 00 and 99
        .sort((a, b) => {
            let numA = parseInt(a.substring(0, 2), 10);
            let numB = parseInt(b.substring(0, 2), 10);
            return (numA === 0 ? 100 : numA) - (numB === 0 ? 100 : numB);
        })                         // Sort lines in ascending order from 1,2,3,...,98,99,00
        .map(line=>line.replace(/\d+:(.*)/g, '$1')) // Remove the numbers from each line
        .join('\n');               // Join lines back into a single string
    
        // console.log(result);
        let name = result.slice(0,10);
        return writeFile('test/'+name+'.txt', result);

    });

    await Promise.all(promises);
    // Write the result to a file called output.txt

    console.log('Processed text written to output.txt');
}

processClipboardText();
