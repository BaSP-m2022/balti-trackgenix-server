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
  _id: mongoose.Types.ObjectId('628cf152c7dfd0c4fe2edb9e'),
  firstName: 'Camila',
  lastName: 'figueroa',
  email: 'sadsdssacamil@gmail.com',
  password: 'h231dda4',
  assignedProjects: [mongoose.Types.ObjectId('62891944b389642a7f13ca50'),
    mongoose.Types.ObjectId('62891944b389642a7f13ca51'), mongoose.Types.ObjectId('62891944b389642a7f13ca59')],
  isActive: true,
  __v: 0,
},
{
  _id: mongoose.Types.ObjectId('628cf15a2ca8617119124234'),
  firstName: 'Federico',
  lastName: 'Troanes',
  email: 'fedetroanes@gmail.com',
  password: 'fedekun23w3',
  assignedProjects: [mongoose.Types.ObjectId('62891944b389642a7f13ca59')],
  isActive: true,
  __v: 0,
},
];
