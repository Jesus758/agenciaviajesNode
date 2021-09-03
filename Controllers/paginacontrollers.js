import { Viajes } from '../Models/Viajes.js'
import { Testimoniales } from '../Models/testimoniales.js'


const paginaInicio = async (req, res) => {

    //Consideraciones de conceptos. Para mejora de performance, es recomendable que ambas consultas se hagan al mismo tiempo. Por talmotivo se crea un objeto de Promise donde se agregan ambas consultas y se ejecutan al mismo tiempo en una unica acción. Eso hace que la vista sea renderizada con otdas las informaciones

    const promiseDB = [];

    promiseDB.push( Viajes.findAll( {limit: 3}));
    promiseDB.push( Testimoniales.findAll( {limit: 3 }));


    //Consultar 3 viajes del modelo viaje
    try { 

        const resultado = await Promise.all( promiseDB );
        
        res.render('inicio', {
            pagina: 'inicio',
            clase: 'home',
            viajes: resultado[0],
            testimonios: resultado[1]
        })

    } catch(error) {
        console.log(error)

    }

       };

const paginaNosotros = (req, res) => {
    res.render('nosotros', {
        pagina: 'Nosotros'
    }
)};

const paginaTestimoniales = async (req, res) => {

    try {
        const testimonios = await Testimoniales.findAll();

        res.render('testimoniales', {
            pagina: 'Testimoniales',
            testimonios
        })


    }catch(error) {
        console.log(error);
    }

  
};

const paginaViajes = async (req, res) => {
    //Consultar BD
    const viajes = await Viajes.findAll();
    console.log(viajes);    
    res.render('viajes', {
        pagina: 'Viajes',
        viajes
    })
};

//Muestra un viaje por su slug
const paginaDetalleViaje = async (req, res) => {
  

    const { viaje } = req.params;

    try {
        const resultado = await Viajes.findOne( {where: { slug: viaje }});
        
        res.render('viaje', {
            pagina: 'Informacion Viaje',
            resultado
        })
    } catch(error) {
        console.log(error);
    }
}




        export {
            paginaInicio,
            paginaNosotros,
            paginaTestimoniales,
            paginaViajes,
            paginaDetalleViaje
        }


