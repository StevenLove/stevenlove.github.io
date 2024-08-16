const piano = require("./piano.js");
const Converter = require("./converter.js");
const AudioPlayer = require("./audioplayer.js");

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
    $("#ji").on("click", () => {
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
      $("#currentMode").text(piano.getMode());
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
