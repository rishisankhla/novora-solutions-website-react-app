import { Router } from 'express';
import * as authCtrl from '../controllers/auth.controller.js';
import * as adminCtrl from '../controllers/admin.controller.js';
import { requireAuth, requireRoles, adminRoles, contentRoles, hrRoles, readRoles } from '../middleware/auth.js';
import { validateBody } from '../middleware/validate.js';
import {
  loginSchema,
  userCreateSchema,
  userUpdateSchema,
  jobSchema,
  teamSchema,
  portfolioSchema,
  blogSchema,
  siteContentSchema,
  mediaSchema,
  mediaUploadSchema,
  applicationStatusSchema,
  submissionStatusSchema,
} from '../validators/schemas.js';

const router = Router();

router.post('/auth/login', validateBody(loginSchema), authCtrl.login);
router.post('/auth/logout', authCtrl.logout);
router.get('/auth/me', requireAuth, authCtrl.me);

router.get('/dashboard', requireAuth, requireRoles(...readRoles), adminCtrl.getDashboardStats);
router.get('/activity', requireAuth, requireRoles(...readRoles), adminCtrl.listActivity);

router.get('/submissions', requireAuth, requireRoles(...adminRoles), adminCtrl.listSubmissions);
router.get('/submissions/:id', requireAuth, requireRoles(...adminRoles), adminCtrl.getSubmission);
router.patch('/submissions/:id', requireAuth, requireRoles(...adminRoles), validateBody(submissionStatusSchema), adminCtrl.updateSubmissionStatus);
router.delete('/submissions/:id', requireAuth, requireRoles(...adminRoles), adminCtrl.deleteSubmission);

router.get('/applications', requireAuth, requireRoles(...hrRoles), adminCtrl.listApplications);
router.get('/applications/:id', requireAuth, requireRoles(...hrRoles), adminCtrl.getApplication);
router.get('/applications/:id/resume', requireAuth, requireRoles(...hrRoles), adminCtrl.downloadApplicationResume);
router.patch('/applications/:id', requireAuth, requireRoles(...hrRoles), validateBody(applicationStatusSchema), adminCtrl.updateApplication);
router.delete('/applications/:id', requireAuth, requireRoles(...adminRoles), adminCtrl.deleteApplication);

router.get('/jobs', requireAuth, requireRoles(...hrRoles), adminCtrl.listJobs);
router.post('/jobs', requireAuth, requireRoles(...hrRoles), validateBody(jobSchema), adminCtrl.createJob);
router.patch('/jobs/:id', requireAuth, requireRoles(...hrRoles), validateBody(jobSchema.partial()), adminCtrl.updateJob);
router.delete('/jobs/:id', requireAuth, requireRoles(...adminRoles), adminCtrl.deleteJob);

router.get('/team', requireAuth, requireRoles(...contentRoles), adminCtrl.listTeam);
router.post('/team', requireAuth, requireRoles(...contentRoles), validateBody(teamSchema), adminCtrl.createTeam);
router.patch('/team/:id', requireAuth, requireRoles(...contentRoles), validateBody(teamSchema.partial()), adminCtrl.updateTeam);
router.delete('/team/:id', requireAuth, requireRoles(...adminRoles), adminCtrl.deleteTeam);

router.get('/portfolio', requireAuth, requireRoles(...contentRoles), adminCtrl.listPortfolio);
router.post('/portfolio', requireAuth, requireRoles(...contentRoles), validateBody(portfolioSchema), adminCtrl.createPortfolio);
router.patch('/portfolio/:id', requireAuth, requireRoles(...contentRoles), validateBody(portfolioSchema.partial()), adminCtrl.updatePortfolio);
router.delete('/portfolio/:id', requireAuth, requireRoles(...adminRoles), adminCtrl.deletePortfolio);

router.get('/blog', requireAuth, requireRoles(...contentRoles), adminCtrl.listBlog);
router.post('/blog', requireAuth, requireRoles(...contentRoles), validateBody(blogSchema), adminCtrl.createBlog);
router.patch('/blog/:id', requireAuth, requireRoles(...contentRoles), validateBody(blogSchema.partial()), adminCtrl.updateBlog);
router.delete('/blog/:id', requireAuth, requireRoles(...adminRoles), adminCtrl.deleteBlog);

router.get('/site-content', requireAuth, requireRoles(...contentRoles), adminCtrl.listSiteContent);
router.put('/site-content/:key', requireAuth, requireRoles(...contentRoles), validateBody(siteContentSchema), adminCtrl.upsertSiteContent);

router.get('/media', requireAuth, requireRoles(...contentRoles), adminCtrl.listMedia);
router.post('/media/upload', requireAuth, requireRoles(...contentRoles), validateBody(mediaUploadSchema), adminCtrl.uploadMedia);
router.post('/media', requireAuth, requireRoles(...contentRoles), validateBody(mediaSchema), adminCtrl.createMedia);
router.delete('/media/:id', requireAuth, requireRoles(...adminRoles), adminCtrl.deleteMedia);

router.get('/users', requireAuth, requireRoles('super_admin'), adminCtrl.listUsers);
router.post('/users', requireAuth, requireRoles('super_admin'), validateBody(userCreateSchema), adminCtrl.createUser);
router.patch('/users/:id', requireAuth, requireRoles('super_admin'), validateBody(userUpdateSchema), adminCtrl.updateUser);
router.delete('/users/:id', requireAuth, requireRoles('super_admin'), adminCtrl.deleteUser);

export default router;
