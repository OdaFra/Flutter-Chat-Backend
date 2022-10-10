const { io } = require('../index');
const { comprobarJWT } = require('../helpers/jwt');


// Mensajes de Sockets
io.on('connection', client => {
    console.log('Cliente conectado');

    //PARA Visualizar el cliente de donde se conecto y cual es el token
    //console.log(client.handshake.headers['x-token']);

    const [valido, uid] = comprobarJWT(client.handshake.headers['x-token'])
    console.log(valido ,uid);

    client.on('disconnect', () => {
        console.log('Cliente desconectado');
    });

    // client.on('mensaje', ( payload ) => {
    //     console.log('Mensaje', payload);

    //     io.emit( 'mensaje', { admin: 'Nuevo mensaje' } );

    // });


});
