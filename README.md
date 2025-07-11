# Summary Generator

A React-based web application that generates educational summaries for mathematics chapters. Built with modern web technologies and a clean, dark-themed UI.

## Features

- **Subject Selection**: Currently supports Mathematics for Class 10
- **Chapter Selection**: Dynamic chapter loading from API
- **Multi-language Support**: Generate summaries in different languages
- **Comprehensive Output**: Includes story summaries, key points, formulas, and theorems
- **Responsive Design**: Works on desktop and mobile devices
- **Dark Theme**: Modern dark UI with lime accent colors

## Tech Stack

- **Frontend**: React 19.1.0
- **Styling**: Tailwind CSS 3.4.0
- **HTTP Client**: Axios
- **Build Tool**: Create React App

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd summary-generator
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (one-way operation)

## API Integration

The application connects to a backend API at `https://summary-j2xh.onrender.com` with the following endpoints:

- `GET /chapters` - Fetch available chapters for a subject
- `GET /languages` - Fetch available languages
- `POST /generate-summary` - Generate summary with specified parameters

## Project Structure

```
src/
├── components/
│   └── SummaryForm.jsx    # Main form component
├── App.jsx                # Root component
├── index.js              # Application entry point
├── index.css             # Global styles with Tailwind
└── setupTests.js         # Test configuration
```
