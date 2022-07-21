import firebase from '../helper/firebase';

const adminMiddleware = async (req, res, next) => {
  // look and verify token on the header
  const { token } = req.headers;
  if (!token) {
    return res.status(401)
      .json({
        message: 'Provide a token',
        data: undefined,
        error: true,
      });
  }
  try {
    // verify and extract information from token
    const response = await firebase.auth().verifyIdToken(token);
    // check permissions
    if (!response.role) {
      return res.status(403)
        .json({
          message: 'No credentials found',
          data: undefined,
          error: true,
        });
    }
    if (response.role !== 'ADMIN') {
      return res.status(403)
        .json({
          message: 'Credentials not authorized to access this information',
          data: undefined,
          error: true,
        });
    }
    req.headers.firebaseUid = response.uid;
    return next();
  } catch (error) {
    return res.status(403).json({
      message: error.message ? error.message : error,
      data: undefined,
      error: true,
    });
  }
};

export default adminMiddleware;
