const app=require("./app/app")

const port=process.env.PORT || 4000;

app.listen(port,()=>{
    console.log(`server corriendo ${port}`);
});