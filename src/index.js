import app from './app.js'
import { PORT } from './config.js'
app.listen(PORT)
console.log(`Servicio ejecutandose en el puerto${PORT}`)