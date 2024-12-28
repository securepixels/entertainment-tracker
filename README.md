# Entertainment Tracker

A modern web application for tracking your movies and TV shows with a clean, responsive interface.

## 🚀 Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) with App Router
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: 
  - [shadcn/ui](https://ui.shadcn.com/)
  - [Lucide Icons](https://lucide.dev/)
- **Data Management**: 
  - Local Storage
  - [TMDB API](https://www.themoviedb.org/documentation/api) for movie/TV show data
- **Type Safety**: TypeScript
- **Deployment**: Vercel

## ✨ Features

- 🎯 Track movies and TV shows in one place
- 🔍 Search TMDB database for content
- ⭐ Rate and review your watched content
- 📱 Fully responsive design
- 🌓 Status tracking (Want to Watch, Watching, Completed)
- 🗑️ Easy content management (add/delete items)

## 🛠️ Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/entertainment-tracker.git
```

2. Install dependencies:
```bash
cd entertainment-tracker
npm install
```

3. Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_TMDB_API_KEY=your_tmdb_api_key
```

4. Run the development server:
```bash
npm run dev
```

## 📝 Environment Variables

Make sure to set up the following environment variables:

- `NEXT_PUBLIC_TMDB_API_KEY`: Your TMDB API key

## 🔧 Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```


## 🧪 Future Enhancements

- [ ] User authentication
- [ ] Advanced filtering and sorting
- [ ] Personal notes and reviews
- [ ] Watch history tracking

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
