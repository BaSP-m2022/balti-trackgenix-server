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
  return res.json(superAd);
};

export const findSA = (req, res) => {
  if (findSA) {
    res.json(superAd.filter(idFilter(req)));
  } else {
    res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
  }
};
