import firebase from '../helper/firebase';

const employeeMiddleware = async (req, res, next) => {
  try {
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
    // verify and extract information from token
    const { role } = await firebase.auth().verifyIdToken(token);
    // check permissions
    if (!role) {
      return res.status(403)
        .json({
          message: 'No credentials found',
          data: undefined,
          error: true,
        });
    }
    if (role !== 'EMPLOYEE') {
      return res.status(403)
        .json({
          message: 'Credentials not authorized to access this information',
          data: undefined,
          error: true,
        });
    }
    return next();
  } catch (error) {
    return res.status(403).json({
      message: error.message ? error.message : error,
      data: undefined,
      error: true,
    });
  }
};

export default employeeMiddleware;
