import { getPublishers, createPublisher, getDomains } from './../controllers/publishersController';
import express from 'express';

const router = express.Router();

router.get('/', getPublishers);
router.get('/getDomains/:name', getDomains)
router.post('/', createPublisher);

export default router;