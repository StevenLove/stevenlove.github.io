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
	import lyrics from "./home"
	// const  _  = require('lodash');
	import _ from 'underscore';



	let csvArray:String[] = []
	let lyricIndex = 0
	function getSong(index:number):String{
		let line = csvArray[index];
		if(!line){return "<song not found>"}
		let song = line.split(",")[2];
		return song;	
	}
	function getLyric(index: number):String{
		let line = csvArray[index];
		if(!line){return "<lyric not found>"}
		let split = line.split(",");
		split.splice(0,4);
		split.pop();
		split.pop();
		return split.join(", ");
	}
	function setup(){
		csvArray = lyrics.csv.split("\n");//.filter(x=>x.length>1)
		randomizeIndex();
	}
	function randomizeIndex(){
		lyricIndex = _.random(0,csvArray.length);
		
	}
	setup();
</script>

<h3>Random Lyric: {getLyric(lyricIndex)}</h3>
<input type="number" bind:value={lyricIndex} autocapitalize="false"/>
<button on:click={randomizeIndex}>Randomize</button>

<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>

<h4>Song:{getSong(lyricIndex)}</h4>
<br>

<style lang="scss">
	@import "./home.scss";
</style>
