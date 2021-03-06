
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const cors = require("cors");
const compression = require("compression")

const app = express();
const port = process.env.PORT || 8000;
const api = require("./routes/api_router");

// Setup middleware stack
app.use(compression());
//app.use(helmet());
app.use(
  helmet({
    frameguard: false,
  })
);
app.use(cors());
app.use(express.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

// Set the path to static content and enable CORS in development
if (process.env.NODE_ENV !== "production") {
  app.use(express.static(path.join(__dirname, "client/public")));
} else {
  app.use(express.static(path.join(__dirname, "client/build")));
}

app.use("/", api);

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.toString() });
});

app.listen(port, () => console.log(`Listening to port ${port}`))
