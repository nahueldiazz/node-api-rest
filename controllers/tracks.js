const { tracksModel } = require('../models')
const { handleHttpError } = require('../utils/handleError')
const {matchedData} = require('express-validator')
/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
const getItems = async (req, res) => {

    console.log('data')
    try {
        const data = await tracksModel.findAllData({})
        res.send({data})
    
    } catch (error) {
        handleHttpError(res, 'ERROR_GET_ITEMS', 500)
    }
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
const getItem = async (req, res) => {
    try {
        const body = matchedData(req)
        const {id} = body
        const data = await tracksModel.findById(id)
        res.send({data})
        
    } catch (error) {
        handleHttpError(res,'ERROR_GET_ITEM',500)
    }
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
const createItems = async (req, res) => {
    try {
        const body = matchedData(req)
        const data = await tracksModel.create(body)
        res.send({data})
    
    } catch (error) {
        handleHttpError(res, 'ERROR_POST_ITEM', 500)
    }
   
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
const updateItems = async(req, res) => {
    try {
        const {id, ...body} = matchedData(req)
        const data = await tracksModel.findOneAndUpdate(id,body)
        res.send({data})
    
    } catch (error) {
        handleHttpError(res, 'ERROR_UPDATE_ITEM', 500)
    }
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
const deleteItems = async (req, res) => {
    try {
        const body = matchedData(req)
        const {id} = body
        const data = await tracksModel.delete({_id:id})
        res.send({data})
        
    } catch (error) {
        handleHttpError(res,'ERROR_Delete_ITEM',500)
    }
}

module.exports = { getItems, getItem, createItems, updateItems, deleteItems}