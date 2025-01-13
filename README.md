# Sistema de Gestión de Inventario 📦

![GitHub Actions](https://github.com/[usuario]/[repo]/workflows/CI/CD%20Pipeline/badge.svg)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Sistema de gestión de inventario desarrollado con MERN Stack (MongoDB, Express, React, Node.js), implementando prácticas DevOps modernas incluyendo containerización con Docker, CI/CD con GitHub Actions y monitorización con Prometheus y Grafana.

## 🚀 Características

- **Frontend**: React + Redux + Tailwind CSS
- **Backend**: Node.js + Express + MongoDB
- **DevOps**:
  - Containerización con Docker
  - CI/CD con GitHub Actions
  - Monitorización con Prometheus y Grafana
- **Seguridad**: JWT, bcrypt
- **Testing**: Jest, React Testing Library

## 🛠️ Tecnologías

- Node.js 20
- React 18
- MongoDB
- Docker & Docker Compose
- GitHub Actions
- Prometheus & Grafana

## 📋 Requisitos Previos

- Node.js 20.x
- Docker y Docker Compose
- Git

## ⚙️ Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/sergiog03/inventoryapp.git
cd inventoryapp
```

2. **Configurar variables de entorno**
```bash
cp .env.example .env
# Editar .env con tus valores
```

3. **Despliegue con Docker**
```bash
docker compose up -d
```

4. **Acceder a la aplicación**
- Frontend: http://localhost
- Backend: http://localhost:5000
- Grafana: http://localhost:3000
- Prometheus: http://localhost:9090

## 🔄 Pipeline CI/CD

El proyecto implementa un pipeline automatizado que incluye:

1. **Testing**
   - Pruebas unitarias
   - Pruebas de integración

2. **Building**
   - Construcción de imágenes Docker
   - Verificación de seguridad

3. **Deployment**
   - Despliegue automático en AWS EC2
   - Zero-downtime deployment

## 📊 Monitorización

- **Métricas disponibles**:
  - Rendimiento de la aplicación
  - Uso de recursos
  - Estadísticas de negocio

- **Dashboards**:
  - Métricas del sistema
  - Métricas de aplicación
  - Alertas configurables

## 🧪 Testing

**Ejecutar tests del backend**
```bash
cd backend
npm test
```

**Ejecutar tests del frontend**
```bash
cd frontend
npm test
```

## 🚀 Despliegue

### Local
```bash
docker compose up -d
```

### Producción
```bash
docker compose -f docker-compose.prod.yml up -d
```


## 🔑 Variables de Entorno Necesarias

```env
# Backend
MONGODB_URI=mongodb://mongodb:27017/inventory
JWT_SECRET=your_secret_key
PORT=5000

# Frontend
REACT_APP_API_URL=http://localhost/api

# Monitoring
GRAFANA_ADMIN_PASSWORD=admin123
```

## 🏗️ Estructura del Proyecto

```
.
├── backend/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── redux/
│   │   └── services/
│   └── package.json
├── docker-compose.yml
└── README.md
```

## 👥 Autor

- **Sergio Gonzalo** - [GitHub](https://github.com/sergiog03)
