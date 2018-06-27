const path = require('path')
const express = require('express')
const publicPath = path.join(__dirname + '../../public')
const app = express()


const port = process.env.PORT || 3000;


app.use(express.static(publicPath))

app.listen(port, ()=>{
  console.log(`Server is up on ${port}`)
})




// app.get('/', function (req, res) {
//   res.sendFile(publicPath + '/index.html')
// })
// app.listen(3000)


// console.log(publicPath)
