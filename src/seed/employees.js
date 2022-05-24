import mongoose from 'mongoose';

export default [{
  _id: mongoose.Types.ObjectId('62891944b389642a7f13ca53'),
  firstName: 'Nicolas',
  lastName: 'Costanza',
  email: 'nicolas22@gmail.com',
  password: 'hola1234',
  assignedProjects: [mongoose.Types.ObjectId('628cf2442fed32f30b57dc75'),
    mongoose.Types.ObjectId('628cf23dfb13310e147c4fdb')],
  isActive: true,
  __v: 0,
},
{
  _id: mongoose.Types.ObjectId('628cf152c7dfd0c4fe2edb9e'),
  firstName: 'Camila',
  lastName: 'figueroa',
  email: 'sadsdssacamil@gmail.com',
  password: 'h231dda4',
  assignedProjects: [mongoose.Types.ObjectId('628cf237305204bf7d672d7b'),
    mongoose.Types.ObjectId('628cf23dfb13310e147c4fdb'), mongoose.Types.ObjectId('628cf2442fed32f30b57dc75')],
  isActive: true,
  __v: 0,
},
{
  _id: mongoose.Types.ObjectId('628cf15a2ca8617119124234'),
  firstName: 'Federico',
  lastName: 'Troanes',
  email: 'fedetroanes@gmail.com',
  password: 'fedekun23w3',
  assignedProjects: [mongoose.Types.ObjectId('628cf237305204bf7d672d7b')],
  isActive: true,
  __v: 0,
}];
