const mongoose = require('mongoose')

try {
  mongoose.connect(process.env.MONGO_DB_URI)
    .then(() => console.log('Database connected'))
    .catch((error) => console.error({ error }))
} catch (error) {
  console.log({ error })
}
