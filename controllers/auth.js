const { response } = require('express');
const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');


const crearUsuario = async (req, res = response) => {
    const { name, email, password } = req.body;

    try {
        // validar el email que no exista en la base de datos
        const usuario = await Usuario.findOne({ email });

        if (usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'el usuario ya existe en la base de datos'
            });
        }

        // crear usuario con el modelo
        const dbUser = new Usuario(req.body);

        // encriptar contraseña
        const salt = bcrypt.genSaltSync();
        dbUser.password = bcrypt.hashSync(password, salt);

        // generar JWT
        const token = await generarJWT(dbUser.id, name);

        // crear usuario en la base de datos
        await dbUser.save();

        // generar respuesta exitosa
        return res.status(201).json({
            ok: true,
            msg: 'usuario creado con exito',
            uid: dbUser.id,
            name,
            email,
            token
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: "error al crear el usuario"
        });
    }

}

const loginUsuario = async (req, res = response) => {
    const { email, password } = req.body;
    try {
        const dbUser = await Usuario.findOne({ email });

        if (!dbUser) {
            return res.status(400).json({
                ok: false,
                msg: 'el email no esta registrado'
            });
        }

        // confirmar si la contraseña esta registrada en la base de datos
        const validPassword = bcrypt.compareSync(password, dbUser.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'el password no esta registrado'
            });
        }

        // generar JWT
        const token = await generarJWT(dbUser.id, dbUser.name);

        // respuesta del servicio
        return res.json({
            ok: true,
            msg: 'login exitoso',
            uid: dbUser.id,
            name: dbUser.name,
            email: dbUser.email,
            token
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: "error al iniciar sesion"
        });
    }
}

const revalidarToken = async (req, res) => {

    const { uid } = req;

    // leer la base de datos para obtener el email
    const dbUser = await Usuario.findById(uid);

    const token = await generarJWT(uid, dbUser.name);

    return res.json({
        ok: true,
        msg: 'token valido',
        uid,
        name: dbUser.name,
        email:dbUser.email,
        token
    });
}

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}