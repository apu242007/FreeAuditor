# FreeAuditor

A powerful, modern form builder application with advanced features for creating dynamic forms, generating PDFs, analytics, and real-time collaboration.

## 🚀 Features

### ✅ Core Features Implemented

#### 1. **Drag & Drop Form Builder** (React DnD)
- Intuitive drag-and-drop interface for building forms
- 10+ field types including text, email, number, textarea, select, checkbox, radio, file upload, signature, and photo capture
- Real-time form preview
- Field reordering and deletion
- Mobile-responsive design

#### 2. **Conditional Logic Engine**
- Dynamic form behavior based on field values
- Support for multiple operators (equals, not equals, contains, greater than, less than)
- Actions: show, hide, require, disable fields
- Visual rule builder interface

#### 3. **PDF Generation with Photos & Signatures**
- Generate blank form PDFs for printing
- Create filled PDFs with form data
- Support for signature fields and photo fields
- Configurable PDF settings (page format, orientation)
- Real-time PDF preview

#### 4. **Mobile Application Support**
- Fully responsive design
- Touch-friendly interface
- Mobile-optimized sidebar navigation
- Progressive Web App ready

#### 5. **Real-time Collaboration Features**
- Live collaboration status indicator
- Connected users display
- Real-time activity feed
- WebSocket-ready architecture (demo implementation)

#### 6. **Advanced Analytics & Reporting**
- Form performance dashboard
- Submission analytics with charts
- User engagement metrics
- Device breakdown analysis
- Abandonment rate tracking
- Real-time activity monitoring

## 🛠️ Technology Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS
- **Drag & Drop**: React DnD
- **Charts**: Recharts
- **PDF Generation**: jsPDF + html2canvas
- **Signatures**: react-signature-canvas
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod validation
- **Real-time**: Socket.io (client ready)

## 📦 Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/apu242007/FreeAuditor.git
   cd FreeAuditor
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start development server**:
   ```bash
   npm run dev
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```

## 🎯 Usage Guide

### Form Builder

1. **Creating Forms**:
   - Drag field types from the left sidebar to the canvas
   - Click on fields to select and configure them
   - Use the toolbar to switch between Builder, Preview, Logic, and PDF views

2. **Field Types Available**:
   - **Basic Fields**: Text Input, Email, Number, Textarea
   - **Selection Fields**: Dropdown, Checkbox, Radio Button
   - **Media Fields**: File Upload, Signature Pad, Photo Capture

3. **Form Preview**:
   - Click the "Preview" button to see how your form looks to users
   - Test form functionality and validation

### Conditional Logic

1. **Setting Up Rules**:
   - Go to the "Logic" tab
   - Select a field to add conditional rules
   - Define conditions using other fields
   - Set actions (show, hide, require, disable)

### PDF Generation

1. **Configure PDF Settings**:
   - Choose page format (A4 or Letter)
   - Select orientation (Portrait or Landscape)
   - Choose what to include in the PDF

2. **Generate PDFs**:
   - **Blank Form**: Download a printable form
   - **Preview PDF**: Generate PDF with current form layout

### Analytics Dashboard

- View form performance metrics
- Monitor user engagement
- Track submission trends over time
- Analyze device usage patterns

### Real-time Collaboration

- See connected users in real-time
- Monitor form editing activity
- Collaborate with team members (WebSocket integration ready)

## 🏗️ Project Structure

```
src/
├── components/
│   ├── Analytics/          # Analytics dashboard components
│   ├── Collaboration/      # Real-time collaboration features
│   ├── ConditionalLogic/   # Conditional logic editor
│   ├── FormBuilder/        # Drag & drop form builder
│   └── PDFGenerator/       # PDF generation components
├── hooks/                  # Custom React hooks
├── types/                  # TypeScript type definitions
└── utils/                  # Utility functions
```

## 🔧 Configuration

### Tailwind CSS
The project uses Tailwind CSS for styling. Configuration is in `tailwind.config.js`.

### Development
- Uses Vite for fast development and building
- ESLint for code linting
- TypeScript for type safety

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

The build output will be in the `dist/` directory, ready for deployment to any static hosting service.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- React DnD for drag and drop functionality
- Recharts for beautiful analytics charts
- Tailwind CSS for rapid UI development
- All the open-source libraries that made this project possible

---

**FreeAuditor** - Empowering form creation with modern web technologies! 🎉
