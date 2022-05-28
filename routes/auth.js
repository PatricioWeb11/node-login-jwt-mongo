const {Router} = require('express');
const { check } = require('express-validator');
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router();

// importando controladores


// ruta por defecto
router.get('/', (req, res)=>{
    res.send({message: "ruta de inicio"})
});

// crear un usuario
router.post('/new', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria y debe tener al menos 3 caracteres').isLength({min: 3}),
    validarCampos
],crearUsuario);

// login usuario
router.post('/', [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria y debe tener al menos 3 caracteres').isLength({min: 3}),
    validarCampos
],loginUsuario);

// validar y revalidar token
router.get('/renew', validarJWT,revalidarToken);

module.exports = router;