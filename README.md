# Plant Paradise 🌱

An AI-powered ecosystem designed to bridge the knowledge gap for Gen Z and urban gardeners. Plant Paradise features AI Camera Scans for instant plant identification and health diagnosis. To drive engagement, it incorporates Snapchat-style streaks and witty, fun reminders like "Don't be a succ-er". A centralized marketplace connects Tier 1 and Tier 2 cities, enabling users to buy and sell plants, seeds, and manure while supporting local nursery owners.

## Features

- **AI Plant Identification**: Upload photos to instantly identify plants using advanced AI.
- **Health Diagnosis**: Get AI-powered health checks and care recommendations for your plants.
- **Plant Journal**: Track your plant collection with detailed entries, care notes, and growth progress.
- **Marketplace**: Buy and sell plants, seeds, and gardening supplies in a local marketplace.
- **Streaks & Reminders**: Earn streaks for consistent app usage and receive fun, motivational notifications.
- **Community Support**: Connect with fellow gardeners and share tips.

## Tech Stack

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **Backend**: Node.js, Express, TypeScript
- **AI Integration**: Firebase Genkit for AI flows
<<<<<<< HEAD
- **Database**: (Specify if applicable, e.g.,postgreSQL MongoDB or local storage)
=======
- **Database**: (Specify if applicable, e.g., MongoDB or local storage)
>>>>>>> 91377a5 (Update marketplace, journal pages and add plant images)
- **Deployment**: Firebase Hosting, App Hosting

## Installation

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn
- Git

### Clone the Repository

```bash
git clone https://github.com/your-username/plant-paradise.git
cd plant-paradise
```

### Backend Setup

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:
   - Copy `.env.example` to `.env` and fill in the required values (e.g., database URLs, API keys).

4. Start the backend server:
   ```bash
   npm run dev
   ```
   The backend will run on `http://localhost:3001` (or as configured).

### Frontend Setup

1. Navigate to the client directory:

   ```bash
   cd ../client
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:
   - Copy `.env.example` to `.env.local` and configure API endpoints and other settings.

4. Start the development server:
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:3000`.

## Usage

1. **Access the App**: Open your browser and go to `http://localhost:3000`.
2. **Sign Up/Login**: Create an account or log in to start tracking your plants.
3. **Scan Plants**: Use the camera feature to identify and diagnose plants.
4. **Manage Journal**: Add plants to your journal, edit details, and log care activities.
5. **Water Plants**: Click the "Water Plant" button on plant cards to log watering and earn streaks.
6. **Browse Marketplace**: Explore and trade plants and supplies.
7. **Notifications**: Enable daily reminders in the header for care tips.

### Key Pages

- **Home**: Overview and quick actions.
- **Identify**: AI-powered plant scanning.
- **Journal**: Your plant collection and care logs.
- **Marketplace**: Buy/sell plants and supplies.
- **Achievements**: View streaks and badges.

## Development

### Running Tests

- Backend: `npm test` in the `backend` directory.
- Frontend: `npm test` in the `client` directory.

### Building for Production

- Backend: `npm run build` in the `backend` directory.
- Frontend: `npm run build` in the `client` directory.

### Contributing

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/your-feature`.
3. Commit changes: `git commit -m 'Add your feature'`.
4. Push to the branch: `git push origin feature/your-feature`.
5. Open a Pull Request.

Please follow the existing code style and add tests for new features.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For questions or support, reach out to the development team or open an issue on GitHub.

---

Happy Gardening! 🌿
