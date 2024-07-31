const Memory = require('../models/Memory')

const fs = require('fs')

const removeOldImage = (memory) => {
    fs.unlink(`public/${memory.src}`, (err) => {
        if(err) {
            console.log(err)
        } else {
            console.log('Imagem excluida do servidor!')
        }
    })
}


const createMemory = async(req, res) => {
    
    try {
        
        const {title, description} = req.body

        const src = `images/${req.file.filename}`

        if(!title || !description) {
            return res.status(400).json({msg: 'Por favor, preencha todos os campos'})
        }

        const newMemory = new Memory({
            title, src, description
        })

        await newMemory.save()

        res.json({msg: 'Memória criada com sucesso!', newMemory})


    } catch (error) {
        console.log(error.message)
        res.status(500).send('Ops, ocorreu um erro!')
    }
}



const getMemories = async(req, res) => {
    try {
        
        const memories = await Memory.find()

        res.json(memories)

    } catch (error) {
        res.status(500).send('Ops, ocorreu um erro!')
    }
}



const getMemory = async(req, res) => {
    try {
        
        const memory = await Memory.findById(req.params.id)

        if(!memory) {
            return res.status(404).json({msg: 'Memória não encontrada'})
        }

        res.json(memory)

    } catch (error) {
        res.status(500).send('Ops, ocorreu um erro!')
    }
}



const deleteMemory = async(req, res) => {
    try {

        const memory = await Memory.findByIdAndRemove(req.params.id)

        if(!memory) {
            return res.status(404).json({msg: 'Memória não encontrada'})
        }

        removeOldImage(memory)  

        res.json({msg: "Memória excluida!"})
        
    } catch (error) {
        res.status(500).send('Ops, ocorreu um erro!')
    }
}



const updateMemory = async(req, res) => {
    try {
        
        const {title, description} = req.body

        let src = null

        if(req.file) {
            src = `images/${req.file.filename}`
        }

        const memory = await Memory.findById(req.params.id)
 
        if(!memory) {
            return res.status(404).json({msg: 'Memória não encontrada'})
        }

        if(src) {
            removeOldImage(memory)
        }

        const updateData = {}

        if(title) updateData.title = title
        if(description) updateData.description = description
        if(src) updateData.src = src

        const updateMemory = await Memory.findByIdAndUpdate(req.params.id, updateData, {new: true})

        res.json({updateMemory, msg: 'Memória atualizada com sucesso!'})


    } catch (error) {
        
    }
}


module.exports = {
    createMemory,
    getMemories,
    getMemory,
    deleteMemory,
    updateMemory,
}