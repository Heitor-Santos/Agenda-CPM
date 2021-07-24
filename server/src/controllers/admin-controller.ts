import { Request, Response } from 'express';
import mongoose from 'mongodb'
import { sign } from 'jsonwebtoken';
import auth from '../helpers/auth';
import { sendInvite } from '../helpers/sendEmail';

export async function invite(req: Request, res: Response, db: mongoose.Db) {
    const prof = await db.collection('professores').findOne({ email: req.user.email });
    if (prof.type != "administrador") {
        return res.send({ error: "Você não possui permissão para essa operação" });
    }
    const email = req.body.email as string;
    const token = sign({}, auth.jwt.secret, {
        subject: email,
        expiresIn: auth.jwt.expiresIn,
    });
    const link = `${process.env.FRONT_URL}/signup?token=${token}`
    try {
        await sendInvite(email, link);
        await insertInvite(email, token, db);
        return res.send({ data: "Convite enviado" })
    }
    catch (error) {
        console.log(error)
        return res.send({ error: "Não pudemos enviar o convite" })
    }
}

async function insertInvite(email: string, token: string, db: mongoose.Db) {
    await db.collection('invites').insertOne({ email, token });
}


