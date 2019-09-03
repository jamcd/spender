import express, { Request, Response } from 'express';
import path from 'path';
const app = express();

app.use(express.static(path.join(__dirname, 'build')));

app.get('/ping', function(req: Request, res: Response) {
  return res.send('pong');
});

app.get('*', function(req: Request, res: Response) {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

app.listen(process.env.PORT || 8080);
