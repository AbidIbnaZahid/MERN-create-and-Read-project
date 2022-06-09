const express = require('express');


var cors = require('cors')
const app = express();
app.use(cors())

const Product = require('./model/product.js');
const Exam = require('./model/exam.js')
const Department = require('./model/department.js')

const mongoose = require('mongoose');
app.use(express.json())

mongoose.connect('mongodb+srv://mern:mern2102@cluster0.isiw3.mongodb.net/mern?retryWrites=true&w=majority', () => {
    console.log("DB Connected");
});

app.post('/', (req, res) => {
    const product = {
        name: req.body.name,
        brand: req.body.brand,
        price: req.body.price
    }
    const products = new Product(product)
    products.save()
    console.log("Done");
})

app.post('/department', (req, res) => {
    const depment = {
        name: 'Web Development'
    }
    const departments = new Department(depment)
    departments.save()
})

app.get('/department', async (req, res) => {
    const data = await Department.find({})
    res.send(data)
})

app.post('/exam', (req, res) => {
    const exam = {
        name: req.body.name,
        time: req.body.time,
        department: req.body.departmentid,
        departmentname: req.body.departmentname,
        dayOff: req.body.dayOff,
        content: req.body.content,
    }
    const exams = new Exam(exam)
    exams.save()
})

app.get('/exam', async (req, res) => {
    let data = await Exam.find({})
    res.send(data)

})

app.get("/product", async (req, res) => {
    let data = await Product.find({})
    res.send(data)
})


app.get("/product/:id", async (req, res) => {
    let data = await Product.findById(req.params.id)
    res.send(data)
})

app.delete("/product/:id", function (req, res) {
    Product.findByIdAndDelete(req.params.id, (err, docs) => {
        console.log(err);
    })
})

app.put("/product/:id", function (req, res) {
    let pro = {
        name: req.body.name,
        brand: req.body.brand,
        price: req.body.price
    }
    console.log(pro);
    Product.findByIdAndUpdate(req.params.id, pro, (err, docs) => {
        console.log(err);
    })
})
// app.get('/', function (req, res) {
//     const product = {
//         name: "Dell 4400",
//         brand: "Dell",
//         price: 10000,
//         inStock: true,
//         rating: 4.5
//     }

//     const products = new Product(product)
//     products.save()
//     res.send(product)
// })

// app.get("/product", async (req, res) => {
//     const data = await Product.find({})
//     res.send(data)
// })

app.listen("8000", () => {
    console.log("Server running Port on 8000");
})

