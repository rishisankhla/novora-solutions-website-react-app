import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'copy-seo-files',
      closeBundle() {
        // Ensure the .well-known directory exists
        const wellKnownSrcDir = path.resolve(__dirname, 'public/.well-known');
        const wellKnownDestDir = path.resolve(__dirname, 'dist/.well-known');

        if (fs.existsSync(wellKnownSrcDir)) {
          if (!fs.existsSync(wellKnownDestDir)) {
            fs.mkdirSync(wellKnownDestDir, { recursive: true });
          }

          // Copy all files from .well-known directory
          const wellKnownFiles = fs.readdirSync(wellKnownSrcDir);
          wellKnownFiles.forEach(file => {
            const srcPath = path.resolve(wellKnownSrcDir, file);
            const destPath = path.resolve(wellKnownDestDir, file);

            if (fs.statSync(srcPath).isFile()) {
              fs.copyFileSync(srcPath, destPath);
              console.log(`${file} copied to dist/.well-known folder`);
            }
          });
        }

        // List of SEO files to ensure are copied
        const seoFiles = [
          'sitemap.xml',
          'robots.txt',
          'manifest.json',
          'browserconfig.xml',
          'humans.txt',
          'opensearch.xml',
          'feed.xml',
          'offline.html',
          'web.config',
          '_redirects',
          '_headers',
          'sw.js'
        ];

        seoFiles.forEach(file => {
          const srcPath = path.resolve(__dirname, `public/${file}`);
          const destPath = path.resolve(__dirname, `dist/${file}`);

          if (fs.existsSync(srcPath)) {
            fs.copyFileSync(srcPath, destPath);
            console.log(`${file} copied to dist folder`);
          } else {
            console.warn(`Warning: ${file} not found in public directory`);
          }
        });
      }
    }
  ],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    sourcemap: true,
    rollupOptions: {
      output: {
        // Improved chunk splitting strategy
        manualChunks: (id) => {
          // Create separate chunks for major dependencies
          if (id.includes('node_modules')) {
            if (id.includes('react/') || id.includes('react-dom/')) {
              return 'vendor-react';
            }
            if (id.includes('react-helmet-async')) {
              return 'vendor-helmet';
            }
            if (id.includes('lucide-react')) {
              return 'vendor-icons';
            }
            if (id.includes('emailjs')) {
              return 'vendor-email';
            }
            if (id.includes('react-hot-toast')) {
              return 'vendor-toast';
            }
            // All other dependencies
            return 'vendor-other';
          }

          // Split app code by major features
          if (id.includes('/components/')) {
            if (id.includes('/services/')) {
              return 'feature-services';
            }
            if (id.includes('/team/')) {
              return 'feature-team';
            }
            if (id.includes('/about/')) {
              return 'feature-about';
            }
            if (id.includes('/SEO/') || id.includes('/seo/')) {
              return 'feature-seo';
            }
            if (id.includes('/newsletter/')) {
              return 'feature-newsletter';
            }
            // All other components
            return 'components';
          }
        }
      }
    },
    // Ensure assets are optimized
    assetsInlineLimit: 4096,
    // Improve CSS handling
    cssCodeSplit: true,
    // Minify output
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    // Add hashes to file names for cache busting
    chunkSizeWarningLimit: 1000,
    // Generate preload directives
    modulePreload: {
      polyfill: true,
    }
  },
  server: {
    // Enable HTTPS for local development (optional)
    // https: true,
    port: 3000,
    open: true,
    cors: true,
    // Add headers for local development
    headers: {
      'Cache-Control': 'no-store',
      'X-Frame-Options': 'SAMEORIGIN',
      'X-Content-Type-Options': 'nosniff'
    }
  },
  preview: {
    port: 4173,
    open: true,
    // Add headers for preview server
    headers: {
      'Cache-Control': 'public, max-age=31536000, immutable',
      'X-Frame-Options': 'SAMEORIGIN',
      'X-Content-Type-Options': 'nosniff'
    }
  }
});