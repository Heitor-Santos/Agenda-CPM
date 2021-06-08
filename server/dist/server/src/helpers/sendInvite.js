"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const handlebars_1 = __importDefault(require("handlebars"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
async function default_1(to_email, link) {
    const account = await nodemailer_1.default.createTestAccount();
    const transporter = await nodemailer_1.default.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
            user: account.user,
            pass: account.pass,
        }
    });
    const info = await transporter.sendMail({
        from: {
            name: process.env.EMAIL_NOME || 'Diretoria CPM',
            address: process.env.EMAIL_ACCOUNT || account.user,
        },
        to: {
            name: "",
            address: to_email,
        },
        subject: "Convite para Agenda do CPM",
        html: await compileVariables(link)
    });
    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer_1.default.getTestMessageUrl(info));
}
exports.default = default_1;
async function compileVariables(link) {
    const templateFileContent = await fs_1.default.readFileSync(path_1.default.join(__dirname, "invite.hbs"), { encoding: 'utf-8', });
    const parseTemplate = handlebars_1.default.compile(templateFileContent);
    const variables = {
        link
    };
    const parsed = parseTemplate(variables);
    console.log(parsed);
    console.log(link);
    return parsed;
}
//# sourceMappingURL=sendInvite.js.map