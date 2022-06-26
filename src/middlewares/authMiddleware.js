import firebase from '../helper/firebase';

const authMiddleware = async (req, res, next) => {
  const { token } = req.headers;
  if (!token) {
    return res.status(400)
      .json({
        message: 'Provide a token',
        data: undefined,
        error: true,
      });
  }
  try {
    await firebase.auth().verifyIdToken(token);
    return next();
  } catch (error) {
    return res.status(401).json({
      message: error.toString(),
      data: undefined,
      error: true,
    });
  }
};

export default authMiddleware;
