
export const barOptions = {
  responsive: true,
  maintainAspectRatio: false,
  events: [],
  scales: {

    y: {
      min: 0,
      max: 100,
      color: "white",
      ticks: {
        callback: function (value: any) {
          return value + '%'
        }
      }
    },

    /*     xAxes: [{
      display: false,
      barPercentage: 1.3,
      ticks: {
        max: 3,
      }
    }, {
      display: true,
      ticks: {
        autoSkip: false,
        max: 4,
      }
    }],
    yAxes: [{
      ticks: {
        beginAtZero: true
      }
    }] */
  },
  plugins: {
    legend: {
      display: false,
    }
  },
  grid: {
    color: "white",
    lineColor: "white",
    backgroundColor: "white",
    display: true,
    drawOnChartArea: true,
    drawTicks: true,
  },
  defaultFontColor: 'white'
}


export const pieOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    datalabels: {
      //@ts-ignore
      formatter: (value, ctx) => {
        let sum = 0
        let dataArr = ctx.chart.data.datasets[0].data
        //@ts-ignore
        dataArr.map(data => {
          sum += data
        })
        let percentage = (value * 100 / sum).toFixed(2) + "%"
        console.log(percentage)
        return percentage
      },
      color: '#fff',
    }
  }
}
