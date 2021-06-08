"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendInvite = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const handlebars_1 = __importDefault(require("handlebars"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
async function sendInvite(to_email, link) {
    const file = path_1.default.join(__dirname, "invite.hbs");
    await sendEmail(to_email, { link }, "Convite para Agenda do CPM", file);
}
exports.sendInvite = sendInvite;
async function sendEmail(to_email, variables, subject, file) {
    const transporter = await nodemailer_1.default.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_ACCOUNT,
            pass: process.env.EMAIL_PASSWORD
        }
    });
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
    });
}
async function compileVariables(variables, file) {
    const templateFileContent = await fs_1.default.readFileSync(file, { encoding: 'utf-8', });
    const parseTemplate = handlebars_1.default.compile(templateFileContent);
    const parsed = parseTemplate(variables);
    return parsed;
}
//# sourceMappingURL=sendEmail.js.map