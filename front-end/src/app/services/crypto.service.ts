import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root',
})
export class CryptoService {

  constructor() {
    
  }

  


  cryptoEncrypt(encrypt:any){
    var cryptedData = CryptoJS.AES.encrypt(JSON.stringify(encrypt), 'secret key 117');
    var cryptedText = cryptedData.toString();
    return cryptedText;
  }

  cryptoDecrypt(decrypt:any){
    
    var cryptedData=decrypt;
    var bytes = CryptoJS.AES.decrypt(cryptedData.toString(), 'secret key 117');
    console.log('json',bytes.toString(CryptoJS.enc.Utf8))
    var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return decryptedData;
  }

 

  
}
