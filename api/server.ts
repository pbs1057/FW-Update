import express, { Request, Response } from 'express';

const app = express();
app.use(express.json());

const PORT: number = Number(process.env.PORT) || 4000;
app.set('port', PORT);


app.listen(PORT, () => {
  console.log(`${PORT} 번 포트에서 대기 중`);
});

