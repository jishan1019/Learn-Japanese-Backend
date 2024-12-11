import express, { NextFunction, Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import router from "./app/routes";
import notFound from "./app/middlewares/notFound";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";


const app = express();

//parset
app.use(express.json());
app.use(cookieParser());
app.use(express.text());
app.use(cors());


//Application Routes
app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) => {
  res.send("Server is Running!");
});

//global error handler
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  if (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

app.use(globalErrorHandler);
app.use(notFound);

export default app;
