# TS-linters-formatters

## Laboratorio

- Clona este repositorio
- Instala [yarn](https://classic.yarnpkg.com/lang/en/docs/install/) en tu maquina si aun no lo tienes
- Instala las depedencias usando el comando `yarn`
- Ahora configuraremos las reglas de ESLint, en este caso para typescript. Iniciaremos con las reglas recomendadas de eslint, esto se hace añadiendo plugins que son paquetes de npm como por ejemplo `@typescript-eslint/eslint-plugin`, puedes ver los plugins en el `package.json`. Crea un archivo llamado `.eslintrc` en la raiz de tu proyecto con el siguiente contenido:

```json
{
  "root": true,
  "parser": "@typescript-eslint/parser",
  "plugins": ["@typescript-eslint"],
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended"
  ]
}
```

- Existen archivos que no es necesario revisar, por ejemplo archivos de configuración, o las librerias. Para informar a ESLint de los archivos que queremos ignorar, debemos crear un archivo llamado `.eslintignore` en la raiz del proyecto con el siguiente contenido:

```
node_modules
```

- Los linters y formatters deben correr generalmente cuando hacemos un commit o antes de hacer push, para poder automatizar este proceso primero crearemos un script que corra eslint. Para esto debes añadir el script en tu `package.json`:

```json
{
  "scripts": {
    ...
    "lint": "eslint . --ext .ts",
  }
}
```
