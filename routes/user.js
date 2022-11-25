const user = require('express').Router()
const bcrypt = require('bcrypt')
const { User } = require('../model/schemas')

user.post('/', async (req, res) => {
  const { nombreCompleto, usuario, password, correo } = req.body

  const saltRounds = 10
  const passwordHashed = await bcrypt.hash(String(password), saltRounds)

  const newUser = new User({
    nombreCompleto,
    correo,
    usuario,
    password: passwordHashed
  })

  newUser.save()
    .then(() => {
      res.json({ error: false, message: 'Usuario guardado' })
    })
    .catch((error) => {
      res.status(400).json({ error: true, message: error.message })
    })
})

user.delete('/', async (req, res) => {
  User.findOneAndDelete({ usuario: req.query.usuario })
    .then(() => {
      res.json({ error: false, message: 'Usuario eliminado' })
    })
    .catch((error) => {
      res.status(400).json({ error: true, message: error.message })
    })
})

user.get('/', async (req, res) => {
  const { usuario, password } = req.query

  if (!usuario || !password) return res.status(400).json({ error: true, message: 'EL usuario y/o la contraseña esta(n) vacio(s).' })

  try {
    const user = await User.findOne({ usuario })

    if (user === null) return res.status(405).json({ error: true, message: 'El Usuario no existe en la base de datos.' })
    const { nombreCompleto, correo } = user

    if (await bcrypt.compare(password, user.password)) {
      res.json({
        error: false,
        data: {
          nombreCompleto,
          correo,
          usuario: user.usuario,
          id: user._id
        }
      })
    } else res.status(405).json({ error: true, message: 'EL usuario y/o la contraseña son incorrectos.' })
  } catch (error) {
    console.log({ error })
    res.status(400).json({ error: true, message: 'EL usuario y/o la contraseña son incorrectos.' })
  }
})

module.exports = user
