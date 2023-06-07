# Pets - The Mad Goblin

Tienda de mascotas de [World of Warcraft](https://worldofwarcraft.blizzard.com/es-es/)

## Tecnologías usadas

La página web está desarrollada con el framework [Next.js](https://nextjs.org) y utilizó CSS para estilizar con el post-procesador [PostCSS](https://postcss.org).

La base de datos está hecha en [MongoDB](https://www.mongodb.com).

## API

Los endpoints disponibles son:

### PETS

- GET `/pets`: Devuelve todas las mascotas de Pets - The Crazy Goblin.
- GET `/pets/prices`: Devuelve las mascotas de acuerdo al rango de precios de Pets - The Crazy Goblin.
- GET `/pets/:name`: Devuelve una mascota de acuerdo al nombre de Pets - The Crazy Goblin.
- GET `/pets/types`: Devuelve todos los tipos de mascotas con una imagen de Pets - The Crazy Goblin.
- GET `/pets/types/:type`: Devuelve las mascotas de acuerdo al tipo de Pets - The Crazy Goblin.
- GET `/pets/types/:type/prices`: Devuelve las mascotas de acuerdo al tipo y al rango de precios de Pets - The Crazy Goblin.
- GET `/pets/search`: Devuelve la/s mascotas que contengan en su nombre la palabra de la búsqueda de Pets - The Crazy Goblin.

### USERS

- POST `/users`: Crea un nuevo usuario de Pets - The Crazy Goblin.
- PUT `/users`: Modifica un campo del usario de Pets - The Crazy Goblin.
- GET `/users/:username`: Devuelve el username, email y el historial de compras del usuario de Pets - The Crazy Goblin.
- DELETE `/users/:username`: Borra el usuario de Pets - The Crazy Goblin.

### AUTH

- POST `/auth`: Devuelve si el token es válido y no ha expirado y renovar el token dos días antes de expirar.
