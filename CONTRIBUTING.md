# Contributing to Free AUDITOR

Thank you for your interest in contributing to Free AUDITOR! This document provides guidelines for contributing to the project.

## Code of Conduct

This project adheres to a code of conduct. By participating, you are expected to uphold this code.

## How to Contribute

### Reporting Bugs

Before creating bug reports, please check the existing issues to avoid duplicates. When creating a bug report, include:

- A clear and descriptive title
- Steps to reproduce the issue
- Expected behavior
- Actual behavior
- Screenshots (if applicable)
- Environment details (OS, browser, Node.js version)

### Suggesting Features

Feature suggestions are welcome! Please provide:

- A clear and descriptive title
- Detailed description of the proposed feature
- Use cases and examples
- Any relevant mockups or diagrams

### Development Setup

1. Fork the repository
2. Clone your fork: `git clone https://github.com/your-username/FreeAuditor.git`
3. Install dependencies: `npm install` in both `frontend/` and `backend/` directories
4. Set up environment variables (see README.md)
5. Run the development servers

### Coding Standards

#### TypeScript/JavaScript
- Use TypeScript for all new code
- Follow ESLint configuration
- Use Prettier for code formatting
- Write meaningful variable and function names
- Add JSDoc comments for public APIs

#### React Components
- Use functional components with hooks
- Follow the component file structure:
  ```
  ComponentName/
  ├── index.ts          # Export
  ├── ComponentName.tsx # Main component
  ├── ComponentName.test.tsx # Tests
  └── ComponentName.styles.ts # Styled components
  ```

#### Backend (NestJS)
- Use decorators appropriately
- Implement proper error handling
- Write unit tests for services
- Use DTOs for data validation
- Follow RESTful API conventions

### Testing

- Write unit tests for new features
- Maintain test coverage above 80%
- Run tests before submitting: `npm test`
- Test both happy path and error scenarios

### Commit Messages

Use conventional commit format:
```
type(scope): description

[optional body]

[optional footer]
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Maintenance tasks

Examples:
- `feat(auth): add JWT authentication`
- `fix(templates): resolve form builder drag issue`
- `docs(api): update endpoint documentation`

### Pull Request Process

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Make your changes
3. Add tests for new functionality
4. Ensure all tests pass
5. Update documentation if needed
6. Commit with conventional commit messages
7. Push to your fork
8. Create a pull request

#### Pull Request Template

Your PR should include:
- Clear description of changes
- Link to related issues
- Screenshots for UI changes
- Checklist of completed items
- Breaking changes (if any)

### Development Workflow

1. **Issues First**: Create or find an issue before starting work
2. **Small PRs**: Keep pull requests focused and small
3. **Review Process**: All PRs require at least one review
4. **CI/CD**: Ensure all checks pass before merging

### Project Structure

```
FreeAuditor/
├── frontend/           # React application
├── backend/            # NestJS application
├── docs/               # Documentation
├── .github/            # GitHub workflows and templates
└── scripts/            # Build and deployment scripts
```

### API Design Guidelines

- Use RESTful conventions
- Implement proper HTTP status codes
- Use consistent naming conventions
- Version your APIs (`/api/v1/`)
- Document endpoints with OpenAPI/Swagger
- Implement proper error responses

### Database Guidelines

- Use migrations for schema changes
- Keep migrations backward compatible
- Use meaningful constraint names
- Index frequently queried columns
- Use transactions for data consistency

### Security Considerations

- Validate all inputs
- Sanitize data before storage
- Use parameterized queries
- Implement proper authentication
- Follow OWASP security guidelines
- Never commit sensitive data

### Performance Guidelines

- Optimize database queries
- Use pagination for large datasets
- Implement caching where appropriate
- Compress static assets
- Monitor bundle sizes

### Documentation

- Update README.md for significant changes
- Document new APIs
- Add inline code comments
- Create examples for complex features
- Keep documentation up to date

## Getting Help

- Check existing documentation
- Search through issues
- Ask questions in discussions
- Join our community chat

## Recognition

Contributors will be acknowledged in:
- README.md contributors section
- Release notes
- Annual contributor report

Thank you for contributing to Free AUDITOR!