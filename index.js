const ex = require('express');
const bp = require('body-parser');
const app = ex()
const https = require('https')

var item_new = ['buy Food', 'buy groceries'];

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
    item_new.push(new_)   
    for (let i = 0; i < item_new.length; i++) {
        if(item_new[i] === 'Farxod is Gay'){
            item_new.pop();
        }
    }
    res.redirect('/')
})
