const jwt = require('jsonwebtoken');

const autentica = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader)
    return res.status(401).json({ error: 'Token não autorizado' });

  const parts = authHeader.split(' ');

  if (!parts.length === 2)
    return res.status(401).json({ error: 'Token error' });

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme))
    return res.status(401).json({ error: 'Token malformatted' });

  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ error: 'Token Inválido' });

    req.usuario = decoded.usuario;
    return next();
  });
};

const autoriza = (...roles) => {
  return (req, res, next) => {
    if (!req.usuario || !roles.includes(req.usuario.role))
      return res.status(403).json({ erro: 'Acesso negado' });
    next();
  };
};

module.exports = { autentica, autoriza };
