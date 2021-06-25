const fs=require('fs');
const path=require('path');
const zlib=require('zlib');

//const gzip=zlib.createGzip();

const unzip=zlib.createUnzip();


const readable=fs.createReadStream(path.join(__dirname,'destination.txt.gz'));
const unzipedfile=fs.createWriteStream(path.join(__dirname,'unziped.txt'));

readable.pipe(unzip).pipe(unzipedfile);


