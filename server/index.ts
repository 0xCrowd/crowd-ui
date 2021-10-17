/**
 * @description Express static & proxy server
 */
import path from 'path';
import express from 'express';
import config from 'config';
import { createProxyMiddleware } from 'http-proxy-middleware';

const PORT = 3000;
const STATIC = path.resolve(__dirname);
const INDEX = path.resolve(STATIC, 'index.html');

const server = express();

server.use(express.static(STATIC));

server.get('*', (_, res) => {
  res.sendFile(INDEX);
});

server.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
