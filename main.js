var STX = 2;
var ETX = 3;
var ACK = 6;
var msg = " ";
var stringReceived;
var stage;
var amount;

document.addEventListener("DOMContentLoaded", function() {
  const scrollDiv = document.querySelector('.scroll');

  if (scrollDiv) {
    const placeholderText = "STAND BY FOR SCANING..";
    scrollDiv.textContent = placeholderText;
  }
});

function displayMessage(request) {
  console.log("Received message: " + request.myCustomMessage);
  document.getElementById("charge").innerHTML = "Charge Amount: $" + request.myCustomMessage;
  amount = (Math.abs(parseFloat(request.myCustomMessage)) * 100).toString();
  console.log("amount: " + amount);
  
  // Rest of your processing based on the received message
  // ... (rest of your logic)
  
  // Call the function to update the response message in the HTML
  updateResponseMessage();
}

function updateResponseMessage() {
  var testCard = "1234567890123456";
  var testExpMon = "01";
  var testExpYear = "18";
  var testAppCode = "000" + amount;
  var testInvNum = "1";
  var testCardType = '1';
  var testInputType = '2';
  
  // Rest of your logic to construct the message and update HTML
  // ... (rest of your logic)
  
  // After constructing the message, update the response section in the HTML
  document.getElementById("response").innerHTML = msg;
}

// Example usage of the above functions when receiving a message
// Simulating the reception of a message
var exampleRequest = {
  myCustomMessage: "25.00"
};

// Call the displayMessage function to process the received message
displayMessage(exampleRequest);
