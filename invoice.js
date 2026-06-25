const easyinvoice = require('easyinvoice');
const fs = require('fs');

let data = {};

easyinvoice.createInvoice(data, function (result) {
    /*  
        5.  The 'result' variable will contain our invoice as a base64 encoded PDF
            Now let's save our invoice to our local filesystem so we can have a look!
            We will be using the 'fs' library we imported above for this.
    */
    fs.writeFileSync("invoice.pdf", result.pdf, 'base64');
});