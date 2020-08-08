import {Command, flags} from '@oclif/command'
import axios from 'axios'
//import {document, Element} from 'document'
import {fs} from 'fs'

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
//process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"
const qs = require('querystring')
var fs = require('fs')
var util = require('util');
var async = require('async')

var url = 'http://localhost:3000/insert'
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
var bodys = []
const stat = util.promisify(fs.stat)
const readDIR = util.promisify(fs.readdir)
var tasks = [] 
var counter=0;

export class Fill extends Command {
  static description = 'description of this example command';
  static flags = {
    baseDIR : flags.string({required : true}),
    limit : flags.string()
  }
  async run() {
    console.log('running filldb command...')
    const {flags} = this.parse(Fill)
    var base_dir = flags.baseDIR
    var limit = flags.limit
    if(limit === undefined){
      limit = 10000000
    }
    else{
      limit = parseInt(limit)
    }
    //console.log(limit)
    var paths = []

    var tst =await stat(base_dir)

    if(tst.isFile()){
      console.log(1)
      paths.push(base_dir)
    }
    else{
      var main_parse = await readDIR(base_dir)
      for(i=0;i<main_parse.length;i++){
        var ff = await stat(base_dir + main_parse[i])
        if(ff.isDirectory()){
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
        else if(ff.isFile()){
          paths.push(base_dir+main_parse[i])
        }
        else{
          console.log('error occured...')
        }
      }
    }

    /*
     * START proccessign files
     */

    const paths2 = await paths;
    console.log('loeaded all paths...')
    for(k=0;k<paths2.length;k++){
        console.log(`loading file ${k} of ${paths2.length}`)
        counter ++ 
        if(counter > limit) {
                break;
        }
        txt = fs.readFileSync(paths2[k]).toString()
        txt = txt.split('\r\n')
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
        var filename = paths2[k].split('/')
        filename = filename[filename.length-1]
        //console.log(filename)
        crit = txt.slice(start,end)
        //console.log(crit)
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
                  studyID : study_id,
                  report : filename
                }
               // console.log(requestBody)
                //bodys.push(requestBody)
               const obj = await axios.post('http://localhost:3000/insert', qs.stringify(requestBody))
                if(obj.data!=200){
                  console.log('some error occured, aborting...')
                  process.exit(1)
                } 
            }
            if(inclusion === 0){
              var requestBody = {
                type : 'exclusion',
                criteriaTXT : crit[j].replace(/-/,' ').trim(),
                studyID : study_id,
                report : filename
              }
              //console.log(requestBody)
              //bodys.push(requestBody)
              const obj = await axios.post('http://localhost:3000/insert', qs.stringify(requestBody))
              if(obj.data != 200){
                  console.log('some error occured, aborting...')
                  process.exit(1)
              }
            }
          }
        }
    }
   }; 
}