const { io } = require('../index');
const { comprobarJWT } = require('../helpers/jwt');
const {usuarioConectado, usuarioDesconectado, grabarMensaje}=require('../controllers/sockets');


// Mensajes de Sockets
io.on('connection', client => {
    console.log('Cliente conectado');

    //PARA Visualizar el cliente de donde se conecto y cual es el token
    //console.log(client.handshake.headers['x-token']);

    const [valido, uid] = comprobarJWT(client.handshake.headers['x-token'])
    //console.log(valido ,uid);

    //Verificar autenticación
    if(!valido){return client.disconnect()}
    
    //Cliente conectado
       usuarioConectado(uid); 

    //Ingresar al usuario en una sala en particular.
    //Sala global.

    client.join(uid);

    //Escuchar del cliente el mensaje personal.

    client.on('mensaje-personal', async(payload)=>{
        console.log(payload);
        
        await  grabarMensaje(payload)

        io.to(payload.para).emit('mensaje-personal', payload);
    })
       

    client.on('disconnect', () => {
        usuarioDesconectado(uid);
        console.log('Cliente desconectado');
    });

    // client.on('mensaje', ( payload ) => {
    //     console.log('Mensaje', payload);

    //     io.emit( 'mensaje', { admin: 'Nuevo mensaje' } );

    // });


});
