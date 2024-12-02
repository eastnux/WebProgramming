export const deviceIds: string[] =
  [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10"
  ]
export const deviceInfos: any[] = [
  {
    id: deviceIds[0],
    items: [
      { name: "Voltage", value: "---", unit: "V" },
      { name: "I_in", value: "---", unit: "A" },
      { name: "I_out", value: "---", unit: "A" },
    ]
  },
  {
    id: deviceIds[1],
    items: [
      { name: "Voltage", value: "---", unit: "V" },
      { name: "I_in", value: "---", unit: "A" },
      { name: "I_out", value: "---", unit: "A" },
    ]
  },
  {
    id: deviceIds[2],
    items: [
      { name: "Voltage", value: "---", unit: "V" },
      { name: "I_in", value: "---", unit: "A" },
      { name: "I_out", value: "---", unit: "A" },
    ]
  },
  {
    id: deviceIds[3],
    items: [
      { name: "Voltage", value: "---", unit: "V" },
      { name: "I_in", value: "---", unit: "A" },
      { name: "I_out", value: "---", unit: "A" },
    ]
  },
  {
    id: deviceIds[4],
    items: [
      { name: "Voltage", value: "---", unit: "V" },
      { name: "I_in", value: "---", unit: "A" },
      { name: "I_out", value: "---", unit: "A" },
    ]
  },
  {
    id: deviceIds[5],
    items: [
      { name: "Voltage", value: "---", unit: "V" },
      { name: "I_in", value: "---", unit: "A" },
      { name: "I_out", value: "---", unit: "A" },
    ]
  },
  {
    id: deviceIds[6],
    items: [
      { name: "Voltage", value: "---", unit: "V" },
      { name: "I_in", value: "---", unit: "A" },
      { name: "I_out", value: "---", unit: "A" },
    ]
  },
  {
    id: deviceIds[7],
    items: [
      { name: "Voltage", value: "---", unit: "V" },
      { name: "I_in", value: "---", unit: "A" },
      { name: "I_out", value: "---", unit: "A" },
    ]
  },
  {
    id: deviceIds[8],
    items: [
      { name: "Voltage", value: "---", unit: "V" },
      { name: "I_in", value: "---", unit: "A" },
      { name: "I_out", value: "---", unit: "A" },
    ]
  },
  {
    id: deviceIds[9],
    items: [
      { name: "Voltage", value: "---", unit: "V" },
      { name: "I_in", value: "---", unit: "A" },
      { name: "I_out", value: "---", unit: "A" },
    ]
  },
];

export const ChartOptionDateTimeOne = {
  credits: { enabled: false, },
  title: { text: 'Zoomable Graph', },
  chart: { zoomType: 'xy', },
  legend: { enabled: true, },
  xAxis: {
    type: 'datetime',
    dateTimeLabelFormats: {}
  },
  time: { useUTC: false, },
  yAxis: [{}, { opposite: false }],
  plotOptions: {
    line: {
      marker: { radius: 2, },
      lineWidth: 1,
      states: { hover: { lineWidth: 1, }, },
      threshold: null,
    },
  },
  series: [
    {
      type: 'line',
      name: 'temp1',
      data: [[0, 0], [1e6, 0]],
    },
  ],
};

export const ChartOptionDateTimeLeft = {
  credits: { enabled: false, },
  title: { text: '', },
  chart: { zoomType: 'xy', },
  legend: {
    enabled: true,
    layout: "horizontal",
    align: "left",
    verticalAlign: "top", //"bottom", //top",
    alignColumns: true,
    backgroundColor: "white",
    borderColor: "black",
    borderRadius: 5,
    shadow: true,
    symbolHeight: 40,
  },
  time: { useUTC: false, },
  xAxis: {
    type: 'datetime',
    dateTimeLabelFormats: {},
    title: {text:'time'},
  },
  yAxis: [{
    title: {text:''}
  }, { opposite: false }],
  plotOptions: {
    line: {
      marker: { radius: 4, },
      lineWidth: 1,
      states: { hover: { lineWidth: 1, }, },
      threshold: null,
    },
  },
  series: [ //optionSeries
    {
      type: 'line',
      name: 'temp1',
      data: [[0, 0], [1e6, 0]],
    },
    {
      type: 'line',
      name: 'temp2',
      data: [[0, 1], [1e6, 3]],
    },
  ],
};


export const ChartOptionDateTimeTwo = {
  credits: { enabled: false, },
  title: { text: 'Zoomable Graph', },
  chart: { zoomType: 'xy', },
  legend: { enabled: true, },
  xAxis: {
    type: 'datetime',
    dateTimeLabelFormats: {}
  },
  time: { useUTC: false, },
  yAxis: [
    {
      title: { text: 'Battery Voltage [V]' },
    },
    {
      title: { text: 'Battery Currents [A]' },
      opposite: true
    }],
  plotOptions: {
    line: {
      marker: { radius: 2, },
      lineWidth: 1,
      states: { hover: { lineWidth: 1, }, },
      threshold: null,
    },
  },
  series: [
    {
      type: 'line',
      name: 'temp1',
      yAxis: 0,
      data: [[0, 0], [1e6, 0]],
    },
    {
      type: 'line',
      name: 'temp2',
      yAxis: 1,
      data: [[0, 1], [1e6, 3]],
    },
  ],
};

export const testData=[
  { id:'test1', item:'Voltage', 
    values:[ [0, 1], [100000, 2], [200000, 3], [300000, 4], [400000, 5], [500000, 6] ]
  },
  { id:'test1', item:'Current', 
    values:[ [0, 11], [100000, 12], [200000, 13], [300000, 14], [400000, 15], [500000, 16] ]
  },
  { id:'test1', item:'Tempt', 
    values:[ [0, 21], [100000, 22], [200000, 23], [300000, 24], [400000, 25], [500000, 26] ]
  },

  { id:'test2', item:'Voltage', 
    values:[ [0, 2], [100000, 3], [200000, 4], [300000, 5], [400000, 6], [500000, 7] ]
  },
  { id:'test2', item:'Current', 
    values:[ [0, 12], [100000, 13], [200000, 14], [300000, 15], [400000, 16], [500000, 17] ]
  },
  { id:'test2', item:'Tempt', 
    values:[ [0, 22], [100000, 23], [200000, 24], [300000, 25], [400000, 26], [500000, 27] ]
  },

  { id:'test3', item:'Voltage', 
    values:[ [0, 3], [100000, 4], [200000, 5], [300000, 6], [400000, 7], [500000, 8] ]
  },
  { id:'test3', item:'Current', 
    values:[ [0, 13], [100000, 14], [200000, 15], [300000, 16], [400000, 17], [500000, 18] ]
  },
  { id:'test3', item:'Tempt', 
    values:[ [0, 23], [100000, 24], [200000, 25], [300000, 26], [400000, 27], [500000, 28] ]
  },
]