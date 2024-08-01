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

    // find the number 1 followed by some text
    // followed by a number 2 and some text
    // followed by a 3 and some text, etc.
    // all the way to 99 and then 00
    let regex = /(.*)\n?1(.*)\n?2(.*)\n?3(.*)\n?4(.*)\n?5(.*)\n?6(.*)\n?7(.*)\n?8(.*)\n?9(.*)\n?10(.*)\n?11(.*)\n?12(.*)\n?13(.*)\n?14(.*)\n?15(.*)\n?16(.*)\n?17(.*)\n?18(.*)\n?19(.*)\n?20(.*)\n?21(.*)\n?22(.*)\n?23(.*)\n?24(.*)\n?25(.*)\n?26(.*)\n?27(.*)\n?28(.*)\n?29(.*)\n?30(.*)\n?31(.*)\n?32(.*)\n?33(.*)\n?34(.*)\n?35(.*)\n?36(.*)\n?37(.*)\n?38(.*)\n?39(.*)\n?40(.*)\n?41(.*)\n?42(.*)\n?43(.*)\n?44(.*)\n?45(.*)\n?46(.*)\n?47(.*)\n?48(.*)\n?49(.*)\n?50(.*)\n?.*\n+51(.*)\n?52(.*)\n?53(.*)\n?54(.*)\n?55(.*)\n?56(.*)\n?57(.*)\n?58(.*)\n?59(.*)\n?60(.*)\n?61(.*)\n?62(.*)\n?63(.*)\n?64(.*)\n?65(.*)\n?66(.*)\n?67(.*)\n?68(.*)\n?69(.*)\n?70(.*)\n?71(.*)\n?72(.*)\n?73(.*)\n?74(.*)\n?75(.*)\n?76(.*)\n?77(.*)\n?78(.*)\n?79(.*)\n?80(.*)\n?81(.*)\n?82(.*)\n?83(.*)\n?84(.*)\n?85(.*)\n?86(.*)\n?87(.*)\n?88(.*)\n?89(.*)\n?90(.*)\n?91(.*)\n?92(.*)\n?93(.*)\n?94(.*)\n?95(.*)\n?96(.*)\n?97(.*)\n?98(.*)\n?99(.*)\n?00(.*)/gm;
    // apply regex
    // let matches = clipboardText(regex);
    let matches = clipboardText.matchAll(regex);
    let match = matches.next().value;
    let str = match.slice(1).map(s=>s.trim()).join('\n').trim();
    await writeFile('test/'+str.slice(0,10)+'.txt', str);
    
    console.log('Processed text written to output.txt');
}

processClipboardText();
