import {  Router } from "express"

import { ping } from "../controllers/index.controller.js"



const router = Router()


router.get('/')
router.get ('/ping',ping)

router.post('/registro',(req,res)=>{
    res.render('registro')
})





export default router   