# NumConvert-

NumConvert- es una aplicación web que convierte números entre bases numéricas (binario, decimal y hexadecimal) mediante una API en Express.js y un frontend en React con TypeScript y Material UI. Además, muestra imágenes de paisajes dinámicas desde Unsplash, ofreciendo una experiencia visual atractiva e intuitiva para los usuarios.

## Índice

- [Requisitos](#requisitos)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Uso](#uso)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Endpoints](#endpoints)
- [Variables de Entorno](#variables-de-entorno)
- [Despliegue en Vercel](#despliegue-en-vercel)
- [Información para Desarrolladores](#información-para-desarrolladores)
- [Autores](#autores)

---

## Requisitos

- Node.js (14 o superior)
- npm o yarn
- Cuenta en Unsplash para obtener una API Key

## Instalación

1. Clonar el repositorio:
   ```sh
   git clone https://github.com/tu-repositorio.git
   ```
2. Instalar dependencias:
   ```sh
   cd numconvert
   npm install
   ```
3. Configurar las variables de entorno como se indica en la siguiente sección.

## Configuración

### Variables de Entorno
Solo el frontend requiere la API Key de Unsplash:
```env
VITE_UNSPLASH_API_KEY=tu_api_key_aqui
```

## Uso

### Backend
1. Iniciar el servidor:
   ```sh
   node index.js
   ```
2. La API estará disponible en `http://localhost:3000/`.

### Frontend
1. Iniciar el frontend:
   ```sh
   npm run dev
   ```
2. La aplicación se abrirá en `http://localhost:5173/`.

## Estructura del Proyecto

```
/
  ├── conversor de numeros API/
  │   ├── node_modules/
  │   ├── index.js (Backend en la raíz)
  │   ├── package.json
  │   ├── package-lock.json
  │   ├── vercel.json
  ├── conversor-numeros/ (Frontend)
  │   ├── node_modules/
  │   ├── public/
  │   ├── src/
  │   │   ├── components/
  │   │   ├── App.tsx
  │   │   ├── main.tsx
  │   ├── .env (Solo en frontend)
  │   ├── package.json
  │   ├── vite.config.ts
  │   ├── tsconfig.json
  ```

## Endpoints

### `POST /convert`
Convierte un número de una base a otra.
#### **Request Body:**
```json
{
  "value": "1010",
  "base": "binario"
}
```
#### **Response:**
```json
{
  "decimal": 10,
  "binario": "1010",
  "hexadecimal": "a"
}
```


## Información para Desarrolladores

Este proyecto puede ser extendido fácilmente para soportar nuevas bases numéricas o mejorar la interfaz gráfica.

### Hooks y Extensiones
El backend puede ser mejorado añadiendo middleware para seguridad y validaciones avanzadas pero en este momento no lo veo necesario pero esta en mi ToDo. El frontend permite modificar la UI mediante Material UI y ajustar estilos.

## Autores

Desarrollado por **Andres Azcona** | [GitHub](https://github.com/andresazcona)

