import express from 'express'
import { createService, deleteService, getAllServices, getFilteredServices, getMyServices,  updateService } from '../controllers/service.controller.js';
import { authenticate } from '../auth.middleware.js';
const router = express.Router();

router.post('/createservice',authenticate, createService)
router.get('/allservices',getAllServices)
router.get('/myservices', authenticate,getMyServices)
router.delete('/deleteservice/:id', authenticate,deleteService)
router.put('/update/:id',authenticate,updateService)
router.get('/filter',getFilteredServices)

export const serviceRouter =  router