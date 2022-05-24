import mongoose from 'mongoose';

export default [{
  _id: mongoose.Types.ObjectId('6287c08beee9276577d53b1f'),
  firstName: 'Nicolas',
  lastName: 'Costanza',
  email: 'nicolas22@gmail.com',
  password: 'hola1234',
  assignedProjects: [mongoose.Types.ObjectId('6287f93beee9276577d60c1f'),
    mongoose.Types.ObjectId('628cdc2cb0286cd96797ca13')],
  isActive: true,
  __v: 0,
},
{
  _id: mongoose.Types.ObjectId('628cdc224fc0ef4f8c43b1b1'),
  firstName: 'Camila',
  lastName: 'figueroa',
  email: 'sadsdssacamil@gmail.com',
  password: 'h231dda4',
  assignedProjects: [mongoose.Types.ObjectId('6287c08beee9276577d53b1f'),
    mongoose.Types.ObjectId('628cdc2cb0286cd96797ca13'), mongoose.Types.ObjectId('628cdc4341a15a13e5db4907')],
  isActive: true,
  __v: 0,
},
{
  _id: mongoose.Types.ObjectId('628cdcd718ff154a072c3642'),
  firstName: 'Federico',
  lastName: 'Troanes',
  email: 'fedetroanes@gmail.com',
  password: 'fedekun23w3',
  assignedProjects: [mongoose.Types.ObjectId('628cdcd07a9afd1c52e6ff1e')],
  isActive: true,
  __v: 0,
}];
