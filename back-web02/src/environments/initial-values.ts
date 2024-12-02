export const initialValues = {
  deviceResponse: {
    status: 'success',
    message: 'Devices fetched successfully!',
    data: {
      count: 3,
      devices: [
        { "_id": "iL9xuJGHUjjFSpxtAt2X", "owner": "C^[4GvGk&KQZl", "createdAt": "Sep 2, 2097, 10:19:23 AM", "credentials": { "accessToken": "", "certificates": {} }, "operations": { "deviceRules": [], "deviceStatus": true }, "name": "Elmer Device", "type": { deviceType: "Device Name 6" } },
        { "_id": "QJONXEsMGxS3vB4DR8Th", "owner": "eSoFUghOWCln", "createdAt": "Jun 25, 2033, 11:05:05 PM", "credentials": { "accessToken": "", "certificates": {} }, "operations": { "deviceRules": [], "deviceStatus": true }, "name": "Alex Device", "type": { deviceType: "Device Name 1" } },
        { "_id": "bDmo0zNoceSYBzfKBpvO", "owner": "5f]1Y0[#G)k(E", "createdAt": "Sep 19, 2034, 9:59:49 AM", "credentials": { "accessToken": "", "certificates": {} }, "operations": { "deviceRules": [], "deviceStatus": false }, "name": "Corey Device", "type": { deviceType: "TiSesnorTag" } }
      ],
    }
  },
  //deviceResponse////////////////////////////////////////

  popUpData: {
    title: {
      name: '76jasdbk0920',
      icon: 'id-badge',
    },
    tabs: {
      attributes: [
        {
          Title: 'Humidity',
          Content: 50.997729349,
          Footer: new Date().toISOString(),
        },
        {
          Title: 'Lights ON',
          Content: 0,
          Footer: new Date().toISOString(),
        },
        {
          Title: 'Occupancy',
          Content: 5,
          Footer: new Date().toISOString(),
        },
        {
          Title: 'Projector ON',
          Content: 36.354,
          Footer: new Date().toISOString(),
        },
        {
          Title: 'Temperature',
          Content: 5,
          Footer: new Date().toISOString(),
        },
        {
          Title: 'Luminosity',
          Content: 78.323,
          Footer: new Date().toISOString(),
        },
        {
          Title: 'Prerna',
          Content: 50.997729349,
          Footer: new Date().toISOString(),
        },
        {
          Title: 'patraaj ON',
          Content: 0,
          Footer: new Date().toISOString(),
        },
        {
          Title: 'nds;oasfkd',
          Content: 5,
          Footer: new Date().toISOString(),
        },
        {
          Title: 'mlsandvls ON',
          Content: 36.354,
          Footer: new Date().toISOString(),
        },
        {
          Title: 'asdvm s.d',
          Content: 5,
          Footer: new Date().toISOString(),
        },
      ],
      actions: [
        {
          icon: ' snowflake',
          value: 'Turn ON AC',
          toggle: false,
        },
        {
          icon: 'lightbulb',
          value: 'Turn ON Lights',
          toggle: false,
        },
        {
          icon: 'camera',
          value: 'Projector ON',
          toggle: false,
        },
        {
          icon: 'thermometer-empty',
          value: 'Temprature Check',
          toggle: false,
        },
      ],
    },
    config: {
      dismissbtn: true,
    },
  },
  //popUpData///////////////////////////////

  dataTableActions: {
    actions: [
      { name: 'analytics', icon: 'analytics', color: 'primary' },
      { name: 'disable', icon: 'visibility', iconOpp: 'visibility_off', color: 'accent', showOnDisabled: true, showOnHover: true },
      { name: 'delete', icon: 'delete', color: 'warn', showOnHover: true }
    ],
    bulkActions: [
      { icon: 'delete', name: 'delete', color: 'warn' },
      { icon: 'visibility', name: 'disable' }
    ],
  },

  //dataTableActions////////////////////////////////////////

  dataTableConfig: {
    checkbox: true,
    pageSize: 5,
    pageSizeOptions: [5, 10, 15, 20, 50],
    searchBox: true,
    totalCount: 20
  },
  //dataTableConfig////////////////////////////////////////


setting : [
  {
    Elements_Number: 6,
    color: 'yellow',
    icon: 'build',
    design: 'design3',
    apipaginator: false
  }
],
  //settings////////////////////////////////////////

action : [
    'Turn On AC',
    'Turn Off AC',
    'Start Meeting',
    'End Meeting',
    'Turn On Projector',
    'Turn off Projector',
    'Focus On',
    'Focus Off',
  ],
  //action ////////////////////////////////////////

}