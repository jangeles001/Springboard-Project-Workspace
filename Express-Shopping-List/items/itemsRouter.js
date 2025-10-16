const express = require("express");
const inventory = require("../fakeDb");
const router = express.Router();

router.get("/items", (req, res) => {
   return res.status(200).json(inventory); 
});

router.get("/items/:item", (req, res) => {
    const item = inventory.find((item) => {
        return item.name === req.params.item; 
    });

    if(item){
        return res.status(200).json(item)
    }

    return res.status(404).json({Error: "item not Found"});

});

router.patch("/items/:item", (req, res) => {
    const { name, price } = req.body;
    const item = inventory.find((item) => {
        return item.name === req.params.item; 
    });

    if(item){
        item.name = name;
        item.price = price;
        return res.status(200).json({updated: item})
    }

    return res.status(404).json({Error: "item not Found"});
});

router.post("/items", (req, res, next) => {
    const {name, price} = req.body;
    if(name && price) {
        inventory.push({name, price});
        return res.status(201).json({added: {name, price}});
    } else {
        next();
    }
});

router.delete("/items/:item", (req, res) => {
    let index = inventory.findIndex((item) => item.name === req.params.item);
    console.log(index);

    if(index >= 0){
        inventory.splice(index, 1);
        return res.status(200).json("Deleted");
    } 

    return res.status(204).json("Item not found");
});

router.use("/", (error, req, res, next) => {
    return res.status(500).send(`Error: ${error}`);
});

module.exports = router;