import mongoose from 'mongoose';

export default [{
  _id: mongoose.Types.ObjectId('62891944b389642a7f13ca53'),
  projectName: 'First Project',
  description: 'Description of project',
  isActive: true,
  admin: mongoose.Types.ObjectId('6287b91426cff823b1f9055a'),
  client: 'Camila Figueroa',
  startDate: 2010 - 13 - 12,
  endDate: 2020 - 13 - 12,
  employees: [
    {
      employeeId: mongoose.Types.ObjectId('6287c08beee9276577d53b1f'),
      role: 'DEV',
      rate: 2000,
      hoursInProject: 500,
    },
  ],
},
{
  _id: mongoose.Types.ObjectId('62891944b389642a7f13ca56'),
  projectName: 'Second Project',
  description: 'Description of project',
  isActive: true,
  admin: mongoose.Types.ObjectId('6287b9da26cff823b1f9055b'),
  client: 'Fernando Morelli',
  startDate: 2015 - 25 - 10,
  endDate: 2021 - 25 - 10,
  employees: [
    {
      employeeId: mongoose.Types.ObjectId('6287e6f01c1709ee93503342'),
      role: 'QA',
      rate: 3000,
      hoursInProject: 700,
    },
  ],
},
{
  _id: mongoose.Types.ObjectId('62891944b389642a7f13ca59'),
  projectName: 'Third Project',
  description: 'Description of project',
  isActive: false,
  admin: mongoose.Types.ObjectId('6287b91426cff823b1f9055a'),
  client: 'Federico Troanes',
  startDate: 2010 - 13 - 12,
  endDate: 2020 - 13 - 12,
  employees: [
    {
      employeeId: mongoose.Types.ObjectId('6287c08beee9276577d53b1f'),
      role: 'PM',
      rate: 1000,
      hoursInProject: 200,
    },
  ],
},
{
  _id: mongoose.Types.ObjectId('62891944b389642a7f13ca58'),
  projectName: 'Fourth Project',
  description: 'Description of project',
  isActive: false,
  admin: mongoose.Types.ObjectId('6287b9da26cff823b1f9055b'),
  client: 'Nicolas Costanza',
  startDate: 2015 - 25 - 10,
  endDate: 2021 - 25 - 10,
  employees: [
    {
      employeeId: mongoose.Types.ObjectId('6287e6f01c1709ee93503342'),
      role: 'TL',
      rate: 5000,
      hoursInProject: 700,
    },
  ],
},
{
  _id: mongoose.Types.ObjectId('62891944b389642a7f13ca51'),
  projectName: 'Fifth Project',
  description: 'Description of project',
  isActive: true,
  admin: mongoose.Types.ObjectId('6287b91426cff823b1f9055a'),
  client: 'Florencia Eusebi',
  startDate: 2010 - 13 - 12,
  endDate: 2020 - 13 - 12,
  employees: [
    {
      employeeId: mongoose.Types.ObjectId('6288f73964ed6961bb7c2075'),
      role: 'PM',
      rate: 8000,
      hoursInProject: 1000,
    },
  ],
},
{
  _id: mongoose.Types.ObjectId('62891944b389642a7f13ca50'),
  projectName: 'Sixth Project',
  description: 'Description of project',
  isActive: false,
  admin: mongoose.Types.ObjectId('6287b9da26cff823b1f9055b'),
  client: 'Agustin Ferrarello',
  startDate: 2015 - 25 - 10,
  endDate: 2021 - 25 - 10,
  employees: [
    {
      employeeId: mongoose.Types.ObjectId('6288f73964ed6961bb7c2075'),
      role: 'DEV',
      rate: 7000,
      hoursInProject: 500,
    },
  ],
},
];
