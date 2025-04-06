import express from 'express';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const app = express();

const PORT = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const distPath = path.join(__dirname, '../dist');

app.use(express.static(distPath));


app.listen(PORT, () => {
	console.log(`App en puerto http://localhost:${PORT}`);
});
