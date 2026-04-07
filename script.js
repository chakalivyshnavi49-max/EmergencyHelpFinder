let userLat, userLng;

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      userLat = position.coords.latitude;
      userLng = position.coords.longitude;

      document.getElementById("output").innerHTML =
        "📍 Location: " + userLat + ", " + userLng;
    });
  } else {
    alert("Geolocation not supported");
  }
}

function predictEmergency() {
  let input = document.getElementById("emergencyInput").value.toLowerCase();
  let type = "";

  if (input.includes("accident") || input.includes("injury")) {
    type = "Hospital";
  }
  else if (input.includes("fire")) {
    type = "Fire Station";
  }
  else if (input.includes("crime") || input.includes("theft")) {
    type = "Police Station";
  }
  else {
    document.getElementById("output").innerHTML = "❌ Cannot detect emergency";
    return;
  }

  if (!userLat || !userLng) {
    alert("Please get location first");
    return;
  }

  // Show result inside page
  document.getElementById("output").innerHTML =
    "🚨 Emergency Type: " + type + "<br><br>" +
    "📍 Your Location: " + userLat + ", " + userLng + "<br><br>" +
    "👉 Click below to open in Maps:<br>" +
    `<a href="https://www.google.com/maps/search/${type}/@${userLat},${userLng},15z" target="_blank">Open Map</a>`;
}

function startVoice() {
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = "en-US";

  recognition.onresult = function(event) {
    let speech = event.results[0][0].transcript;
    document.getElementById("emergencyInput").value = speech;
  };

  recognition.start();
}

  function sendSOS() {
  if (!userLat || !userLng) {
    alert("⚠️ Please get location first");
    return;
  }

  let emergencies = JSON.parse(localStorage.getItem("emergencies")) || [];

  emergencies.push({
    location: userLat + "," + userLng,
    time: new Date().toLocaleString()
  });

  localStorage.setItem("emergencies", JSON.stringify(emergencies));

  alert("🚨 Emergency Sent!");
}
  let message = "🚨 EMERGENCY! I need help. My location: " + userLat + ", " + userLng;

  alert(message);
}

let currentRole = "";

function login() {
  let role = document.getElementById("role").value;

  if (!role) {
    alert("Please select role");
    return;
  }

  currentRole = role;
  alert(role + " logged in");

  showEmergencies();
}