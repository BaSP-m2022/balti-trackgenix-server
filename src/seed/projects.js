import mongoose from 'mongoose';

export default [{
  _id: mongoose.Types.ObjectId('628cf237305204bf7d672d7b'),
  projectName: 'First Project',
  description: 'Description of project',
  isActive: true,
  admin: '6287b91426cff823b1f9055a',
  client: 'Camila Figueroa',
  startDate: 2010 - 13 - 12,
  endDate: 2020 - 13 - 12,
  employees: [
    {
      employeeId: '6287c08beee9276577d53b1f',
      role: 'DEV',
      rate: 2000,
      hoursInProject: 500,
    },
  ],
  __v: 0,
},
{
  _id: mongoose.Types.ObjectId('628cf23dfb13310e147c4fdb'),
  projectName: 'Second Project',
  description: 'Description of project',
  isActive: true,
  admin: '6287b9da26cff823b1f9055b',
  client: 'Fernando Morelli',
  startDate: 2015 - 25 - 10,
  endDate: 2021 - 25 - 10,
  employees: [
    {
      employeeId: '6287e6f01c1709ee93503342',
      role: 'QA',
      rate: 3000,
      hoursInProject: 700,
    },
  ],
  __v: 0,
},
{
  _id: mongoose.Types.ObjectId('628cf2442fed32f30b57dc75'),
  projectName: 'Third Project',
  description: 'Description of project',
  isActive: false,
  admin: '6287b91426cff823b1f9055a',
  client: 'Federico Troanes',
  startDate: 2010 - 13 - 12,
  endDate: 2020 - 13 - 12,
  employees: [
    {
      employeeId: '6287c08beee9276577d53b1f',
      role: 'PM',
      rate: 1000,
      hoursInProject: 200,
    },
  ],
  __v: 0,
},
];
