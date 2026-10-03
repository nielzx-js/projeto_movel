require('dotenv').config()
const express = require('express')

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
    res.status(200).json({ status: 'online' })
})

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' })
})

module.exports = app

if (require.main === module) {
    const port = process.env.PORT || 3000
    app.listen(port, () => {
        console.log(`rodando na porta ${port}`)
    })
}

