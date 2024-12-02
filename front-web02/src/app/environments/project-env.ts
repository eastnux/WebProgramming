export const projName = '200221029';
export const deviceId = 'ECAM1234567';


export const systemParas: any = [ 
    { key: 'valueHoldingTime', value: 60000 },
    {key:"monitoringInterval", value:30*60*1000},
    {key:"analysisInterval", value:30*60*1000}
];

export const exampleData = { // for test for the object editor
    name: 'John Doe',
    age: 30,
    address: {
        street: '123 Main St',
        city: {
            name: 'New York',
            town: 'Queens'
        },
        state: 'NY'
    },
    hobbies: ['reading', 'gaming']
    // hobbies: [{ hobby: 'reading' }, { hobby: 'gaming' }]
};
