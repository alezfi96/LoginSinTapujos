import { Router } from "express";
import {registroPersona, deletePersona, getIdpersona, getPersona,updatePersona, loginPersona}  from '../controllers/persona.controller.js'
const router = Router()
router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "*");
    res.header("Access-Control-Allow-Headers", "*");
    next();});




router.get('/persona',getPersona)
router.get('/persona/:id',getIdpersona)
router.patch('/persona/:id',updatePersona)
router.delete('/persona/:id',deletePersona)


router.post('/persona',registroPersona)

router.post('/login',loginPersona)



export default router;