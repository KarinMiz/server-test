import { Request, Response } from 'express';
import { data } from '../data';
import fs from 'fs';

export const getAllDomains = (req: Request, res: Response) => {
    const allDomains: string[] = [];

    data.forEach((publisher: any) => {
        publisher.domains.forEach((domain: any) => {
            allDomains.push(domain.domain);
        });
    });
    res.send(allDomains)
};

export const createDomain = (req: Request, res: Response) => {
    try {
        const { publisher, domain, desktopAds, mobileAds } = req.body;
        const newDomain = { domain, desktopAds, mobileAds };
        const publisherIndex = data.findIndex((p: any) => p.publisher === publisher);
        if (publisherIndex !== -1) {
            // Check if the domain already exists for the specified publisher
            const existingDomainIndex = data[publisherIndex].domains.findIndex((d: any) => d.domain === domain);
            if (existingDomainIndex === -1) {
                data[publisherIndex].domains.push(newDomain); // Add the new domain to the specified publisher's domains array
                // Write the updated data back to the file
                fs.writeFile('data.ts', `export const data = ${JSON.stringify(data, null, 4)}`, (err) => {
                    if (err) {
                        console.error('Error writing data to file:', err);
                        res.status(500).json({ message: 'Internal server error' });
                    } else {
                        console.log('Data updated successfully');
                        res.status(201).json(newDomain); // Respond with the newly created domain
                    }
                });
            } else {
                res.status(400).json({ message: 'Domain already exists for this publisher' });
            }
        } else {
            res.status(404).json({ message: 'Publisher not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};


export const updateDomain = (req: Request, res: Response) => {
    try {
        console.log(req.body);
        const { domain, desktopAds, mobileAds } = req.body;
        const newDomain = { domain, desktopAds, mobileAds };
        const publisher = req.params.name
        const publisherIndex = data.findIndex((p: any) => p.publisher === publisher);
        const newDomainsList = data[publisherIndex].domains.filter(d => d.domain != domain)
        newDomainsList.push(newDomain);
        data[publisherIndex].domains = newDomainsList;
        fs.writeFile('data.ts', `export const data = ${JSON.stringify(data, null, 4)}`, (err) => {
            if (err) {
                console.error('Error writing data to file:', err);
                res.status(500).json({ message: 'Internal server error' });
            } else {
                console.log('Data updated successfully');
                res.status(201).json(newDomain); // Respond with the newly created domain
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const deleteDomain = (req: Request, res: Response) => {
    try {
        console.log(req.body);
        const { publisher, domain } = req.body;
        const publisherIndex = data.findIndex((p: any) => p.publisher === publisher);
        const newDomainsList = data[publisherIndex].domains.filter(d => d.domain != domain)
        data[publisherIndex].domains = newDomainsList;
        fs.writeFile('data.ts', `export const data = ${JSON.stringify(data, null, 4)}`, (err) => {
            if (err) {
                console.error('Error writing data to file:', err);
                res.status(500).json({ message: 'Internal server error' });
            } else {
                console.log('Data updated successfully');
                res.status(201).json({ message: 'Data updated successfully' }); // Respond with the newly created domain
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getDomainByName = (req: Request, res: Response) => {
    const allDomains: string[] = [];

    data.forEach((publisher: any) => {
        publisher.domains.forEach((domain: any) => {
            if (domain.domain === req.params.name)
                res.send(domain)
        });
    });
    res.status(404).send('Domain not found');
};