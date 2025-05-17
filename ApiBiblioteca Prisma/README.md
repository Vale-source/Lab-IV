1. Realizar npm install<br>
2. Levantar la base de datos con el comando:<br>
docker-compose up -d <br>
3. Crear el archivo .env con todos lo necesario para levantar la base de datos y la app<br>
4. Generar el cliente de Prisma con el comando:<br>
npx prisma generate<br>
5. Migrar la base de datos con el comando:<br>
npx prisma migrate dev --name init<br>
6. Compilar la app (no me salio usar ts-node) con el siguiente comando:<br>
npm run build<br>
7. Por ultimo levantar la aplicacion con:<br>
npm start<br>

