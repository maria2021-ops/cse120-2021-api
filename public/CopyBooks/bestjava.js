var requiredFields = [ "anun" , "vernagir", "grox", "guyn"
]


var BestBook = {
  "project": "Books",
  "owner": "Maria Yeritsyan",
  "anun": "",
  "vernagir": "",
  "grox": "",
  "guyn": "",
  "coverurish": "",
  "EjiQanak": "",
  "Gin": "",
  "Pox": "",
  "bnakan": "",
  "Anpetq": "",
  "Chapser": "",
  "Tpagrox": "",
  "Or": "",
  "IskakanOr": "",
  "Tesak": "",
  "Tariq": "",
  "language": "",
  "grelvalue": "",
}



function HandleFullNameChange() {
  BestBook.anun = document.getElementById("anun").value;
}

function HandleVernagirChange() {
  BestBook.vernagir = document.getElementById("vernagir").value;
}

function HandleGroxChange() {
  BestBook.grox = document.getElementById("grox").value;
}

function HandleGuynChange() {
  BestBook.guyn = document.getElementById("guyn").value;
}

function HandleVorakChange(e) {
  BestBook.language = e.target.value;
  if (BestBook.language != "other") {
    BestBook.coverurish = "";
    document.getElementById("coverurish").style.display = "none";
  }
  else {
    document.getElementById("coverurish").style.display = "block";
  }
}

function HandleLavVorakChange() {
  if (BestBook.language == "other") {
    BestBook.coverurish = document.getElementById("coverurish").value;
    document.getElementById("coverurish").style.display = "block";
  }
}

function HandleEjiQanakChange() {
  BestBook.EjiQanak = document.getElementById("EjiQanak").value;
}

function HandleGinChange() {
  BestBook.Gin = document.getElementById("Gin").value;
}

function HandlePoxChange() {
  BestBook.Pox = document.getElementById("Pox").value;
}


function Handlelanguagechange(e) {
  BestBook.language = e.target.value;
  if (BestBook.language != "other") {
    BestBook.grelvalue = "";
    document.getElementById("grel").style.display = "none";
  }
  else {
    document.getElementById("grel").style.display = "block";
  }
}

function Handlegrelchange() {
  if (BestBook.language == "other") {
    BestBook.grelvalue = document.getElementById("grel").value;
    document.getElementById("grel").style.display = "block";
  }
}

function HandleIskakanLanguageChange(e) {
  BestBook.language = e.target.value;
  if (BestBook.language != "other") {
    BestBook.language = "";
    document.getElementById("bnakan").style.display = "none";
  }
  else {
    document.getElementById("bnakan").style.display = "block";
  }
}

function HandleIskakanLezuChange() {
  if (BestBook.language == "other") {
    BestBook.language = document.getElementById("bnakan").value;
    document.getElementById("bnakan").style.display = "block";
  }
}

function HandleAnpetqChange() {
  BestBook.Anpetq = document.getElementById("Anpetq").value;
}

function HandleChapserChange() {
  BestBook.Chapser = document.getElementById("Chapser").value;
}

function HandleTpagroxChange() {
  BestBook.Tpagrox = document.getElementById("Tpagrox").value;
}

function HandleOrChange() {
  BestBook.Or = document.getElementById("Or").value;
}

function HandleIskakanOrChange() {
  BestBook.IskakanOr = document.getElementById("IskakanOr").value;
}

function HandleTesakChange() {
  BestBook.Tesak = document.getElementById("Tesak").value;
}

function HandleTariqChange() {
  BestBook.Tariq = document.getElementById("Tariq").value;
}

function validateFormData() {
  var isFormValid = true;
  var keys = Object.keys(BestBook);
  keys.forEach(key => {
      if (requiredFields.indexOf(key) > -1 && BestBook[key] == "") { console.log(key, " is a required field, please add a value") 
      if(document.getElementById(key)) {
        document.getElementById(key).style.backgroundColor = "red"; 
        isFormValid = false;
      }
    }   
  })
  return isFormValid;
}

function ShowTheData(e) {
  if(validateFormData() == false) {
    return;
  } else {
console.log(BestBook);
  }
}

  $.ajax({
    type: 'POST',
    url: "https://cse120-2021-api-maria.herokuapp.com/data",
    data: BestBook,
    cache: false,
    dataType: 'json',
    success: function (data) {
      console.log("success");
    },
    error: function (xhr) {
      console.error("Error in post", xhr);
    },
    complete: function () {
      console.log("Complete");
       window.location.href = "https://cse120-2021-api-maria.herokuapp.com";
    }
  });


function complete () {
  console.log("Complete");
 
}


function loadExistingData() {
  var existingData = [];
  $.ajax({
    type: "GET",
    url: "https://cse120-2021-api-maria.herokuapp.com/data",
    data: BestBook,
    cache: false,
    dataType: "json",
    success: function (data) {
      console.log("success", data);
      existingData = data;
      displayData(existingData.data);
    },
    error: function (data) {
      console.log("Error")
    }
  });
}