import jwt from 'jsonwebtoken';

const authUser = (req, res, next) => {
  const headerToken = req.headers.token;
  const authHeader = req.headers.authorization;
  const bearerToken = authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;
  const token = headerToken || bearerToken;

  if (!token) {
    return res.status(401).json({ success: false, message: 'Missing token (use header: token or Authorization: Bearer <jwt>)' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded || !decoded.id) {
      return res.status(401).json({ success: false, message: 'Invalid token payload (id missing)' });
    }
    if (!req.body) req.body = {};
    req.userId = decoded.id;
    req.body.userId = decoded.id;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Invalid token: ' + err.message });
  }
};

export default authUser;