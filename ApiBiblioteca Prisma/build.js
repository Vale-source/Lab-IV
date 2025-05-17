import esbuild from 'esbuild';

esbuild
	.build({
		entryPoints: ['src/server.ts'],
		bundle: true,
		platform: 'node',
		target: ['node20'],
		outfile: 'dist/server.js',
		format: 'esm',
		sourcemap: true,
		external: [
			'@prisma/client',
			'express',
			'node:events',
			'node:fs',
			'node:path',
			'node:url',
			'dotenv',
		],
	})
	.catch(() => process.exit(1));
