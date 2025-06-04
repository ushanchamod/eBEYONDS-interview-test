# Movie Library

A Vue.js application for browsing and managing your movie collection with TMDb integration.

## Technologies Used

- Vue 3 (Composition API)
- Vite (Build Tool)
- Sass (Styling)
- TMDb API (Movie Data)

## Project Setup

### Prerequisites

- Node.js (v16 or higher recommended)
- npm
- TMDb API key (register at [https://www.themoviedb.org/](https://www.themoviedb.org/))

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ushanchamod/eBEYONDS-interview-test.git
   ```
2. Navigate to project directory:
   ```
   cd .\eBEYONDS-interview-test\
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Create a `.env` file in the root directory with your TMDb API key:
   ```
   VITE_THEMOVIEDB_API_KEY=your_api_key_here
   VITE_THEMOVIEDB_API_URL=https://api.themoviedb.org/3
   VITE_THEMOVIEDB_IMAGE_URL=https://image.tmdb.org/t/p/w400
   ```

### Available Script

- `npm run dev` - Start development server

- `npm run build` - Build for production

- `npm run preview` - Preview production build

- `npm run format` - Format code with Prettier
