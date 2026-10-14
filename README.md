# JobTrack — Job Application Tracker

React 19 + TypeScript + Vite + Tailwind CSS 4 + Firebase Authentication + Firestore + Recharts.

## Included
- Email/password sign up and login, logout, password-reset email
- Firestore data scoped to each signed-in user's UID
- Dashboard metrics and monthly activity chart
- Drag-and-drop pipeline: Applied, Screening, Interview, Offer, Rejected
- Add, edit, delete applications
- Follow-up, interview and deadline reminders, including overdue dates
- Dark neon responsive interface

## Setup
1. Install Node.js LTS (Node 20+ recommended).
2. Copy `.env.example` to `.env.local`. The values are prefilled from the Firebase configuration you supplied; verify them in Firebase Console.
   - PowerShell: `Copy-Item .env.example .env.local`
   - macOS/Linux: `cp .env.example .env.local`
3. In Firebase Console for `jobtrack-5eae6`, enable **Authentication > Sign-in method > Email/Password**.
4. Create a **Firestore Database**.
5. Publish or merge `firestore.rules`. If you already have rules for other collections, merge this user-scoped match rather than replacing unrelated rules.
6. Ensure `localhost` is listed under Authentication > Settings > Authorized domains.
7. Run:
   ```bash
   npm install
   npm run dev
   ```
8. Open the local URL Vite prints, typically http://localhost:5173.

Build with `npm run build`; preview with `npm run preview`.

## Data and privacy
Records are stored at `users/{uid}/applications/{applicationId}`. The supplied rules let users access only their own application subcollection. Never place a Firebase service-account key in a browser app. Firebase web API keys are client configuration; enforce access with Authentication, Security Rules, and appropriate API restrictions.

## Notes
Reminders appear inside the app; this starter does not send email, push notifications or calendar invitations. Interview conversion and offer rate are current-status metrics, not historical stage conversion. Monthly offers count applications currently marked Offer grouped by their applied date.
