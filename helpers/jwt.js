const jwt = require('jsonwebtoken');

const generarJWT =(uid)=>{

    return new Promise((resolve, reject)=>{
        const payload = {uid};
        jwt.sign(payload, process.env.JWT_KEY, {
            expiresIn:'24h'
        }, (err, token)=>{
            if(err) {
                //Para el error
                reject('No se pudo generar el JWT');
            }else{
                //token
                resolve(token);
            }
        })

            })

}

const comprobarJWT=( token='')=>{

    try {
        const {uid}=jwt.verify(token,process.env.JWT_KEY);
        //req.uid=uid;
        return [true, uid];
        // next();
        
    } catch (error) {
        return [false, null];
    }
}

module.exports={
    generarJWT,
    comprobarJWT
}