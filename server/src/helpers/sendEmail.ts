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
    const account = await nodemailer.createTestAccount();
    const transporter = await nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
            user: account.user,
            pass: account.pass,
        }
    })
    const info = await transporter.sendMail({
        from: {
            name: process.env.EMAIL_NOME || 'Diretoria CPM',
            address: process.env.EMAIL_ACCOUNT || account.user,
        },
        to: {
            name: "",
            address: to_email,
        },
        subject,
        html: await compileVariables(variables, file)
    })
    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
}

async function compileVariables(variables: IVariables, file: string): Promise<string> {
    const templateFileContent = await fs.readFileSync(file, { encoding: 'utf-8', });
    const parseTemplate = handlebars.compile(templateFileContent);
    const parsed = parseTemplate(variables)
    return parsed
}