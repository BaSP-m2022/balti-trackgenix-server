import mongoose from 'mongoose';

export default [{
  _id: mongoose.Types.ObjectId('62891944b389642a7f13ca53'),
  firstName: 'Nicolas',
  lastName: 'Costanza',
  email: 'nicolas22@gmail.com',
  password: 'hola1234',
  assignedProjects: [mongoose.Types.ObjectId('62891944b389642a7f13ca50'),
    mongoose.Types.ObjectId('62891944b389642a7f13ca51')],
  isActive: true,
  __v: 0,
},
{
  _id: mongoose.Types.ObjectId('628cdc224fc0ef4f8c43b1b1'),
  firstName: 'Camila',
  lastName: 'figueroa',
  email: 'sadsdssacamil@gmail.com',
  password: 'h231dda4',
  assignedProjects: [mongoose.Types.ObjectId('62891944b389642a7f13ca53'),
    mongoose.Types.ObjectId('62891944b389642a7f13ca56'), mongoose.Types.ObjectId('62891944b389642a7f13ca59')],
  isActive: true,
  __v: 0,
},
{
  _id: mongoose.Types.ObjectId('62891944b389642a7f13ca58'),
  firstName: 'Federico',
  lastName: 'Troanes',
  email: 'fedetroanes@gmail.com',
  password: 'fedekun23w3',
  assignedProjects: [mongoose.Types.ObjectId('62891944b389642a7f13ca53')],
  isActive: true,
  __v: 0,
}];
