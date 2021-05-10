
var PhotoHobby = {
  "project": "Photo",
  "owner": "MariaYeritsyan",
  "AnunAzganun": "",
  "InternetHxum": "",
  "SiracAparat": "",
  "Lusankarich": "",
  "Nkarahanum": "",
  "UrishNkar": "",
  "Nkar": "",
  "Oracuyc": "",
  "Haytni": "",
  "Nastroyka": "",
  "AmenOr": "",
  "VochAmenOr": "",
  "Arajin": "",
  "Arxiv": "",
  "UrishArxiv": "",

}


function HandleAnunAzganunChange () {
  PhotoHobby.AnunAzganun=document.getElementById("AnunAzganun").value;
}

function HandleInternetHxumChange () {
  PhotoHobby.InternetHxum=document.getElementById("InternetHxum").value;
}

function HandleSiracAparatChange () {
  PhotoHobby.SiracAparat=document.getElementById("SiracAparat").value;
}

function HandleLusankarichChange () {
  PhotoHobby.Lusankarich=document.getElementById("Lusankarich").value;
}

function HandleNkarahanumChange () {
  PhotoHobby.Nkarahanum=document.getElementById("Nkarahanum").value;
}

function HandleOracuycChange () {
  PhotoHobby.Oracuyc=document.getElementById("Oracuyc").value;
}

function HandleNkarChange (e) {
 PhotoHobby.Nkar=e.target.value;
 if (PhotoHobby.Nkar!="other") {
   PhotoHobby.UrishNkar="";
   document.getElementById("UrishNkar").style.display="none";
 }
 else{
   document.getElementById("UrishNkar").style.display="block";
 }
}

function HandleUrishNkarChange() {
  if (PhotoHobby.Nkar == "other") {
    PhotoHobby.UrishNkar = document.getElementById("UrishNkar").value;
    document.getElementById("UrishNkar").style.display="block";
  }
}

function HandleHaytniChange () {
  PhotoHobby.Haytni=document.getElementById("Haytni").value;
}

function HandleNastroykaChange () {
  PhotoHobby.Nastroyaka=document.getElementById("Nastroyka").value;
}

function HandleAmenOrChange () {
  PhotoHobby.AmenOr=document.getElementById("AmenOr").value;
}

function HandleVochAmenOrChange () {
  PhotoHobby.VochAmenOr=document.getElementById("VochAmenOr").value;
}

function HandleArajinChange () {
  PhotoHobby.Arajin=document.getElementById("Arajin").value;
}

function HandleArxivChange (e) {
 PhotoHobby.Arxiv=e.target.value;
 if (PhotoHobby.Arxiv!="other") {
   PhotoHobby.UrishArxiv="";
   document.getElementById("UrishArxiv").style.display="none";
 }
 else{
   document.getElementById("UrishArxiv").style.display="block";
 }
}

function HandleUrishArxivChange() {
  if (PhotoHobby.Arxiv == "other") {
    PhotoHobby.UrishArxiv = document.getElementById("UrishArxiv").value;
    document.getElementById("UrishArxiv").style.display="block";
  }
}


function ShowTheData(e) {
  e.preventDefault();
  console.log(PhotoHobby);
  $.ajax({
    type: 'POST',
    url: "https://cse120-2021-api.herokuapp.com/data",
    data: PhotoHobby,
    cache: false,
    dataType : 'json',
    success: function (data) {
      console.log("success");
    },
    error: function (xhr) {
      console.error("Error in post", xhr);
    },
    complete: function () {
      console.log("Complete");  
    }
  });
}

function loadExistingData() {
	var existingData = [];
  $.ajax({
    type : "GET",
    url : "https://cse120-2021-api.herokuapp.com/data",
    dataType : "json",
    success : function(data) {
      console.log("success", data);
      existingData = data;
      displayData(existingData.data);
    },
    error : function(data) {
        console.log("Error")
    }
  });
}

function displayData(existingData) {
  document.getElementById("existingData").innerHTML = "<ul>";
  for (var i = 0; i < existingData.length; i++) {
    currentBook = existingData[i];
    document.getElementById("existingData").innerHTML += "<li><i>" + currentBook.fullname + "</li> : <b>" + currentBook.title + "</b></li>";
  }
  document.getElementById("existingData").innerHTML += "</ul>" 
}
