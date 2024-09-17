import React from 'react'
import handlePrint from './Print';
import { indicators } from '../../utils/indicators';

const AdminPrintReport = (report, data,startDate, endDate,regionData,regionId,username) => {
    
    const formattedStartDateObject = new Date(startDate);
    const formattedEndDateObject = new Date(endDate);
    
    const getCurrentDate = () => {
      const now = new Date();
      const day = String(now.getDate()).padStart(2, '0');
      const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-based
      const year = now.getFullYear();
      
      return `${day}/${month}/${year}`;
    };

  
    const formattedStartDate = formattedStartDateObject.toISOString();
    const formattedEndDate = formattedEndDateObject.toISOString();
    console.log("|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||")
    console.log("report",report)
    // const values = data.map((d,i)=>`<td>${item[`value${i+1}`]}</td>`).join("")
    const reportList = report
    .map(
      (item, index) =>
        `
         
          <tr class="data">
             
              <td>${indicators[item?.name]}</td>
              ${ data.map((d,i)=>`<td>${item[`value${i+1}`]}</td>`).join("")}
              <td>${item.total}</td>


               
          </tr>
      
    
          `
    )
    .join("");

 const header = ()=>{
  const reg = regionData.find((region) => region._id == regionId);
  let col = ""
  
  let num = 1
  if (data.length != 0) {
    data.forEach((rep, index) => {
      col = col+ `<th>${rep.siteName}</th>`
      num  +=1
      
    });
    col = col+ `<th>Total</th>`

    
  }
  console.log("*****",report,data)
  
  const head = `<tr>
  <th rowspan="2"> Indicators</th>
    <th colspan="${num}">${reg?.name} </th>
  </tr>
  <tr>
  ${col}</tr>
  `
return head

 }
    
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
        <tr  class="borderstyle" style=""> <span class="firstrow">   <img width="150" style="padding-right: 10px;padding-bottom:20px;" height="auto" src="/main-logo.png" class="logo" alt="GMCLOGO"/>
       
    </table>
           
            <table class="borderstyle">
    <tr  class="borderstyle"><h1 class="print-header"> Report</h1></tr>
  <tr class="borderstyle">
  <td class="borderstyle" id="dateArrange"><p>From: ${
    formattedStartDate.substring(0,10)
  }</p><p id="endDate">To: ${formattedEndDate.substring(0,10)}</p></td>

  </tr>

</table>

  
    <table>
        
   ${header()}
   ${reportList}
 
 </tr>

   </table>



   <table class="borderstyle">
       
   <tr class="borderstyle">
       <td class="borderstyle">Printed By: ${username}</td>
       <td class="borderstyle">Printed Date:${getCurrentDate()}</td>
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

export default AdminPrintReport
