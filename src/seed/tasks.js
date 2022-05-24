import mongoose from 'mongoose';

export default [
  {
    _id: mongoose.Types.ObjectId('6288fa66a52cdee44fee0144'),
    employeeId: mongoose.Types.ObjectId('628cdc224fc0ef4f8c43b1b1'),
    projectId: mongoose.Types.ObjectId('62891944b389642a7f13ca50'),
    title: 'Task 1 Nico',
    description: 'This is the task 1',
    date: 2020 - 25 - 9,
    done: true,
  },
  {
    _id: mongoose.Types.ObjectId('6288fa66a52cdee44fee0145'),
    employeeId: mongoose.Types.ObjectId('6287c08beee9276577d53b1f'),
    projectId: mongoose.Types.ObjectId('62891944b389642a7f13ca50'),
    title: 'Task 2 Nico',
    description: 'This is the task 2',
    date: 2020 - 28 - 9,
    done: true,
  },
  {
    _id: mongoose.Types.ObjectId('6288fa66a52cdee44fee0146'),
    employeeId: mongoose.Types.ObjectId('6282d21b087676d2eedadc44'),
    projectId: mongoose.Types.ObjectId('62893107ea8586fcd9e96137'),
    title: 'Task 3',
    description: 'This is the task 3',
    date: 2020 - 2 - 10,
    done: true,
  }];
