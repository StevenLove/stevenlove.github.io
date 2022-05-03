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
	import {wordList,dictionary} from "./home";
	
	let wordToTest = "hi"

	function isInWordList(word:String,listToSearch:string):Boolean{
		word = word.toLowerCase();
		const regex = RegExp("^"+word+"$","gm")
		let m;
		let found = false;
		if(word.length<5)return false;
		while ((m = regex.exec(listToSearch)) !== null) {
			// This is necessary to avoid infinite loops with zero-width matches
			if (m.index === regex.lastIndex) {
				regex.lastIndex++;
			}

			m.some((match, groupIndex) => {
				console.log(`Found match, group ${groupIndex}: ${match}`);
				found = true;
				return;
			})
		}
		return found;
	}
	function getDescription(word:String):String{
		let bool = isInWordList(word,wordList)
		if(bool){
			return "✅ " + word + " can be an answer in wordle"
		}else{
			return "❌ "+word + " can't be an answer in wordle"
		}
	}
	function getDescription2(word:String):String{
		let bool = isInWordList(word,dictionary);
		if(bool){
			return "✅ " + word + " is in the wordle dictionary" 
		}else{
			return "❌ "+word + " is not in the wordle dictionary"
		}
	}
</script>

<!-- <Menu /> -->

<input bind:value={wordToTest} maxlength="5" autocapitalize="false"/>
<h3>{getDescription(wordToTest)}</h3>
<h3>{getDescription2(wordToTest)}</h3>

<!-- <div id="container">
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
</div> -->

<!-- <Footer /> -->

<style lang="scss">
	@import "./home.scss";
</style>
