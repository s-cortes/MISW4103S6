# KrakenTest


## Estructura de Archivos

```
π¦ KrakenTest
 β£---- π features
 β     β---- π mobile
 β     β     β£---- π step_definitions
 β     β     β     β£---- π steps.js
 β     β     β£---- π support
 β     β     β     β£---- π hooks.js
 β     β     β     β£---- π support.js
 β     β£---- π web
 β     β     β£---- π step_definitions
 β     β     β     β£---- π steps.js
 β     β     β£---- π support
 β     β     β     β£---- π hooks.js
 β     β     β     β£---- π support.js
 β     β£---- π escenarioF001E01.feature
 β     β£---- π escenarioF001E02.feature
 β     β£---- π escenarioF002E01.feature
 β     β£---- π escenarioF002E02.feature
 β     β£---- π escenarioF002E03.feature
 β     β£---- π escenarioF003E01.feature
 β     β£---- π escenarioF003E02.feature
 β     β£---- π escenarioF003E02.feature
 β     β£---- π escenarioF003E03.feature
 β     β£---- π escenarioF005E01.feature
 β£---- π mobile.json
 β£---- π package.json
 β£---- π package-lock.json
 β£---- π README.md

```

## Dependecias y Versionamiento

A continuaciΓ³n, se presentan las dependencias principales para la ejecuciΓ³n de las pruebas Kraken.

| Dependencia | VersiΓ³n  |
| ----------- | -------- |
| NodeJs      | ^14.19.1 |
| Npm         | ^6.14.16 |
| Ghost CLI   | 1.19.3   |
| Ghost (App) | 4.47.0   |

## InstalaciΓ³n y Configuraciones

`Importante!` Todos los comandos que se muestran a continuaciΓ³n deben ser ejecutados utilizando la carpeta `KrakenTest` como la raΓ­z (root) del proyecto.

Para poder hacer uso de los escenarios de prueba establecidos, es necesario ejecutar los siguientes comandos en la terminal (en caso de utilizar Windos SO, se recomienda hacer uso de powershell)

```shell
npm install
```

Este proyecto hace uso, principalmente, de 2 dependencias: `cypress` y  `@faker-js/faker` (generaciΓ³n de datos para pruebas). Los siguientes comandos muestran cΓ³mo hacer la instalaciΓ³n de estas dependencias

```shell
npm run kraken:run
```

### Credenciales Ghost Admin
Adicionalmente a la instalaciΓ³n de dependencias, los scripts de pruebas requieren de las credenciales del usuario administrador de Ghost para poder ser ejecutadas. Para ello, se tiene el archivo `user.json` en donde se debe colocar tanto el correo como la contraseΓ±a del administrador.

~~~
    Aviso: Dado que se necesitan las credenciales del administrador, se espera
    que la aplicaciΓ³n Ghost cuente con un usuario admin creado previamente. En
    caso de no tener dicho usuario, dirigirse a la pΓ‘gina de setup para la
    creaciΓ³n del usuario
    
    Setup: http://<url>:<port>/ghost/#/setup
~~~


## Despliegue

### Despliegue AplicaciΓ³n Ghost

Antes de poder ejecutar las pruebas de Cypress, es necesario el despliegue de la aplicaciΓ³n Ghost que se desea probar. para ello, se debe ejecutar el siguiente comando dentro de la carpeta raΓ­z de la aplicaciΓ³n Ghost

```shell
ghost start
```

### EjecuciΓ³n de Pruebas Kraken
Para desplegar el proyecto, se debe ejecutar algunode los siguientes comandos

```shell
# Utilizando el comando definido en pagake.json
npm run kraken:run

# Directamente desde node_modules
./node_modules/.bin/cypress open
```

Una vez la aplicaciΓ³n de kraken haya sido desplegada, es posible ejecutar las pruebas al seleccionar alguno de los archivos de la carpeta π `end-to-end`.