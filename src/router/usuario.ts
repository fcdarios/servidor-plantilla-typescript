import { Router } from "express";
import { check } from "express-validator";

import validarCampos from "../middlewares/validarCampos";
import { esRolValido, existeEmail, existeUsuarioPorId } from "../helpers/validarCamposDB";

import {
  deleteUsuarios,
  getUsuario,
  getUsuarios,
  postUsuarios,
  putUsuarios,
} from "../controllers/usurios";


const router = Router();


/* 
  Rutas para los usuarios - CRUD
*/

router.get('/', getUsuarios);

router.get('/:id', [
  check('id', 'No es un ID valido').isNumeric(),
  validarCampos
], getUsuario);

router.post('/', [
  check('name', 'El nombre de usuario es obligatorio').not().isEmpty(),
  check('password', 'El password debe de ser de más de 6 caracteres').isLength({ min: 3 }),
  check('email', 'El correo no es valido').isEmail(),
  check('email').custom(existeEmail),
  check('role').custom(esRolValido),
  validarCampos
], postUsuarios);

router.put('/:id', [
  check('id', 'No es un ID valido').isNumeric(),
  check('id').custom( existeUsuarioPorId ),
  check('role').custom( esRolValido ),
  validarCampos
],putUsuarios);

router.delete('/:id', [
  check('id', 'No es un ID valido').isNumeric(),
  check('id').custom( existeUsuarioPorId ),
  validarCampos
], deleteUsuarios);



export default router;