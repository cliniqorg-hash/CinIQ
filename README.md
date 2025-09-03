# CLinIQ - AI-Powered Healthcare Platform

CLinIQ is a professional healthcare platform that leverages artificial intelligence to provide medical consultations, lab report analysis, and medical imaging diagnostics. Built with modern web technologies and designed with the best UI/UX practices.

## 🏥 Features

### Core Services
- **AI Doctor Consultation**: Chat with an AI-powered virtual doctor for medical guidance
- **Lab Report Analysis**: Upload and analyze lab reports with detailed explanations
- **Medical Imaging**: AI-powered analysis of X-rays, MRIs, and CT scans
- **Professional UI/UX**: Modern, responsive design optimized for healthcare professionals

### Technical Features
- **Next.js 14**: Modern React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework with custom healthcare theme
- **Responsive Design**: Mobile-first approach with professional aesthetics
- **AI Integration**: Ready for Pollinations AI API integration

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd cliniq
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
cliniq/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles and Tailwind imports
│   ├── layout.tsx         # Root layout component
│   ├── page.tsx           # Home page
│   ├── chat/              # AI Doctor consultation
│   ├── lab-analysis/      # Lab report analysis
│   ├── imaging/           # Medical imaging analysis
│   └── about/             # About page
├── components/             # Reusable components
│   ├── Navbar.tsx         # Navigation component
│   └── Footer.tsx         # Footer component
├── public/                 # Static assets
├── package.json            # Dependencies and scripts
├── tailwind.config.js      # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
└── README.md              # Project documentation
```

## 🎨 Design System

### Color Palette
- **Primary**: Blue tones (#0ea5e9 to #0c4a6e)
- **Medical**: Green tones (#22c55e to #14532d)
- **Accent**: Purple tones (#d946ef to #701a75)

### Typography
- **Font Family**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700

### Components
- **Cards**: Elevated containers with hover effects
- **Buttons**: Primary and secondary button styles
- **Forms**: Professional input fields with focus states
- **Navigation**: Sticky navigation with mobile responsiveness

## 🔧 Configuration

### Tailwind CSS
Custom healthcare-themed colors and animations are configured in `tailwind.config.js`:

```javascript
colors: {
  primary: { /* Blue palette */ },
  medical: { /* Green palette */ },
  accent: { /* Purple palette */ }
}
```

### Next.js
Configured for App Router with image domain support for external APIs:

```javascript
images: {
  domains: ['image.pollinations.ai'],
}
```

## 🌐 API Integration

### Pollinations AI API
The platform is designed to integrate with the Pollinations AI API for:

- **Text Generation**: AI doctor responses and medical analysis
- **Image Generation**: Medical image creation for educational purposes
- **Lab Analysis**: AI-powered interpretation of medical reports

### API Endpoints Used
- `https://text.pollinations.ai/openai` - Text generation
- `https://image.pollinations.ai/prompt/{prompt}` - Image generation

## 📱 Responsive Design

- **Mobile First**: Optimized for mobile devices
- **Tablet**: Responsive layouts for medium screens
- **Desktop**: Full-featured experience for large screens
- **Touch Friendly**: Optimized for touch interactions

## 🚀 Deployment

### Build for Production
```bash
npm run build
npm start
```

### Environment Variables
Create a `.env.local` file for API keys and configuration:

```env
NEXT_PUBLIC_POLLINATIONS_API_KEY=your_api_key_here
NEXT_PUBLIC_API_BASE_URL=https://api.pollinations.ai
```

## 🏗️ Customization

### Adding New Pages
1. Create a new directory in `app/`
2. Add `page.tsx` with your component
3. Update navigation in `components/Navbar.tsx`

### Styling
- Use Tailwind CSS classes for consistent styling
- Custom CSS in `app/globals.css`
- Component-specific styles in individual files

### AI Integration
- Modify API calls in respective page components
- Update response handling for new AI models
- Add new AI features as needed

## 📊 Performance

- **Lazy Loading**: Images and components load on demand
- **Optimized Images**: Next.js Image component for performance
- **Code Splitting**: Automatic route-based code splitting
- **SEO Optimized**: Meta tags and structured data

## 🔒 Security

- **Input Validation**: Client and server-side validation
- **File Upload Security**: Restricted file types and sizes
- **HTTPS Ready**: Secure communication protocols
- **Privacy Compliant**: Healthcare data protection measures

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Email: info@cliniq.com
- Documentation: [docs.cliniq.com](https://docs.cliniq.com)
- Issues: GitHub Issues page

## 🙏 Acknowledgments

- **Pollinations AI** for providing the AI API services
- **Next.js Team** for the amazing framework
- **Tailwind CSS** for the utility-first CSS framework
- **Healthcare Professionals** for domain expertise and feedback

---

**Built with ❤️ for better healthcare** 