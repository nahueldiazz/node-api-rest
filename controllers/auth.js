const { matchedData } = require('express-validator')
const { userModel } = require('../models')
const { handleHttpError } = require('../utils/handleError')
const { tokenSign } = require('../utils/handleJwt')
const { encrypt, compare } = require('../utils/handlePassword')


const registerCtrl = async (req,res) =>{
    try {
        req = matchedData(req)
        const passwordHash = await encrypt(req.password)
        const body = {...req, password:passwordHash}
        const dataUser = await userModel.create(body)
    
        const data = {
            token: await tokenSign(dataUser),
            user:dataUser
        }
        res.send({data})
        
    } catch (error) {
        handleHttpError(res,'ERROR_post_register',500)
        
    }
}


const loginCtrl = async (req,res) =>{
    try {
        req = matchedData(req)
        const user = await userModel.findOne({email:req.email})
        if (!user) {
            handleHttpError(res,'user no find',404)
            return
        }
        const hashPassword = user.password
        const check = await compare(req.password, hashPassword)

        if (!check) {
            // res.send({error:'algo'})
           handleHttpError(res,'password no exist',401)
           return 
        }

        const data = {
            token: tokenSign(user),
            user
        }

        res.send(data)
        
    } catch (error) {
        
    }
    
}

module.exports = {registerCtrl, loginCtrl}