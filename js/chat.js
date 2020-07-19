document.getElementById("txtmsg").disabled = true;
function init()
{
  var myName = prompt("Enter your Name");
if(myName == null){
  alert("Name Input Neccessary");
}else{
  document.getElementById("startbox").style.display = "none";
  document.getElementById("logoutbtn").style.visibility = "visible";
  document.getElementById("txtmsg").disabled = false;
  document.getElementById("userName").innerHTML += "Welcome " + myName;
var msg = document.getElementById("txtmsg");
DisplayMessage();
msg.addEventListener('keydown', function(key) {
        if (key.which === 13) {
            sendMessage();
        } 
});


function sendMessage() {
  //get message //
  var msgbody = document.getElementById('txtmsg').value;
  //Save msg in database//
  firebase.database().ref("Messages").push().set({
    "sender" : myName,
    "message" : msgbody
  });
}

function DisplayMessage() {
  firebase.database().ref("Messages").on("child_added", function(snapshot){
    if(snapshot.val().sender == myName){
      var sendmessage = '<div class="row" id="messages">'+
        '<div class="sent_msg_box" >'+
          '<div class="sender">'+ snapshot.val().sender +':'+'</div>'+
          '<div class="msgbody">'+ snapshot.val().message +'</div>'+
        '</div>'+
      '</div>';
  
      document.getElementById('chatbody').innerHTML += sendmessage;
      document.getElementById('txtmsg').value=""; 
      document.getElementById('txtmsg').focus();
      document.getElementById("chatbody").scrollTo(0, document.getElementById("chatbody").scrollHeight);
    }
    else{
      var receivemessage = '<div class="row" id="Rmessages">'+
      '<div class="receive_msg_box" >'+
      '<div class="sender">'+ snapshot.val().sender +':'+'</div>'+
      '<div class="msgbody">'+ snapshot.val().message +'</div>'+
      '</div>'+
      '</div>';
    
      document.getElementById("chatbody").innerHTML += receivemessage;
      document.getElementById("chatbody").scrollTo(0, document.getElementById("chatbody").scrollHeight);

    }
  });
}
}
}

document.getElementById("logoutbtn").addEventListener("click",function(){
  window.location.reload();
});