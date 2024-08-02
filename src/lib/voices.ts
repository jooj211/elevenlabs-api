    import type { NextApiRequest, NextApiResponse } from "next";
    import { fetchVoices } from "./elevenLabsService";

    export default async function handler(req: NextApiRequest, res: NextApiResponse) {
        if (req.method !== 'GET') {
            res.setHeader('Allow', ['GET']);
            res.status(405).end(`Método ${req.method} não permitido`);
            return;
        }

        try {
            const voices = await fetchVoices();
            res.status(200).json(voices);
        } catch (error) {
            console.error("Erro na rota da API: ", error);
            res.status(500).json({ error: 'Erro ao buscar vozes' });
            }
    }

