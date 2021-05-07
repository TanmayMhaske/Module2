var fs = require('fs');
var flist = 'FilesList.txt';
var firstTimeFileRun = true;
var fnames = [];

function readContent(callback) {
    fs.readFile(flist, 'utf-8', function (err, content) {
        if (err) return callback(err);
        callback(null, content);
    });
}

if (fs.existsSync(flist)) firstTimeFileRun = false;
console.log("First Time file run : ", firstTimeFileRun);

if( !firstTimeFileRun ){
    readContent(function (err, content) {
        if(err) throw err;
        //console.log("content: ",content)
        fnames = content.split(",");
        console.log("File: ",fnames);
        console.log('Enter Filename : ');
    });
}

var user_input = process.stdin;
var found = false;
user_input.setEncoding('utf-8');

user_input.on('data', function(data) { 
    data = data.replace(/(\r\n|\n|\r)/gm,"");
    found = fnames.includes(data);
    if(found){
        console.log(data, "File already exists, please try again!");
    }else{
        fnames.push(data);
        fs.writeFile(data,'You are awesome', function(err){
            if(err) throw err;
        });
        fs.writeFile(flist, fnames.toString(), function(err){
            if(err) throw err;
        });
    }
    console.log("Current FileNames in the list: ", fnames);
    console.log('Enter Filename : ');
});
