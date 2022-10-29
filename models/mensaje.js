const {Schema, model}= require('mongoose');

const MensajeSchema = Schema({

    de: {
        type: Schema.Types.ObjectId,
        ref:'Usuario',
        requireq: true
    },
    para:{
        type: Schema.Types.ObjectId,
        ref:'Usuario',
        requireq: true
    },
    mensaje:{
        type: String,
        require:true
    }
    // ,
    // online:{
    //     type: Boolean,
    //     default: false  
    // }

},{
    timestamps:true
});

MensajeSchema.method('toJSON', function(){
    const { __v, _id, password, ...object }= this.toObject();
        return object;
});



module.exports=model('Mensaje', MensajeSchema);