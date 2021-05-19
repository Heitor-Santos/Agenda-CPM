import nodemailer from 'nodemailer';
import handlebars from 'handlebars';

import fs from 'fs';
import path from 'path';

interface IVariables {
    [key: string]: string | number;
}

export async function sendInvite(to_email: string, link: string) {
    const file = path.join(__dirname, "invite.hbs");
    await sendEmail(to_email, {link}, "Convite para Agenda do CPM", file)
}

async function sendEmail(to_email: string, variables:IVariables, subject: string, file: string) {
    const transporter = await nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_ACCOUNT,
            pass: process.env.EMAIL_PASSWORD
        }
    })
    const info = await transporter.sendMail({
        from: {
            name: process.env.EMAIL_NOME || 'Diretoria CPM',
            address: process.env.EMAIL_ACCOUNT || '',
        },
        to: {
            name: "",
            address: to_email,
        },
        subject,
        html: await compileVariables(variables, file)
    })
}

async function compileVariables(variables: IVariables, file: string): Promise<string> {
    const templateFileContent = await fs.readFileSync(file, { encoding: 'utf-8', });
    const parseTemplate = handlebars.compile(templateFileContent);
    const parsed = parseTemplate(variables)
    return parsed
}