import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { data } from './data';
import publishersRoutes from './routes/publishersRoutes';
import domainsRoutes from './routes/domainsRoutes';
// import { startWebSocketServer } from './webSocket';

const app = express();
app.use(cors({
    credentials: true,
    origin: ["http://localhost:4200"]
}))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = 3000;

app.use('/api/publishers', publishersRoutes);
app.use('/api/domains', domainsRoutes);

// startWebSocketServer();

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});