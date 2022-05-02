<script lang="ts">
	/**
	 * Home HTML
	 * =====================
	 *
	 * @contributors: Patryk Rzucidło [@ptkdev] <support@ptkdev.io> (https://ptk.dev)
	 *
	 * @license: MIT License
	 *
	 */
	import Menu from "@components/common/menu/menu.svelte";
	import Footer from "@components/common/footer/footer.svelte";
	import { translate } from "@app/translations/translate";
	import {wordList} from "./home";
	// import {readFileSync} from 'fs';
	// import path from 'path';

	// import Input from "./input.svelte";


	let wordToTest = "hi"
	let isAWord = false;
	
	function loadTextFile(){
		// wordList = readFileSync(path.join(__dirname, './wordlist.txt'), 'utf-8');
	}

	function test(value:String):Boolean{
		console.log("test",value);
		let str = value
		if(str.length>3){
			return true;
		}else{
			return false
		}
	}
	function isInWordList(word:String):Boolean{
		const regex = RegExp("^"+word+"$","gm")
		let m;
		let found = false;
		while ((m = regex.exec(wordList)) !== null) {
			// This is necessary to avoid infinite loops with zero-width matches
			if (m.index === regex.lastIndex) {
				regex.lastIndex++;
			}

			m.some((match, groupIndex) => {
				console.log(`Found match, group ${groupIndex}: ${match}`);
				found = true;
				return;
			})
			
			// // The result can be accessed through the `m`-variable.
			// m.forEach((match, groupIndex) => {
			// 	console.log(`Found match, group ${groupIndex}: ${match}`);
			// 	found = true;
			// 	return;
			// });
		}
		return found;
	}
	loadTextFile()
</script>

<Menu />

<div id="container">
	<section class="hero is-medium is-primary is-bold">
		<div class="hero-body">
			<div class="container">
				<h1 class="title">{translate("hello_world")}</h1>
				<h2 class="subtitle">{translate("app_name")}</h2>
				<input bind:value={wordToTest} maxlength="5"/>
				<h3>{wordToTest} is a word? {isInWordList(wordToTest)}</h3>
			</div>
		</div>
	</section>
	<div class="content has-text-centered">app/pages/home.svelte</div>
</div>

<Footer />

<style lang="scss">
	@import "./home.scss";
</style>
