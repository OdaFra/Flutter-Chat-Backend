const { response } = require("express");
//const { validationResult } = require("express-validator");
//const { validarCampos } = require("../middlewares/validarCampos");
const bcrypt = require('bcryptjs');

const Usuario=require('../models/usuario');
const { generarJWT } = require("../helpers/jwt");
const usuario = require("../models/usuario");

const crearUsuario= async (req, res=response)=>{

    const {email, password} = req.body

    try {
    
     const existeEmail = await Usuario.findOne({email});

     if (existeEmail){
        return res.status(400).json({
            ok:false,
            msg: 'El correo ya está registrado'
        });
     }

    const usuario = new Usuario(req.body); 

     //Encriptar contraseña
     const salt = bcrypt.genSaltSync();
     usuario.password = bcrypt.hashSync(password, salt);
     await usuario.save();    

    //Generar mi JWT

     const token = await generarJWT(usuario.id);
        res.json({
            ok:true,
            // msg:'Crear usuario!!!'
            //body:req.body
            usuario,
            token
        });
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg:'Hablé con el administador'
        });
    }  
}

const login = async (req,res=response)=>{
    const {email, password} = req.body

    try {

        const usuarioDB = await usuario.findOne({email});
        if(!usuarioDB) 
        {
            return res.status(404).json({
                ok:false,
                msg:'Email no encontrado'
            });
        }

        //validar el password
        const valipassword = bcrypt.compareSync(password, usuarioDB.password);
       
        if (!valipassword){
            return res.status(400).json({
                ok:false,
                msg:'La contraseña no es valida'
            });
        }
        
        //Generar el JWT
        const token = await generarJWT(usuarioDB.id);
        res.json({
            ok:true,
            // msg:'Crear usuario!!!'
            //body:req.body
            usuario:usuarioDB,
            token
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok:true,
            //msg:'login'
            msg:'Hablé con el administrador'
        })
    }
    }

    const renewToken = async(req, res = response )=>{
        //const uid del usuario

        const uid = req.uid;

        //generar un nuevo JWT, generarJWT, uid

        const token = await generarJWT(uid);

        //Obtener el usuario por el UID, usuario, findById

        const usuario = await Usuario.findById(uid);


        res.json({
            // ok:true,
            // uid: req.uid
            ok:true,
            usuario,
            token
        })
    }



module.exports={
    crearUsuario,
    login,
    renewToken
}