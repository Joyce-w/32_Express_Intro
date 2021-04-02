class MathOps {
        constructor(str) {
                this.str = str;
                this.numArr;
                this.mean;
                this.median;
                this.mode;
        }
        getNumArray() {
                if (this.str == '') {
                        return 400
                }
                else {
                        // makes array of query numbers, parseInt, sort numerically
                        let str = this.str.split(',')
                        this.numArr = str.map(function (el) {
                                return parseInt(el)
                        })
                        if (this.numArr.includes(NaN)) {
                                return 400
                        } else {
                                return this.numArr
                        }                        
                }
        }
        getMean() {
             
                let reducer = (acc, cur) => (acc + cur)
                let sum = (this.numArr.reduce(reducer))
                this.mean = (sum / (this.numArr.length))
                return this.mean
        }
        getMedian() {
                let num = this.numArr.sort((a, b) => (a - b))
                let len = num.length
                // arr is odd
                if (len % 2 != 0) {
                        let mid = Math.floor(len/2)
                        this.median = (num[mid])
                        return this.median
                } else {        /*if arr is even */
                        let mid = Math.ceil(len / 2)
                        let midVal = num[mid] + num[mid-1]
                        this.median = midVal / 2;
                        return this.median
                }
        }
        getMode() {
                let sorted = this.numArr.sort((a, b) => a - b)

                // creat obj of occurances and element
                let set = new Set(this.numArr)
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
}

module.exports = MathOps;