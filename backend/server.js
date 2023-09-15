const PORT = 3008;
const Pool = require("pg").Pool;
const express= require("express");
const cors= require("cors");
const app= express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}))


const pool = new Pool({
    host: "localhost",
    user:"postgres",
    password:"904793",
    database:"newuserdata",
    port: "5432"
});

app.post('/userdata',async(req ,res)=>{
    try{
        const {Firstname,Lastname,Email,Phone,Password,Language}=req.body;
        await pool.query(`INSERT INTO userinformation (firstname,lastname,email,phone,password,language) VALUES ($1,$2,$3,$4,$5,$6)`,[Firstname,Lastname,Email,Phone,Password,Language]);
        res.json("data is created")
    }
    catch(err){
        console.log(err);
    }
});
app.get('/getuserdata',async(req,res)=>{
    const result=await pool.query("SELECT * FROM userinformation");
    console.log(result);
    res.json(result.rows);
})
app.delete('/deletedata',async(req,res)=>{
    const {id}=req.body
    console.log(id)
    await pool.query("DELETE FROM userinformation WHERE id=$1",[id]);
    res.json("datadeleted");
})
app.put('/editdata',async(req,res)=>{
    const {name,email,phone,language,role,id}=req.body;
    console.log(req.body)
    let data =await pool.query("UPDATE userinformation SET name = $1, email = $2, phone = $3, language = $4, role = $5 WHERE id = $6",[name,email,phone,language,role,id]);
    res.json(data);
})
app.get('/userdetails/:id',async(req,res)=>{
    const id = req.params.id
    const result = await pool.query("SELECT * FROM userinformation WHERE id=$1", [id]);
    res.json(result.rows);
    // console.log(id);
})
app.get('/assigntask',async(req,res)=>{
    let data =await pool.query("SELECT name , role ,documents , id  FROM userinformation");
    res.json(data);
})
app.listen(PORT,()=>{ 
    console.log(`Server is running on ${PORT}`);
})
