import { Router } from "express";
import { check } from "express-validator";

import validarCampos from "../middlewares/validarCampos";
import { auth, authLogin, authRegister } from "../controllers/auth";



const router = Router();


/**
 * Rutas para la autenticación
 */

router.get('/', auth);

router.post('/login', [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password es obligatoria').not().isEmpty(),
    validarCampos
], authLogin);

router.post('/register', authRegister);


export default router;