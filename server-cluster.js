import cluster from 'cluster'
import express from 'express'
import { cpus } from 'os'

if (cluster.isPrimary) {
    console.log(`Primary: ${process.pid}`)
    for (let i=0; i< cpus().length; i++) {
        cluster.fork()
    }
} else {
    console.log(`Worker: ${process.pid}`)
    const app = express()
    app.get('/simplex', (req, res) => res.send(`Ok from ${process.pid}`))
    app.get('/complex', (req, res) => {
        let sum = 0
        for (let index = 0; index < 5e8; index++) {
            sum += index
        }
        res.send({ payload: sum })
    })
    app.listen(8080, () => console.log(`Server up on process ${process.pid}`))
}
