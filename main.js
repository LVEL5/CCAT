var STX = 2;
var ETX = 3;
var ACK = 6;
var gconnectId;
var msg = " ";
var conMsg;
var authoMsg = "";
var outData = "";
var stringReceived;
var stage;
var amount;
var comPort;
extId = "heliohniklnbclafjbajdbhlcmdbopji";

// placeholder

document.addEventListener("DOMContentLoaded", function() {
  const scrollDiv = document.querySelector('.scroll');

  // Set default placeholder text
  if (scrollDiv) {
    const placeholderText = "STAND BY FOR SCANING..";
    scrollDiv.textContent = placeholderText;
  }
});


blacklistedIds = ["none"];
//Send message to extension that app has opened
chrome.runtime.sendMessage(extId, {
  open: "open"
}, function() {
  console.log("App Open sent");
});

chrome.runtime.onMessageExternal.addListener(
  function(request, sender, sendResponse) {
    if (sender.id in blacklistedIds) {
      sendResponse({
        "result": "Sorry, could not process your message"
      });
      return; // don't allow this extension access
    } else if (request.myCustomMessage) {
      console.log("from " + sender.id + ": " + request.myCustomMessage);
      document.getElementById("charge").innerHTML = "Charge Amount: $" + request.myCustomMessage;
      amount = (Math.abs(parseFloat(request.myCustomMessage)) * 100).toString();
      console.log("amount: " + amount);
      if (request.myCustomMessage > 0) {
        console.log("Amount greater than 0");
      } else if (request.myCustomMessage < 0) {
        console.log("Amount less than 0");
      } else {
        console.log("Zero received, cannot process");
      }
      msgBox();


      sendResponse({
        "result": "Message Received by App"
      });
    } else {
      sendResponse({
        "result": "App doesn't understand this message"
      });
    }
    console.log("Message sent: " + sendResponse.result);
  });

var stringReceived = '';

function msgBox() {
  var testCard = "1234567890123456";
  var testExpMon = "01";
  var testExpYear = "18";
  var testAppCode = "000" + amount;
  var testInvNum = "1";
  var testCardType = '1';
  var testInputType = '2';
  var action, cardNum, expDate, authoCode, invNum;
  msg += Date() + "<br>";
  msg += "Card Number: " + testCard + "<br>";
  cardNum = testCard;
  msg += "Expiration Date: " + testExpMon + "/" + testExpYear + "<br>";
  expDate = testExpMon + "/" + testExpYear;
  msg += "<b>TRANSACTION APPROVED <br>";
  actionV = "Approved";
  msg += "Authorization Code: " + testAppCode + "<br>";
  authoCode = testAppCode;
  msg += "Invoice Number: " + testInvNum + "</b><br>";
  invNum = testInvNum;
  t = testCardType;
  if (t == '0') {
    cardType = "Credit Card";
  } else if (t == '1') {
    cardType = "Debit Card";
  } else if (t == '8') {
    cardType = "EBT Card";
  } else if (t == '9') {
    cardType = "Purchase Card";
  } else if (t == '10') {
    cardType = "Commercial Card";
  } else if (t == '11') {
    cardType = "Fleet Card";
  } else if (t == '12') {
    cardType = "Gift Card";
  } else {
    cardType = "Unknown";
  }
  msg += "Card Type: " + cardType + "</b><br>";
  p = testInputType;
  if (p == '1') {
    indType = "Manual";
  } else if (p == '2') {
    indType = "Swipe";
  } else if (p == '3') {
    indType = "Chipped";
  } else if (p == '4') {
    indType = "Contactless";
  } else if (p == '5') {
    indType = "Beam";
  } else if (p == '9') {
    indType = "Other";
  } else {
    indType = "Unknown";
  }
  msg += "Card Entry Method: " + indType + "</b><br>";

  msg += "<hr>";
  document.getElementById("response").innerHTML = msg;
  chrome.runtime.sendMessage(extId, {
    action: actionV,
    cardNum: cardNum,
    expDate: expDate,
    authoCode: authoCode,
    invNum: invNum
  }, function(response) {
    console.log("Response from Ext: " + JSON.stringify(response));
  });
  console.log("Message Sent to Ext");
  stringReceived = "";
}
