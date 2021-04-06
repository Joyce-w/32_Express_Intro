const express = require("express");
const ExpressError = require("../expressError")
// connects to express app 
const router = new express.Router();
const items = require("../fakeDB")

router.use(express.json())

// returns all the items in the db
router.get("/", (req, res) => {
    res.json(items)
})

// post a new item to db, returns entire db after
router.post("/", (req, res) => {
    items.push(req.body)
    res.json(items)
})

// displays a single item
router.get("/:name", (req, res, next) => {
    try {
        let foundItem = items.find(i => i.name === req.params.name)
        if (foundItem === undefined) throw new ExpressError("Item not found", 404)
    
        res.json(foundItem)        
    } catch (e) {
        next(e)
    }

})

// patch an existing item
router.patch("/:name", (req, res) => {
    let foundItem = items.find(i => i.name === req.params.name)
    foundItem["name"] = req.body.name
    foundItem["price"] = req.body.price
    res.json(req.body)
})

// deletes an item name
router.delete("/:name", (req, res) => {
    let foundIdx = items.findIndex(i => i.name === req.params.name)
    items.splice(foundIdx, 1)
    res.json({message: "Deleted"})
})

module.exports = router;