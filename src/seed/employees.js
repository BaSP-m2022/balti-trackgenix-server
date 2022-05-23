import mongoose from 'mongoose';

export default [{
  _id: mongoose.Types.ObjectId(3),
  firstName: 'Nicolas',
  lastName: 'Costanza',
  email: 'nicolas22@gmail.com',
  password: 'hola1234',
  assignedProjects: ['6287f93beee9276577d60c1f', '6288k93beee9276577d60c1s'],
  isActive: true,
  __v: 0,
},
{
  _id: mongoose.Types.ObjectId(4),
  firstName: 'Camila',
  lastName: 'figueroa',
  email: 'sadsdssacamil@gmail.com',
  password: 'h231dda4',
  assignedProjects: ['6288k93beee9276577d60c1s', '1998k93beee9276577d60c4u', '0034k93beee9276577d60c4g'],
  isActive: true,
  __v: 0,
},
{
  _id: mongoose.Types.ObjectId(2),
  firstName: 'Federico',
  lastName: 'Troanes',
  email: 'fedetroanes@gmail.com',
  password: 'fedekun23w3',
  assignedProjects: ['2134b7f40b47573aa06aef3'],
  isActive: true,
}];
