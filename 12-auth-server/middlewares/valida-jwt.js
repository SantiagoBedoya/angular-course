const { response, request } = require("express");
const jwt = require("jsonwebtoken");

const validarJWT = (req = request, res = response, next) => {
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: "Unauthorize",
    });
  }

  try {
    const { uid, name } = jwt.verify(token, process.env.SECRET_JWT_SEED);
    req.user = { uid, name };
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: "Unauthorize",
    });
  }

  next();
};

module.exports = {
  validarJWT,
};
