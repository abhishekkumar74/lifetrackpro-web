export default function manifest() {
  return {
    name: 'LifeTrack Pro — Focus, Flashcards & Habit Tracker',
    short_name: 'LifeTrack Pro',
    description: 'All-in-one student productivity OS with Pomodoro focus timer, SM-2 flashcard spaced repetition, and streak tracker.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0a0d14',
    theme_color: '#4f46e5',
    icons: [
      {
        src: '/favicon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
