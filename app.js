var pdf_table_extractor = require("pdf-table-extractor");
var fs = require("fs");
var care = false;
var brick = false;


    brick = true;
    pdf_table_extractor("assets/sample2.pdf",success,error);
 

 



//PDF parsed
function success(result)
{
    if(care){
        removeText = "details of instruments";
        convertCSV(result,removeText,"care_rating"+generateRandomStr(8)+".csv");
    }else if(brick){
        removeText = "please refer to bwr website";
        convertCSV(result,removeText,"brick_rating"+generateRandomStr(6)+".csv");
    }
   
}
 
//Error
function error(err)
{
   console.error('Error: ' + err);
}



var writer = function(data , filename){
    fs.writeFile(filename, data, function(err, data) {
        if (err) console.log(err);
        console.log("successfully written to file.");
      });
}

var convertCSV = function(result,removeText,fileName){
   
   var extra = [];
   var remFlg = true;
   var page1Table = result.pageTables[0].tables;

   while(remFlg){
    extra = page1Table.pop();
     if(extra[0].toLowerCase().includes(removeText) != -1){
        remFlg = false;
    } 
   }
   var csvStr = "";
   for(var count = 0 ; count < page1Table.length - 1;count++){
        csvStr += page1Table[count].toString().replace(/(\r\n|\n|\r)/gm, "");
        csvStr += "\n";
   }
   writer(csvStr,fileName)
   console.log(csvStr);
}


var generateRandomStr = function(length) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < length; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
  }

