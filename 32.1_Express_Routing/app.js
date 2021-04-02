const express = require('express')

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
        let meanVal = getMean(nums)
        return res.send(`{
                operation: 'mean',
                value: ${meanVal}
        }`)
})


// median route
app.get('/median', (req, res) => {
        let nums = req.query.nums
        let medianVal = getMedian(nums)
        return res.send(`{
                operation: 'median',
                value: ${medianVal}
        }`)      
})

// mode route
app.get('/mode', (req, res) => {
        let nums = req.query.nums
        let modeVal = getMode(nums)
        return res.send(`{
                operation: 'mode',
                value: ${modeVal}
        }`)  
})



function getMean(nums) {
        let arr = nums.split(',')
        let num = arr.map(function (el, i, a) {
                return parseInt(el)
        })
        
        let reducer = (acc, cur) => (acc + cur)
        let sum = (num.reduce(reducer))
        return sum / (num.length)
}


function getMedian(nums) {
        let arr = nums.split(',')
        let num = arr.map(function (el) {
                return parseInt(el)
        })
        num = num.sort((a, b) => (a - b))
        let len = num.length

        // arr is odd
        if (len % 2 != 0) {
                let mid = Math.floor(len/2)
                console.log(num[mid])
        } else {        /*if arr is even */
                let mid = Math.ceil(len / 2)
                let midVal = num[mid] + num[mid-1]
                return midVal / 2;
        }
}


function getMode(nn) {
        // makes array of query numbers, parseInt, sort numerically
        let arr = nn.split(',')
        let nums = arr.map(function (el) {
                return parseInt(el)
        })
        let sorted = nums.sort((a, b) => a - b)

        // creat obj of occurances and element
        let set = new Set(nums)
        set = Array.from(set)
        let counter = {}

        for (let s in sorted) {
                let temp = sorted[s]
                if (temp !== sorted[s - 1]) {
                        counter[temp] = 1;
                }
                else {
                        let count = counter[temp]
                        count += 1;
                        counter[temp] = count;
                }
        }
        let counts = Object.values(counter)
        let s = [...counts]
        s = s.sort((a, b) => (b - a))

        let val= s[0]
        let idx = ((counts.indexOf(val)))

        return Object.keys(counter)[idx]

}


// setup server
app.listen(3000, () => {
        console.log('App on port 3000')
})