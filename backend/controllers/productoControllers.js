const Producto = require("../models/Producto");


exports.createProducto = async (req, res) => {
    try {
        let producto;
        // creamos u producto
        producto = new Producto(req.body);
        await producto.save()
        .then(console.log('exito'));
        res.send(producto);

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}   


exports.obtenerProductos = async (req, res) => {
    try {
        const productos =  await  Producto.find();
        res.json(productos);
    } catch (err) {
        console.log(err);
        res.status(500).send('Hubo un error');
    }
}

exports.actualizarProductos = async (req, res) => {
    try {
        const {nombre, categoria, ubicacion, precio } = req.body;
        let producto = await Producto.findById(req.params.id);

        if(!producto) {
            res.status(404).json({msg: "no existe el producto"});
        }

        producto.nombre = nombre;
        producto.categoria = categoria;
        producto.ubicacion = ubicacion;
        producto.precio = precio;

        producto = await Producto.findOneAndUpdate({_id: req.params.id}, producto, {new: true});
        res.json(producto);

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.obtenerProducto = async (req, res) => {
    try {
        const productos =  await  Producto.findById(req.params.id);
        res.json(productos);
    } catch (err) {
        console.log(err);
        res.status(500).send('Hubo un error');
    }
}

exports.eliminarProducto = async (req, res) => {
    try {
        
        let producto = await Producto.findById(req.params.id);

        if(!producto) {
            res.status(404).json({msg: 'No existe'});
        }

        await Producto.findOneAndDelete({_id: req.params.id})
        res.json({msg: 'Producto eliminado con exito'});




    } catch (err) {
        console.log(err);
        res.status(500).send('Hubo un error');
    }
}