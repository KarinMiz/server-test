import { Request, Response } from 'express';
import { data } from '../data';
import fs from 'fs';

export const getPublishers = (req: Request, res: Response) => {
    res.json(data);
};

export const getDomains = (req: Request, res: Response) => {
    const name = req.params.name.toLowerCase();
    const publisher = data.find((p: any) => p.publisher.toLowerCase() === name);
    if (publisher) {
        const domainsList = publisher.domains.map((domain: any) => ({
            domain: domain.domain,
            desktopAds: domain.desktopAds,
            mobileAds: domain.mobileAds
        }));
        res.send(domainsList);
    } else {
        res.status(404).send('Publisher not found');
    }
};


export const createPublisher = (req: Request, res: Response) => {
    try {
        const newPublisher = req.body.name;
        const ifExist = data.findIndex((p: any) => p.publisher === newPublisher);
        console.log(newPublisher);
        console.log(ifExist);

        if (ifExist === -1) {
            data.push({ publisher: newPublisher, domains: [] });
            // Write the updated data back to the file
            fs.writeFile('data.ts', `export const data = ${JSON.stringify(data, null, 4)}`, (err) => {
                if (err) {
                    console.error('Error writing data to file:', err);
                    res.status(500).json({ message: 'Internal server error' });
                } else {
                    console.log('Data updated successfully');
                    res.status(201).json(newPublisher); // Respond with the newly created domain
                }
            });
        } else {
            res.status(400).json({ message: 'Publisher already exists' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};
