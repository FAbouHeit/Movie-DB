const express = require('express');
const app = express();
// app.use(express.json);

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

///////////////////

const time = new Date();
const timeDisplay = `${time.getHours()}:${time.getSeconds()}`

const movies = [
    { title: 'Jaws', year: 1975, rating: 8 },
    { title: 'Avatar', year: 2009, rating: 7.8 },
    { title: 'Brazil', year: 1985, rating: 8 },
    // { title: 'الإرهاب والكباب‎', year: 1992, rating: 6.2 }
    { title: 'الإرهاب والكباب', year: 1992, rating: 6.2 }
]

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
    // const newmovie = {title : mynewtitle, year:mynewyear, rating: mynewrating}
    // const  {title, year, rating} = req.body
   
  
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
        // res.json(newmovie)
        res.status(200).json(movies)

})

app.post('/movies/add', (req,res)=>{
   
    let myNewtitle=req.body.title;
    let myNewyear = req.body.year;
    let myNewrating = parseFloat(req.body.rating) || 4;
  
//   console.log(typeof(myNewtitle),myNewtitle)
//   console.log(typeof(myNewyear), myNewyear.length,myNewyear)
//   console.log(typeof(myNewrating),myNewrating)
//   console.log(typeof(req.body.year.toString()),req.body.year.toString().length,req.body.year.toString())


    if(!myNewtitle || !myNewyear){
        res.status(403).json({status:403, error:true, 
            message:'you cannot create a movie without providing a title and a year'})
    }
   
else if(req.body.year.toString().length !==4 ){
            res.status(403).json({status:403, error:true, 
                message:'you cannot create a movie without providing a title and a year'})
    }
else{

      if(myNewrating>10 || myNewrating<0) {
        myNewrating=4;
    }
// 
 
         const newMovie = {title : myNewtitle, year:myNewyear, rating: myNewrating}
        movies.push(newMovie)
 
        res.status(200).json(movies)
}
})


app.get('/movies/delete/:id', (req,res)=>{
    let indexSelected = parseInt(req.params.id)
    // console.log(indexSelected)
    if(indexSelected>movies.length || indexSelected<1){
        res.status(404).json({status:404, error:true, message:'the movie <ID> does not exist'})
    } else{
        movies.splice(indexSelected-1, 1);
        res.status(200).json(movies)
    }
})

app.delete('/movies/delete/:id', (req,res)=>{
    let indexSelected = parseInt(req.params.id)
    // console.log(indexSelected)
    if(indexSelected>movies.length || indexSelected<1){
        res.status(404).json({status:404, error:true, message:'the movie <ID> does not exist'})
    } else{
        movies.splice(indexSelected-1, 1);
        res.status(200).json(movies)
    }
})


app.get('/movies/update/:id', (req,res)=>{
    let indexSelected = parseInt(req.params.id)

    let mynewtitle=req.query.title;
    let mynewyear = parseInt(req.query.year);
    console.log(typeof(mynewyear), mynewyear)
    let mynewrating = parseFloat(req.query.rating);
    // console.log(mynewrating)
    // if(mynewyear && mynewyear.length!=4){
    //     return   res.status(404).json({status:404, error:true, 
    //         message:'you cannot edit a movie with such year'})
    // }

    // console.log(indexSelected)
    if(indexSelected>movies.length || indexSelected<1){
        res.status(404).json({status:404, error:true, message:'the movie <ID> does not exist'})
    } else{
     if(req.query.title){
        movies[indexSelected-1].title = mynewtitle;
    } 
     if(req.query.year && req.query.year.length ===4){
        movies[indexSelected-1].year = mynewyear;
    } 
     if(mynewrating != undefined && mynewrating>=0 && mynewrating <11){
        movies[indexSelected-1].rating = mynewrating;
    }
}

    res.status(200).json(movies)
})


app.put('/movies/update/:id', (req,res)=>{
    let indexSelected = parseInt(req.params.id);
    // let indexSelected =req.params.id;
    let mynewtitle=req.body.title;
    let mynewyear = parseInt(req.body.year);
    let mynewrating = parseFloat(req.body.rating);
  
    if(indexSelected>movies.length || indexSelected<1){
        res.status(404).json({status:404, error:true, message:'the movie <ID> does not exist'})
    } else{
     if(req.body.title){
        movies[indexSelected-1].title = mynewtitle;
    } 
     if(req.body.year && req.body.year.toString().length ===4){
        movies[indexSelected-1].year = mynewyear;
    } 
     if(mynewrating != undefined && mynewrating>=0 && mynewrating <11){
        movies[indexSelected-1].rating = mynewrating;
    }
}

    res.status(200).json(movies)
})



app.listen(3002);