import firebase from '../helper/firebase';

const superAdminMiddleware = async (req, res, next) => {
  const { token } = req.headers;
  const { claims: { role } } = await res.user.getIdTokenResult();
  if (!token) {
    return res.status(401)
      .json({
        message: 'Provide a token',
        data: undefined,
        error: true,
      });
  }
  if (!role) {
    return res.status(403)
      .json({
        message: 'Your credentials are missing a role',
        data: undefined,
        error: true,
      });
  }

  if (role !== 'SUPER ADMIN') {
    return res.status(403)
      .json({
        message: 'Your role is not allowed to access this routes',
        data: undefined,
        error: true,
      });
  }

  try {
    await firebase.auth().verifyIdToken(token);
    return next();
  } catch (error) {
    return res.status(403).json({
      message: error.toString(),
      data: undefined,
      error: true,
    });
  }
};

export default superAdminMiddleware;
