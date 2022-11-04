import {Chart, registerables} from 'chart.js';
import { StreamingPlugin, RealTimeScale } from 'chartjs-plugin-streaming';
import { pageLoaded } from './Lib';
import 'chartjs-adapter-date-fns';
import { enUS } from 'date-fns/locale'; 

const MyChart = (async()=>{

    Chart.register(StreamingPlugin, RealTimeScale);
    Chart.register(...registerables);


    /* create a canvas */
    var canvas = document.createElement("canvas");
    canvas.width = 400;
    canvas.height = 200;
    /* get the 2d context of the canvas */
    var canvasContext = canvas.getContext("2d");

    const onRefresh = ()=>{
      // chartjs.data.datasets.forEach(dataset => {
      //   dataset.data.push({
      //     x: Date.now(),
      //     y: Math.random()
      //   });
      // });
      // console.log(chartjs.data.datasets[0].data)
    }
    

    const data = {
      datasets: [
        {
          label: 'Dataset 1 (Linear Interpolation)',
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgb(255, 99, 132)',
          // backgroundColor: Utils.transparentize(Utils.CHART_COLORS.red, 0.5),
          // borderColor: Utils.CHART_COLORS.red,
          borderDash: [8, 4],
          data: []
        }
      ]
    };

    let chartjs = new Chart(canvasContext, {
      type: 'line',
      data: data,
      options: {
        scales: {
          x: {
            type: 'realtime',
            adapters: { 
              date: {
                locale: enUS, 
              },
            }, 
            realtime: {
              duration: 1000,
              refresh: 50,
              delay: 0,
              onRefresh: onRefresh
            }
          },
          y: {
            min:-1,
            max:1,
            type: 'linear',
            grace: '5%',
            title: {
              display: true,
              text: 'Value'
            }
          }
        },
        interaction: {
          intersect: false
        }
      }
    });


      let x = 0;
      function add(datum:number){
          chartjs.data.datasets[0].data.push({
              x: Date.now(),
              y:datum
          })
          ++x;
      }

      async function display(){
        await pageLoaded();
        document.body.appendChild(canvas);
    }
      await display();

    return {
        add,
        
    }
    

})

export {MyChart}