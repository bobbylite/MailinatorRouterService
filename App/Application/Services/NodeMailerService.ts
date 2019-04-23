import { injectable } from "inversify";
import { INodeMailerService } from "../../Infrastructure/Types/INodeMailerService";
import * as nodemailer from "nodemailer";
import { SendingEmail, SendingEmailPassword } from "../../Model/NodeMailerSenderAccount";
import { DestinationEmail } from "../../Model/DestinationEmail";
import { SubjectIdentifier } from "../../Model/SubjectIdentifier";

@injectable()
export class NodeMailerService implements INodeMailerService {

    public Send(content: any): void {
        console.log(content);
        let transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: SendingEmail,
                pass: SendingEmailPassword
            }
        });

        let mailOptions = {
            from: content.from,
            to: DestinationEmail,
            subject: content.subject,
            html: content.html
        };

        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                return console.log(err);
            }
            console.log('Message sent: %s', info.messageId);
        });
    }
}