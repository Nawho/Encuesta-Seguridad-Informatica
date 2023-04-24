
export const barOptions = {
  responsive: true,
  maintainAspectRatio: true,
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
    }
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
      formatter: (value, ctx) => {

        let sum = ctx.dataset._meta[0].total;
        let percentage = (value * 100 / sum).toFixed(2) + "%";
        return percentage;


      },
      color: '#fff',
    }
  }


