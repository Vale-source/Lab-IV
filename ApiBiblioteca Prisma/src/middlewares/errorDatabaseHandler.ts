export const errorDatabaseHandler = (err: any) => {
	switch (err.code) {
		case 'P1012':
			return {
				status: 500,
				message: 'P1012: Esquema invalido, revisar schema.prisma',
			};

		case 'P1013':
			return {
				status: 500,
				message: 'P1013: URL de la base de datos incorrecta',
			};

		case 'P1016':
			return {
				status: 500,
				message:
					'P1016: No se puede levantar la base de datos, revisar si el servidor esta levantado',
			};
		default:
			return {
				status: 500,
				message: `Error Desconocido ${err.message || 'Sin mensaje'}`,
			};
	}
};
