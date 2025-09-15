# FreeAuditor - Constructor de Formularios

FreeAuditor ha sido rediseñado para convertirse en una plataforma de creación de formularios reutilizables, similar a herramientas como SurveyMonkey. El objetivo es permitir que cualquier usuario diseñe, publique y analice formularios sin necesidad de escribir código.

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
- Catálogos predefinidos (ej. países)

## Stack tecnológico recomendado

- **Frontend**: React con librerías para formularios (Formik o React Hook Form) y drag-and-drop (@dnd-kit o React Beautiful DnD).
- **Backend**: NestJS en Node.js para APIs REST.
- **Base de datos**: PostgreSQL con Prisma o TypeORM.

## Modelo de datos (resumen)

- **Formulario** → contiene secciones y respuestas.
- **Sección** → agrupa preguntas.
- **Pregunta** → define tipo, texto y validaciones.
- **Opción** → valores predefinidos para preguntas de selección.
- **RespuestaFormulario** → envío completo de un usuario.
- **RespuestaPregunta** → valor individual a una pregunta.

## APIs principales

| Método | Endpoint                       | Descripción                                     |
| ------ | ------------------------------ | ----------------------------------------------- |
| GET    | `/formularios`                 | Listar formularios del usuario                  |
| POST   | `/formularios`                 | Crear un formulario nuevo                       |
| GET    | `/formularios/{id}`            | Obtener estructura completa                     |
| PUT    | `/formularios/{id}`            | Actualizar título, secciones o preguntas        |
| DELETE | `/formularios/{id}`            | Eliminar formulario                             |
| POST   | `/formularios/{id}/respuestas` | Registrar respuestas de un formulario publicado |
| GET    | `/formularios/{id}/respuestas` | Listar envíos recibidos                         |

## Flujo de uso

1. El usuario crea un formulario en el editor visual.
2. Publica el formulario y comparte el enlace generado.
3. Los encuestados responden desde cualquier dispositivo.
4. El autor revisa las respuestas y puede exportarlas a CSV.

## Despliegue sugerido

- Contenedores Docker para frontend y backend.
- PostgreSQL administrado o en contenedor dedicado.
- Servir el frontend estático mediante CDN y proteger la API con HTTPS.
- Uso opcional de Redis para cachear estructuras de formularios.

---

Este repositorio contiene actualmente un prototipo estático (`index.html`) que permite agregar preguntas de texto, selección única y múltiple, además de eliminarlas. Las siguientes etapas del proyecto consistirán en implementar el editor, la API y el modelo de datos descritos.