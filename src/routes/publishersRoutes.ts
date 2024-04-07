import { getPublishers, createPublisher, getDomains, deletePublisher } from './../controllers/publishersController';
import express from 'express';

const router = express.Router();

router.get('/', getPublishers);
router.get('/getDomains/:name', getDomains)
router.post('/', createPublisher);
router.delete('/', deletePublisher);
export default router;