import express from "express";
import expressWs from 'express-ws';
import cors from "cors";

const app = express();
expressWs(app);
app.use(cors());


const router = express.Router();

router.ws('/chat', (ws, req) => {
  console.log('client connected');

  ws.on('close', () => {
    console.log('client disconnected');
  });
});

app.use(router);