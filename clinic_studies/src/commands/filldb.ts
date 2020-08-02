import {Command, flags} from '@oclif/command'
import axios from 'axios'
import {XMLHttpRequest} from 'xmlhttprequest'
import {document, Element} from 'document'
import {fs} from 'fs'

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"
const qs = require('querystring')
var fs = require('fs')

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
var counter = 0;
var limit = 100;
var txt ;
var  i = 0;
var crit;
var j;
var study_id;
var requestBody
var inclusion
var start, end

export class Fill extends Command {
  static description = 'description of this example command'
  

  async run() {
    console.log('running filldb command...')
    //var fileToRead = '/home/user/Desktop/appathonNTUA/AllPublicXML/NCT0000xxxx/NCT00000102.xml'
    //pushStudyToDb(fileToRead)
    var base_dir = '/home/user/Desktop/appathonNTUA/AllPublicXML/'
    fs.readdir(base_dir, (err, files) => {
        files.forEach((file,index) => {
          fs.stat(base_dir + file, (error,stat) => {
            if(error) throw error;
            if(stat.isFile()){
              console.log('file %s' , file)
            }
            else if(stat.isDirectory()){
              //console.log('directory %s' , file)
              fs.readdir(base_dir + file + '/' , (err2,files2) => {
                files2.forEach((file2,index) => {
                  fs.stat(base_dir + file + '/' + file2, (error2,stat2) => {
                    if(error2) throw error2;
                    if(stat2.isFile()){
                      if(counter === limit ){
                        console.log('loaded records done :)');
                        process.exit(0)
                      }
                      else{ 
                        counter += 1;
                        console.log(`counter ${counter}`)
                        console.log(base_dir + file + '/' + file2)
                        txt = fs.readFileSync(base_dir + file + '/' + file2).toString()
                        // /txt = fs.readFileSync(fileToRead).toString()
                        txt = txt.split('\r\n')
                        //console.log(txt)
                        for (i=0;i<txt.length;i++){
                          if(txt[i].trim().localeCompare('<id_info>') === 0 ) {
                            study_id = txt[i+1].split('<')[1].split('>')[1]
                          }
                          if(txt[i].trim().localeCompare('<criteria>') === 0){
                                start = i
                          }
                          if(txt[i].trim().localeCompare('</criteria>') === 0){
                            end = i
                          }
                        }
                        crit = txt.slice(start,end)
                        inclusion = 1
                        for (j=0;j<crit.length;j++){
                          crit[j] = crit[j].trim()
                          if(crit[j].localeCompare('Exclusion Criteria:') === 0 ){
                            inclusion = 0;
                          }
                          if(crit[j][0] === '-'){
                            if(inclusion === 1){
                                requestBody = {
                                  type : 'inclusion',
                                  criteriaTXT : crit[j].replace(/-/,' ').trim(),
                                  studyID : study_id
                                }
                                var obj = axios.post('http://localhost:3000/insert/', qs.stringify(requestBody))
                                console.log(requestBody)
                            }
                            if(inclusion === 0){
                              requestBody = {
                                type : 'exclusion',
                                criteriaTXT : crit[j].replace(/-/,' ').trim(),
                                studyID : study_id
                              }
                              var obj = axios.post('http://localhost:3000/insert/', qs.stringify(requestBody))
                              console.log(requestBody)
                            }
                          }
                        }
                      }
                    }
                  })
                })
              })
            }
          })

        })
    })
    console.log('\n')
   } 
}