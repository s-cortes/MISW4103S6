# KrakenTest


## Estructura de Archivos

```
📦 KrakenTest
 ┣---- 📂 features
 ┃     ┗---- 📂 mobile
 ┃     ┃     ┣---- 📂 step_definitions
 ┃     ┃     ┃     ┣---- 📜 steps.js
 ┃     ┃     ┣---- 📂 support
 ┃     ┃     ┃     ┣---- 📜 hooks.js
 ┃     ┃     ┃     ┣---- 📜 support.js
 ┃     ┣---- 📂 web
 ┃     ┃     ┣---- 📂 step_definitions
 ┃     ┃     ┃     ┣---- 📜 steps.js
 ┃     ┃     ┣---- 📂 support
 ┃     ┃     ┃     ┣---- 📜 hooks.js
 ┃     ┃     ┃     ┣---- 📜 support.js
 ┃     ┣---- 📜 escenarioF001E01.feature
 ┃     ┣---- 📜 escenarioF001E02.feature
 ┃     ┣---- 📜 escenarioF002E01.feature
 ┃     ┣---- 📜 escenarioF002E02.feature
 ┃     ┣---- 📜 escenarioF002E03.feature
 ┃     ┣---- 📜 escenarioF003E01.feature
 ┃     ┣---- 📜 escenarioF003E02.feature
 ┃     ┣---- 📜 escenarioF003E02.feature
 ┃     ┣---- 📜 escenarioF003E03.feature
 ┃     ┣---- 📜 escenarioF005E01.feature
 ┣---- 📜 mobile.json
 ┣---- 📜 package.json
 ┣---- 📜 package-lock.json
 ┣---- 📜 README.md

```

## Dependecias y Versionamiento

A continuación, se presentan las dependencias principales para la ejecución de las pruebas Kraken.

| Dependencia | Versión  |
| ----------- | -------- |
| NodeJs      | ^14.19.1 |
| Npm         | ^6.14.16 |
| Ghost CLI   | 1.19.3   |
| Ghost (App) | 4.47.0   |

## Instalación y Configuraciones

`Importante!` Todos los comandos que se muestran a continuación deben ser ejecutados utilizando la carpeta `KrakenTest` como la raíz (root) del proyecto.

Para poder hacer uso de los escenarios de prueba establecidos, es necesario ejecutar los siguientes comandos en la terminal (en caso de utilizar Windos SO, se recomienda hacer uso de powershell)

```shell
npm install
```

Este proyecto hace uso, principalmente, de 2 dependencias: `cypress` y  `@faker-js/faker` (generación de datos para pruebas). Los siguientes comandos muestran cómo hacer la instalación de estas dependencias

```shell
npm run kraken:run
```

### Credenciales Ghost Admin
Adicionalmente a la instalación de dependencias, los scripts de pruebas requieren de las credenciales del usuario administrador de Ghost para poder ser ejecutadas. Para ello, se tiene el archivo `user.json` en donde se debe colocar tanto el correo como la contraseña del administrador.

~~~
    Aviso: Dado que se necesitan las credenciales del administrador, se espera
    que la aplicación Ghost cuente con un usuario admin creado previamente. En
    caso de no tener dicho usuario, dirigirse a la página de setup para la
    creación del usuario
    
    Setup: http://<url>:<port>/ghost/#/setup
~~~


## Despliegue

### Despliegue Aplicación Ghost

Antes de poder ejecutar las pruebas de Cypress, es necesario el despliegue de la aplicación Ghost que se desea probar. para ello, se debe ejecutar el siguiente comando dentro de la carpeta raíz de la aplicación Ghost

```shell
ghost start
```

### Ejecución de Pruebas Kraken
Para desplegar el proyecto, se debe ejecutar algunode los siguientes comandos

```shell
# Utilizando el comando definido en pagake.json
npm run kraken:run

# Directamente desde node_modules
./node_modules/.bin/cypress open
```

Una vez la aplicación de kraken haya sido desplegada, es posible ejecutar las pruebas al seleccionar alguno de los archivos de la carpeta 📂 `end-to-end`.