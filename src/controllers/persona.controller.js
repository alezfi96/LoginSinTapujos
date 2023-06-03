import { pool } from "../db.js"
import Jwt from "jsonwebtoken"
import bcryptjs from "bcryptjs"

export const getPersona = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM persona')
        res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message: 'ALGO SALIO MAL'
        })
    }
}

export const getIdpersona = async (req, res) => {

    try {
        const [rows] = await pool.query('SELECT * FROM persona WHERE id = ?', [req.params.id])
        console.log(rows)

        if (rows.length <= 0) return res.status(404).json({
            message: 'persona no encontrada'
        })

        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({
            message: 'ALGO SALIO MAL'
        })

    }

}

//methodo para registrar

export const registroPersona = async (req, res) => {

    try {

        const { nombre, lastname, typeid, idnumber, file, phone, email, password } = req.body
        console.log(nombre, lastname, typeid, idnumber, file, phone, email, password)
        const passHas = await bcryptjs.hash(password, 8)
        const [rows] = await pool.query('INSERT INTO  persona(nombre, lastname, typeid, idnumber, file, phone, email, password)VALUES (?, ?, ?, ? ,?, ?, ?, ?)',
            [nombre, lastname, typeid, idnumber, file, phone, email, passHas])

        res.send({
            id: rows.insertId,
            nombre,
            lastname,
            typeid,
            idnumber,
            file,
            phone,
            email,
            passHas: password

        })



    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'ALGO SALIO MAL'
        })
    }
}

export const  loginPersona = async (req, res) => {
    try {
        const { idnumber, password } = req.body


        
        const [login] = await pool.query('SELECT id,idnumber,password FROM  persona WHERE idnumber = ?', [idnumber])
        // console.log(login)
        if (login.length == 0) {
            res.status(200).json({
                icon: "error",
                message: 'Ingrese Documento y Contraseña'
            })
        } else {

            const passHas = await bcryptjs.compare(password, login[0].password)
            if (!passHas) {
                res.status(200).json({
                    icon: "info",
                    message: 'Contraseña incorreta'
                })
            } else {
                const token = Jwt.sign({ userId: login[0].id }, 'mysecretkey', { expiresIn: '2h' })
                res.status(200).json({
                    code: 201,
                    icon: "success",
                    token: token,
                    message: "Bienvenido"
                })
            }
        }
    } catch (error) {
        res.status(500).json({
            message: "Algo salio mal con el servidor"
        })
    }
}








export const deletePersona = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM persona WHERE id = ?', [req.params.id])

        if (result.affectedRows <= 0) return res.status(404).json({
            message: 'persona no encontrada'
        })


        res.sendStatus(204)
    } catch (error) {

        return res.status(500).json({
            message: 'ALGO SALIO MAL'
        })

    }

}



export const updatePersona = async (req, res) => {
    const { id } = req.params
    const { nombre, lastname, typeid, idnumber, file, phone, email, password } = req.body

    try {

        const [result] = await pool.query('UPDATE  persona SET nombre = IFNULL(?, nombre), lastname= IFNULL(?, lastname), typeid= IFNULL(?, typeid), idnumber= IFNULL(?, idnumber), file= IFNULL(?, file), phone= IFNULL(?, phone), email= IFNULL(?, email), password= IFNULL(?, password) WHERE id = ? ', [nombre, lastname, typeid, idnumber, file, phone, email, password, id])

        console.log(result)
        if (result.affectedRows === 0) return res.status(404).json({
            message: ' persona no encontrada '
        })

        const [rows] = await pool.query('SELECT * FROM persona WHERE id = ? ', [id])
        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({
            message: 'ALGO SALIO MAL'
        })
    }
}


