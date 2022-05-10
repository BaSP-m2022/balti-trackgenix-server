const failSis = require('fs');
const superAd = require('../data/super-admins.json');

const idFilter = (req) => (fSuperAd) => fSuperAd.id === parseInt(req.params.id, 10);

export const addSA = (req, res) => {
  const newSA = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    id: req.body.id,
  };
  if (!newSA.firstName || !newSA.lastName || !newSA.email || !newSA.id) {
    return res.status(400).json({
      msg: 'Please put a name, surname, email and id.',
    });
  }
  superAd.push(newSA);
  return res.status(200).json(superAd);
};

export const findSA = (req, res) => {
  if (findSA) {
    res.json(superAd.filter(idFilter(req)));
  } else {
    res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
  }
};

export const delSA = (req, res) => {
  const found = superAd.filter((superAdm) => superAdm.id !== parseInt(req.query.id, 10));
  if (found) {
    failSis.writeFile('src/data/super-admins.json', JSON.stringify(found), (err) => {
      if (err) {
        res.status(400).json({
          success: false,
          msg: 'Super-admin not found',
        });
      }
    });
    res.status(200).json({
      success: true,
      msg: ('Super-admin delete'),
    });
  }
};

export const editSA = (req, res) => {
  const saId = parseInt(req.query.id, 10);
  const saData = req.body;
  const found = superAd.some((sa) => sa.id === saId);
  if (found) {
    superAd.forEach((sa, index) => {
      if (sa.id === saId) {
        superAd[index].firstName = saData.firstName;
        superAd[index].lastName = saData.lastName;
        superAd[index].email = saData.email;
        failSis.writeFile('src/data/super-admins.json', JSON.stringify(superAd), (err) => {
          if (err) {
            res.send(err);
          }
        });
      }
    });
  } else {
    res.status(400).json({
      success: false,
      msg: `sa id ${saId} not found`,
    });
  }
  res.status(200).json({
    success: true,
    msg: (`sa id ${saData.id} edited`),
    data: saData,
  });
};
