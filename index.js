const ex = require('express');
const bp = require('body-parser');
const app = ex()
const https = require('https')

var item_new = ['buy Food', 'buy groceries'];
var work_item = ['buy'];


app.use(ex.static('public'))
app.use(bp.urlencoded({extended:true}));

app.set('view engine', 'ejs');


app.listen(process.env.PORT || 3000, function(){
    console.log('On it...')
})

app.get('/', function(req, res){
    var today = new Date();

    var options = { weekday: 'long', month: 'long', day: 'numeric' };
    var time =  today.toLocaleDateString("en-US", options)
    
    res.render("list", {
        kindofDay:time, 
        additional: item_new
    }) 
})

app.post('/', function(req, res){
    var new_ = req.body.new_one;
    if (req.body.list === 'Work') {
        work_item.push(new_) 
        res.redirect('/work')
    }  else{
        item_new.push(new_)
        res.redirect('/') 
    }
})


app.get('/work', function(req,res){
    res.render('list', {
        kindofDay:'Work', 
        additional:work_item
    })
})

app.post('/work', function(req, res){
    var new_ = req.body.new_one;
    work_item.push(new_)  
    res.redirect('/work')
})


app.post('/about', function(req, res){
    res.render('about');
})