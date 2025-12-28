# EduPlatform - Modern Educational Platform

![EduPlatform Banner](https://img.shields.io/badge/React-19.2.0-blue) ![Vite](https://img.shields.io/badge/Vite-7.2.4-purple) ![Supabase](https://img.shields.io/badge/Supabase-2.87.1-green) ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1.17-cyan)

A modern, responsive educational platform built with React and Vite, featuring course management, blogging capabilities, and an admin dashboard. Designed for seamless learning experiences with a sleek dark theme interface.

## 🌟 Features

### 🎓 Course Management
- **Browse Courses**: Explore a wide range of courses with detailed information
- **Course Details**: In-depth course pages with comprehensive content
- **Enrollment System**: Easy course enrollment with modal-based registration
- **Top Courses Section**: Highlighted featured courses on the homepage

### 📝 Blog System
- **Blog Posts**: Rich blogging platform for educational content
- **Blog Details**: Detailed blog post pages with full content
- **Content Management**: Admin-controlled blog creation and editing

### 👨‍💼 Admin Dashboard
- **Course Management**: Add, edit, and manage courses
- **Blog Management**: Create and manage blog posts
- **Enrollment Tracking**: Monitor course enrollments
- **Contact Management**: Handle user inquiries and messages

### 🎨 User Experience
- **Responsive Design**: Optimized for all devices and screen sizes
- **Dark Theme**: Modern dark UI with blue accent colors
- **Smooth Animations**: Reveal-on-scroll effects and transitions
- **Fast Navigation**: React Router for seamless page transitions

### 🔐 Authentication
- **Secure Login**: Supabase-powered authentication system
- **Protected Routes**: Admin-only access to management features

## 🛠️ Tech Stack

### Frontend
- **React 19.2.0** - Modern React with latest features
- **Vite 7.2.4** - Fast build tool and development server
- **React Router DOM 7.9.6** - Client-side routing
- **Tailwind CSS 4.1.17** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library

### Backend & Database
- **Supabase 2.87.1** - Backend-as-a-Service with PostgreSQL
- **Axios 1.13.2** - HTTP client for API requests

### State Management
- **Zustand 5.0.9** - Lightweight state management

### Development Tools
- **ESLint** - Code linting and formatting
- **Vite Plugin React** - React integration for Vite

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Supabase account and project

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   - Create a `.env` file in the root directory
   - Add your Supabase configuration:
     ```
     VITE_SUPABASE_URL=your_supabase_url
     VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
     ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

6. **Preview production build**
   ```bash
   npm run preview
   ```


## 🎯 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## 🌐 Deployment

This project is configured for deployment on platforms like Netlify, Vercel, or any static hosting service:

1. Build the project: `npm run build`
2. Deploy the `dist` folder
3. Ensure `_redirects` file is included for SPA routing

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with ❤️ using React and modern web technologies
- Icons provided by [Lucide React](https://lucide.dev/)
- UI inspired by modern educational platforms

## 📞 Support

For support or questions, please contact us through the contact page or create an issue in this repository.

---

**Happy Learning! 🚀**
