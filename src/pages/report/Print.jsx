const handlePrint = (content) => {
  // console.log(content)
  const printableContent = content;

  // Open a new popup window for printing
  const printWindow = window.open("", "_blank", "width=600,height=600");
  printWindow.document.write(`
   
      ${printableContent}
    
  `);
  printWindow.document.close();
  setTimeout(() => {
    printWindow.print({ headers: true, footers: false });
  }, 500); // Adjust the delay as needed;
};

export default handlePrint;
