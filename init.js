const mongoose=require("mongoose");
const Chat=require("./models/chat.js");

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

let chat1=new Chat({
        from:"senderName",
        to:"recieverName",
        msg:"This is message",
        created_at:new Date(),
    });

chat1.save()
.then((res)=>{
    console.log(res);
})
.catch((err)=>{
    console.log(err);
});