const { userModel } = require("../models")
const { handleHttpError } = require("../utils/handleError")
const { verifyToken } = require("../utils/handleJwt")
const getProperties = require("../utils/handlePropertiesEngine")
const propertiesKey = getProperties()

const authMiddleware = async (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            handleHttpError(res,'error session', 500)
            return
        }

        const token = req.headers.authorization.split(' ').pop()
        const dataToken = await verifyToken(token)

        if (!dataToken) {
            handleHttpError(res,'error id token', 401)
            return
        }
        const query = {
            [propertiesKey.id]:dataToken[propertiesKey.id]
        }
        
        const user = await userModel.findOne(query)
        req.user = user
        next()
    } catch (error) {
        handleHttpError(res,'error session', 401)
    }
}

module.exports = authMiddleware