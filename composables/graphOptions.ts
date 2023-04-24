
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
}


