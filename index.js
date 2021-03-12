const express = require("express"); //import
const app = express(); //create express server
const jsonParser = express.json(); //middleware

app.use(jsonParser); //register the jsonParser from express

const userRouter = require("./routers/user");
const imageRouter = require("./routers/image");
const authRouter = require("./routers/auth");

app.use("/users", userRouter);
app.use("/images", imageRouter);
app.use("/auth", authRouter);

const port = process.env.PORT || 4000;
//const PORT = 4000;
//app.listen(PORT, () => console.log(`Server started in port: ${PORT}`));
app.listen(port, () => console.log(`server started in port:${port}`)); //listen on port
