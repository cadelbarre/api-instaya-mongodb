const service = require('express').Router()
const { Service } = require('../model/schemas')

service.get('/gestion', async (req, res) => {
  try {
    const listServices = await Service.find({ idUsuario: req.query.idUsuario }).select('fecha estado destinatario')

    res.json({ error: false, data: listServices ?? [] })
  } catch (error) {
    console.log({ error })
    res.status(400).json({ error: true, message: error.message })
  }
})

service.get('/', async (req, res) => {
  try {
    const listServices = await Service.findOne({ id: req.query.id })
    res.json({ error: false, data: listServices === null ? [] : [listServices] })
  } catch (error) {
    console.log({ error })
    res.status(400).json({ error: true, message: error.message })
  }
})

service.put('/', async (req, res) => {
  const { body } = req
  const update = {
    estado: body.estado,
    fecha: body.fecha,
    hora: body.hora,
    dimensiones: {
      alto: body.alto,
      ancho: body.ancho,
      largo: body.largo,
      peso: body.peso
    },
    recogida: {
      nombre: body.nombreRecogida,
      ciudad: body.ciudadRecogida,
      direccion: body.direccionRecogida,
      nit: body.nitRecogida
    },
    destinatario: {
      nombre: body.nombreDestinatario,
      ciudad: body.ciudadDestinatario,
      direccion: body.direccionDestinatario,
      nit: body.nitDestinatario
    },
    usuario: {
      id: body.idUsuario,
      name: body.nombreCompleto
    }
  }

  try {
    const response = await Service.findByIdAndUpdate({ _id: req.query.id }, update)
    if (response === null) return res.status(404).json({ error: true, message: 'Servicio no encontrado' })
    res.json({ error: false, message: 'Servicio actualizado' })
  } catch (error) {
    console.log({ error })
    res.status(400).json({ error: true, message: error.message })
  }
})

service.post('/', async (req, res) => {
  const { body } = req
  const newService = new Service({
    fecha: body.fecha,
    hora: body.hora,
    dimensiones: {
      alto: body.alto,
      ancho: body.ancho,
      largo: body.largo,
      peso: body.peso
    },
    recogida: {
      nombre: body.nombreRecogida,
      ciudad: body.ciudadRecogida,
      direccion: body.direccionRecogida,
      nit: body.nitRecogida
    },
    destinatario: {
      nombre: body.nombreDestinatario,
      ciudad: body.ciudadDestinatario,
      direccion: body.direccionDestinatario,
      nit: body.nitDestinatario
    },
    usuario: {
      id: body.idUsuario,
      name: body.nombreCompleto
    }
  })

  newService.save()
    .then(() => res.json({ error: false, message: 'Orden guardadada' }))
    .catch((error) => res.status(400).json({ error: true, message: error.message }))
})

service.delete('/', async (req, res) => {
  try {
    await Service.deleteMany({ 'usuario.name': 'Carlos Delbarre' })
    res.json({ error: false, message: 'Documentos borrados' })
  } catch (error) {
    console.log({ error })
    res.status(400).json({ error: true, message: error.message })
  }
})

module.exports = service
