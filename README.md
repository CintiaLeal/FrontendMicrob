# MICROB.uy

Descripción completa y clara del proyecto. Proporciona un resumen conciso y atractivo para que los usuarios tengan una idea rápida de lo que hace tu aplicación.

## Características Principales

- **Inicio de Sesión con Google:** Utiliza Firebase Authentication para permitir que los usuarios inicien sesión mediante Google.

- **Comunicación con Backend en .NET:** La aplicación se comunica con un backend implementado en .NET para manejar operaciones del servidor.

- **Autenticación Multitenant:** Admite múltiples usuarios con sus propias vistas y permisos dentro de la aplicación.

- **Persistencia de Datos con LocalStorage:** Utiliza localStorage para almacenar datos localmente en el navegador del usuario.

- **Angular Material:** Se utiliza Angular Material como framework CSS para una interfaz de usuario moderna y consistente.

## Estructura del Proyecto

Descripción de la estructura de carpetas y archivos importantes en tu proyecto.

## Tecnologías Utilizadas

- [Angular](https://angular.io/)
- [Firebase](https://firebase.google.com/)
- [Angular Material](https://material.angular.io/)
- [.NET](https://dotnet.microsoft.com/)

# Nombre del Proyecto

Descripción breve del proyecto.

## Requisitos Previos
- Tener Instalado y levantado el backend en .NET
- [Node.js](https://nodejs.org/) y [npm](https://www.npmjs.com/) instalados.
- [Angular CLI](https://angular.io/cli) instalado globalmente.

## Configuración del Backend (.NET)

1. **Instalación de Dependencias:**
    ```bash
    dotnet restore
    ```

2. **Configuración de la Base de Datos (si es necesario):**
    - Actualiza la cadena de conexión en `appsettings.json`.

3. **Ejecución:**
    ```bash
    dotnet run
    ```

    Visita `http://localhost:5000` en tu navegador.

## Configuración del Frontend (Angular)

1. **Instalación de Dependencias:**
    ```bash
    npm install
    ```

2. **Configuración de la API:**
    - Asegúrate de que la configuración de la API en `src/environments/environment.ts` apunta al backend correcto.

3. **Ejecución:**
    ```bash
    ng serve
    ```

    Visita `http://localhost:4200` en tu navegador.

## Capturas de Pantalla

![image](https://github.com/CintiaLeal/FrontendMicrob/assets/66495366/1a621e90-f1c7-4109-bc82-732ef67ab00e)

![image](https://github.com/CintiaLeal/FrontendMicrob/assets/66495366/1dfc16fb-45be-4c36-80e7-0fcbdfd15e94)
