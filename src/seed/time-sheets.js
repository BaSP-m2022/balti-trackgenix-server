import mongoose from 'mongoose';

export default [{
  _id: mongoose.Types.ObjectId('6285b864f52d378096258169'),
  employee: mongoose.Types.ObjectId('6288f73964ed6961bb7c2075'),
  project: mongoose.Types.ObjectId('6289110ececee60c913cb4fa'),
  role: 'qa',
  date: '6/21/2021',
  rate: 10,
  workedHours: 33,
  description: 'Suspendisse potenti. Cras in purus eu magna vulputate luctus.',
  task: mongoose.Types.ObjectId('6288fa66a52cdee44fee0144'),
}];
