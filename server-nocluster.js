import express from 'express'

const app = express()
app.get('/simplex', (req, res) => res.send(`Ok from ${process.pid}`))
app.get('/complex', (req, res) => {
    let sum = 0
    for (let index = 0; index < 5e9; index++) {
        sum += index
    }
    res.send({ payload: sum })
})
app.listen(8080, () => console.log(`Server up on process ${process.pid}`))
