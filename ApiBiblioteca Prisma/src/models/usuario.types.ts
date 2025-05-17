export interface UsuarioInterface {
	id: string;
	nombre: string;
	email: string;
	password: string;
}

export type UsuarioType = Omit<UsuarioInterface, 'id'>;
