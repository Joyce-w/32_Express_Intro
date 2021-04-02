const express = require('express')
const MathOps = require("./math")

const app = express();
// parse data as json
app.use(express.json())
// parse body data 
app.use(express.urlencoded({ extended: true }))


// home route
app.get('/', (req, res) => {
        res.send("This is the homepage!")
})


// mean route
app.get('/mean', (req, res) => {
        let nums = req.query.nums
        let query = new MathOps(nums)
        query.getNumArray()
        if (query.getNumArray() === 400) {
                // use try/catch
        }

        let meanVal = query.getMean()
        return res.send(`{
                operation: 'mean',
                value: ${meanVal}
        }`)
})


// median route
app.get('/median', (req, res) => {
        let nums = req.query.nums
        let query = new MathOps(nums)
        query.getNumArray()
        console.log(query.getNumArray())

        let medianVal = query.getMedian()
        return res.send(`{
                operation: 'median',
                value: ${medianVal}
        }`)      
})

// mode route
app.get('/mode', (req, res) => {
        let nums = req.query.nums
        let query = new MathOps(nums)
        query.getNumArray()
        console.log(query.getNumArray())
        
        let modeVal = query.getMode()
        return res.send(`{
                operation: 'mode',
                value: ${modeVal}
        }`)  
})

app.get('/all', (req, res) => {
        let nums = req.query.nums
        let query = new MathOps(nums)
        console.log(query.getNumArray())

        // get vvalues form op
        let meanVal = query.getMean()
        let medianVal = query.getMedian()
        let modeVal = query.getMode()

        // response
                return res.send(`{
                operation: 'all',
                mean: ${meanVal},
                median: ${medianVal},
                mode: ${modeVal}
        }`)  
})


// setup server
app.listen(3000, () => {
        console.log('App on port 3000')
})