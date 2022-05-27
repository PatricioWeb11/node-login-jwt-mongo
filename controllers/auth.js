const {response} = require('express');
const { validationResult } = require("express-validator");

const crearUsuario = (req, res=response)=>{
    const {name, email, password} = req.body;
    return res.send({message: "creando usuario"});
}

const loginUsuario = (req, res=response)=>{
    const {email, password} = req.body;
    return res.send({message: "login usuario"});
}

const revalidarToken = (req, res)=>{
    return res.send({message: "revalidando token"});
}

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}