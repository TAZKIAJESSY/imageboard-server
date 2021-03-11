const express = require("express"); //import
const app = express(); //create express server
//const PORT = 4000;
const port = process.env.PORT || 4000;

//app.listen(PORT, () => console.log(`Server started in port: ${PORT}`));
app.listen(port, () => console.log(`server started in port:${port}`));
