// random-noise-processor.js
class RandomNoiseProcessor extends AudioWorkletProcessor {

    static get parameterDescriptors() {
        return [
          {
            name: "targetFrequency",
            defaultValue: 440,
            minValue: Math.ceil(44100/128),
            maxValue: 44100/2,
          },
        ];
    }


    process(inputs, outputs, parameters) {
        // The input and output are both arrays of arrays.
        // The first dimension is the number of input or output channels.
        // The second dimension is the number of frames.

        // don't modify the input, just pass it through to the output
        const input = inputs[0];
        const output = outputs[0];
        const targetFrequency = parameters.targetFrequency;

        // console.log("parameters", parameters);

        // copy the input to the output
        for (let channel = 0; channel < input.length; ++channel) {
            // console.log("inputs",channel,input[channel].length)

            for (let i = 0; i < input[channel].length; ++i) {
                output[channel][i] = input[channel][i] // + Math.random()*0.5-0.25;
            }
            /* use autocorrelation to see how similar the first 28 samples are to the last 28 samples */
            let bufferToTest = output[channel]
            let sum = 0;
            let best = 0;

            let freq = (parameters["targetFrequency"].length > 1
            ? parameters["targetFrequency"][channel]
            : parameters["targetFrequency"][0]);
            let delta = Math.floor(44100 / freq);
            // console.log("delta,freq", delta,freq);

            for (let i = 0; i < (128-delta); ++i) {
                best += bufferToTest[i]*bufferToTest[i]
                sum += bufferToTest[i]*bufferToTest[i+delta]
            }
            // if(sum > 5){
                // console.log("sum",sum/best)
            if(sum){
                this.port.postMessage({sum:sum/best})
            }
            // }

            // output[channel].set(input[channel]);
        }
    //   const output = outputs[0];
    //   output.forEach((channel) => {
    //     for (let i = 0; i < channel.length; i++) {
    //       channel[i] = Math.random() * 2 - 1;
    //     }
    //   });
      return true;
    }
  }
  
  registerProcessor("random-noise-processor", RandomNoiseProcessor);