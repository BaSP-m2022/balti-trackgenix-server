import models from '../models/Admins';

const fs = require('fs');
const admin = require('../data/admins.json');

// eslint-disable-next-line consistent-return
export const getAllAdmins = async (req, res) => {
  try {
    const AllAdmins = await models.find({});
    return res.status(200).json(AllAdmins);
  } catch (err) {
    res.status(500).json({
      msg: 'There was an error',
    });
  }
};

export const addAdmin = (req, res) => {
  const newAdm = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    id: req.body.id,
  };
  if (!newAdm.firstName || !newAdm.lastName || !newAdm.email || !newAdm.id) {
    return res.status(400).json({
      success: false,
      msg: 'Please put a name, surname, email and id.',
    });
  }
  admin.push(newAdm);
  fs.writeFileSync('src/data/admins.json', JSON.stringify(admin));
  return res.status(200).json({
    success: true,
    data: newAdm,
  });
};

export const findAdmin = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const found = admin.find((adm) => adm.id === id);
  if (found) {
    res.status(200).json({
      success: true,
      data: found,
    });
  } else {
    res.status(400).json({
      success: false,
      msg: `No admin with the id of ${req.params.id}`,
    });
  }
};

export const delAdmin = (req, res) => {
  const found = admin.filter((adm) => adm.id !== parseInt(req.query.id, 10));
  if (found.length === admin.length) {
    res.status(400).json({
      success: false,
      msg: `No admin with the id of ${req.params.id}`,
    });
  }
  fs.writeFile('src/data/admins.json', JSON.stringify(found), (err) => {
    if (err) {
      res.status(400).json({
        success: false,
        msg: (err),
      });
    }
  });
  res.status(200).json({
    msg: 'Admin has been deleted',
    success: true,
    data: found,
  });
};

export const editAdmin = (req, res) => {
  const admId = parseInt(req.query.id, 10);
  const admData = req.body;
  const found = admin.some((sa) => sa.id === admId);
  if (found) {
    admin.forEach((sa, index) => {
      if (sa.id === admId) {
        admin[index].firstName = admData.firstName;
        admin[index].lastName = admData.lastName;
        admin[index].email = admData.email;
        fs.writeFile('src/data/admins.json', JSON.stringify(admin), (err) => {
          if (err) {
            res.send(err);
          }
        });
      }
    });
  } else {
    res.status(400).json({
      success: false,
      msg: `Admin id ${admId} not found`,
    });
  }
  res.status(200).json({
    success: true,
    msg: `admin id ${admData.id} edited`,
    data: found,
  });
};
