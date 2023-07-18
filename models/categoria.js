import { Schema, model } from 'mongoose'

const CategoriaSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },

    estado: {
        type: Boolean,
        default: true,
        required: [true, 'El estado es obligatorio']
    },

    usuario: {
        type: Schema.Types.ObjectId, //es decir, es un objeto que tenemos en mongo
        ref: 'Usuario', //La referencia es dónde apunta ese objeto
        required: [true, 'El usuario es obligatorio']
    },
    
});

CategoriaSchema.methods.toJSON = function(){
    const {__v,_id, ...categoria} = this.toObject(); //...categoria : unifica el resto de los parametros en uno solo, llamado "categoria"
    categoria.cid = _id;
    return categoria;
}



// Lo siguiente esta comentado porque es del video del curso de node pero esta desactualizado:

// module.exports = model('Categoria', CategoriaSchema); 

//Se cambia por:
const Categoria = model('Categoria', CategoriaSchema);

export {
    Categoria,
}
