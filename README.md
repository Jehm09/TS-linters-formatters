# TS-linters-formatters

## Laboratorio

### ESLint

El objetivo del linter es verificar que el archivo `usersAPI.ts` cumple con las reglas que definamos, sigue estos pasos para añadir reglas y ajustar tu código.

- Clona este repositorio
- Instala [yarn](https://classic.yarnpkg.com/lang/en/docs/install/) en tu maquina si aun no lo tienes
- Instala las depedencias usando el comando `yarn`
- Ahora configuraremos las reglas de ESLint, en este caso para typescript. Iniciaremos con las reglas recomendadas de eslint, esto se hace añadiendo plugins que son paquetes de npm como por ejemplo `@typescript-eslint/eslint-plugin`, estos plugins tienen presets que puedes añadir en el array de `extends`, estos son grupos de reglas pre definidos. Crea un archivo llamado `.eslintrc` en la raiz de tu proyecto con el siguiente contenido:

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

- Corre el script usando el comando `yarn lint`, debes ver en tu consola que el archivo `usersAPI.ts` tiene ya algunos errores. Despues ajsutaremos todos los errores.
- Puedes ajustar reglas especificas del linter para tu proyecto, en este caso queremos mostrar un error cuando alguien use un `console.log` dentro del código, el código de producción no debe contener `console.log` que se usen solo para pruebas.
- Existen 3 niveles que puedes definir para tus reglas
  - "off": apaga la regla, util cuando quieres usar presets pero ajustar solo algunas reglas para tu proyecto
  - "warn" Si la regla se incumple, se muestra una advertencia, no genera un error
  - "error" Si la regla se incumple, es un error
- En este caso queremos generar un error cuando alguien use un `console.log`. Para añadir una regla ajusta el archivo de configuración de eslint, `.eslintrc`:

```json
{
    ...
    "rules": {
        "no-console": "error"
    }
}
```

- Corre de nuevo el script del linter, recuerda `yarn lint`
- Ahora verás dentro de los errores, el error con el nombre `no-console` que corresponde a usar `console.log` dentro de nuestro código de producción.
- Ahora añadiremos una nueva regla desde un plugin, en este caso queremos que nuestro codigo no use loops, pero use iteradores. Instala el plugin, `yarn add -D eslint-plugin-no-loops`
- Registra el plugin en el archivo de configuración, `.eslintrc`:

```json
{
    ...
    "plugins": [
       "@typescript-eslint",
        "no-loops"
    ],
    ...
}
```

- Define el nivel de error para este plugin, `.eslintrc`:

```json
{
    ...
    "rules": {
        "no-console": "error",
        "no-loops/no-loops": "error"
    }
  ...
}
```

- Corre de nuevo el script del linter y verifica que el error de loops se muestra
- Ajusta el codigo hasta que el linter no tenga errores

### Prettier

Para que tu código se mantenga igual dentro de un grupo de varios desarrolladores, es importante que el formato se mantenga igual para evitar conflictos a la hora de mezclar cambios. Sigue estos pasos para añadir reglas de formato a tu proyecto.

- Instala prettier usando el comando, `yarn add -D prettier`
- Crea un archivo de configuración llamado `.prettierrc` en la raiz de tu proyecto con el siguiente contenido

```json
{
  "semi": true,
  "trailingComma": "none",
  "singleQuote": true,
  "printWidth": 80,
  "arrowParens": "always",
  "tabWidth": 4
}
```
- Añade un script a tu `package.json` para correr el formateo de prettier:
```json
{
  "scripts": {
    ...
    "format": "prettier --config .prettierrc 'src/**/*.ts' --write"
  }
}
```
- Corre el script `yarn format`, revisa el archivo `usersAPI.ts` y verifica que los espacios hayan cambiado y que las comillas dobles `"` ahora sean comillas simples `'`
- Usando la [extensión de VSCode de prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) puedes correr este comando automaticamente cada vez que guardes un archivo

### ESLint y Prettier
Usando ESLint junto con prettier puedes generar errores cuando exista algun archivo que no tenga el formato correcto, esto es util ya que evita conflictos con otros desarrolladores trabajando en el mismo código.

- Para configurar ESLint para usar prettier, añade las dependencias requeridas usando el comando `yarn add -D eslint-config-prettier eslint-plugin-prettier`
- Ajusta la configuración de ESLint `.eslintrc`:
```json
{
    ...
    "plugins": [
        ...
        "prettier"
    ],
    ...
    "rules": {
        ...
        "prettier/prettier": "error"
    }
    ...
}
```
- Ve al archivo `usersAPI.ts` y cambia las comillas simples `'` por comillas dobles `"`, guarda el archivo sin darle formato.
> Si tienes instalada la extensión de VSCode de prettier, al guardar el formato se ajustará automaticamente. Para guardar el archivo sin darle formato puedes usar la barra de comandos, `⌘` + `shift` + `p` y escribr `save without formatting`
- Corre el linter usando `yarn lint` ahora los errores de formato tambien aparecerán como errores del linter, esto hará el proceso de automatización mas completo, ya que no solo verificará las reglas del linter sino incluirá también la verificación del formato.


### Automatización
Ahora que tenemos las reglas de formato y de estilo del código podemos automatizar el proceso para que en cada commit se verifiquen las reglas definidas y tu código siempre mantenga el formato y el estilo correcto, sin importar quien trabaje en él. Para esto usaremos una libreria llamada `husky` que se encarga de correr comandos antes o despues de eventos de git, tales como `push` o `commit`

- Instala husky usando el comando `yarn add -D husky@4.3.8`
> Versiones recientes de Husky requieren una licencia, por eso usamos la versión gratuita
- Añade el script que se ejecutará antes de un commit, ejecutaremos primero el formato y despues el linter usando `&&` si alguno de los dos comandos falla todo el comando fallará y no permitirá hacer el commit. Ajusta tu `package.json` asi:
```json
{
    ...
    "husky": {
         "hooks": {
            "pre-commit": "yarn format && yarn lint"
        }
    },
    ...
}
```
- Añade una nueva funcion al `UsersAPI.ts` para encontrar un usuario por id
```typescript
export class UsersAPI {
    ...
    getUserById(userId: number) {
        let userFound = null;

        for(let i=0;i<users.length;i++){
            if(users[i].id === userId){
                userFound = users[i];
            }
        }

        return userFound;
    }
}
```
- Haz un commit desde tu consola, usando `git add .` y `git commit -m "add get users by id to users api"`
- El commit debe fallar ya que existen errores del linter, el formato del archivo se ajusto automaticamente
- Ajusta los errores y haz el commit de nuevo
- Haz automatizado el proceso de formateo y estilo de tu código!