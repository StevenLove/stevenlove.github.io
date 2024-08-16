var piano = require("./piano.js");
var TimbreControls = require("./timbreControls.js");
var Converter = require("./converter.js");
var AudioPlayer = require("./audioplayer.js");

const showRecentNotes = () => {
  console.log("setup");
  piano.onPlayNote(() => {
    console.log("played note");
    const notes = piano.getRecentNotes(4);
    const descriptions = notes.map(Converter.frequencyToName);
    $("#currentNote").text(descriptions.toString());
  });
};

const onEvent = (event, input, f) => {
  var resolveFunction;
  if (typeof input == "string") {
    // We were given a literal character
    const char = input;
    resolveFunction = (e) => {
      if (e.key.toLowerCase() == char) {
        f();
      }
    };
  } else if (typeof input == "number") {
    // We were given a keycode instead of a literal character
    const code = input;
    resolveFunction = (e) => {
      if (e.keyCode == code) {
        f();
      }
    };
  } else {
    console.log("WHAT");
    return;
  }
  resolveFunction(event);
};
const onOff = (input, fOn, fOff) => {
  if (fOn) {
    $("body").keydown((e) => onEvent(e, input, fOn));
  }
  if (fOff) {
    $("body").keyup((e) => onEvent(e, input, fOff));
  }
  // on($("body").keyup,input,fOff);
};

const setPianoControls = () => {
  const onP = (charOrCode, deg) => {
    onOff(
      charOrCode,
      () => piano.playScaleDegree(deg),
      () => piano.stopScaleDegree(deg)
    );
  };
  /* Playing (and stopping) notes */
  onP(20, 0); // CapsLock = 20
  onP("a", 1);
  onP("s", 2);
  onP("d", 3);
  onP("f", 4);
  onP("g", 5);
  onP("h", 6);
  onP("j", 7);
  onP("k", 8);
  onP("l", 9);
  onP(";", 10);
  onP("'", 11);
  onP(13, 12); // Enter = 13

  /* Altering scale */

  onOff("n", piano.setMinor);
  onOff("m", piano.setMajor);
  onOff("b", piano.upHalfStep);
  onOff("v", piano.downHalfStep);
  onOff("q", AudioPlayer.randomizeAmplitudes);
};

$(document).ready(() => {
  TimbreControls.setup();
  piano.setup();
  setPianoControls();
  showRecentNotes();
});
