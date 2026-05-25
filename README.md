# IGL Next-Generation Battery R&D Pilot

## Overview

This project is a React-based interactive portfolio dashboard designed to manage, filter, and allocate Battery R&D projects. It provides a visual interface for exploring a dataset of research projects, filtering them dynamically, and comparing custom project portfolios.

## Features

- **Interactive Dynamic Filtering:** Sift through the "Universe of Projects" by Subtopic, Host Institution, and Risk Score. Dropdown menus intelligently update their available options based on your current selections to prevent dead ends.
- **Side-by-Side Portfolio Comparison:** Allows you to create and compare two active portfolios (Portfolio A and Portfolio B).
- **Persistent Storage:** Portfolios are continuously synced to `localStorage`, so your project allocations persist between page reloads.
- **Responsive Layout:** A fixed 100vh/vw 3-column layout built with Material UI mapping, which ensures seamless scrollable interactions within individual panes without overall window scroll.
- **Dynamic Project Cards:** Detailed data presentation using Material UI cards with responsive hover information.

## Tech Stack

- **React 18** + **TypeScript**
- **Vite** (Build Tool)
- **Material UI (MUI) v5** (Component Library & Theming)

## Running the Application

1. **Install Dependencies:**
   Ensure you have Node installed, then run:
   ```bash
   npm install
   ```

2. **Start the Development Server:**
   ```bash
   npm run dev
   ```
   The application will be available at [http://localhost:5173/](http://localhost:5173/).

3. **Build for Production:**
   ```bash
   npm run build
   ```
