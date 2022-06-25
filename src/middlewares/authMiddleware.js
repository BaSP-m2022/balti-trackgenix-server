import firebase from '../helper/firebase';

const authMiddleware = (req, res, next) => {
  try {
    const { token } = req.headers;
    if (!token) {
      return res.status(400)
        .json({ message: 'Provide a token' });
    }
    return () => {
      firebase.auth().verifyIdToken(token);
      next();
    };
  } catch (error) {
    return res.status(401).json({
      message: error.toString(),
    });
  }
};

export default authMiddleware;
