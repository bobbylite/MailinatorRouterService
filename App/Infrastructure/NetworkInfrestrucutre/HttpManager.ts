import { IHttpManager } from "../Types/IHttpManager";
import * as https from "https";
import { ClientRequest } from "http";

export class HttpManager implements IHttpManager {

    private Options = {
        hostname: '',
        port: 0,
        path: '/',
        method: ''
    };

    public SetOptions(hostnameUrl: string, port: number, path: string, method: string) : void {
        this.Options = {
            hostname: hostnameUrl,
            port: port,
            path: path,
            method: method
          };
    }
    
    public Post(): void {
        throw new Error("Method not implemented.");
    }    
    
    public async Get(): Promise<Buffer> {
        try {
            if (this.Options.hostname === '') {
                console.log("No options set...");
                return Buffer.alloc(0);
            }

            return this.getHttpsBuffer();
        } catch (err) {
            console.log(err);
            return Buffer.alloc(0);
        }
    }

    private getHttpsBuffer() : Promise<Buffer> {
        return new Promise<Buffer>((resolve, reject) => {

            let request: ClientRequest = https.request(this.Options, (res) => {
                let stringData: string = '';

                res.on('error', (err) => {
                    console.log(err);
                })

                res.on('data', (chunk) => {
                    stringData+=chunk;
                })
    
                res.on('end', () => {
                    let buffer: Buffer = Buffer.from(stringData);
                    resolve(buffer);
                })
            })

            request.on('error', (err) => {
                console.log(err);
            });   
    
            request.end();
        });
    }
}