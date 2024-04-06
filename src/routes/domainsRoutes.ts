import express from 'express';
import { getAllDomains, createDomain, updateDomain, deleteDomain, getDomainByName } from '../controllers/domainsController';

const router = express.Router();

router.get('/', getAllDomains);
router.post('/', createDomain);
router.put('/:name', updateDomain);
router.delete('/', deleteDomain);
router.get('/:name', getDomainByName);

export default router;