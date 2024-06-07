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

    // const onRefresh = ()=>{
    //   // chartjs.data.datasets.forEach(dataset => {
    //   //   dataset.data.push({
    //   //     x: Date.now(),
    //   //     y: Math.random()
    //   //   });
    //   // });
    //   // console.log(chartjs.data.datasets[0].data)
    //   chartjs.update();
    // }
    

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
        },{
          label: 'Dataset 2 (Linear Interpolation)',
          backgroundColor: 'rgb(1, 99, 132)',
          borderColor: 'rgb(1, 99, 132)',
          // backgroundColor: Utils.transparentize(Utils.CHART_COLORS.red, 0.5),
          // borderColor: Utils.CHART_COLORS.red,
          borderDash: [8, 4],
          data: []
        }
      ]
    };

    let chartjs = new Chart(canvasContext, {
      type: 'scatter',
      data: data,
      options: {
        animation: false,
        scales: {
          x: {
            type: 'realtime',
            adapters: { 
              date: {
                locale: enUS, 
              },
            }, 
            realtime: {
              ttl: undefined,   // data will be automatically deleted as it disappears off the chart
              frameRate: 10,    // data points are drawn 30 times every second
              duration: 1000,   // data over the last 1000ms will be displayed
              refresh: 50,      // onRefresh callback will be called every 10ms
              delay: 0,         // delay of 0ms, so upcoming values are known before plotting a line
              // onRefresh: onRefresh
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
      let d = Date.now();
      function add(datum:number,datasetID?:number){
          let index = datasetID || 0;
          let now = Date.now();
          if(now==d){
            now+=10
          }
          d = now;
          // console.log("adding",performance.now())
          chartjs.data.datasets[index].data.push({
              x: now,
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