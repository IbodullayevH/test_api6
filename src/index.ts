import express, { Application } from "express";
import "dotenv/config";
import router from "./routes"; 
import { ErrorHandlerMiddleware } from "./middlewares"; 
import { AppDataSource } from "./config/typeorm.config"; 

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);
// salom
const startServer = async () => {
    try {
        await AppDataSource.initialize(); 
        console.log(`Database connected!`);

        const port = process.env.PORT || 5000;
        app.listen(port, () => {
            console.log(`Server run on port: ${port}`);
        });
    } catch (err) {
        console.error(`Db error: ${err}`);
    }
};

startServer();

app.use("/*", ErrorHandlerMiddleware.errorHandlerMiddleware);
