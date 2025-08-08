# Tag Category Management System

A React TypeScript application for managing tag categories with dynamic metadata configuration.

## Features

- Tag category management with hierarchical structure
- Dynamic metadata configuration
- Support for different input types (text, number, select)
- Sub-category management
- Real-time validation
- Modern UI with responsive design

## Project Structure

```
src/
├── components/          # React components
│   ├── TagCategory/     # Tag category related components
│   ├── Metadata/        # Metadata configuration components
│   └── common/          # Common UI components
├── types/               # TypeScript interfaces and types
├── data/                # Sample data and mock data
├── utils/               # Utility functions
└── App.tsx              # Main application component
```

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

3. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App

## Deployment

### Vercel Deployment

This project is configured for easy deployment on Vercel:

1. **Connect to Vercel**:
   - Install Vercel CLI: `npm i -g vercel`
   - Run `vercel` in the project directory
   - Follow the prompts to connect your GitHub repository

2. **Automatic Deployment**:
   - Push changes to the `master` branch
   - Vercel will automatically build and deploy

3. **Manual Deployment**:
   ```bash
   vercel --prod
   ```

### Environment Variables

No environment variables are required for this project.

### Build Configuration

The project includes:
- `vercel.json` - Vercel deployment configuration
- `public/manifest.json` - PWA manifest
- Optimized build settings for production

## Technologies Used

- React 18
- TypeScript
- Create React App
- Modern JavaScript (ES6+)
- Vercel (Deployment)

## Repository

- **GitHub**: [https://github.com/tarun01namdev-source/assignment-tarun.git](https://github.com/tarun01namdev-source/assignment-tarun.git)
- **Live Demo**: [Deployed on Vercel](https://assignment-tarun.vercel.app)

## Development

### Prerequisites
- Node.js >= 16.0.0
- npm or yarn

### Local Development
1. Clone the repository
2. Install dependencies: `npm install`
3. Start development server: `npm start`
4. Open http://localhost:3000

### Building for Production
```bash
npm run build
```

The build output will be in the `build/` directory, ready for deployment.
