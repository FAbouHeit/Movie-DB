const express = require('express');
const app = express();

const time = new Date();
const timeDisplay = `${time.getHours()}:${time.getSeconds()}`

app.get('/', (req,res)=>{
    console.log("here")
    res.json({status:200, message:"ok"})
})

app.get('/test', (req,res)=>{
    res.json({status:200, message:"ok"})
})
app.get('/time', (req,res)=>{
    res.json({status:200, message:timeDisplay})
})

app.get('/hello/:ID?', (req,res)=>{
    // res.json({status:200, message:timeDisplay})
    // res.send(req.params);
    if(!req.params.ID) req.params.ID = ""
    res.json({status: 200, message: `Hello ${req.params.ID}`})
})

// app.get('/search?s=:Search?', (req,res)=>{
//     if(req.params.Search) 
//     res.status(200).json({status:200, message: "ok", data: `${req.params.Search}`})
//     else
//     res.status(500).json({status:500, error: true,message:"you have to provide a search"})
   
// })


app.get('/search', (req,res)=>{
    // let search = req.query;
    // console.log(search)
if(req.query.s) res.status(200).json({status:200, message: "ok", data: `${req.query.s}`})
else
    res.status(500).json({status:500, error: true,message:"you have to provide a search"})
})


app.get('/movies/create', (req,res)=>{

})

app.get('/movies/read', (req,res)=>{
    // let displayMovies =[]
    //  movies.forEach(element => {
    // displayMovies.push(element.title)    
    // });
    // displayMovies.trim()
    res.status(200).json({status:200, data: movies })
})

app.get('/movies/update', (req,res)=>{
    
})

app.get('/movies/delete', (req,res)=>{
    
})

const movies = [
    { title: 'Jaws', year: 1975, rating: 8 },
    { title: 'Avatar', year: 2009, rating: 7.8 },
    { title: 'Brazil', year: 1985, rating: 8 },
    // { title: 'الإرهاب والكباب‎', year: 1992, rating: 6.2 }
    { title: 'الإرهاب والكباب', year: 1992, rating: 6.2 }
]

app.get('/movies/read/by-date', (req,res)=>{
    let displayMovies =movies.sort((one, two)=>one.year-two.year)
     
    // displayMovies.trim()
    res.status(200).json({status:200, data: displayMovies })
})
app.get('/movies/read/by-rating', (req,res)=>{
    let displayMovies =movies.sort((one, two)=>two.rating-one.rating)
    res.status(200).json({status:200, data: displayMovies })
})
app.get('/movies/read/by-title', (req,res)=>{
    let displayMovies =movies.sort((one, two)=>one.title.localeCompare(two.title))
    res.status(200).json({status:200, data: displayMovies })
})


app.get('/movies/read/id/:id', (req,res)=>{
    let movieSelected;
    if(req.params.id > movies.length || req.params.id <1)
        
        res.status(404).json({status:404, error:true, message:`the movie ${req.params.moviename} does not exist`})
    else {
        movieSelected = movies[req.params.id-1]
        res.status(200).json({status:200, data: movieSelected})
    }
})


app.get('/movies/add', (req,res)=>{
   
    let mynewtitle=req.query.title;
    let mynewyear = parseInt(req.query.year);
    let mynewrating = parseFloat(req.query.rating) || 4;
   
  
    if(!req.query.title || !req.query.year){
        res.status(403).json({status:403, error:true, 
            message:'you cannot create a movie without providing a title and a year'})
    }
   else if(req.query.year.length !==4 || isNaN(req.query.year)){
            res.status(403).json({status:403, error:true, 
                message:'you cannot create a movie without providing a title and a year'})
    }
  else  if(mynewrating>10 || mynewrating<0) {
        mynewrating=4;
    }
        const newmovie = {title : mynewtitle, year:mynewyear, rating: mynewrating}
        movies.push(newmovie)
        res.json(movies)

})
app.listen(3002);