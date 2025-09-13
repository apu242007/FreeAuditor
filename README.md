# Free AUDITOR

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js CI](https://github.com/apu242007/FreeAuditor/workflows/CI/badge.svg)](https://github.com/apu242007/FreeAuditor/actions)

Free AUDITOR is an open-source web application for creating and managing audit checklists and inspections, inspired by SafetyCulture iAuditor. This project aims to provide a free, customizable alternative for organizations that need comprehensive audit management capabilities.

## Features

### Core Functionality
- **User Management & Authentication**: Secure user registration, role-based access control (admin, auditor)
- **Template Management**: Create, edit, duplicate, and archive inspection templates
- **Drag & Drop Form Builder**: Visual editor for creating complex inspection forms
- **Conditional Logic**: Dynamic forms with show/hide logic based on responses
- **Repeatable Sections**: Support for multiple instances of form sections
- **Configurable Scoring**: Flexible scoring system with automated calculations
- **Report Generation**: PDF and HTML reports with photos, signatures, and scoring
- **File Management**: Support for photos, videos, signatures, and document attachments

### Advanced Features
- **Real-time Notifications**: Automated alerts based on inspection responses
- **Offline Capability**: Support for offline inspections with data synchronization
- **Export/Import**: Template sharing via JSON export/import
- **Multi-language Support**: Internationalization ready
- **API Integration**: RESTful API for third-party integrations

## Technology Stack

### Frontend
- **React.js** - Modern UI framework
- **React DnD** - Drag and drop functionality
- **Material-UI** - Component library
- **React Router** - Navigation
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime environment
- **NestJS** - Enterprise-grade framework
- **TypeScript** - Type safety
- **Prisma** - Database ORM
- **JWT** - Authentication
- **PDFKit** - PDF generation

### Database & Storage
- **PostgreSQL** - Primary database
- **AWS S3** - File storage (production)
- **Local Storage** - Development file storage

## Quick Start

### Prerequisites
- Node.js 18+ 
- PostgreSQL 14+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/apu242007/FreeAuditor.git
cd FreeAuditor
```

2. Install dependencies:
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

3. Set up environment variables:
```bash
# Copy environment templates
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env

# Edit the .env files with your configuration
```

4. Set up the database:
```bash
cd backend
npm run db:migrate
npm run db:seed
```

5. Start the development servers:
```bash
# Terminal 1 - Backend
cd backend
npm run start:dev

# Terminal 2 - Frontend
cd frontend
npm start
```

Visit `http://localhost:3000` to access the application.

## Project Structure

```
FreeAuditor/
├── frontend/           # React frontend application
│   ├── src/
│   │   ├── components/ # Reusable UI components
│   │   ├── pages/      # Page components
│   │   ├── services/   # API services
│   │   ├── utils/      # Utility functions
│   │   └── types/      # TypeScript definitions
│   ├── public/
│   └── package.json
├── backend/            # NestJS backend application
│   ├── src/
│   │   ├── auth/       # Authentication module
│   │   ├── users/      # User management
│   │   ├── templates/  # Template management
│   │   ├── inspections/# Inspection handling
│   │   ├── reports/    # Report generation
│   │   └── files/      # File management
│   ├── prisma/         # Database schema and migrations
│   └── package.json
├── docs/               # Documentation
├── .github/            # GitHub Actions workflows
├── docker-compose.yml  # Development environment
└── README.md
```

## Development

### Running Tests
```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

### Building for Production
```bash
# Build backend
cd backend
npm run build

# Build frontend
cd frontend
npm run build
```

### Database Operations
```bash
cd backend

# Create migration
npm run db:migrate:create

# Run migrations
npm run db:migrate

# Seed database
npm run db:seed

# Reset database
npm run db:reset
```

## API Documentation

The API documentation is available at `/api/docs` when running the backend in development mode.

## Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

### Development Workflow
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Make your changes and add tests
4. Ensure all tests pass: `npm test`
5. Commit your changes: `git commit -am 'Add your feature'`
6. Push to the branch: `git push origin feature/your-feature`
7. Submit a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Roadmap

- [ ] **v0.1.0** - Basic template creation and inspection functionality
- [ ] **v0.2.0** - Advanced form builder with conditional logic
- [ ] **v0.3.0** - Report generation and file management
- [ ] **v0.4.0** - Mobile app support
- [ ] **v0.5.0** - Real-time collaboration features
- [ ] **v1.0.0** - Production-ready release

## Support

- 📚 [Documentation](docs/)
- 🐛 [Bug Reports](https://github.com/apu242007/FreeAuditor/issues)
- 💡 [Feature Requests](https://github.com/apu242007/FreeAuditor/issues)
- 💬 [Discussions](https://github.com/apu242007/FreeAuditor/discussions)

## Acknowledgments

Inspired by SafetyCulture iAuditor and built with ❤️ by the open-source community.