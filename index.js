const express=require("express");
const app=express();
const path=require("path");
const mongoose=require("mongoose");
const methodOverride = require('method-override')
const Chat=require("./models/chat.js");

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));

app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

main()
.then((res)=>{
    console.log("Connection Succesful");
})
.catch((err)=>{
    console.log("ERROR : "+err);
});

app.listen(8080,()=>{
    console.log("Listening to port : 8080");
});

app.get("/",(req,res)=>{
    res.send("<h1>This is root page</h1>");
});

app.get("/chats",async (req,res)=>{
    let chats=await Chat.find();
    res.render("chats.ejs",{chats});
});

app.get("/chats/new",(req,res)=>{
    res.render("new.ejs");
});

app.post("/chats",(req,res)=>{
    let {from,msg,to}=req.body;
    let newChat=new Chat({
        from:from,
        msg:msg,
        to:to,
        created_at:new Date(),
    });
    newChat.save()
    .then((res)=>console.log(res))
    .catch((err)=>console.log(err));

    res.redirect("/chats");
});

app.get("/chats/:id/update",async (req,res)=>{
    let {id}=req.params;
    let chat=await Chat.findById(id);
    res.render("update.ejs",{chat});
});

app.patch("/chats/:id",async (req,res)=>{
    let {id}=req.params;
    let {msg :newMsg}=req.body;
    let newChat=await Chat.findByIdAndUpdate(id,{msg : newMsg},{runValidators:true, new:true});
    res.redirect("/chats");
});

app.delete("/chats/:id",async (req,res)=>{
    let {id}=req.params;
    let deletedChat=await Chat.findByIdAndDelete(id);
    res.redirect("/chats");
});