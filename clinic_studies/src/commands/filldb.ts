import {Command, flags} from '@oclif/command'
import axios from 'axios'
import {XMLHttpRequest} from 'xmlhttprequest'
import {document, Element} from 'document'
import {fs} from 'fs'

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"
const qs = require('querystring')
var fs = require('fs')
var util = require('util');
var async = require('async')
var counter = 0;
var limit = 100;
var txt ;
var  i = 0;
var k;
var crit;
var j;
var study_id;
var inclusion;
var start, end;
//var base_dir = '/home/user/Desktop/appathonNTUA/AllPublicXML/'
var bodys = []
const stat = util.promisify(fs.stat)
const readDIR = util.promisify(fs.readdir)

export class Fill extends Command {
  static description = 'description of this example command';
  static flags = {
    baseDIR : flags.string({required : true})
  }
  async run() {
    console.log('running filldb command...')
    const {flags} = this.parse(Fill)
    var base_dir = flags.baseDIR
    console.log(flags)
    //var fileToRead = '/home/user/Desktop/appathonNTUA/AllPublicXML/NCT0000xxxx/NCT00000102.xml'
    //pushStudyToDb(fileToRead)
    /*
    *get files form file system
    */
    //axios.post('http://localhost:3000/insert', qs.stringify(requestBody)).catch((error) => {console.log(error)})
    //var ff = await getFileSystem()
    var paths = []
    var main_parse = await readDIR(base_dir)
    for(i=0;i<main_parse.length;i++){
      //console.log(main_parse[i])
      var ff = await stat(base_dir + main_parse[i])
      if(ff.isDirectory){
        var second_parse = await readDIR(base_dir + main_parse[i])
        for (j=0;j<second_parse.length;j++){
          var path = base_dir + main_parse[i] + '/' + second_parse[j]
          /*
          *main
          */
            paths.push(path)
          /*
          *main
          */
        }
      }
    }
    const paths2 = await paths;
    for(k=0;k<1000;k++){
        console.log(`file ${k} preparing...`)
        txt = fs.readFileSync(paths2[k]).toString()
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
                                var requestBody = {
                                  type : 'inclusion',
                                  criteriaTXT : crit[j].replace(/-/,' ').trim(),
                                  studyID : study_id
                                }
                                bodys.push(requestBody)
                                //var obj =  axios.post('http://localhost:3000/insert/', qs.stringify(requestBody))
                                //console.log(requestBody)
                            }
                            if(inclusion === 0){
                              var requestBody = {
                                type : 'exclusion',
                                criteriaTXT : crit[j].replace(/-/,' ').trim(),
                                studyID : study_id
                              }
                              bodys.push(requestBody)
                              //var obj = axios.post('http://localhost:3000/insert/', qs.stringify(requestBody))
                              //console.log(requestBody)
                            }
                          }
                        }
    }

    await print_files(bodys)
   }; 
}

async function print_files(files){
    console.log('entering async loop...')
    for(let i=0;i<files.length;i++){
      var obj = axios.post('http://localhost:3000/insert', qs.stringify(files[i])).catch(error => {})
      console.log(`body ${i} out of ${files.length}`)
    }
}