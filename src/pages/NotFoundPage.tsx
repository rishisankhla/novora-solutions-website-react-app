import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import { SEOHead } from '../seo/SEOHead';
import { ROUTES } from '../routes/paths';

export function NotFoundPage() {
  return (
    <>
      <SEOHead
        title="Page Not Found | Novora Solutions"
        description="The page you're looking for doesn't exist. Return to Novora Solutions homepage."
        canonicalUrl="https://novorasolutions.com/404"
      />

      <section className="min-h-[70vh] flex items-center justify-center px-4 py-20">
        <div className="text-center max-w-lg">
          <p className="text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-4">
            404
          </p>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            Page Not Found
          </h1>
          <p className="text-gray-600 mb-8 leading-relaxed">
            The page you're looking for doesn't exist or may have been moved.
            Let's get you back on track.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to={ROUTES.home}
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg hover:scale-[1.02] transform transition-all duration-300"
            >
              <Home className="h-4 w-4" />
              Back to Home
            </Link>
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center justify-center gap-2 bg-white text-gray-700 px-6 py-3 rounded-lg font-semibold border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Go Back
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
