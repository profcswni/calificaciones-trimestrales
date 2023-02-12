# Sistema de calificaciones trimestrales

## Descripción
Este programa permite registrar las calificaciones de un alumno en cada trimestre. Permite registrar el docente, la asignatura, la calificación y el trimestre. Creado con HTML, CSS, JavaScript y los datos alojados en Firestore. Utliza Vite para el desarrollo y TailwindCSS para el diseño. Se integran DataTables para la visualización de los datos. Se usa SweetAlert2 para las alertas.

## Instalación

### Requisitos

- Node.js
- NPM
- Vite

### Pasos

1. Clonar este repositorio. **IMPORTANTE**: Si desea seguir modificando el código, puede hacer un fork y clonar el repositorio de su cuenta. Si solo desea probar la aplicación, puede clonar este repositorio.
2. Instalar las dependencias con `npm install`
3. Cambiar la configuración de Firebase en `src/js/firebase.js` agregando la configuración de tu proyecto
4. Cambiar la dirección del servidor de desarrollo en `vite.config.js` por la dirección de tu proyecto que por lo general es `127.0.0.1`. Este cambio se hace en la sección `server` y en la propiedad `host`
5. Ejecutar el servidor de desarrollo con `npm run dev`

### Cambios en la base de datos de firestore

1. Agregar la autenticacion por correo electrónico usado Google como proveedor
2. Agregar la direccion ip `127.0.0.1` en los dominios autorizados para probar la aplicacion en local
3. Agregar la direccion `github.io` en los dominios autorizados para probar la aplicacion en produccion dentro de GitHub Pages


