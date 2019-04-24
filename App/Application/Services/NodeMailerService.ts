import { injectable } from "inversify";
import { INodeMailerService } from "../../Infrastructure/Types/INodeMailerService";
import * as nodemailer from "nodemailer";
import { SendingEmail, SendingEmailPassword } from "../../Model/NodeMailerSenderAccount";
import { DestinationEmail } from "../../Model/DestinationEmail";
import { SubjectIdentifier } from "../../Model/SubjectIdentifier";

@injectable()
export class NodeMailerService implements INodeMailerService {

    public async Send(content: any) : Promise<void> {
        await this.SendAsync(content);
    }

    private SendAsync(content: any) : Promise<boolean> {
        return new Promise<boolean>((resolve, reject)=> {
            try {
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
                    subject: content.inbox + " Mailinator Inbox",
                    html: content.html
                };
        
                transporter.sendMail(mailOptions, (err: any, info: any) => {
                    if (err) {
                        reject(false);
                        return console.log(err);
                    }

                    console.log('Message sent: %s', info.messageId);
                    resolve(true);
                });
            } catch(err) {
                console.log("Error in SendAsync()");
                console.log(err);
            }
        });
    }
}