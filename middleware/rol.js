const { handleHttpError } = require("../utils/handleError")

const checkRol = (rol) => (req, res, next) =>{
    
    try {
        const {user} = req
        const rolesByUser = user.role
        
        const checkValueRol = rol.some((rolSingle)=> rolesByUser.includes(rolSingle))

        if(!checkValueRol){
            handleHttpError(res, 'no tiene permisos')
        }
        next()
    } catch (error) {
        handleHttpError(res, 'error', 500)
    }
}

module.exports = checkRol