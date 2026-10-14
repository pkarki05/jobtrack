# ⚡ JobTrack — Job Application Tracker

<p align="center">
  <strong>Track applications. Manage interviews. Land your next opportunity.</strong>
</p>

<p align="center">
  A modern, responsive job application tracker built with React, TypeScript, and Firebase.
</p>

<p align="center">
  ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
  ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
  ![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)
  ![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
</p>

---

## 📌 Overview

**JobTrack** is a web application designed to help job seekers organise their job search in one place. It provides a central dashboard to track applications, monitor recruitment progress, manage important dates, and analyse job-search activity.

The project demonstrates practical skills in front-end development, authentication, cloud database integration, responsive UI design, and application state management.

## ✨ Features

- 🔐 **User Authentication** — Sign up, sign in, password reset, and logout functionality.
- 📊 **Analytics Dashboard** — View application statistics and job-search progress.
- 📋 **Application Management** — Add, edit, view, and delete job applications.
- 🔄 **Pipeline Tracking** — Organise applications by Applied, Screening, Interview, Offer, and Rejected stages.
- 📅 **Reminders** — Track follow-ups, interviews, deadlines, and overdue tasks.
- 📈 **Visual Analytics** — Understand application activity and recruitment outcomes through charts.
- ☁️ **Cloud Storage** — Store application data in Firebase Firestore.
- 🔒 **User-Specific Data** — Configure Firestore security rules so users can access only their own application records.
- 📱 **Responsive Design** — Use the application across desktop, tablet, and mobile devices.
- 🌙 **Dark Neon UI** — A modern interface with a dark theme and vibrant accents.

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React | Component-based user interface |
| TypeScript | Type safety and maintainable code |
| Vite | Development server and build tooling |
| Firebase Authentication | User registration and sign-in |
| Cloud Firestore | Cloud database for job applications |
| CSS | Responsive styling and visual design |
| Recharts *(if included in the project)* | Dashboard charts and analytics |

## 🚀 Getting Started

### Prerequisites

Install the following before running the project:

- [Node.js](https://nodejs.org/) — preferably an active LTS version
- npm
- A [Firebase account](https://firebase.google.com/)

### 1. Clone the repository

```bash
git clone https://github.com/YOUR-USERNAME/jobtrack.git
cd jobtrack
```

Replace `YOUR-USERNAME/jobtrack` with your actual GitHub repository URL.

### 2. Install dependencies

```bash
npm install
```

### 3. Configure Firebase environment variables

Create a local environment file by copying the example:

**Windows PowerShell**
```powershell
Copy-Item .env.example .env.local
```

Open `.env.local` and verify that the Firebase configuration matches your Firebase project. Use the exact variable names already defined in `.env.example`.

Example:

```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

Use your actual Firebase project values. Do not commit `.env.local` or private service-account credentials to GitHub. Firebase web configuration is intended to be used by client applications, but access must still be protected through appropriate authentication, security rules, and API restrictions.

### 4. Configure Firebase

In the [Firebase Console](https://console.firebase.google.com/):

1. Create or select your Firebase project.
2. Enable **Authentication → Sign-in method → Email/Password**.
3. Create a **Cloud Firestore** database.
4. Configure and publish the appropriate Firestore security rules.
5. Add `localhost` to the authorised domains if required by your Firebase setup.

### 5. Start the development server

```bash
npm run dev
```

Open the local URL shown in your terminal, typically:

```text
http://localhost:5173
```

### 6. Build for production

```bash
npm run build
```

Vite normally outputs the production files to the `dist/` directory.

## 🔐 Security

JobTrack uses Firebase Authentication and Firestore to support user accounts and cloud-based application data.

Security considerations:

- Enable the authentication providers that the application actually uses.
- Apply Firestore rules that restrict each user to their own records.
- Never include Firebase Admin SDK service-account credentials in client-side code.
- Keep local environment files out of version control.
- Validate and handle errors for authentication and database operations.

**Note:** Security depends on the deployed configuration and implemented rules. Review and test the rules before using real personal data.

## 🧭 Application Workflow

1. Create an account or sign in.
2. Add a job application with company, role, status, and relevant dates.
3. Update its stage as the recruitment process progresses.
4. Record interviews and follow-up reminders.
5. Review dashboard statistics to monitor your job search.

## 📸 Screenshots

Add screenshots of your running application here to make the repository more useful to recruiters and other developers.

| Dashboard | Application Pipeline |
|---|---|
| `![Dashboard](screenshots/dashboard.png)` | `![Pipeline](screenshots/pipeline.png)` |

Create a `screenshots/` directory in your repository and replace these placeholders with real screenshots.

## 💡 Future Improvements

- Drag-and-drop pipeline management, if not already fully implemented
- Job description and resume matching
- CSV export and import
- Interview notes and preparation checklists
- Email or calendar reminders
- Automated testing and continuous integration
- Deployment with Firebase Hosting or another static hosting provider

## 🎯 Project Goals

This project was developed to demonstrate practical application development skills, including:

- Building reusable React components
- Using TypeScript to improve code reliability
- Integrating Firebase Authentication
- Working with a cloud-hosted NoSQL database
- Designing responsive dashboards and data visualisations
- Managing application data and user workflows
- Applying security rules to protect user-specific records

## 👨‍💻 Author

**Prakash Karki**

IT graduate specialising in Network Security, developing practical software development and cybersecurity skills.

- GitHub: (https://github.com/pkarki05)
- LinkedIn: (https://www.linkedin.com/in/prakash-karki09/?isSelfProfile=true)


---

<p align="center">
  <strong>Built to make the job search more organised, measurable, and manageable. ⚡</strong>
</p>
