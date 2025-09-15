# FreeAuditor - Constructor de Formularios

FreeAuditor es una plataforma de creación de formularios reutilizables, similar a herramientas como SurveyMonkey. El objetivo es permitir que cualquier usuario diseñe, publique y analice formularios sin necesidad de escribir código.

## Características principales

- **Formularios reutilizables**: crea plantillas que pueden duplicarse para diferentes encuestas o procesos.
- **Estructura jerárquica**: organiza preguntas en páginas o secciones para facilitar la navegación.
- **Lógica condicional**: muestra u oculta preguntas según respuestas previas.
- **Validaciones de entrada**: define campos obligatorios, formatos de correo, rangos numéricos y más.
- **Diseño responsivo**: editor y formularios adaptados a móviles, tablet y escritorio.

## Editor Drag and Drop

El constructor ofrece una interfaz visual donde se arrastran los tipos de preguntas desde un panel lateral hacia el formulario.
Cada elemento puede configurarse en sitio: texto, opciones de respuesta, obligatoriedad y reglas de visibilidad.

### Tipos de campos disponibles

- Texto corto o largo
- Selección única y múltiple
- Sí/No (toggle)
- Escalas de puntuación
- Fecha y hora
- Email y números

## Estructura del proyecto

```
/
├── client/                           # Frontend (React/TypeScript)
│   ├── public/                       # Archivos estáticos
│   ├── src/
│   │   ├── components/               # Componentes reutilizables
│   │   │   ├── ui/                   # Componentes UI básicos
│   │   │   ├── form-builder/         # Componentes del constructor
│   │   │   └── form-viewer/          # Componentes del visor
│   │   ├── hooks/                    # Hooks personalizados
│   │   ├── services/                 # Servicios API
│   │   ├── store/                    # Gestión de estado (Zustand)
│   │   ├── types/                    # Definiciones TypeScript
│   │   ├── utils/                    # Utilidades
│   │   ├── App.tsx                   # Componente raíz
│   │   └── main.tsx                  # Punto de entrada
│   ├── package.json
│   └── tsconfig.json
├── server/                           # Backend (NestJS/TypeScript)
│   ├── src/
│   │   ├── formularios/              # Módulo de formularios
│   │   ├── secciones/                # Módulo de secciones
│   │   ├── preguntas/                # Módulo de preguntas
│   │   ├── opciones/                 # Módulo de opciones
│   │   ├── respuestas/               # Módulo de respuestas
│   │   ├── usuarios/                 # Módulo de usuarios
│   │   ├── auth/                     # Módulo de autenticación
│   │   ├── app.module.ts             # Módulo principal
│   │   └── main.ts                   # Punto de entrada
│   ├── prisma/                       # Esquema Prisma para la BD
│   │   └── schema.prisma
│   ├── package.json
│   └── tsconfig.json
├── docker-compose.yml                # Configuración Docker Compose
├── Dockerfile.client                 # Dockerfile para frontend
├── Dockerfile.server                 # Dockerfile para backend
└── README.md                         # Documentación del proyecto
```

## Stack tecnológico

- **Frontend**: React 18 con TypeScript, Vite, Zustand para estado, @dnd-kit para drag-and-drop
- **Backend**: NestJS con TypeScript, Prisma ORM, PostgreSQL
- **Containerización**: Docker y Docker Compose para desarrollo

## Modelo de datos

- **Usuario** → gestiona la autenticación y autorización
- **Formulario** → contiene secciones y respuestas
- **Sección** → agrupa preguntas
- **Pregunta** → define tipo, texto y validaciones
- **Opción** → valores predefinidos para preguntas de selección
- **RespuestaFormulario** → envío completo de un usuario
- **RespuestaPregunta** → valor individual a una pregunta

## APIs principales

| Método | Endpoint                       | Descripción                                     |
| ------ | ------------------------------ | ----------------------------------------------- |
| GET    | `/api/formularios`             | Listar formularios del usuario                  |
| POST   | `/api/formularios`             | Crear un formulario nuevo                       |
| GET    | `/api/formularios/{id}`        | Obtener estructura completa                     |
| PATCH  | `/api/formularios/{id}`        | Actualizar título, secciones o preguntas        |
| DELETE | `/api/formularios/{id}`        | Eliminar formulario                             |
| POST   | `/api/formularios/{id}/respuestas` | Registrar respuestas de un formulario publicado |
| GET    | `/api/formularios/{id}/respuestas` | Listar envíos recibidos                         |

## Instalación y desarrollo

### Prerequisitos

- Node.js 18+
- Docker y Docker Compose
- PostgreSQL (opcional, se puede usar con Docker)

### Configuración con Docker

1. Clona el repositorio:
```bash
git clone https://github.com/apu242007/FreeAuditor.git
cd FreeAuditor
```

2. Ejecuta el proyecto con Docker Compose:
```bash
docker-compose up -d
```

3. La aplicación estará disponible en:
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3001
   - Documentación API: http://localhost:3001/api/docs

### Configuración manual

#### Backend

```bash
cd server
npm install
npx prisma generate
npx prisma migrate dev
npm run start:dev
```

#### Frontend

```bash
cd client
npm install
npm run dev
```

## Variables de entorno

### Server (.env)
```
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/freeauditor"
JWT_SECRET="your-super-secret-jwt-key"
FRONTEND_URL="http://localhost:5173"
PORT=3001
```

### Client (.env)
```
VITE_API_URL="http://localhost:3001/api"
```

## Flujo de uso

1. El usuario crea un formulario en el editor visual
2. Agrega preguntas arrastrando desde el panel de herramientas
3. Configura cada pregunta (texto, opciones, validaciones)
4. Publica el formulario y comparte el enlace generado
5. Los encuestados responden desde cualquier dispositivo
6. El autor revisa las respuestas y puede exportarlas

## Próximas funcionalidades

- [ ] Autenticación y autorización completa
- [ ] Sistema de plantillas
- [ ] Lógica condicional avanzada
- [ ] Exportación de respuestas (CSV, Excel)
- [ ] Análisis y reportes
- [ ] Integración con webhooks
- [ ] Temas personalizados