import { 
    Testimoniales
} from '../Models/testimoniales.js'

const guardarTestimonio = async (req,res) => {

    // Validar

    const { nombre, correo, mensaje } = req.body;
    const errores = [];

    if(nombre.trim() === '') {
            errores.push({ mensaje: 'el nombre esta vacío'})
    }

    if(correo.trim() === '') {
        errores.push({ mensaje: 'el correo esta vacío'})
    }

    if(mensaje.trim() === '') {
        errores.push({mensaje: 'el mensaje esta vacío'})
    }

    console.log(errores);
    //Mostrar en la vista de testimoniales

    if (errores.length > 0) {

        const testimonios = await Testimoniales.findAll();

        res.render('testimoniales', {
                   pagina: 'Testimoniales',
                   errores,
                   nombre, 
                   correo,
                   mensaje,
                   testimonios
                })
    } else {

        //Almacenar en la base de datos

        try {
            await Testimoniales.create({
                nombre,
                correo,
                mensaje
            });

            res.redirect('/testimoniales');

        } catch (error) {
            console.log(error)
        }
    }};


export {
    guardarTestimonio
}