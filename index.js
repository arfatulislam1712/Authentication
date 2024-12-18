//  index.js
import  express from 'express';
import cookieParser from "cookie-parser";
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import mongoose from 'mongoose';

import userRoutes from './routes/userRoutes.js'
import {MAX_JSON_SIZE,URL_ENCODED,REQUEST_LIMIT_TIME,REQUEST_LIMIT_NUMBER,WEB_CACHE,PORT} from "./app/config/config.js";


const app =express();
//  App use difault middleware
app.use(cookieParser());
app.use(cors());
app.use(express.json({limit:MAX_JSON_SIZE}));
app.use(express.urlencoded({extended:URL_ENCODED}));
app.use(helmet());



// app use Limiter
const limiter =rateLimit({windowMs:REQUEST_LIMIT_TIME,max:REQUEST_LIMIT_NUMBER});
app.use(limiter);
// Cache
app.set('etag',WEB_CACHE);

// database connection with mongoose
let URL="mongodb://localhost/Authenticate"
let OPTION={user:"",pass:"",autoIndex:true}
mongoose.connect(URL,OPTION).then((res)=>{
   console.log("Connation Success")
}).catch((err)=>{
   console.log("error")   
})

// // Router Err
// Router Use
app.use("/api", userRoutes);

// Default Route (404 Error)
app.use("*", (req, res) => {
   res.status(404).json({ router: "not Found" });
});


app.listen(PORT,function(){
 console.log("Server Stared on Port "+PORT);
})