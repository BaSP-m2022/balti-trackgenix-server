import mongoose from 'mongoose';

export default [{
  _id: mongoose.Types.ObjectId('6289110ececee60c913cb4fa'),
  projectName: 'New Project',
  description: 'This is a description.',
  isActive: true,
  admin: '6282d21b087676d2eedadc41',
  client: 'The Client',
  startDate: '2022-02-02T03:00:00.000Z',
  endDate: '2022-02-02T03:00:00.000Z',
  employees: [
    {
      role: 'DEV',
      rate: 24,
      hoursInProject: 48,
      _id: '6287c08beee9276577d53b1f',
    },
  ],
  __v: 0,
}];
