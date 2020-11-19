var options = {
  "key": "rzp_test_xLfLvCOupjVqWs",
  "amount": 2000, // Example: 2000 paise = INR 20
  "name": "MERCHANT name",
  "description": "description",
  "image": "img/logo.png",// COMPANY LOGO
  "handler": function (response) {
      console.log(response);
      // AFTER TRANSACTION IS COMPLETE YOU WILL GET THE RESPONSE HERE.
  },
  "prefill": {
      "name": "ABC", // pass customer name
      "email": 'A@A.COM',// customer email
      "contact": '+919123456780' //customer phone no.
  },
  "notes": {
      "address": "address" //customer address 
  },
  "theme": {
      "color": "#15b8f3" // screen color
  }
};
var head = document.getElementsByTagName('head')[0];
var script = document.createElement('script');
script.type = 'text/javascript';
script.onload = function() {
    callFunctionFromScript();
}
script.src = 'https://checkout.razorpay.com/v1/checkout.js';
head.appendChild(script);
const propay = new Razorpay(options);

export default propay;