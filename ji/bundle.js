(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const Formants = require("./formants.js");
const WebAudio = require("./webaudio.js");
const Visualizer = require("./visualizer.js");

const AudioPlayer = (function () {
  // Parameters
  const fullVolume = 0.5;
  const defaultVolume = 0.1;
  var currentVolume = defaultVolume;

  var audioCtx;
  var gainNode;

  var noiseBuffer;
  var waveTables;
  var currentWaveTable;

  var biquads;
  var formantSwitch;
  var formantEnter;
  var formantExit;
  var formantSkip;
  var formantsEnabled = false;

  const init = () => {
    audioCtx = WebAudio.getContext();
    const sampleRate = audioCtx.sampleRate;

    // WHITE NOISE GENERATION
    var bufferSize = 2 * sampleRate;
    var lastOut = 0.0;
    noiseBuffer = audioCtx.createBuffer(1, bufferSize, sampleRate);
    var output = noiseBuffer.getChannelData(0);
    for (var i = 0; i < bufferSize; i++) {
      var white = Math.random() * 2 - 1;
      // output[i] = (lastOut + (0.02 * white)) / 1.02;
      // lastOut = output[i];
      // output[i] *= 3.5; // (roughly) compensate for gain
      output[i] = white;
    }

    waveTables = WaveTables(audioCtx);

    /* formants */
    biquads = [0, 0, 0];
    biquads = biquads.map((x) => audioCtx.createBiquadFilter());
    biquads.forEach((filter) => {
      filter.type = "bandpass"; //bandpass to reduce freqs outside this range. peaking for emphasis
      filter.gain.value = 25;
      filter.Q.value = 10;
    });
    biquads[0].frequency.value = 520;
    biquads[1].frequency.value = 1190;
    biquads[2].frequency.value = 2390;

    const biquadGain = audioCtx.createGain();
    formantEnter = audioCtx.createGain();
    formantExit = audioCtx.createGain();
    formantSwitch = audioCtx.createGain();
    formantSkip = audioCtx.createGain();

    formantEnter.connect(biquads[0]);
    biquads[0].connect(biquads[1]);
    biquads[1].connect(biquads[2]);
    biquads[2].connect(formantExit);

    const visualizer = Visualizer();

    // SOURCE NODES
    gainNode = audioCtx.createGain();
    visualizerNode = visualizer.getNode();

    // DESTINATION
    const computerSpeakers = audioCtx.destination;

    // SET NODE PROPERTIES
    gainNode.gain.value = defaultVolume;

    // CONNECT NODE
    gainNode.connect(visualizerNode);
    visualizerNode.connect(computerSpeakers);
    formantSwitch.connect(formantSkip);
    formantExit.connect(gainNode);
    formantSkip.connect(gainNode);
    formantExit.gain.value = 1000;

    // START
    unmute();
  };

  const enableFormants = () => {
    if (formantsEnabled) {
      return;
    }
    formantSwitch.disconnect(formantSkip);
    formantSwitch.connect(formantEnter);
    formantsEnabled = true;
  };
  const disableFormants = () => {
    if (formantsEnabled) {
      formantSwitch.disconnect(formantEnter);
      formantSwitch.connect(formantSkip);
      formantsEnabled = false;
    }
  };

  const setVowel = (v) => {
    const freqs = Formants.peaksForVowelSound(v);
    for (var i = 0; i < 3; ++i) {
      biquads[i].frequency.value = freqs[i];
    }
  };

  const playingNotes = {};
  var amplitudes = [0, 1];

  const playNote2 = (note, parentID) => {
    if (playingNotes[parentID]) return;
    const f = note.frequency; //fundamental

    var o = audioCtx.createOscillator();
    var g = audioCtx.createGain();
    g.gain.value = 0;

    o.setPeriodicWave(currentWaveTable);
    o.frequency.value = f;
    // o.connect(g);
    // g.connect(gainNode);
    o.connect(g);

    /* formants */
    // g.connect(biquads[0]);
    // biquads[2].connect(gainNode);

    g.connect(formantSwitch);
    // g.connect(gainNode);

    var normalGain;
    if (note.amplitude != undefined) {
      normalGain = note.amplitude;
    } else {
      normalGain = 1;
    }
    g.gain.linearRampToValueAtTime(normalGain, audioCtx.currentTime + 0.01);

    o.start();
    playingNotes[parentID] = { o: o, g: g };
  };

  const createNoiseNode = () => {
    var noiseNode = audioCtx.createBufferSource();
    noiseNode.buffer = noiseBuffer;
    noiseNode.loop = true;
    return noiseNode;
  };
  const playAttack = () => {
    const attackTime = 0.1; //seconds
    var noiseNode = createNoiseNode();
    var attackGain = audioCtx.createGain();
    attackGain.gain.value = currentVolume * 2;
    attackGain.gain.linearRampToValueAtTime(
      0,
      audioCtx.currentTime + attackTime
    );

    noiseNode.connect(attackGain);
    attackGain.connect(gainNode);

    noiseNode.start(0);
    noiseNode.stop(audioCtx.currentTime + attackTime); //seconds
  };
  const stopNote2 = (id) => {
    var gainNode = playingNotes[id].g;
    // playingNotes[id].g.gain.exponentialRampToValueAtTime(0.1,audioCtx.currentTime + 0.5);
    // gainNode.gain.linearRampToValueAtTime(0.01,audioCtx.currentTime + 1.2);
    playingNotes[id].o.stop(audioCtx.currentTime + 0.5);
    gainNode.gain.setTargetAtTime(0, audioCtx.currentTime, 0.015);
    delete playingNotes[id];
  };

  const playBuffer = (buffer) => {
    var myArrayBuffer = audioCtx.createBuffer(1, 1024, audioCtx.sampleRate);
    myArrayBuffer.copyToChannel(buffer, 0);

    var source = audioCtx.createBufferSource();
    source.buffer = myArrayBuffer;
    source.connect(gainNode);
    source.loop = true;
    source.start();
    source.stop(audioCtx.currentTime + 2);
  };

  const mute = () => {
    gainNode.gain.value = 0.0;
  };
  const unmute = () => {
    gainNode.gain.value = currentVolume;
  };
  const setVolume = (volume) => {
    currentVolume = (volume / 100) * fullVolume;
    gainNode.gain.value = currentVolume;
  };

  const randomizeAmplitudes = () => {
    amplitudes = new Array(6).fill("").map((a) => {
      return Math.random();
    });
  };
  const setAmplitude = (index, amount) => {
    amplitudes[index] = amount;
  };
  const setWaveTable = (name) => {
    if (name == "custom") {
      currentWaveTable = waveTables.custom(amplitudes);
    } else {
      currentWaveTable = waveTables[name];
    }
  };

  init();
  return {
    mute: mute,
    unmute: unmute,
    setVolume: setVolume,
    playNote: playNote2,
    stopNote: stopNote2,
    playAttack: playAttack,
    randomizeAmplitudes: randomizeAmplitudes,
    setWaveTable: setWaveTable,
    setAmplitude: setAmplitude,
    setVowel: setVowel,
    playBuffer: playBuffer,
    enableFormants: enableFormants,
    disableFormants: disableFormants,
  };
})();

module.exports = AudioPlayer;

},{"./formants.js":3,"./visualizer.js":22,"./webaudio.js":23}],2:[function(require,module,exports){
var teoria = require("teoria");

const Converter = (() => {
  const SCALE_DEGREE_NAMES = {
    0: "root",
    1: "minor 2nd",
    2: "major 2nd",
    3: "minor 3rd",
    4: "major 3rd",
    5: "perfect 4th",
    6: "tritone",
    7: "perfect 5th",
    8: "minor 6th",
    9: "major 6th",
    10: "minor 7th",
    11: "major 7th",
    12: "octave",
  };

  const intervalToName = (semitones) => {
    if (semitones < 0 || semitones > 12) {
      console.error("too many intervals");
      return "unnamed";
    }
    return SCALE_DEGREE_NAMES[semitones];
  };

  const centsToName = (cents) => {
    var rounded = 100 * z.round(cents / 100);
    var name = SCALE_DEGREE_NAMES[rounded / 100];
    var modifier = cents >= rounded ? "+" : "-";
    var diff = MATH.abs(cents - rounded).toFixed(0);
    return name + " (" + modifier + diff + ")";
  };

  // should be between 1 and 2
  const fractionToCents = (fraction) => {
    if (fraction < 1 || fraction > 2) {
      throw "fraction should be between 1 and 2";
    }
    const val = Math.log2(fraction) * 1200;
    // console.log("fraction",fraction,"goes to",val);
    return val;
  };
  const centsToFraction = (cents) => {
    // ratio=10.^((log10(2)/1200)*cents);
    const val = Math.pow(10, (Math.log10(2) / 1200) * cents);
    console.log("cents to fraction", cents, val);
    return val;
  };

  const normalizeBetweenOneAndTwo = (number) => {
    if (number <= 0) {
      console.error("number should be positive");
      return;
    }
    while (number >= 2) {
      number /= 2;
    }
    while (number < 1) {
      number *= 2;
    }
    return number;
  };

  const isInteger = (n) => n == Math.round(n);
  const harmonicSeriesToCentsAboveRoot = (seriesNumber) => {
    if (!isInteger(seriesNumber) || seriesNumber < 1) {
      console.error(
        "incorrect input to harmonic series to cents above root function"
      );
      return;
    }
    // divide by 2 until its between one and two
    const fraction = normalizeBetweenOneAndTwo(seriesNumber);
    // console.log("fraction",fraction);
    return fractionToCents(fraction);
  };

  const frequencyToCents = (root, target) => {
    const fraction = target / root;
    return fractionToCents(fraction);
  };

  const differenceInCents = (note1, note2) => {
    const f1 = note1.freq();
    const f2 = note2.freq();
    let ratio = f1 / f2;
    var multiplier = 1;
    if (ratio < 1) {
      ratio = 1 / ratio;
      multiplier = -1;
    }
    const octaves = Math.floor(Math.log2(ratio));
    const remainder = ratio - Math.pow(octaves, 2);
    const cents = 1200 * octaves + fractionToCents(ratio);
    return multiplier * cents;
  };

  const withinJND = (note1, note2) => {
    return Math.abs(differenceInCents(note1, note2)) < Constants.JNDCents;
  };
  const withinJNDCrossOctave = (note1, note2) => {
    const absDiff = Math.abs(differenceInCents(note1, note2));
    const diffWithoutOctave = absDiff % 1200;
    return diffWithoutOctave < Constants.JNDCents;
  };
  const intervalToIntervalClass = (interval) => {
    const input = interval.toString();
    interval = interval.simple();
    while (interval.smaller(teoria.interval("P1"))) {
      interval = interval.add(teoria.interval("P8"));
    }
    const intervalClass = interval.semitones();
    console.log(input, "is interval class", intervalClass);
    return intervalClass;
  };

  const semitonesToSimpleName = (semitones) => {
    const names = [
      "1",
      "b2",
      "2",
      "b3",
      "3",
      "4",
      "b5",
      "5",
      "b6",
      "6",
      "b7",
      "7",
    ];
    return names[semitones];
  };
  const simpleNameToSemitones = (scaleDegreeName) => {
    const names = [
      "1",
      "b2",
      "2",
      "b3",
      "3",
      "4",
      "b5",
      "5",
      "b6",
      "6",
      "b7",
      "7",
    ];
    const index = names.indexOf(scaleDegreeName);
    if (index < 0) {
      throw "scale degree with bad name " + scaleDegreeName;
    }
    return index;
  };

  // Untested
  const simpleNoteNameToSemitonesFromC = (simpleNoteName) => {
    const sharpNames = [
      "c",
      "c#",
      "d",
      "d#",
      "e",
      "f",
      "f#",
      "g",
      "g#",
      "a",
      "a#",
      "b",
    ];
    const flatNames = [
      "c",
      "db",
      "d",
      "eb",
      "e",
      "f",
      "gb",
      "g",
      "ab",
      "a",
      "bb",
      "b",
    ];
    const sharpIndex = sharpNames.indexOf(simpleNoteName);
    const flatIndex = flatNames.indexOf(simpleNoteName);
    const index = Math.max(sharpIndex, flatIndex);
    return index;
  };

  const incrementIntervalClass = (semitones) => {
    return (semitones + 1) % 12;
  };

  /*
    const harmonicFromRoot = (root, note) => {
        const f1 = root.freq();
        const f2 = note.freq();
        for(var i = 1; i < 30; ++i){
            var f = i * f1;
            
        }
    }
    */
  const frequencyToName = (f) => {
    const obj = teoria.note.fromFrequency(f);
    const offset = Math.round(obj.cents);
    var suffix = "";
    if (offset != 0) {
      suffix = " (" + offset + ")";
    }
    return obj.note.toString() + suffix;
  };

  const myMod = (v, modulo) => {
    while (v < 0) {
      v += modulo;
    }
    return v % modulo;
  };

  return {
    intervalToName: intervalToName,
    centsToName: centsToName,
    centsToFraction: centsToFraction,
    fractionToCents: fractionToCents,
    frequencyToCents: frequencyToCents,
    normalizeBetweenOneAndTwo: normalizeBetweenOneAndTwo,
    intervalToIntervalClass: intervalToIntervalClass,
    simpleNameToSemitones: simpleNameToSemitones,
    semitonesToSimpleName: semitonesToSimpleName,
    incrementIntervalClass: incrementIntervalClass,
    harmonicSeriesToCentsAboveRoot: harmonicSeriesToCentsAboveRoot,
    frequencyToName: frequencyToName,
    myMod: myMod,
    // harmonicFromRoot:harmonicFromRoot
  };
})();

module.exports = Converter;

},{"teoria":12}],3:[function(require,module,exports){



const Formants = (()=>{
    
    

    const peaksForVowelSound = v => {
        const vowels = {
            oo:[300,870,2240],
            ow:[570,840,2410],
            u:[440,1020,2240],
            a:[730,1090,2440],            
            uh:[520,1190,2390],
            er:[490,1350,1690],
            ae:[660,1720,2410],
            e:[530,1840,2480],
            i:[390,1990,2550],
            iy:[270,2290,3010],
            m:[200,2200,3600]
        }
        return vowels[v];
        
    }

    return ({
        peaksForVowelSound:peaksForVowelSound
    })
})()

module.exports = Formants;
},{}],4:[function(require,module,exports){
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

},{"./audioplayer.js":1,"./converter.js":2,"./piano.js":20,"./timbreControls.js":21}],5:[function(require,module,exports){
var accidentalValues = {
  'bb': -2,
  'b': -1,
  '': 0,
  '#': 1,
  'x': 2
};

module.exports = function accidentalNumber(acc) {
  return accidentalValues[acc];
}

module.exports.interval = function accidentalInterval(acc) {
  var val = accidentalValues[acc];
  return [-4 * val, 7 * val];
}

},{}],6:[function(require,module,exports){
var SYMBOLS = {
  'm': ['m3', 'P5'],
  'mi': ['m3', 'P5'],
  'min': ['m3', 'P5'],
  '-': ['m3', 'P5'],

  'M': ['M3', 'P5'],
  'ma': ['M3', 'P5'],
  '': ['M3', 'P5'],

  '+': ['M3', 'A5'],
  'aug': ['M3', 'A5'],

  'dim': ['m3', 'd5'],
  'o': ['m3', 'd5'],

  'maj': ['M3', 'P5', 'M7'],
  'dom': ['M3', 'P5', 'm7'],
  'ø': ['m3', 'd5', 'm7'],

  '5': ['P5'],

  '6/9': ['M3', 'P5', 'M6', 'M9']
};

module.exports = function(symbol) {
  var c, parsing = 'quality', additionals = [], name, chordLength = 2
  var notes = ['P1', 'M3', 'P5', 'm7', 'M9', 'P11', 'M13'];
  var explicitMajor = false;

  function setChord(name) {
    var intervals = SYMBOLS[name];
    for (var i = 0, len = intervals.length; i < len; i++) {
      notes[i + 1] = intervals[i];
    }

    chordLength = intervals.length;
  }

  // Remove whitespace, commas and parentheses
  symbol = symbol.replace(/[,\s\(\)]/g, '');
  for (var i = 0, len = symbol.length; i < len; i++) {
    if (!(c = symbol[i]))
      return;

    if (parsing === 'quality') {
      var sub3 = (i + 2) < len ? symbol.substr(i, 3).toLowerCase() : null;
      var sub2 = (i + 1) < len ? symbol.substr(i, 2).toLowerCase() : null;
      if (sub3 in SYMBOLS)
        name = sub3;
      else if (sub2 in SYMBOLS)
        name = sub2;
      else if (c in SYMBOLS)
        name = c;
      else
        name = '';

      if (name)
        setChord(name);

      if (name === 'M' || name === 'ma' || name === 'maj')
        explicitMajor = true;


      i += name.length - 1;
      parsing = 'extension';
    } else if (parsing === 'extension') {
      c = (c === '1' && symbol[i + 1]) ? +symbol.substr(i, 2) : +c;

      if (!isNaN(c) && c !== 6) {
        chordLength = (c - 1) / 2;

        if (chordLength !== Math.round(chordLength))
          return new Error('Invalid interval extension: ' + c.toString(10));

        if (name === 'o' || name === 'dim')
          notes[3] = 'd7';
        else if (explicitMajor)
          notes[3] = 'M7';

        i += c >= 10 ? 1 : 0;
      } else if (c === 6) {
        notes[3] = 'M6';
        chordLength = Math.max(3, chordLength);
      } else
        i -= 1;

      parsing = 'alterations';
    } else if (parsing === 'alterations') {
      var alterations = symbol.substr(i).split(/(#|b|add|maj|sus|M)/i),
          next, flat = false, sharp = false;

      if (alterations.length === 1)
        return new Error('Invalid alteration');
      else if (alterations[0].length !== 0)
        return new Error('Invalid token: \'' + alterations[0] + '\'');

      var ignore = false;
      alterations.forEach(function(alt, i, arr) {
        if (ignore || !alt.length)
          return ignore = false;

        var next = arr[i + 1], lower = alt.toLowerCase();
        if (alt === 'M' || lower === 'maj') {
          if (next === '7')
            ignore = true;

          chordLength = Math.max(3, chordLength);
          notes[3] = 'M7';
        } else if (lower === 'sus') {
          var type = 'P4';
          if (next === '2' || next === '4') {
            ignore = true;

            if (next === '2')
              type = 'M2';
          }

          notes[1] = type; // Replace third with M2 or P4
        } else if (lower === 'add') {
          if (next === '9')
            additionals.push('M9');
          else if (next === '11')
            additionals.push('P11');
          else if (next === '13')
            additionals.push('M13');

          ignore = true
        } else if (lower === 'b') {
          flat = true;
        } else if (lower === '#') {
          sharp = true;
        } else {
          var token = +alt, quality, intPos;
          if (isNaN(token) || String(token).length !== alt.length)
            return new Error('Invalid token: \'' + alt + '\'');

          if (token === 6) {
            if (sharp)
              notes[3] = 'A6';
            else if (flat)
              notes[3] = 'm6';
            else
              notes[3] = 'M6';

            chordLength = Math.max(3, chordLength);
            return;
          }

          // Calculate the position in the 'note' array
          intPos = (token - 1) / 2;
          if (chordLength < intPos)
            chordLength = intPos;

          if (token < 5 || token === 7 || intPos !== Math.round(intPos))
            return new Error('Invalid interval alteration: ' + token);

          quality = notes[intPos][0];

          // Alterate the quality of the interval according the accidentals
          if (sharp) {
            if (quality === 'd')
              quality = 'm';
            else if (quality === 'm')
              quality = 'M';
            else if (quality === 'M' || quality === 'P')
              quality = 'A';
          } else if (flat) {
            if (quality === 'A')
              quality = 'M';
            else if (quality === 'M')
              quality = 'm';
            else if (quality === 'm' || quality === 'P')
              quality = 'd';
          }

          sharp = flat = false;
          notes[intPos] = quality + token;
        }
      });
      parsing = 'ended';
    } else if (parsing === 'ended') {
      break;
    }
  }

  return notes.slice(0, chordLength + 1).concat(additionals);
}

},{}],7:[function(require,module,exports){
var coords = require('notecoord');
var accval = require('accidental-value');

module.exports = function helmholtz(name) {
  var name = name.replace(/\u2032/g, "'").replace(/\u0375/g, ',');
  var parts = name.match(/^(,*)([a-h])(x|#|bb|b?)([,\']*)$/i);

  if (!parts || name !== parts[0])
    throw new Error('Invalid formatting');

  var note = parts[2];
  var octaveFirst = parts[1];
  var octaveLast = parts[4];
  var lower = note === note.toLowerCase();
  var octave;

  if (octaveFirst) {
    if (lower)
      throw new Error('Invalid formatting - found commas before lowercase note');

    octave = 2 - octaveFirst.length;
  } else if (octaveLast) {
    if (octaveLast.match(/^'+$/) && lower)
      octave = 3 + octaveLast.length;
    else if (octaveLast.match(/^,+$/) && !lower)
      octave = 2 - octaveLast.length;
    else
      throw new Error('Invalid formatting - mismatch between octave ' +
        'indicator and letter case')
  } else
    octave = lower ? 3 : 2;

  var accidentalValue = accval.interval(parts[3].toLowerCase());
  var coord = coords(note.toLowerCase());

  coord[0] += octave;
  coord[0] += accidentalValue[0] - coords.A4[0];
  coord[1] += accidentalValue[1] - coords.A4[1];

  return coord;
};

},{"accidental-value":5,"notecoord":9}],8:[function(require,module,exports){
var pattern = /^(AA|A|P|M|m|d|dd)(-?\d+)$/;

// The interval it takes to raise a note a semitone
var sharp = [-4, 7];

var pAlts = ['dd', 'd', 'P', 'A', 'AA'];
var mAlts = ['dd', 'd', 'm', 'M', 'A', 'AA'];

var baseIntervals = [
  [0, 0],
  [3, -5],
  [2, -3],
  [1, -1],
  [0, 1],
  [3, -4],
  [2, -2],
  [1, 0]
];

module.exports = function(simple) {
  var parser = simple.match(pattern);
  if (!parser) return null;

  var quality = parser[1];
  var number = +parser[2];
  var sign = number < 0 ? -1 : 1;

  number = sign < 0 ? -number : number;

  var lower = number > 8 ? (number % 7 || 7) : number;
  var octaves = (number - lower) / 7;

  var base = baseIntervals[lower - 1];
  var alts = base[0] <= 1 ? pAlts : mAlts;
  var alt = alts.indexOf(quality) - 2;

  // this happens, if the alteration wasn't suitable for this type
  // of interval, such as P2 or M5 (no "perfect second" or "major fifth")
  if (alt === -3) return null;

  return [
    sign * (base[0] + octaves + sharp[0] * alt),
    sign * (base[1] + sharp[1] * alt)
  ];
}

// Copy to avoid overwriting internal base intervals
module.exports.coords = baseIntervals.slice(0);

},{}],9:[function(require,module,exports){
// First coord is octaves, second is fifths. Distances are relative to c
var notes = {
  c: [0, 0],
  d: [-1, 2],
  e: [-2, 4],
  f: [1, -1],
  g: [0, 1],
  a: [-1, 3],
  b: [-2, 5],
  h: [-2, 5]
};

module.exports = function(name) {
  return name in notes ? [notes[name][0], notes[name][1]] : null;
};

module.exports.notes = notes;
module.exports.A4 = [3, 3]; // Relative to C0 (scientic notation, ~16.35Hz)
module.exports.sharp = [-4, 7];

},{}],10:[function(require,module,exports){
module.exports = function(coord, stdPitch) {
  if (typeof coord === 'number') {
    stdPitch = coord;
    return function(coord) {
      return stdPitch * Math.pow(2, (coord[0] * 12 + coord[1] * 7) / 12);
    }
  }

  stdPitch = stdPitch || 440;
  return stdPitch * Math.pow(2, (coord[0] * 12 + coord[1] * 7) / 12);
}

},{}],11:[function(require,module,exports){
var coords = require('notecoord');
var accval = require('accidental-value');

module.exports = function scientific(name) {
  var format = /^([a-h])(x|#|bb|b?)(-?\d*)/i;

  var parser = name.match(format);
  if (!(parser && name === parser[0] && parser[3].length)) return;

  var noteName = parser[1];
  var octave = +parser[3];
  var accidental = parser[2].length ? parser[2].toLowerCase() : '';

  var accidentalValue = accval.interval(accidental);
  var coord = coords(noteName.toLowerCase());

  coord[0] += octave;
  coord[0] += accidentalValue[0] - coords.A4[0];
  coord[1] += accidentalValue[1] - coords.A4[1];

  return coord;
};

},{"accidental-value":5,"notecoord":9}],12:[function(require,module,exports){
var Note = require('./lib/note');
var Interval = require('./lib/interval');
var Chord = require('./lib/chord');
var Scale = require('./lib/scale');

var teoria;

// never thought I would write this, but: Legacy support
function intervalConstructor(from, to) {
  // Construct a Interval object from string representation
  if (typeof from === 'string')
    return Interval.toCoord(from);

  if (typeof to === 'string' && from instanceof Note)
    return Interval.from(from, Interval.toCoord(to));

  if (to instanceof Interval && from instanceof Note)
    return Interval.from(from, to);

  if (to instanceof Note && from instanceof Note)
    return Interval.between(from, to);

  throw new Error('Invalid parameters');
}

intervalConstructor.toCoord = Interval.toCoord;
intervalConstructor.from = Interval.from;
intervalConstructor.between = Interval.between;
intervalConstructor.invert = Interval.invert;

function noteConstructor(name, duration) {
  if (typeof name === 'string')
    return Note.fromString(name, duration);
  else
    return new Note(name, duration);
}

noteConstructor.fromString = Note.fromString;
noteConstructor.fromKey = Note.fromKey;
noteConstructor.fromFrequency = Note.fromFrequency;
noteConstructor.fromMIDI = Note.fromMIDI;

function chordConstructor(name, symbol) {
  if (typeof name === 'string') {
    var root, octave;
    root = name.match(/^([a-h])(x|#|bb|b?)/i);
    if (root && root[0]) {
      octave = typeof symbol === 'number' ? symbol.toString(10) : '4';
      return new Chord(Note.fromString(root[0].toLowerCase() + octave),
                            name.substr(root[0].length));
    }
  } else if (name instanceof Note)
    return new Chord(name, symbol);

  throw new Error('Invalid Chord. Couldn\'t find note name');
}

function scaleConstructor(tonic, scale) {
  tonic = (tonic instanceof Note) ? tonic : teoria.note(tonic);
  return new Scale(tonic, scale);
}

teoria = {
  note: noteConstructor,

  chord: chordConstructor,

  interval: intervalConstructor,

  scale: scaleConstructor,

  Note: Note,
  Chord: Chord,
  Scale: Scale,
  Interval: Interval
};


require('./lib/sugar')(teoria);
exports = module.exports = teoria;

},{"./lib/chord":13,"./lib/interval":14,"./lib/note":16,"./lib/scale":17,"./lib/sugar":18}],13:[function(require,module,exports){
var daccord = require('daccord');
var knowledge = require('./knowledge');
var Note = require('./note');
var Interval = require('./interval');

function Chord(root, name) {
  if (!(this instanceof Chord)) return new Chord(root, name);
  name = name || '';
  this.name = root.name().toUpperCase() + root.accidental() + name;
  this.symbol = name;
  this.root = root;
  this.intervals = [];
  this._voicing = [];

  var bass = name.split('/');
  if (bass.length === 2 && bass[1].trim() !== '9') {
    name = bass[0];
    bass = bass[1].trim();
  } else {
    bass = null;
  }

  this.intervals = daccord(name).map(Interval.toCoord);
  this._voicing = this.intervals.slice();

  if (bass) {
    var intervals = this.intervals, bassInterval, note;
    // Make sure the bass is atop of the root note
    note = Note.fromString(bass + (root.octave() + 1)); // crude

    bassInterval = Interval.between(root, note);
    bass = bassInterval.simple();
    bassInterval = bassInterval.invert().direction('down');

    this._voicing = [bassInterval];
    for (var i = 0, length = intervals.length;  i < length; i++) {
      if (!intervals[i].simple().equal(bass))
        this._voicing.push(intervals[i]);
    }
  }
}

Chord.prototype = {
  notes: function() {
    var root = this.root;
    return this.voicing().map(function(interval) {
      return root.interval(interval);
    });
  },

  simple: function() {
    return this.notes().map(function(n) { return n.toString(true); });
  },

  bass: function() {
    return this.root.interval(this._voicing[0]);
  },

  voicing: function(voicing) {
    // Get the voicing
    if (!voicing) {
      return this._voicing;
    }

    // Set the voicing
    this._voicing = [];
    for (var i = 0, length = voicing.length; i < length; i++) {
      this._voicing[i] = Interval.toCoord(voicing[i]);
    }

    return this;
  },

  resetVoicing: function() {
    this._voicing = this.intervals;
  },

  dominant: function(additional) {
    additional = additional || '';
    return new Chord(this.root.interval('P5'), additional);
  },

  subdominant: function(additional) {
    additional = additional || '';
    return new Chord(this.root.interval('P4'), additional);
  },

  parallel: function(additional) {
    additional = additional || '';
    var quality = this.quality();

    if (this.chordType() !== 'triad' || quality === 'diminished' ||
        quality === 'augmented') {
      throw new Error('Only major/minor triads have parallel chords');
    }

    if (quality === 'major') {
      return new Chord(this.root.interval('m3', 'down'), 'm');
    } else {
      return new Chord(this.root.interval('m3', 'up'));
    }
  },

  quality: function() {
    var third, fifth, seventh, intervals = this.intervals;

    for (var i = 0, length = intervals.length; i < length; i++) {
      if (intervals[i].number() === 3) {
        third = intervals[i];
      } else if (intervals[i].number() === 5) {
        fifth = intervals[i];
      } else if (intervals[i].number() === 7) {
        seventh = intervals[i];
      }
    }

    if (!third) {
      return;
    }

    third = (third.direction() === 'down') ? third.invert() : third;
    third = third.simple().toString();

    if (fifth) {
      fifth = (fifth.direction === 'down') ? fifth.invert() : fifth;
      fifth = fifth.simple().toString();
    }

    if (seventh) {
      seventh = (seventh.direction === 'down') ? seventh.invert() : seventh;
      seventh = seventh.simple().toString();
    }

    if (third === 'M3') {
      if (fifth === 'A5') {
        return 'augmented';
      } else if (fifth === 'P5') {
        return (seventh === 'm7') ? 'dominant' : 'major';
      }

      return 'major';
    } else if (third === 'm3') {
      if (fifth === 'P5') {
        return 'minor';
      } else if (fifth === 'd5') {
        return (seventh === 'm7') ? 'half-diminished' : 'diminished';
      }

      return 'minor';
    }
  },

  chordType: function() { // In need of better name
    var length = this.intervals.length, interval, has, invert, i, name;

    if (length === 2) {
      return 'dyad';
    } else if (length === 3) {
      has = {unison: false, third: false, fifth: false};
      for (i = 0; i < length; i++) {
        interval = this.intervals[i];
        invert = interval.invert();
        if (interval.base() in has) {
          has[interval.base()] = true;
        } else if (invert.base() in has) {
          has[invert.base()] = true;
        }
      }

      name = (has.unison && has.third && has.fifth) ? 'triad' : 'trichord';
    } else if (length === 4) {
      has = {unison: false, third: false, fifth: false, seventh: false};
      for (i = 0; i < length; i++) {
        interval = this.intervals[i];
        invert = interval.invert();
        if (interval.base() in has) {
          has[interval.base()] = true;
        } else if (invert.base() in has) {
          has[invert.base()] = true;
        }
      }

      if (has.unison && has.third && has.fifth && has.seventh) {
        name = 'tetrad';
      }
    }

    return name || 'unknown';
  },

  get: function(interval) {
    if (typeof interval === 'string' && interval in knowledge.stepNumber) {
      var intervals = this.intervals, i, length;

      interval = knowledge.stepNumber[interval];
      for (i = 0, length = intervals.length; i < length; i++) {
        if (intervals[i].number() === interval) {
          return this.root.interval(intervals[i]);
        }
      }

      return null;
    } else {
      throw new Error('Invalid interval name');
    }
  },

  interval: function(interval) {
    return new Chord(this.root.interval(interval), this.symbol);
  },

  transpose: function(interval) {
    this.root.transpose(interval);
    this.name = this.root.name().toUpperCase() +
                this.root.accidental() + this.symbol;

    return this;
  },

  toString: function() {
    return this.name;
  }
};

module.exports = Chord;

},{"./interval":14,"./knowledge":15,"./note":16,"daccord":6}],14:[function(require,module,exports){
var knowledge = require('./knowledge');
var vector = require('./vector');
var toCoord = require('interval-coords');

function Interval(coord) {
  if (!(this instanceof Interval)) return new Interval(coord);
  this.coord = coord;
}

Interval.prototype = {
  name: function() {
    return knowledge.intervalsIndex[this.number() - 1];
  },

  semitones: function() {
    return vector.sum(vector.mul(this.coord, [12, 7]));
  },

  number: function() {
    return Math.abs(this.value());
  },

  value: function() {
    var toMultiply = Math.floor((this.coord[1] - 2) / 7) + 1;
    var product = vector.mul(knowledge.sharp, toMultiply);
    var without = vector.sub(this.coord, product);
    var i = knowledge.intervalFromFifth[without[1] + 5];
    var diff = without[0] - knowledge.intervals[i][0];
    var val = knowledge.stepNumber[i] + diff * 7;

    return (val > 0) ? val : val - 2;
  },

  type: function() {
    return knowledge.intervals[this.base()][0] <= 1 ? 'perfect' : 'minor';
  },

  base: function() {
    var product = vector.mul(knowledge.sharp, this.qualityValue());
    var fifth = vector.sub(this.coord, product)[1];
    fifth = this.value() > 0 ? fifth + 5 : -(fifth - 5) % 7;
    fifth = fifth < 0 ? knowledge.intervalFromFifth.length + fifth : fifth;

    var name = knowledge.intervalFromFifth[fifth];
    if (name === 'unison' && this.number() >= 8)
      name = 'octave';

    return name;
  },

  direction: function(dir) {
    if (dir) {
      var is = this.value() >= 1 ? 'up' : 'down';
      if (is !== dir)
        this.coord = vector.mul(this.coord, -1);

      return this;
    }
    else
      return this.value() >= 1 ? 'up' : 'down';
  },

  simple: function(ignore) {
    // Get the (upwards) base interval (with quality)
    var simple = knowledge.intervals[this.base()];
    var toAdd = vector.mul(knowledge.sharp, this.qualityValue());
    simple = vector.add(simple, toAdd);

    // Turn it around if necessary
    if (!ignore)
      simple = this.direction() === 'down' ? vector.mul(simple, -1) : simple;

    return new Interval(simple);
  },

  isCompound: function() {
    return this.number() > 8;
  },

  octaves: function() {
    var toSubtract, without, octaves;

    if (this.direction() === 'up') {
      toSubtract = vector.mul(knowledge.sharp, this.qualityValue());
      without = vector.sub(this.coord, toSubtract);
      octaves = without[0] - knowledge.intervals[this.base()][0];
    } else {
      toSubtract = vector.mul(knowledge.sharp, -this.qualityValue());
      without = vector.sub(this.coord, toSubtract);
      octaves = -(without[0] + knowledge.intervals[this.base()][0]);
    }

    return octaves;
  },

  invert: function() {
    var i = this.base();
    var qual = this.qualityValue();
    var acc = this.type() === 'minor' ? -(qual - 1) : -qual;
    var idx = 9 - knowledge.stepNumber[i] - 1;
    var coord = knowledge.intervals[knowledge.intervalsIndex[idx]];
    coord = vector.add(coord, vector.mul(knowledge.sharp, acc));

    return new Interval(coord);
  },

  quality: function(lng) {
    var quality = knowledge.alterations[this.type()][this.qualityValue() + 2];

    return lng ? knowledge.qualityLong[quality] : quality;
  },

  qualityValue: function() {
    if (this.direction() === 'down')
      return Math.floor((-this.coord[1] - 2) / 7) + 1;
    else
      return Math.floor((this.coord[1] - 2) / 7) + 1;
  },

  equal: function(interval) {
      return this.coord[0] === interval.coord[0] &&
          this.coord[1] === interval.coord[1];
  },

  greater: function(interval) {
    var semi = this.semitones();
    var isemi = interval.semitones();

    // If equal in absolute size, measure which interval is bigger
    // For example P4 is bigger than A3
    return (semi === isemi) ?
      (this.number() > interval.number()) : (semi > isemi);
  },

  smaller: function(interval) {
    return !this.equal(interval) && !this.greater(interval);
  },

  add: function(interval) {
    return new Interval(vector.add(this.coord, interval.coord));
  },

  toString: function(ignore) {
    // If given true, return the positive value
    var number = ignore ? this.number() : this.value();

    return this.quality() + number;
  }
};

Interval.toCoord = function(simple) {
  var coord = toCoord(simple);
  if (!coord)
    throw new Error('Invalid simple format interval');

  return new Interval(coord);
};

Interval.from = function(from, to) {
  return from.interval(to);
};

Interval.between = function(from, to) {
  return new Interval(vector.sub(to.coord, from.coord));
};

Interval.invert = function(sInterval) {
  return Interval.toCoord(sInterval).invert().toString();
};

module.exports = Interval;

},{"./knowledge":15,"./vector":19,"interval-coords":8}],15:[function(require,module,exports){
// Note coordinates [octave, fifth] relative to C
module.exports = {
  notes: {
    c: [0, 0],
    d: [-1, 2],
    e: [-2, 4],
    f: [1, -1],
    g: [0, 1],
    a: [-1, 3],
    b: [-2, 5],
    h: [-2, 5]
  },

  intervals: {
    unison: [0, 0],
    second: [3, -5],
    third: [2, -3],
    fourth: [1, -1],
    fifth: [0, 1],
    sixth: [3, -4],
    seventh: [2, -2],
    octave: [1, 0]
  },

  intervalFromFifth: ['second', 'sixth', 'third', 'seventh', 'fourth',
                         'unison', 'fifth'],

  intervalsIndex: ['unison', 'second', 'third', 'fourth', 'fifth',
                      'sixth', 'seventh', 'octave', 'ninth', 'tenth',
                      'eleventh', 'twelfth', 'thirteenth', 'fourteenth',
                      'fifteenth'],

// linear index to fifth = (2 * index + 1) % 7
  fifths: ['f', 'c', 'g', 'd', 'a', 'e', 'b'],
  accidentals: ['bb', 'b', '', '#', 'x'],

  sharp: [-4, 7],
  A4: [3, 3],

  durations: {
    '0.25': 'longa',
    '0.5': 'breve',
    '1': 'whole',
    '2': 'half',
    '4': 'quarter',
    '8': 'eighth',
    '16': 'sixteenth',
    '32': 'thirty-second',
    '64': 'sixty-fourth',
    '128': 'hundred-twenty-eighth'
  },

  qualityLong: {
    P: 'perfect',
    M: 'major',
    m: 'minor',
    A: 'augmented',
    AA: 'doubly augmented',
    d: 'diminished',
    dd: 'doubly diminished'
  },

  alterations: {
    perfect: ['dd', 'd', 'P', 'A', 'AA'],
    minor: ['dd', 'd', 'm', 'M', 'A', 'AA']
  },

  symbols: {
    'min': ['m3', 'P5'],
    'm': ['m3', 'P5'],
    '-': ['m3', 'P5'],

    'M': ['M3', 'P5'],
    '': ['M3', 'P5'],

    '+': ['M3', 'A5'],
    'aug': ['M3', 'A5'],

    'dim': ['m3', 'd5'],
    'o': ['m3', 'd5'],

    'maj': ['M3', 'P5', 'M7'],
    'dom': ['M3', 'P5', 'm7'],
    'ø': ['m3', 'd5', 'm7'],

    '5': ['P5']
  },

  chordShort: {
    'major': 'M',
    'minor': 'm',
    'augmented': 'aug',
    'diminished': 'dim',
    'half-diminished': '7b5',
    'power': '5',
    'dominant': '7'
  },

  stepNumber: {
    'unison': 1,
    'first': 1,
    'second': 2,
    'third': 3,
    'fourth': 4,
    'fifth': 5,
    'sixth': 6,
    'seventh': 7,
    'octave': 8,
    'ninth': 9,
    'eleventh': 11,
    'thirteenth': 13
  },

  // Adjusted Shearer syllables - Chromatic solfege system
  // Some intervals are not provided for. These include:
  // dd2 - Doubly diminished second
  // dd3 - Doubly diminished third
  // AA3 - Doubly augmented third
  // dd6 - Doubly diminished sixth
  // dd7 - Doubly diminished seventh
  // AA7 - Doubly augmented seventh
  intervalSolfege: {
    'dd1': 'daw',
    'd1': 'de',
    'P1': 'do',
    'A1': 'di',
    'AA1': 'dai',
    'd2': 'raw',
    'm2': 'ra',
    'M2': 're',
    'A2': 'ri',
    'AA2': 'rai',
    'd3': 'maw',
    'm3': 'me',
    'M3': 'mi',
    'A3': 'mai',
    'dd4': 'faw',
    'd4': 'fe',
    'P4': 'fa',
    'A4': 'fi',
    'AA4': 'fai',
    'dd5': 'saw',
    'd5': 'se',
    'P5': 'so',
    'A5': 'si',
    'AA5': 'sai',
    'd6': 'law',
    'm6': 'le',
    'M6': 'la',
    'A6': 'li',
    'AA6': 'lai',
    'd7': 'taw',
    'm7': 'te',
    'M7': 'ti',
    'A7': 'tai',
    'dd8': 'daw',
    'd8': 'de',
    'P8': 'do',
    'A8': 'di',
    'AA8': 'dai'
  }
};

},{}],16:[function(require,module,exports){
var scientific = require('scientific-notation');
var helmholtz = require('helmholtz');
var pitchFq = require('pitch-fq');
var knowledge = require('./knowledge');
var vector = require('./vector');
var Interval = require('./interval');

function pad(str, ch, len) {
  for (; len > 0; len--) {
    str += ch;
  }

  return str;
}


function Note(coord, duration) {
  if (!(this instanceof Note)) return new Note(coord, duration);
  duration = duration || {};

  this.duration = { value: duration.value || 4, dots: duration.dots || 0 };
  this.coord = coord;
}

Note.prototype = {
  octave: function() {
    return this.coord[0] + knowledge.A4[0] - knowledge.notes[this.name()][0] +
      this.accidentalValue() * 4;
  },

  name: function() {
    var value = this.accidentalValue();
    var idx = this.coord[1] + knowledge.A4[1] - value * 7 + 1;
    return knowledge.fifths[idx];
  },

  accidentalValue: function() {
    return Math.round((this.coord[1] + knowledge.A4[1] - 2) / 7);
  },

  accidental: function() {
    return knowledge.accidentals[this.accidentalValue() + 2];
  },

  /**
   * Returns the key number of the note
   */
  key: function(white) {
    if (white)
      return this.coord[0] * 7 + this.coord[1] * 4 + 29;
    else
      return this.coord[0] * 12 + this.coord[1] * 7 + 49;
  },

  /**
  * Returns a number ranging from 0-127 representing a MIDI note value
  */
  midi: function() {
    return this.key() + 20;
  },

  /**
   * Calculates and returns the frequency of the note.
   * Optional concert pitch (def. 440)
   */
  fq: function(concertPitch) {
    return pitchFq(this.coord, concertPitch);
  },

  /**
   * Returns the pitch class index (chroma) of the note
   */
  chroma: function() {
    var value = (vector.sum(vector.mul(this.coord, [12, 7])) - 3) % 12;

    return (value < 0) ? value + 12 : value;
  },

  interval: function(interval) {
    if (typeof interval === 'string') interval = Interval.toCoord(interval);

    if (interval instanceof Interval)
      return new Note(vector.add(this.coord, interval.coord), this.duration);
    else if (interval instanceof Note)
      return new Interval(vector.sub(interval.coord, this.coord));
  },

  transpose: function(interval) {
    this.coord = vector.add(this.coord, interval.coord);
    return this;
  },

  /**
   * Returns the Helmholtz notation form of the note (fx C,, d' F# g#'')
   */
  helmholtz: function() {
    var octave = this.octave();
    var name = this.name();
    name = octave < 3 ? name.toUpperCase() : name.toLowerCase();
    var padchar = octave < 3 ? ',' : '\'';
    var padcount = octave < 2 ? 2 - octave : octave - 3;

    return pad(name + this.accidental(), padchar, padcount);
  },

  /**
   * Returns the scientific notation form of the note (fx E4, Bb3, C#7 etc.)
   */
  scientific: function() {
    return this.name().toUpperCase() + this.accidental() + this.octave();
  },

  /**
   * Returns notes that are enharmonic with this note.
   */
  enharmonics: function(oneaccidental) {
    var key = this.key(), limit = oneaccidental ? 2 : 3;

    return ['m3', 'm2', 'm-2', 'm-3']
      .map(this.interval.bind(this))
      .filter(function(note) {
      var acc = note.accidentalValue();
      var diff = key - (note.key() - acc);

      if (diff < limit && diff > -limit) {
        var product = vector.mul(knowledge.sharp, diff - acc);
        note.coord = vector.add(note.coord, product);
        return true;
      }
    });
  },

  solfege: function(scale, showOctaves) {
    var interval = scale.tonic.interval(this), solfege, stroke, count;
    if (interval.direction() === 'down')
      interval = interval.invert();

    if (showOctaves) {
      count = (this.key(true) - scale.tonic.key(true)) / 7;
      count = (count >= 0) ? Math.floor(count) : -(Math.ceil(-count));
      stroke = (count >= 0) ? '\'' : ',';
    }

    solfege = knowledge.intervalSolfege[interval.simple(true).toString()];
    return (showOctaves) ? pad(solfege, stroke, Math.abs(count)) : solfege;
  },

  scaleDegree: function(scale) {
    var inter = scale.tonic.interval(this);

    // If the direction is down, or we're dealing with an octave - invert it
    if (inter.direction() === 'down' ||
       (inter.coord[1] === 0 && inter.coord[0] !== 0)) {
      inter = inter.invert();
    }

    inter = inter.simple(true).coord;

    return scale.scale.reduce(function(index, current, i) {
      var coord = Interval.toCoord(current).coord;
      return coord[0] === inter[0] && coord[1] === inter[1] ? i + 1 : index;
    }, 0);
  },

  /**
   * Returns the name of the duration value,
   * such as 'whole', 'quarter', 'sixteenth' etc.
   */
  durationName: function() {
    return knowledge.durations[this.duration.value];
  },

  /**
   * Returns the duration of the note (including dots)
   * in seconds. The first argument is the tempo in beats
   * per minute, the second is the beat unit (i.e. the
   * lower numeral in a time signature).
   */
  durationInSeconds: function(bpm, beatUnit) {
    var secs = (60 / bpm) / (this.duration.value / 4) / (beatUnit / 4);
    return secs * 2 - secs / Math.pow(2, this.duration.dots);
  },

  /**
   * Returns the name of the note, with an optional display of octave number
   */
  toString: function(dont) {
    return this.name() + this.accidental() + (dont ? '' : this.octave());
  }
};

Note.fromString = function(name, dur) {
  var coord = scientific(name);
  if (!coord) coord = helmholtz(name);
  return new Note(coord, dur);
};

Note.fromKey = function(key) {
  var octave = Math.floor((key - 4) / 12);
  var distance = key - (octave * 12) - 4;
  var name = knowledge.fifths[(2 * Math.round(distance / 2) + 1) % 7];
  var subDiff = vector.sub(knowledge.notes[name], knowledge.A4);
  var note = vector.add(subDiff, [octave + 1, 0]);
  var diff = (key - 49) - vector.sum(vector.mul(note, [12, 7]));

  var arg = diff ? vector.add(note, vector.mul(knowledge.sharp, diff)) : note;
  return new Note(arg);
};

Note.fromFrequency = function(fq, concertPitch) {
  var key, cents, originalFq;
  concertPitch = concertPitch || 440;

  key = 49 + 12 * ((Math.log(fq) - Math.log(concertPitch)) / Math.log(2));
  key = Math.round(key);
  originalFq = concertPitch * Math.pow(2, (key - 49) / 12);
  cents = 1200 * (Math.log(fq / originalFq) / Math.log(2));

  return { note: Note.fromKey(key), cents: cents };
};

Note.fromMIDI = function(note) {
  return Note.fromKey(note - 20);
};

module.exports = Note;

},{"./interval":14,"./knowledge":15,"./vector":19,"helmholtz":7,"pitch-fq":10,"scientific-notation":11}],17:[function(require,module,exports){
var knowledge = require('./knowledge');
var Interval = require('./interval');

var scales = {
  aeolian: ['P1', 'M2', 'm3', 'P4', 'P5', 'm6', 'm7'],
  blues: ['P1', 'm3', 'P4', 'd5', 'P5', 'm7'],
  chromatic: ['P1', 'm2', 'M2', 'm3', 'M3', 'P4',
    'A4', 'P5', 'm6', 'M6', 'm7', 'M7'],
  dorian: ['P1', 'M2', 'm3', 'P4', 'P5', 'M6', 'm7'],
  doubleharmonic: ['P1', 'm2', 'M3', 'P4', 'P5', 'm6', 'M7'],
  harmonicminor: ['P1', 'M2', 'm3', 'P4', 'P5', 'm6', 'M7'],
  ionian: ['P1', 'M2', 'M3', 'P4', 'P5', 'M6', 'M7'],
  locrian: ['P1', 'm2', 'm3', 'P4', 'd5', 'm6', 'm7'],
  lydian: ['P1', 'M2', 'M3', 'A4', 'P5', 'M6', 'M7'],
  majorpentatonic: ['P1', 'M2', 'M3', 'P5', 'M6'],
  melodicminor: ['P1', 'M2', 'm3', 'P4', 'P5', 'M6', 'M7'],
  minorpentatonic: ['P1', 'm3', 'P4', 'P5', 'm7'],
  mixolydian: ['P1', 'M2', 'M3', 'P4', 'P5', 'M6', 'm7'],
  phrygian: ['P1', 'm2', 'm3', 'P4', 'P5', 'm6', 'm7'],
  wholetone: ['P1', 'M2', 'M3', 'A4', 'A5', 'A6']
};

// synonyms
scales.harmonicchromatic = scales.chromatic;
scales.minor = scales.aeolian;
scales.major = scales.ionian;
scales.flamenco = scales.doubleharmonic;

function Scale(tonic, scale) {
  if (!(this instanceof Scale)) return new Scale(tonic, scale);
  var scaleName, i;
  if (!('coord' in tonic)) {
    throw new Error('Invalid Tonic');
  }

  if (typeof scale === 'string') {
    scaleName = scale;
    scale = scales[scale];
    if (!scale)
      throw new Error('Invalid Scale');
  } else {
    for (i in scales) {
      if (scales.hasOwnProperty(i)) {
        if (scales[i].toString() === scale.toString()) {
          scaleName = i;
          break;
        }
      }
    }
  }

  this.name = scaleName;
  this.tonic = tonic;
  this.scale = scale;
}

Scale.prototype = {
  notes: function() {
    var notes = [];

    for (var i = 0, length = this.scale.length; i < length; i++) {
      notes.push(this.tonic.interval(this.scale[i]));
    }

    return notes;
  },

  simple: function() {
    return this.notes().map(function(n) { return n.toString(true); });
  },

  type: function() {
    var length = this.scale.length - 2;
    if (length < 8) {
      return ['di', 'tri', 'tetra', 'penta', 'hexa', 'hepta', 'octa'][length] +
        'tonic';
    }
  },

  get: function(i) {
    var isStepStr = typeof i === 'string' && i in knowledge.stepNumber;
    i = isStepStr ? knowledge.stepNumber[i] : i;
    var len = this.scale.length;
    var interval, octaves;

    if (i < 0) {
      interval = this.scale[i % len + len - 1];
      octaves = Math.floor((i - 1) / len);
    } else if (i % len === 0) {
      interval = this.scale[len - 1];
      octaves = (i / len) - 1;
    } else {
      interval = this.scale[i % len - 1];
      octaves = Math.floor(i / len);
    }

    return this.tonic.interval(interval).interval(new Interval([octaves, 0]));
  },

  solfege: function(index, showOctaves) {
    if (index)
      return this.get(index).solfege(this, showOctaves);

    return this.notes().map(function(n) {
      return n.solfege(this, showOctaves);
    });
  },

  interval: function(interval) {
    interval = (typeof interval === 'string') ?
      Interval.toCoord(interval) : interval;
    return new Scale(this.tonic.interval(interval), this.scale);
  },

  transpose: function(interval) {
    var scale = this.interval(interval);
    this.scale = scale.scale;
    this.tonic = scale.tonic;

    return this;
  }
};
Scale.KNOWN_SCALES = Object.keys(scales);

module.exports = Scale;

},{"./interval":14,"./knowledge":15}],18:[function(require,module,exports){
var knowledge = require('./knowledge');

module.exports = function(teoria) {
  var Note = teoria.Note;
  var Chord = teoria.Chord;
  var Scale = teoria.Scale;

  Note.prototype.chord = function(chord) {
    var isShortChord = chord in knowledge.chordShort;
    chord = isShortChord ? knowledge.chordShort[chord] : chord;

    return new Chord(this, chord);
  };

  Note.prototype.scale = function(scale) {
    return new Scale(this, scale);
  };
};

},{"./knowledge":15}],19:[function(require,module,exports){
module.exports = {
  add: function(note, interval) {
    return [note[0] + interval[0], note[1] + interval[1]];
  },

  sub: function(note, interval) {
    return [note[0] - interval[0], note[1] - interval[1]];
  },

  mul: function(note, interval) {
    if (typeof interval === 'number')
      return [note[0] * interval, note[1] * interval];
    else
      return [note[0] * interval[0], note[1] * interval[1]];
  },

  sum: function(coord) {
    return coord[0] + coord[1];
  }
};

},{}],20:[function(require,module,exports){
var teoria = require("teoria");
var Converter = require("./converter.js");
var AudioPlayer = require("./audioplayer.js");

const Piano = (() => {
  var _rootFrequency = 220; //hz
  var _detuning = 0;
  const s = 100;
  var _intervals = ["0", "200", "400", "500", "700", "900", "1100"];

  // notes: 0,200,400,500,700,900,1100,1200
  var mode = 0;

  const NUM_NOTES_KEPT = 30;
  var _prevNotes = [];
  const _heldDegrees = {};

  const changeSettingsObservers = [];
  const onChangeSettings = (f) => {
    changeSettingsObservers.push(f);
  };

  const playNoteObservers = [];
  const onPlayNote = (f) => {
    playNoteObservers.push(f);
  };

  /*
     T T s |T| T T s
     T s T |T| T s T
     s T T |T| s T T
     T T T |s| T T s Lydian
     T T s |T| T s T
     T s T |T| s T T
     s T T |s| T T T
    */

  const scaleDegreeFromKeyCode = (keycode) => {
    var d;
    // console.log("keycode",keycode);
    switch (keycode) {
      case 20:
        d = 0;
        break; // caps lock
      case 65:
        d = 1;
        break; // a
      case 83:
        d = 2;
        break; // s
      case 68:
        d = 3;
        break; // d
      case 70:
        d = 4;
        break; // f
      case 71:
        d = 5;
        break; // g
      case 72:
        d = 6;
        break; // h
      case 74:
        d = 7;
        break; // j
      case 75:
        d = 8;
        break; // k
      case 76:
        d = 9;
        break; // l
      case 186:
        d = 10;
        break; // ;
      case 222:
        d = 11;
        break; // '
      case 13:
        d = 12;
        break; // enter

      default:
        d = undefined;
    }
    return d;
  };
  const handleDownEvent = (e) => {
    const d = scaleDegreeFromKeyCode(e.keyCode);
    if (d || d == 0) playScaleDegree(d);
  };
  const handleUpEvent = (e) => {
    const d = scaleDegreeFromKeyCode(e.keyCode);
    if (d || d == 0) stopScaleDegree(d);
  };
  const handleEvent = (e) => {
    if (e.type == "keydown") {
      handleDownEvent(e);
    } else if (e.type == "keyup") {
      handleUpEvent(e);
    } else {
      console.log("unsupported event", e);
    }
  };
  const onKeyDownOrUp = (e) => {
    if (Recorder.isOn()) {
      Recorder.recordEvent(e);
    }
    handleEvent(e);
  };

  const getDetunedRoot = () => {
    return _rootFrequency * Converter.centsToFraction(_detuning);
  };

  const getFrequencyOfDegree = (degree) => {
    const mod = Converter.myMod;
    const numNotesInScale = _intervals.length;

    const index = mod(degree - 1 + mode, numNotesInScale);
    const octaves = Math.floor((degree - 1 + mode) / numNotesInScale);
    const cents = _intervals[index] - _intervals[mode % numNotesInScale];
    const calculatedFrequency =
      getDetunedRoot() *
      Converter.centsToFraction(cents) *
      Math.pow(2, octaves);
    return calculatedFrequency;
  };
  const getScale = () => {
    const scale = [];
    for (var i = 0; i < _intervals.length; ++i) {
      var f = getFrequencyOfDegree(i + 1);
      var name = Converter.frequencyToName(f);
      scale.push(name);
    }
    console.log("scale", scale);
    return scale;
  };

  const playScaleDegree = (degree) => {
    /* prevent repeated playing of same note */
    if (_heldDegrees[degree]) {
      return;
    }
    _heldDegrees[degree] = true;

    const calculatedFrequency = getFrequencyOfDegree(degree);
    console.log("calc f", calculatedFrequency);
    const note = teoria.note.fromFrequency(calculatedFrequency);

    if (_prevNotes.length >= NUM_NOTES_KEPT) {
      _prevNotes = _prevNotes.slice(1);
    }
    _prevNotes.push(calculatedFrequency);
    playNoteObservers.forEach((obs) => obs(note));

    // console.log("playing note with frequency",f,"degree",degree,"scale",_scale);
    // AudioPlayer.playAttack();
    AudioPlayer.playNote({ frequency: calculatedFrequency }, degree);
  };
  const stopScaleDegree = (degree) => {
    _heldDegrees[degree] = false;
    AudioPlayer.stopNote(degree);
  };

  /* Controls */

  const setMajor = () => {
    mode = (mode + 1) % _intervals.length;
    notifySettingsChanged();
  };
  const setMinor = () => {
    mode = Converter.myMod(mode - 1, _intervals.length);
    notifySettingsChanged();
  };
  const upHalfStep = () => {
    _rootFrequency *= Converter.centsToFraction(100);
    notifySettingsChanged();
  };
  const downHalfStep = () => {
    _rootFrequency /= Converter.centsToFraction(100);
    notifySettingsChanged();
  };
  const setDetuning = (t) => {
    _detuning = t;
    notifySettingsChanged();
  };
  const setIntervals = (newIntervals) => {
    _intervals = newIntervals;
    notifySettingsChanged();
  };

  const notifySettingsChanged = () => {
    changeSettingsObservers.forEach((f) => f());
  };
  /* Recorder */
  const Recorder = (() => {
    var recorded = [];
    var timeoutHandles = [];
    var recording = false;
    var playingBack = false;

    const startRecording = () => {
      recorded = [];
      recording = true;
    };
    const stopRecording = () => {
      recording = false;
    };
    const playback = () => {
      console.log("recorded", recorded);
      if (recorded.length > 0) {
        const startTime = recorded[0].timeStamp;
        recorded.forEach((e) => {
          const offset = e.timeStamp - startTime;
          timeoutHandles.push(setTimeout(() => handleEvent(e), offset));
        });
      }
    };
    const loop = () => {
      const startTime = recorded[0].timeStamp;
      const endTime = recorded[recorded.length - 1].timeStamp;
      const duration = endTime - startTime;
      timeoutHandles.push(setInterval(playback, duration));
    };
    const stopPlayback = () => {
      timeoutHandles.forEach((h) => clearInterval(h));
      timeoutHandles = [];
    };
    const recordEvent = (e) => {
      recorded.push(e);
    };
    return {
      isOn: () => recording,
      recordEvent: recordEvent,
      startRecording: startRecording,
      stopRecording: stopRecording,
      playback: playback,
      loop: loop,
      stopPlayback: stopPlayback,
    };
  })();

  const setup = () => {
    const on = (char, f) => {
      $("body").keydown((e) => {
        if (e.key == char) {
          f();
        }
      });
    };

    // $("body").keydown(onKeyDownOrUp).keyup(onKeyDownOrUp);
  };

  return {
    playScaleDegree: playScaleDegree,
    stopScaleDegree: stopScaleDegree,

    onKeyDownOrUp: onKeyDownOrUp,
    downHalfStep: downHalfStep,
    upHalfStep: upHalfStep,
    setMajor: setMajor,
    setMinor: setMinor,
    setup: setup,

    getMode: () => mode,
    getRoot: () => _rootFrequency,
    getIntervals: () => _intervals,
    getScale: getScale,
    setIntervals: setIntervals,
    setDetuning: setDetuning,

    startRecording: Recorder.startRecording,
    stopRecording: Recorder.stopRecording,
    playback: Recorder.playback,
    stopPlayback: Recorder.playback,
    getRecentNotes: (num) => {
      if (num) {
        return _prevNotes.slice(-num);
      } else {
        return _prevNotes;
      }
    },
    onPlayNote: onPlayNote,
    onChangeSettings: onChangeSettings,
    loop: Recorder.loop,
  };
})();

module.exports = Piano;

},{"./audioplayer.js":1,"./converter.js":2,"teoria":12}],21:[function(require,module,exports){
const piano = require("./piano.js");
const Converter = require("./converter.js");
const AudioPlayer = require("./audioplayer.js");

function arraysEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }
  let equal = true;
  $.each(arr1, function (index, value) {
    if (value !== arr2[index]) {
      equal = false;
      return false; // break the loop
    }
  });
  return equal;
}

const TimbreControls = (() => {
  const setupVolumeComponent = () => {
    $("#volume").val(15);
    $("#volume").on("change", function () {
      AudioPlayer.setVolume(parseInt($(this).val()));
    });
  };
  const setupTimbreComponent = () => {
    const updateHarmonicAmplitudes = () => {
      $("#harmonicAmplitudes input").each(function (index) {
        AudioPlayer.setAmplitude(index + 1, $(this).val());
        AudioPlayer.setWaveTable("custom");
        $("#waveTableDropdown").val("custom");
      });
    };
    updateHarmonicAmplitudes();
    $("#harmonicAmplitudes input").on("change", function () {
      updateHarmonicAmplitudes();
    });
  };
  const setupWaveTableDropdown = () => {
    Object.keys(WaveTables()).forEach((key) => {
      $("#waveTableDropdown").append(
        $("<option>" + key + "</option>").val(key)
      );
    });

    $("#waveTableDropdown").on("change", function () {
      const v = $("#waveTableDropdown").val();
      AudioPlayer.setWaveTable(v);
      if (v == "custom") {
        $("#harmonicAmplitudes").show();
      } else {
        $("#harmonicAmplitudes").hide();
      }
    });
  };
  const setupCurrentScale = () => {
    $("#currentIntervals").val(piano.getIntervals().join(" "));
    const handleUpdateIntervals = () => {
      piano.setIntervals(
        $("#currentIntervals")
          .val()
          .split(/\s+/)
          .filter((name) => name.length > 0)
      );
    };
    $("#currentIntervals").on("keydown", (e) => {
      if (e.keyCode == 13) {
        handleUpdateIntervals();
        $("#currentIntervals").blur();
      }
    });
    $("#currentIntervalsButton").on("click", handleUpdateIntervals);
    //   $("#currentIntervals").on("input", handleUpdateIntervals);

    // preset intervals
    $("#minor").on("click", () => {
      $("#currentIntervals").val("0 200 300 500 700 900 1000");
      handleUpdateIntervals();
    });
    $("#ji").on("click", () => {
      $("#currentIntervals").val("0 204 386 498 702 884 1088");
      handleUpdateIntervals();
    });
    $("#pythagorean").on("click", () => {
      $("#currentIntervals").val(
        "0 203.91 407.82 498.04 701.96 905.87 1109.78"
      );
      handleUpdateIntervals();
    });
    $("#12tet").on("click", () => {
      $("#currentIntervals").val("0 200 400 500 700 900 1100");
      handleUpdateIntervals();
    });
    $("#pentatonic").on("click", () => {
      // 1, b3, 4, 5, b7
      $("#currentIntervals").val("0 300 500 700 1000");
      handleUpdateIntervals();
    });

    $("#currentIntervals").on("input", () => {
      let value = $("#currentIntervals").val();

      // Remove any non-numeric characters
      value = value.replace(/[^0-9 .-]/g, "");

      // If the input is empty, set it to 0
      if (value.length < 1) {
        $("#currentIntervals").val(0);
      } else if (value != $("#currentIntervals").val()) {
        $("#currentIntervals").val(value);
      }
      handleUpdateIntervals();
    });
    const updateDisplay = () => {
      console.log(piano.getIntervals());
      if (
        arraysEqual(piano.getIntervals(), [
          "0",
          "200",
          "400",
          "500",
          "700",
          "900",
          "1100",
        ])
      ) {
        let describe = {
          0: "Major",
          1: "Dorian",
          2: "Phrygian",
          3: "Lydian",
          4: "Mixolydian",
          5: "Minor",
          6: "Locrian",
        };
        $("#currentMode").text(
          `${piano.getMode() + 1} (${describe[piano.getMode()]})`
        );
      } else {
        $("#currentMode").text(piano.getMode() + 1);
      }
      $("#currentRoot").text(Converter.frequencyToName(piano.getRoot()));
      console.log("update display called");
      $("#currentScale").text(piano.getScale().toString());
    };
    updateDisplay();
    piano.onChangeSettings(updateDisplay);
  };
  const setupCurrentDetuning = () => {
    const updateCurrentDetuning = () => {
      const detuning = parseInt($("#currentDetuning").val());
      piano.setDetuning(detuning);
    };
    $("#currentDetuning").on("change", updateCurrentDetuning);
    $("#currentDetuning").val(0);
  };
  const setup = () => {
    setupVolumeComponent();
    setupWaveTableDropdown();
    setupTimbreComponent();
    setupCurrentScale();
    setupCurrentDetuning();
  };
  /****************/
  return {
    setup: setup,
  };
})();

module.exports = TimbreControls;

},{"./audioplayer.js":1,"./converter.js":2,"./piano.js":20}],22:[function(require,module,exports){
const WebAudio = require("./webaudio.js");
const Visualizer = (()=>{

    const width = 1024;
    const height = 300;

    const audioCtx = WebAudio.getContext();
    const analyserNode = audioCtx.createAnalyser();
    const bufferLength = analyserNode.frequencyBinCount;
    analyserNode.fftSize = 1024;
    const analyserBuffer = new Uint8Array(bufferLength);

    var $canvas;

    const visualizer = () => {
        const WIDTH = 400;
        const HEIGHT = 200;
        $canvas = $("<canvas>").attr("width",WIDTH).attr("height",HEIGHT);
        const canvas = $canvas[0];
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = "black";
        ctx.clearRect(0,0,WIDTH,HEIGHT);
        const draw = () => {
            requestAnimationFrame(draw);
            analyserNode.getByteFrequencyData(analyserBuffer); // update data in analyserBuffer
            ctx.fillStyle = "black";
            ctx.fillRect(0,0,WIDTH,HEIGHT);
            var barWidth = (WIDTH / bufferLength) * 2.5;
            var barHeight;
            var x = 0;
            for(var i = 0; i < bufferLength; ++i){
                barHeight = analyserBuffer[i]/2;
                ctx.fillStyle = 'rgb('+(barHeight+100) + ',50,50)';
                ctx.fillRect(x,HEIGHT-barHeight/2, barWidth,barHeight);
                x += barWidth + 1;
            }
        }
        draw();
        $(document).ready(()=>{
            $("#displays").append($canvas);
            $("#displays").append($("<hr>"));
        })
        
    }

    visualizer();
    const getNode = () => analyserNode;
    const getElement = () => $canvas;
    const getAnalyserBuffer = () => analyserBuffer;

    return ({
        getNode:getNode,
        getAnalyserBuffer:getAnalyserBuffer,
        getElement: getElement
    })


})

module.exports = Visualizer;
},{"./webaudio.js":23}],23:[function(require,module,exports){
const WebAudio = (()=>{

    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    if(!audioCtx){
        throw "AudioPlayer Error: your browser doesn't support web audio";
    }

    /* For use in connecting nodes but not actually allowing any sound to go through them */
    const createMuteNode = () => {
        const muteNode = audioCtx.createGain();
        muteNode.gain.value = 0;
        return muteNode;
    }
    return({
        getContext:()=>audioCtx,
        createMuteNode:createMuteNode
    })
})()

module.exports = WebAudio;
},{}]},{},[4]);
