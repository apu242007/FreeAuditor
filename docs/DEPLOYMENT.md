# Free AUDITOR Deployment Guide

This guide covers various deployment options for Free AUDITOR, from development to production environments.

## Development Deployment

### Prerequisites
- Node.js 18+
- PostgreSQL 14+
- npm or yarn

### Local Development Setup

1. **Clone and Install Dependencies**
```bash
git clone https://github.com/apu242007/FreeAuditor.git
cd FreeAuditor

# Backend setup
cd backend
npm install
cp .env.example .env
# Edit .env with your database configuration

# Frontend setup
cd ../frontend
npm install
cp .env.example .env
```

2. **Database Setup**
```bash
cd backend

# Generate Prisma client
npm run db:generate

# Run migrations
npm run db:migrate

# Seed initial data
npm run db:seed
```

3. **Start Development Servers**
```bash
# Terminal 1 - Backend
cd backend
npm run start:dev

# Terminal 2 - Frontend
cd frontend
npm start
```

Access the application at `http://localhost:3000`

### Using Docker Compose (Recommended for Development)

1. **Start all services**
```bash
docker-compose up -d
```

This will start:
- PostgreSQL database on port 5432
- Redis for caching on port 6379
- MinIO for file storage on ports 9000/9001
- Backend API on port 3001
- Frontend on port 3000

2. **Initialize the database**
```bash
docker-compose exec backend npm run db:migrate
docker-compose exec backend npm run db:seed
```

3. **View logs**
```bash
docker-compose logs -f backend
docker-compose logs -f frontend
```

## Production Deployment

### Environment Variables

#### Backend (.env)
```bash
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/freeauditor"

# JWT
JWT_SECRET="your-super-secret-jwt-key"
JWT_EXPIRES_IN="24h"

# Application
NODE_ENV="production"
PORT=3001
API_PREFIX="api/v1"
CORS_ORIGIN="https://your-domain.com"

# File Storage (AWS S3)
AWS_ACCESS_KEY_ID="your-access-key"
AWS_SECRET_ACCESS_KEY="your-secret-key"
AWS_REGION="us-east-1"
S3_BUCKET_NAME="freeauditor-files"

# Email (optional)
SMTP_HOST="smtp.your-provider.com"
SMTP_PORT=587
SMTP_USER="your-email@domain.com"
SMTP_PASS="your-password"
SMTP_FROM="noreply@your-domain.com"
```

#### Frontend (.env)
```bash
REACT_APP_API_URL=https://api.your-domain.com/api/v1
REACT_APP_ENVIRONMENT=production
```

### Docker Production Deployment

1. **Build production images**
```bash
# Build backend
docker build -t freeauditor-backend ./backend

# Build frontend
docker build -t freeauditor-frontend ./frontend
```

2. **Create production docker-compose.yml**
```yaml
version: '3.8'

services:
  postgres:
    image: postgres:15
    environment:
      POSTGRES_DB: freeauditor
      POSTGRES_USER: ${DB_USER}
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    networks:
      - app-network

  backend:
    image: freeauditor-backend
    environment:
      DATABASE_URL: postgresql://${DB_USER}:${DB_PASSWORD}@postgres:5432/freeauditor
      JWT_SECRET: ${JWT_SECRET}
      NODE_ENV: production
    depends_on:
      - postgres
    networks:
      - app-network

  frontend:
    image: freeauditor-frontend
    ports:
      - "80:80"
    depends_on:
      - backend
    networks:
      - app-network

  nginx:
    image: nginx:alpine
    ports:
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
    depends_on:
      - frontend
      - backend
    networks:
      - app-network

volumes:
  postgres_data:

networks:
  app-network:
    driver: bridge
```

### Cloud Deployment Options

#### AWS Deployment

1. **Using AWS ECS with Fargate**
```bash
# Create ECS cluster
aws ecs create-cluster --cluster-name freeauditor-cluster

# Create task definitions for backend and frontend
# Deploy services using the built Docker images
```

2. **Using AWS Elastic Beanstalk**
```bash
# Install EB CLI
pip install awsebcli

# Initialize and deploy
eb init freeauditor
eb create production
eb deploy
```

#### DigitalOcean App Platform

1. **Create app.yaml**
```yaml
name: freeauditor
services:
- name: backend
  source_dir: backend
  github:
    repo: your-username/FreeAuditor
    branch: main
  run_command: npm start
  environment_slug: node-js
  instance_count: 1
  instance_size_slug: basic-xxs
  envs:
  - key: DATABASE_URL
    value: ${db.DATABASE_URL}
  - key: JWT_SECRET
    value: ${JWT_SECRET}

- name: frontend
  source_dir: frontend
  github:
    repo: your-username/FreeAuditor
    branch: main
  build_command: npm run build
  environment_slug: node-js
  instance_count: 1
  instance_size_slug: basic-xxs

databases:
- name: db
  engine: PG
  version: "14"
```

#### Heroku Deployment

1. **Backend deployment**
```bash
cd backend
heroku create freeauditor-api
heroku addons:create heroku-postgresql:hobby-dev
heroku config:set JWT_SECRET=your-secret
git push heroku main
```

2. **Frontend deployment**
```bash
cd frontend
heroku create freeauditor-app
heroku config:set REACT_APP_API_URL=https://freeauditor-api.herokuapp.com/api/v1
git push heroku main
```

### Database Migration in Production

```bash
# Run migrations
npm run db:migrate:deploy

# Rollback if needed
npm run db:migrate:reset
```

### SSL/TLS Configuration

#### Using Let's Encrypt with Nginx

```bash
# Install certbot
sudo apt install certbot python3-certbot-nginx

# Generate certificates
sudo certbot --nginx -d your-domain.com -d api.your-domain.com

# Auto-renewal
sudo crontab -e
# Add: 0 12 * * * /usr/bin/certbot renew --quiet
```

### Monitoring and Logging

#### Application Monitoring
```bash
# Install PM2 for process management
npm install -g pm2

# Start application with PM2
pm2 start dist/main.js --name freeauditor-backend
pm2 startup
pm2 save
```

#### Health Checks
Add health check endpoints:

```typescript
// backend/src/health/health.controller.ts
@Get('health')
checkHealth() {
  return { status: 'ok', timestamp: new Date().toISOString() };
}
```

### Backup Strategy

#### Database Backups
```bash
# Daily backup script
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
pg_dump $DATABASE_URL > backup_$DATE.sql
aws s3 cp backup_$DATE.sql s3://your-backup-bucket/
rm backup_$DATE.sql
```

#### File Storage Backups
```bash
# S3 bucket versioning and lifecycle policies
aws s3api put-bucket-versioning \
  --bucket freeauditor-files \
  --versioning-configuration Status=Enabled
```

### Performance Optimization

#### Frontend Optimization
- Enable gzip compression
- Configure caching headers
- Use CDN for static assets
- Implement service workers

#### Backend Optimization
- Enable database connection pooling
- Implement Redis caching
- Use database indexes
- Configure load balancing

### Security Considerations

1. **Environment Variables**: Never commit secrets to version control
2. **Database Security**: Use strong passwords and restrict access
3. **API Security**: Implement rate limiting and input validation
4. **File Upload Security**: Validate file types and scan for malware
5. **HTTPS**: Always use SSL/TLS in production
6. **Firewall**: Configure proper firewall rules

### Scaling

#### Horizontal Scaling
- Use load balancers (AWS ALB, Nginx)
- Database read replicas
- Container orchestration (Kubernetes, Docker Swarm)

#### Vertical Scaling
- Monitor resource usage
- Optimize database queries
- Implement caching strategies

### Troubleshooting

#### Common Issues

1. **Database Connection Issues**
```bash
# Check connection
npm run db:studio
```

2. **Environment Variables Not Loading**
```bash
# Verify .env file exists and is properly formatted
cat .env
```

3. **Build Failures**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

4. **CORS Issues**
```bash
# Check CORS_ORIGIN environment variable
# Ensure frontend and backend URLs match
```

### Support

For deployment issues:
1. Check the logs first
2. Review environment variables
3. Consult the troubleshooting section
4. Open an issue on GitHub with deployment details