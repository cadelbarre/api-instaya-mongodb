const { Schema, model } = require('mongoose')

const userSchema = new Schema({
  nombreCompleto: {
    type: String,
    required: [true, 'Campo requerido'],
    trim: true
  },
  usuario: {
    type: String,
    required: [true, 'Campo requerido'],
    trim: true,
    lowercase: true,
    minLength: [5, 'Debe ser mayor a 5 caracteres'],
    unique: true
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minLength: [5, 'Debe ser mayor a 5 caracteres']
  },
  correo: {
    type: String,
    required: [true, 'Campo requerido'],
    match: [/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g, 'Correo invalido']
  }
}, {
  versionKey: false,
  timestamps: true,
  toJSON: {
    transform: (document, returned) => {
      returned.id = returned._id
    }
  }
})

const serviceSchema = new Schema({
  fecha: Date,
  hora: String,
  estado: {
    type: String,
    enum: ['Guardado', 'Cancelado', 'Cumplido'],
    default: 'Guardado'
  },
  dimensiones: {
    ancho: {
      type: Number,
      min: [0, 'El valor debe ser mayor a cero'],
      required: [true, 'Campo requerido']
    },
    largo: {
      type: Number,
      min: [0, 'El valor debe ser mayor a cero'],
      required: [true, 'Campo requerido']
    },
    alto: {
      type: Number,
      min: [0, 'El valor debe ser mayor a cero'],
      required: [true, 'Campo requerido']
    },
    peso: {
      type: Number,
      min: [0, 'El valor debe ser mayor a cero'],
      required: [true, 'Campo requerido']
    }
  },
  recogida: {
    nombre: {
      type: String,
      required: [true, 'Campo requerido'],
      trim: true
    },
    nit: {
      type: String,
      required: [true, 'Campo requerido'],
      trim: true,
      minlength: [6, 'Debe contener minimo 6 caracteres']
    },
    direccion: {
      type: String,
      required: [true, 'Campo requerido'],
      trim: true
    },
    ciudad: {
      type: String,
      required: [true, 'Campo requerido'],
      trim: true
    }
  },
  destinatario: {
    nombre: {
      type: String,
      required: [true, 'Campo requerido'],
      trim: true
    },
    nit: {
      type: String,
      required: [true, 'Campo requerido'],
      trim: true,
      minlength: [6, 'Debe contener minimo 6 caracteres']
    },
    direccion: {
      type: String,
      required: [true, 'Campo requerido'],
      trim: true
    },
    ciudad: {
      type: String,
      required: [true, 'Campo requerido'],
      trim: true
    }
  },
  usuario: {
    id: {
      type: String,
      required: [true, 'Campo Requerido']
    },
    name: {
      type: String,
      required: [true, 'Campo Requerido']
    }
  }
}, {
  versionKey: false,
  timestamps: true,
  toJSON: {
    transform: (document, returned) => {
      returned.id = returned._id
    }
  }
})

const User = model('user', userSchema)
const Service = model('service', serviceSchema)

module.exports = {
  User,
  Service
}
