const { Router } = require("express");
const { check } = require("express-validator");

const {
  createUser,
  authenticateUser,
  renewToken,
} = require("../controllers/auth");
const { validarJWT } = require("../middlewares/valida-jwt");
const { validarCampos } = require("../middlewares/validar-campos");

const authRouter = (app) => {
  const router = Router();
  app.use("/api/auth", router);

  router.post(
    "/",
    [
      check("email", "El email es obligatorio").isEmail(),
      check("password", "La contraseña es obligatoria").isLength({ min: 6 }),
      validarCampos
    ],
    authenticateUser
  );

  router.post("/new",[
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").isEmail(),
    check("password", "La contraseña es obligatoria").isLength({ min: 6 }),
    validarCampos
  ], createUser);

  router.get("/renew", [validarJWT], renewToken);
};

module.exports = authRouter;
