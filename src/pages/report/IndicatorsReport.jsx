import React from 'react'
import handlePrint from './Print';
import { indicators } from '../../utils/indicators';

const IndicatorsReports = (data) => {
    
const report = Object.keys(data).map(key=>({name:key,value:data[key]}))

    const reportList = report
    .map(
      (item, index) =>
        `
         
          <tr class="data">
             
              <td>${indicators[item?.name]}</td>
            
              <td>${item.value || 0}</td>


               
          </tr>
      
    
          `
    )
    .join("");

 
    const printContent = `
    <html>
    <head>
      <title>Purchase Report</title>
      <style>
        .custom-border {
            border:1px solid black ;   
        }
        .custom-padding {
          padding: 0px 20px 0px 20px;
        }
        .custom-text {
          font-size: 16px;
          font-weight: bold;
        }
        .print-header{
          font-weight:normal;
        } 
        body{
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            align-content: start;           
        }
        .voucher{
            font-family:Arial, Helvetica, sans-serif;
            text-align: center;
            margin-bottom: 20px;
            font-weight:bolder;
        }
        hr{
            margin:0px 40px 20px 40px;
            
        }
        .container{
            width: 100%;
        }
        .signature{
            border: 1px solid black;
 
            height:max-content;
            
        }
        .preparedby{
            border-left: 1px solid black;
            border-right: 1px solid black;
            border-top: 1px solid rgb(255, 255, 255);
            border-bottom: 1px solid rgb(255, 255, 255);  
        }
        table, th, td{
            border: 1px solid black;
            border-collapse: collapse;
            
        }
        table{
            width: 100%;
            margin-bottom: 20px;
        }
        td{
            text-align: right;
            
        }
        .data td{
            text-align: left;
            padding-left: 10px;
            padding-right: 10px;
        }
        .empty td{
            padding: 10px;
        }
        #text{
            height:max-content;
        }
        .borderstyle{
            border: 0px solid black;
            text-align: left;
        }

#calcu{
    font-weight: bold;
}
#endDate{
    padding-left:10px;
}
#dateArrange{
    display:flex;

}
      </style>
    </head>
    <body>
        <div class="container">
           
            <table class="borderstyle">
    <tr  class="borderstyle"><h1 class="print-header"> Report</h1></tr>

</table>

  
    <table>
        
   <tr>
   <th> Indicators </th>
   <th> values </th>
   </tr>
   ${reportList}
 
 </tr>

   </table>
  </div>
 
</div>

    </body>
  </html>
   `;
// console.log(printContent,"print content")
return handlePrint(printContent);
}

export default IndicatorsReports
