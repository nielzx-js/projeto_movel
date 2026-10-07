require('dotenv').config()
const path = require('path')
const express = require('express')
const sequelize = require('./database')
const Usuario = require('./src/model/usuario')
const usuariosRoutes = require('./src/routes/usuarios')

const app = express()

app.engine('ejs', require('ejs').__express) // garante que o Vercel empacote o ejs
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.json())
app.use(express.urlencoded({ extended: true })) // lê os forms HTML

// cria a tabela caso ela nao exista
let ready
app.use(async (req, res, next) => {
    try {
        ready = ready || sequelize.sync()
        await ready
        next()
    } catch (e) {
        ready = null
        next(e)
    }
})

async function renderIndex(res, erro = null, status = 200) {
    const usuarios = await Usuario.findAll({ order: [['id', 'ASC']] })
    res.status(status).render('index', { usuarios, erro })
}

app.get('/', async (req, res, next) => {
    try {
        await renderIndex(res)
    } catch (e) {
        next(e)
    }
})

app.post('/criar', async (req, res, next) => {
    try {
        const { nome, email } = req.body
        await Usuario.create({ nome, email })
        res.redirect('/')
    } catch (e) {
        renderIndex(res, e.message, 400).catch(next)
    }
})

app.post('/editar/:id', async (req, res, next) => {
    try {
        const { nome, email } = req.body
        await Usuario.update({ nome, email }, { where: { id: req.params.id } })
        res.redirect('/')
    } catch (e) {
        renderIndex(res, e.message, 400).catch(next)
    }
})

app.post('/deletar/:id', async (req, res, next) => {
    try {
        await Usuario.destroy({ where: { id: req.params.id } })
        res.redirect('/')
    } catch (e) {
        next(e)
    }
})

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' })
})

app.use('/usuarios', usuariosRoutes)

app.use((err, req, res, next) => {
    console.error(err)
    res.status(500).json({ erro: err.message })
})

module.exports = app

if (require.main === module) {
    const port = process.env.PORT || 3000
    app.listen(port, () => {
        console.log(`rodando na porta ${port}`)
    })
}