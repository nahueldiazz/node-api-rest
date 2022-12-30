const { storageModel } = require('../models')
const fs = require('fs')
const { handleHttpError } = require('../utils/handleError')
const {matchedData} = require('express-validator')
const PUBLIC_URL = process.env.PUBLIC_URL
const MEDIA_PATH = `${__dirname}/../storage`

const getItems = async (req, res) => {
    try {
        const data = await storageModel.find({})
    
        res.send({data})
    } catch (error) {
        handleHttpError(res, 'ERROR_GET_ITEMS', 500)
        
    }
}

 const getItem = async (req, res) => {
    try {
        const {params} = req
        const {id} = params
        const data = await storageModel.findById(id)
        res.send({data})
        
    } catch (error) {
        handleHttpError(res,'ERROR_GET_ITEM',500)
    }
}

const createItems = async (req, res) => {
    const {body, file} = req
    const fileData = {
        filename: file.filename,
        url:`${PUBLIC_URL}/${file.filename}`
    }
    const data = await storageModel.create(fileData)
    res.send({data})
}

const deleteItems = async(req, res) => {
    try {
        const {params} = req
        const {id} = params
        const dataFile = await storageModel.findById(id)
        await storageModel.deleteOne({_id:id})
        const {filename} = dataFile
        const filePath = `${MEDIA_PATH}/${filename}`
        fs.unlinkSync(filePath)
        const data ={
            filePath,
            delete:1
        }

        res.send({data})
        
    } catch (error) {
        handleHttpError(res,'ERROR_Delete_ITEM',500)
    }
}

module.exports = { getItems, getItem, createItems, deleteItems}