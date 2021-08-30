import express, { Application, json, urlencoded } from 'express';
import dotenv from 'dotenv'
import authRoutes from './routes/auth'
import morgan from 'morgan'
import connection from './database/connection';

const app: Application = express();
dotenv.config({ path: './.env' })

// settings
app.set('port', process.env.PORT || 4000);
app.use(json());
app.use(urlencoded({ extended: false }));

// middlewares
app.use(morgan('dev'))

// routes
app.use('/api', authRoutes)

// Server
const main = async () =>{
    try {
        await app.listen(app.get('port'));
        console.info(`Server running on port ${app.get('port')}`)
        connection();
    } catch (error) {
        throw new Error(`Server error ${error}`);
    }
}

main();
