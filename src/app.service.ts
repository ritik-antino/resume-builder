/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import * as ejs from 'ejs';
import * as fs from 'fs';
import * as htmlTopdf from 'html-pdf';
import { resumeDTO } from './resume.dto';

@Injectable()
export class AppService {
  async pdf(payload:resumeDTO, res) {
    try { 
      // Define the data to pass to the template
      const { name,designation, techSKils, description,projects,experience } = payload
      const data = { name, description, projects, designation,techSKils,experience }

      // Compile the template and generate the HTML
      const template = fs.readFileSync('src/pdfTemplate.ejs', 'utf8');
      const html = ejs.render(template, data);



      // Generate the PDF and return it as a buffer
      await htmlTopdf.create(html, {
        format: 'A4', childProcessOptions: {
          env: {
            OPENSSL_CONF: '/dev/null',
          },
        }
      }).toStream(function (err, stream) {
        if (err) {
          console.log(err)
        } else {
          res.set('Content-type', 'application/pdf');
          stream.pipe(res)
        }
      });

      /* TO SAVE IN FILE  */
      // .toFile('resume.pdf', function (error, result) {
      //   if (error) console.log(error)
      // })

    } catch (e) {
      return { status: 500, message: "failed to generate pdf", devMessage: e.message }
    }

  }
}
