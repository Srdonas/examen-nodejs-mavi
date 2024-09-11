### Componentes Clave

- **CustomerManager.vue**: Componente principal donde se manejan las operaciones CRUD de clientes.
- **apiService.js**: Contiene funciones para interactuar con la API del backend.

## Configuración

### Prerrequisitos

- **Node.js** y **npm** instalados.
- Asegúrate de que la API de backend en **Express.js** esté en ejecución.

### Instalación

1. Clona el repositorio:

    ```bash
    git clone https://github.com/Srdonas/examen-nodejs-mavi.git
    cd examen-nodejs-mavi
    ```

## Configuración de la API
1. Craer una base datos vacia de mysql llamada "customersDB"

2. Agrega un archivo `.env` a la carpeta del backend con el siguiente contenido:

    ```env
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=*****
    DB_NAME=customersDB
    DB_DIALECT=mysql
    ```

3. Instala las dependencias:

    ```bash
    npm install
    ```

4. Ejecuta el servidor de desarrollo:

    ```bash
    npm run serve
    ```

5. La aplicación debería estar en ejecución en `http://localhost:3000`.

## Configuración del FrontEnd

## 💿 Instalación

Configura tu proyecto utilizando el gestor de paquetes que prefieras. Usa el comando correspondiente para instalar las dependencias:

| Gestor de Paquetes                                                | Comando        |
|---------------------------------------------------------------|----------------|
| [npm](https://docs.npmjs.com/cli/v7/commands/npm-install)     | `npm install`  |

Después de completar la instalación, tu entorno estará listo para el desarrollo con Vuetify.

## 💡 Uso

Esta sección cubre cómo iniciar el servidor de desarrollo y construir tu proyecto para producción.

### Iniciar el Servidor de Desarrollo

Para iniciar el servidor de desarrollo con recarga automática, ejecuta el siguiente comando. El servidor será accesible en [http://localhost:8080](http://localhost:8080):

```bash
npm run dev
