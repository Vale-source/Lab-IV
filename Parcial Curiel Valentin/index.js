import readline from 'readline';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import fs from 'fs';
import { fileURLToPath } from 'node:url';
import path, { dirname } from 'node:path';

const argv = yargs(hideBin(process.argv))
	.command('archivo', 'Ingresar el nombre del archivo JSON', {
		file: {
			demandOption: true,
			type: 'string',
			default: 'productos.json',
		},
	})
	.fail((msg) => {
		console.error('Proporcione un argumento valido');
		console.error(msg);
		process.exit(1);
	})
	.help().argv;

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const askProduct = () => {
	return new Promise((resolve) => {
		rl.question('Ingrese nombre del producto: ', (product) => {
			resolve(product);
		});
	});
};
const askPrice = () => {
	return new Promise((resolve) => {
		rl.question('Ingrese el precio del producto: ', (price) => {
			const checkIntPrice = parseInt(price);
			if (checkIntPrice <= 0) {
				console.log('Ingrese un numero valido');
			}
			resolve(price);
		});
	});
};

const askAmount = () => {
	return new Promise((resolve) => {
		rl.question(
			'Ingrese la cantidad de unidades del producto: ',
			(amount) => {
				resolve(amount);
			},
		);
	});
};

const createJSON = async () => {
	if (argv._.includes('archivo')) {
		if (!argv.file) {
			console.error('Ingrese un el nombre del archivo JSON');
		} else {
			const pathJSON = path.join(__dirname, `${argv.file}`);
			const producto = await askProduct();
			const precio = await askPrice();
			const cantidad = await askAmount();
			const newProduct = {
				producto: `${producto}`,
				precio: `${precio}`,
				cantidad: `${cantidad}`,
			};
			if (!fs.existsSync(pathJSON)) {
				try {
					fs.writeFileSync(
						pathJSON,
						JSON.stringify([newProduct], null, 2),
						'utf-8',
					);
					const data = fs.readFileSync(pathJSON, 'utf-8');
					const productsRead = JSON.parse(data);
					console.log(
						`Productos: ${JSON.stringify(productsRead, null, 2)}`,
					);
				} catch (error) {
					console.error(error);
				}
			} else {
				try {
					const data = fs.readFileSync(pathJSON, 'utf-8');
					const listProducts = JSON.parse(data);

					if (Array.isArray(listProducts)) {
						listProducts.push(newProduct);
						fs.writeFileSync(
							pathJSON,
							JSON.stringify(listProducts, null, 2),
							'utf-8',
						);
					} else {
						console.log('No hay lista de productos existentes');
					}
					console.log(
						`Productos: ${JSON.stringify(listProducts, null, 2)}`,
					);
				} catch (error) {
					console.error(error);
				}
			}
		}
	}
};

const main = async () => {
	await createJSON();
	rl.close();
};

main();
