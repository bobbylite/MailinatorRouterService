# Mailinator Routing Micro Service 
This is a simple solution for Mailinators temporary inbox.  This micro service reads a public temporary inbox hosted by Mailinator, and will retrieve a plain text or HTML email and forward it to a private email address.  Both the public temporary Mailinator inbox, and the permanent destination email inbox are configurable. 

This was created to poll inboxes until it finds a specified piece of information in any given email in any given inbox. The information it is matching against can be specified (Subject, email content, sender address).

## A little bit about the project
This is an IOC DI architecture. 
Much thanks to Inversify for Inversion of control Dependency injection in this Typescript mailing router micro service. 

Learned a lot from this article by Samuele Resca to get a basic IOC app up and running: https://medium.com/@samueleresca/inversion-of-control-and-dependency-injection-in-typescript-3040d568aabe Thank you! 

Typescript article by André Gardi: https://medium.com/javascript-in-plain-english/typescript-with-node-and-express-js-why-when-and-how-eb6bc73edd5d
Thank you André! 

## Install

Install the node packages via:

`$ npm install --save`

## Starting

To start the app in production mode, first compile the TypeScript code:

`$ npm run tsc`

And then run production code: 

`$ npm run prod`

To start the app in development mode:

`$ npm run dev`

## Moving On From Here...

While testing use the following command to compile and then serve the application. 

`$ npm run dev`

To test the default get handler use the following curl command (Assuming curl is already installed).

`curl http://127.0.0.1:8080`

## Data binding

Inside the app directory, there will be a "Models" directy.  This is where all our data models will be stored and accessed. You must modify the following: NodeMailerSenderAccount, DestinationEmail, and FilePath.

#### NodeMailerSenderAccount
The email account for Nodemailer (SendingEmail) MUST have "Allow less secure apps" turned on and enabled in google's account settings for this to work. 

App\Model\NodeMailerSenderAccount.ts
``` javascript 
export const SendingEmail = 'example@gmail.com'; 
export const SendingEmailPassword = "examplePassword"; 
```

#### DestinationEmail
The email account where NodeMailer will send the matching data to.  This is the inbox where the all mailinator data will be persisted. 

App\Model\DestinationEmail.ts
``` javascript 
export const DestinationEmail = "destinationAddress@example.com"; 
```

#### Excel Sheet FilePath
The file path to the excel sheet where the workbook is parsed. 

App\Model\FilePath.ts
``` javascript 
export const FilePath: string = "/Users/user/Downloads/Example.xlsx";
```
#### Excel Sheet Logic
This can be changed depending on what column/rows the excelsheet has within it.  Below I will show a simple version of what it's doing. 

App\Application\Services\ExcelReaderService.ts
``` javascript
import * as XLSX from "xlsx";

export class ExcelReaderService {

    private PollingInterval: number = 1000;
    
    public async Read(file: string): Promise<void> {
        try {
            var WorkBook: any = XLSX.readFile(file);
            var FirstWorkSheet: object = WorkBook.Sheets[WorkBook.SheetNames[0]];
            var WorkSheetJson: object = XLSX.utils.sheet_to_json(FirstWorkSheet);
            
            this.ParseWorkSheet(WorkSheetJson);
        } catch (err) {

        }
    }

    private ParseWorkSheet(jsonData: any) : void {
        jsonData.forEach((row: any, index: number) => {
            try {
                setTimeout(async() => {
                    if (typeof row['EMAIL LABEL'] == 'undefined') return;
                    console.log(row['EMAIL LABEL']);
                }, this.PollingInterval * index);
            } catch (err) {

            }
        });
    }

}
```


