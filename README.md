# TaskFlow

TaskFlow is a cross-platform task management system with a shared Node.js backend, a React web application, and a React Native mobile application. It features cross-platform data synchronization through the shared backend and database, with refetching and pull-to-refresh.

## Architecture
- **Backend:** Node.js, Express, TypeScript, Prisma
- **Database:** PostgreSQL (Hosted on Neon)
- **Web:** React, Vite, TypeScript, React Router
- **Mobile:** React Native, Expo
- **Authentication:** Bearer JWT (JSON Web Tokens)

## Setup and Local Development

### 1. Database Setup
Create a PostgreSQL database on Neon. Get the pooled connection string and the direct connection string.

### 2. Environment Variables
Copy `.env.example` to `.env` in the root (if sharing) or in `backend/`, `web/`, and `mobile/` respectively, and fill in the values:
- `DATABASE_URL`: Neon pooled connection URL
- `DIRECT_URL`: Neon direct connection URL
- `JWT_SECRET`: Secret key for JWT
- `CLIENT_ORIGIN`: Your web URL (for CORS)
- `EXPO_PUBLIC_API_URL`: Your backend API URL for the mobile app
- `VITE_API_URL`: Your backend API URL for the web app

### 3. Backend Setup
```bash
cd backend
npm install
npx prisma generate
npx prisma migrate dev # for local development
npm run dev
```

### 4. Web Setup
```bash
cd web
npm install
npm run dev
```

### 5. Mobile Setup
```bash
cd mobile
npm install
npm run start
```

## Production Deployment

- **Backend:** Deployed to Render. Use `npm ci && npx prisma generate && npm run build` as the build command, and `npm start` as the start command. Run `npx prisma migrate deploy` for database migrations.
- **Web:** Deployed to Vercel. Set framework to Vite, build command to `npm run build`, and root directory to `web`.
- **Mobile:** Built with EAS. Use `eas build --platform android --profile preview` to generate an APK.

## Documentation
- [API Documentation](docs/API_DOCUMENTATION.md)
- [Database ERD](docs/DATABASE_ERD.md)
- [Submission Checklist](docs/submission/SUBMISSION_CHECKLIST.md)
- [Test Report](docs/submission/TEST_REPORT.md)
- [Deployment](docs/submission/DEPLOYMENT.md)
