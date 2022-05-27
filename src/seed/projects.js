import mongoose from 'mongoose';

export default [{
  _id: mongoose.Types.ObjectId('628cf237305204bf7d672d7b'),
  projectName: 'First Project',
  description: 'Description of project',
  isActive: true,
  admin: mongoose.Types.ObjectId('6287b91426cff823b1f9055a'),
  client: 'Camila Figueroa',
  startDate: 2010 - 13 - 12,
  endDate: 2020 - 13 - 12,
  employees: [
    {
      employeeId: mongoose.Types.ObjectId('62891944b389642a7f13ca53'),
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
  admin: mongoose.Types.ObjectId('628cf22111b8397990200a06'),
  client: 'Fernando Morelli',
  startDate: 2015 - 25 - 10,
  endDate: 2021 - 25 - 10,
  employees: [
    {
      employeeId: mongoose.Types.ObjectId('628cf152c7dfd0c4fe2edb9e'),
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
  admin: mongoose.Types.ObjectId('628cf2263d81b46d975f94ba'),
  client: 'Federico Troanes',
  startDate: 2010 - 13 - 12,
  endDate: 2020 - 13 - 12,
  employees: [
    {
      employeeId: mongoose.Types.ObjectId('628cf15a2ca8617119124234'),
      role: 'PM',
      rate: 1000,
      hoursInProject: 200,
    },
  ],
  __v: 0,
},
];
