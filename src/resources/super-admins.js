const fs = require('fs');
const superAd = require('../data/super-admins.json');

// const idFilter = (req) => (fSuperAd) => fSuperAd.id === parseInt(req.params.id, 10);

export const getAllSuperAdmin = (req, res) => {
  res.status(200).json({
    success: true,
    data: getAllSuperAdmin,
  });
};

export const addSuperAdmin = (req, res) => {
  const newSA = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    id: req.body.id,
  };
  if (!newSA.firstName || !newSA.lastName || !newSA.email || !newSA.id) {
    return res.status(400).json({
      success: false,
      msg: 'Please put a name, surname, email and id.',
    });
  }
  superAd.push(newSA);
  fs.writeFileSync('src/data/super-admins.json', JSON.stringify(superAd));
  return res.status(200).json({
    success: true,
    data: newSA,
  });
};

export const findSuperAdmin = (req, res) => {
  const found = superAd.find((superAdm) => superAdm.id === +req.params.id);
  if (found) {
    res.status(200).json({
      success: true,
      data: found,
    });
  } else {
    res.status(400).json({
      success: false,
      msg: `No member with the id of ${req.params.id}`,
    });
  }
};

export const delSuperAdmin = (req, res) => {
  const found = superAd.filter((superAdm) => superAdm.id !== parseInt(req.query.id, 10));
  if (found) {
    fs.writeFile('src/data/super-admins.json', JSON.stringify(found), (err) => {
      if (err) {
        res.status(400).json({
          success: false,
          msg: 'Super-admin not found',
        });
      }
    });
    res.status(200).json({
      success: true,
      data: found,
    });
  }
};

export const editSuperAdmin = (req, res) => {
  const saId = parseInt(req.query.id, 10);
  const saData = req.body;
  const found = superAd.some((sa) => sa.id === saId);
  if (found) {
    superAd.forEach((sa, index) => {
      if (sa.id === saId) {
        superAd[index].firstName = saData.firstName;
        superAd[index].lastName = saData.lastName;
        superAd[index].email = saData.email;
        fs.writeFile('src/data/super-admins.json', JSON.stringify(superAd), (err) => {
          if (err) {
            res.send(err);
          }
        });
      }
    });
  } else {
    res.status(400).json({
      success: false,
      msg: `SA id ${saId} not found`,
    });
  }
  res.status(200).json({
    success: true,
    msg: (`sa id ${saData.id} edited`),
    data: found,
  });
};
