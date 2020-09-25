const express = require("express");

const authRouter = require("./routers/auth");
const imagesRouter = require("./routers/images");
const authMiddleware = require("./auth/middleware");

const PORT = process.env.PORT || 4000;
const app = express();

// Middlewares
const jsonParser = express.json();
app.use(jsonParser);

// Routers

app.use("/auth", authRouter);
app.use("/images", authMiddleware, imagesRouter);

// Start server
app.listen(PORT, () => console.log("App listening on port:", PORT));
