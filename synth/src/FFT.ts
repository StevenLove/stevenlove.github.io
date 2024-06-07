import FFT from 'fft.js';

const MyFFT = (()=>{

    const f = new FFT(4096);

    const input = new Array(4096);
    input.fill(0);

    const out = f.createComplexArray();



    // const fft = new fftlib.fft(C.VISUALIZER_FFT_SIZE);
    // const real = new Float32Array(C.VISUALIZER_FFT_SIZE);
    // const imag = new Float32Array(C.VISUALIZER_FFT_SIZE);
    // const spectrum = new Float32Array(C.VISUALIZER_FFT_SIZE);
    // return {
    //     getFFTSize: ()=>{
    //         return C.VISUALIZER_FFT_SIZE;
    //     },
    //     getFrequencyData: (audioData:Float32Array)=>{
    //         for(let i = 0; i < C.VISUALIZER_FFT_SIZE; i++){
    //             real[i] = audioData[i];
    //             imag[i] = 0;
    //         }
    //         fft.realTransform(real, imag);
    //         for(let i = 0; i < C.VISUALIZER_FFT_SIZE; i++){
    //             spectrum[i] = Math.sqrt(real[i] * real[i] + imag[i] * imag[i]);
    //         }
    //         return spectrum;
    //     }
    // }
})