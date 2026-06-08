import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import * as publicCtrl from '../controllers/public.controller.js';
import { validateBody } from '../middleware/validate.js';
import {
  contactSchema,
  newsletterSchema,
  leadSchema,
  applicationSchema,
} from '../validators/schemas.js';

const router = Router();

const formLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: { success: false, error: { code: 'RATE_LIMIT', message: 'Too many requests' } },
});

router.post('/contact', formLimiter, validateBody(contactSchema), publicCtrl.submitContact);
router.post('/inquiry', formLimiter, validateBody(contactSchema), publicCtrl.submitInquiry);
router.post('/leads', formLimiter, validateBody(leadSchema), publicCtrl.submitLead);
router.post('/newsletter', formLimiter, validateBody(newsletterSchema), publicCtrl.submitNewsletter);
router.post('/applications', formLimiter, validateBody(applicationSchema), publicCtrl.submitApplication);

router.get('/jobs', publicCtrl.getPublicJobs);
router.get('/team', publicCtrl.getPublicTeam);
router.get('/portfolio', publicCtrl.getPublicPortfolio);
router.get('/blog', publicCtrl.getPublicBlog);
router.get('/blog/:slug', publicCtrl.getPublicBlogBySlug);
router.get('/content', publicCtrl.getAllPublicSiteContent);
router.get('/content/:key', publicCtrl.getPublicSiteContent);

export default router;
