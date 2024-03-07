const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

require("./db/connection");
require("./models/postdata");
const router = require("./routes/router");
app.use(cors());
app.use(bodyParser());
app.use(router);
app.listen(1000, () => {
  console.log("app listening on port 5000");
});
