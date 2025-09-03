# Cloudflare Pages Deployment Guide for CLinIQ

## 🚀 Quick Deployment Steps

### Option 1: Connect GitHub Repository (Recommended)

1. **Go to Cloudflare Dashboard**
   - Visit [dash.cloudflare.com](https://dash.cloudflare.com)
   - Navigate to "Pages" in the sidebar

2. **Create New Project**
   - Click "Create a project"
   - Select "Connect to Git"
   - Choose "GitHub" as your Git provider

3. **Select Repository**
   - Repository: `cliniqorg-hash/CinIQ`
   - Branch: `main`
   - Project name: `cliniq-medical-platform`

4. **Build Settings**
   - Framework preset: `Next.js (Static HTML Export)`
   - Build command: `npm run build`
   - Build output directory: `out`
   - Root directory: `/` (leave empty)

5. **Environment Variables** (if needed)
   - Add any required environment variables
   - Most features work without additional env vars

6. **Deploy**
   - Click "Save and Deploy"
   - Wait for build to complete

### Option 2: Manual Upload

1. **Build Locally**
   ```bash
   npm install
   npm run build
   ```

2. **Upload to Cloudflare Pages**
   - Go to Cloudflare Pages
   - Click "Upload assets"
   - Upload the entire `out` folder

## ⚙️ Configuration Files Included

### `wrangler.toml`
- Cloudflare Workers/Pages configuration
- Build settings and environment config

### `_headers`
- Custom HTTP headers for security and caching
- Optimized for static assets

### `_redirects`
- URL redirects and routing rules
- SPA routing support

### `next.config.js`
- Static export configuration
- Optimized for Cloudflare Pages

## 🔧 Build Configuration

```json
{
  "buildCommand": "npm run build",
  "buildOutputDirectory": "out",
  "framework": "nextjs-static"
}
```

## 📊 Performance Optimizations

- **Static Export**: All pages pre-rendered for maximum speed
- **Image Optimization**: Unoptimized images for static hosting
- **Caching Headers**: Aggressive caching for static assets
- **Security Headers**: XSS protection, content type validation

## 🌐 Custom Domain Setup

1. **Add Custom Domain**
   - Go to Pages project settings
   - Click "Custom domains"
   - Add your domain (e.g., `cliniq.org`)

2. **DNS Configuration**
   - Add CNAME record pointing to your Pages URL
   - Or use Cloudflare nameservers

## 📈 Analytics & Monitoring

- **Cloudflare Analytics**: Built-in performance metrics
- **Google Analytics**: Already configured in the app
- **Error Tracking**: Cloudflare provides error logs

## 🔄 Continuous Deployment

Once connected to GitHub:
- **Automatic Deployments**: Every push to `main` triggers deployment
- **Preview Deployments**: Pull requests get preview URLs
- **Rollback**: Easy rollback to previous deployments

## 🛠️ Troubleshooting

### Build Failures
- Check Node.js version (requires 18+)
- Verify all dependencies are in package.json
- Check build logs in Cloudflare dashboard

### Routing Issues
- Ensure `_redirects` file is in the `out` directory
- Check that all routes are properly exported

### Performance Issues
- Verify caching headers in `_headers`
- Check image optimization settings
- Monitor Core Web Vitals in Cloudflare Analytics

## 📝 Environment Variables

If you need environment variables:
- Go to Pages project settings
- Add variables in "Environment variables" section
- Available in both production and preview environments

## 🎯 Expected Results

After deployment, you should have:
- ✅ Fast loading medical platform
- ✅ All 23 medical tools working
- ✅ AI chat functionality
- ✅ SEO optimized pages
- ✅ Google Ads compliance
- ✅ Arabic/English support
- ✅ Mobile responsive design

## 🔗 Useful Links

- [Cloudflare Pages Documentation](https://developers.cloudflare.com/pages/)
- [Next.js Static Export Guide](https://nextjs.org/docs/advanced-features/static-html-export)
- [CLinIQ Repository](https://github.com/cliniqorg-hash/CinIQ)
