
# React Docs

React Docs is a full-stack web application that provides a possibility for creating, editing documents online. Users can perform full CRUD operations, search across their documents, sort by name/date, and personalize the interface with theme switching.


## Demo
https://react-docs-sigma.vercel.app/
## Features

- Google authentication
- Create, read, update, delete documents
- Search across documents
- Sort documents by name/date
- Theme switching (light/dark)
- Cloud storage with Firebase Firestore
- Document editing with @reactjs-tiptap-editor(TipTap)


## Tech Stack

Frontend: React, Vite, Tailwind CSS

Backend / DB: Firebase Firestore

Editor: @reactjs-tiptap-editor

Deployment: Vercel

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/tsiupaknazar/react-docs.git
cd react docs
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root with your API keys:

```
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

### 4. Start the development server

```bash
npm run dev
```

## Authors

- [@tsiupaknazar](https://www.github.com/tsiupaknazar)

