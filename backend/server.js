import express from 'express'
import connectDb from './Config/db.js'
import userRoutes from './Routes/Routes.js'
import cors from 'cors'

connectDb()
const app = express()
app.use(express.json());
app.use(cors())
app.use("/api/v1", userRoutes);

app.get('/',(req,res)=>{
    res.send("<h1>Welcome to Expense-Management-App</h1>")
})
const PORT = 8080 || process.env.PORT;
app.listen(PORT,()=>{
    console.log("server running")
}) 
