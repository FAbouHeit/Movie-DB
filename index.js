const express = require('express');
const app = express();
const mongoose = require('mongoose');
// app.use(express.json);

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



app.listen(3002, () =>{
    console.log("Server is running");
});



const uri = "mongodb+srv://fabouheit:2upvaGWizBSySqeB@cluster0.ykbmtqg.mongodb.net/?retryWrites=true&w=majority";

(async ()=>{
    try{
        await mongoose.connect(uri,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        })
        console.log("connected to db");
        
    }
    catch(error){
        console.log(error);
    }
})();

// const { MongoClient, ServerApiVersion } = require('mongodb');

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);




const movieSchema = new mongoose.Schema({
    title: { type: String, required: true },
    year: { type: Number, required: true },
    rating: { type: Number , required: true},
  });
  
  // Create a User model using the schema
  const Movie = mongoose.model('movie', movieSchema);




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
////////////////////////////////////////////////////////////
app.get('/movies',async (req,res)=>{
    // let indexSelected = req.params.id;
   
    
    try{
        const myMovieDB= await Movie.find();
        res.json(myMovieDB)
    }catch(error){
        res.json({status:404,error:true,message:"error reading"})
        console.log(error)
    }
    
  })

////////////////////////////////////////////////////////////
// app.get('/movies/read', async (req, res) => {
//     const db = client.db(); // Get the database instance
//     const collection = db.collection('your_collection'); // Replace with your collection name
  
//     // const objectId = new ObjectId(req.params.id);
  
//     // Find a document by its ObjectId
//     const document = await collection.findOne({ _id: objectId });
  
//     if (!document) {
//       return res.status(404).json({ message: 'Document not found' });
//     }
  
//     res.json(document);
//   });
////////////////////////////////////////////////////////////


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

////////////////////////////////////////////////////////////



////////////////////////////////////////////////////////////

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

////////////////////////////////////////////////////////////////////////
app.post('/movies',(req,res)=>{

    const movie= new Movie({
    title : req.body.title,
    year : req.body.year,
    rating : req.body.rating
    })

    movie.save().then(
        () => res.json({status:200,message:"done successfully"}),
        (error) => {
            console.log(error)
            res.json({status:404,error:true,message:"error"})
        }
    )
    
  })

///////////////////////////////////////////////////////////////////////









app.get('/movies/delete/:id', isAuthenticated,(req,res)=>{
    let indexSelected = parseInt(req.params.id)
    // console.log(indexSelected)
    if(indexSelected>movies.length || indexSelected<1){
        res.status(404).json({status:404, error:true, message:'the movie <ID> does not exist'})
    } else{
        movies.splice(indexSelected-1, 1);
        res.status(200).json(movies)
    }
})

app.delete('/movies/delete/:id', isAuthenticated,(req,res)=>{
    let indexSelected = parseInt(req.params.id)
    // console.log(indexSelected)
    if(indexSelected>movies.length || indexSelected<1){
        res.status(404).json({status:404, error:true, message:'the movie <ID> does not exist'})
    } else{
        movies.splice(indexSelected-1, 1);
        res.status(200).json(movies)
    }
})

////////////////////////////////////////////////////////////////////////

app.delete('/movies/:id', isAuthenticated,async (req,res)=>{
    let indexSelected = req.params.id;
   
    
    try{
        await Movie.findByIdAndDelete(indexSelected);
        res.json({message: "success"})
    }catch(error){
        res.json({status:404,error:true,message:"error deleting"})
        console.log(error)
    }
    
  })


////////////////////////////////////////////////////////////////////////


app.get('/movies/update/:id', isAuthenticated,(req,res)=>{
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


app.put('/movies/update/:id', isAuthenticated,(req,res)=>{
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

////////////////////////////////////////////////////////////

app.put('/movies/:id', isAuthenticated,async (req,res)=>{
    let indexSelected = req.params.id;
    const updatedata = req.body;
    const objectIdLike = indexSelected.padStart(24, '0');
    try{
        await Movie.findByIdAndUpdate(indexSelected,updatedata,{new:true});
        res.json(updatedata)
    }catch(error){
        res.json({status:404,error:true,message:"error updating"})
        console.log(error)
    }
    
  })




  
//////////////////////////////////////////////////////////////



// const router = express.Router();

const users = [
  { username: 'fuad', password: 'fuad123' },
  { username: 'sami', password: 'sami123' }
];

function isAuthenticated(req, res, next){

    const { username, password } = req.headers;
  const user = users.find((u) => u.username === username && u.password === password);
  if (user) {
    next();
  } else {
    res.status(404).json({ message: "error" });
  }
}

app.get('/users/add', (req, res) => {
    let newusername = req.query.username;
    let newpassword = req.query.password;
    if(!newusername || !newpassword ){
    res.json({message: "error adding user"})
    } else{
        users.push({username: newusername, password:newpassword })
        res.json({success:"added successfully"})
    }
  });

  app.get('/users', (req, res) => {
   
        res.json(users)

  });



app.get('/users/update/:id', (req, res) => {
    let id = req.params.id;

    let newusername = req.query.username;
    let newpassword = req.query.password;

    if(!id){
    res.json({message: "error updating user"})
    } else{
        
        if(newusername){
            users[id].username = newusername;
        }
        if(newpassword){
            users[id].password = newpassword;
        }
        res.json({success:"updated successfully"})
    }
  });

  app.get('users/delete/:id', (req,res)=>{
    let id  =req.params.id;

    if(!id){
        res.json({message: "error with the id"})
    } else{
        users.slice(id-1,1);
        res.json({message: "user removed successfully"})
    }
  })
