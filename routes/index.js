import express from 'express';
import { paginaInicio, 
    paginaNosotros, 
    paginaTestimoniales, 
    paginaViajes, 
    paginaDetalleViaje } from '../Controllers/paginacontrollers.js';

import {
     guardarTestimonio 
    } from '../Controllers/testimonialController.js';

const router = express.Router();

router.get('/', paginaInicio );


router.get('/nosotros', paginaNosotros);

router.get('/testimoniales', paginaTestimoniales );
router.post('/testimoniales', guardarTestimonio );

router.get('/viajes', paginaViajes );
router.get('/viajes/:viaje', paginaDetalleViaje );


export default router;