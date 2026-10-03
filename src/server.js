require('dotenv').config()
const sequelize=require('./database')
require('./model/usuario')

if(require.main===module){
    const port=process.env.PORT 
    sequelize.sync({alter:true})
    .then(()=>{
        console.log("sincronizou")
        app.listen(port,()=>{
            console.log(`rodando em https://localhost:${port}`)
        })
    })
    .catch((e)=>{
        console.log("erro ao sincronizar o banco")
    })
}