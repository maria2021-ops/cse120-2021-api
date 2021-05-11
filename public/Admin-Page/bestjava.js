var loadedData = [];

function loadBookEditItem() {
    localStorage = window.localStorage;
    editItem = JSON.parse(localStorage.getItem("editItem"));
    console.log(editItem);
    document.getElementById("_id").value = editItem["_id"];
    document.getElementById("anun").value = editItem["anun"];
    document.getElementById("vernagir").value = editItem["vernagir"];   
    document.getElementById("grox").value = editItem["grox"];
    document.getElementById("guyn").value = editItem["guyn"];
    document.getElementById("coverurish").value = editItem["coverurish"];
    document.getElementById("EjiQanak").value = editItem["EjiQanak"];
    document.getElementById("Gin").value = editItem["Gin"];
    document.getElementById("Pox").value = editItem["Pox"];
    document.getElementById("bnakan").value = editItem["bnakan"];
    document.getElementById("Anpetq").value = editItem["Anpetq"];
    document.getElementById("Chapser").value = editItem["Chapser"];
    document.getElementById("Tpagrox").value = editItem["Tpagrox"];
    document.getElementById("Or").value = editItem["Or"];
    document.getElementById("IskakanOr").value = editItem["IskakanOr"];
    document.getElementById("Tesak").value = editItem["Tesak"];
    document.getElementById("Tariq").value = editItem["Tariq"];    
    document.getElementById("language").value = editItem["language"];  
    document.getElementById("grelvalue").value = editItem["grelvalue"];
}

function loadPhotoEditItem() {
    localStorage = window.localStorage;
    editItem = JSON.parse(localStorage.getItem("editItem"));
    console.log(editItem);
    document.getElementById("_id").value = editItem["_id"];
    document.getElementById("AnunAzganun").value = editItem["AnunAzganun"];
    document.getElementById("InternetHxum").value = editItem["InternetHxum"]; 
    document.getElementById("SiracAparat").value = editItem["SiracAparat"];
    document.getElementById("Lusankarich").value = editItem["Lusankarich"];
    document.getElementById("Nkarahanum").value = editItem["Nkarahanum"];
    document.getElementById("UrishNkar").value = editItem["UrishNkar"];      
    document.getElementById("Nkar").value = editItem["Nkar"];
    document.getElementById("Oracuyc").value = editItem["Oracuyc"];
    document.getElementById("Haytni").value = editItem["Haytni"];
    document.getElementById("Nastroyka").value = editItem["Nastroyka"];
    document.getElementById("AmenOr").value = editItem["AmenOr"];
    document.getElementById("VochAmenOr").value = editItem["VochAmenOr"];
    document.getElementById("Arajin").value = editItem["Arajin"];
    document.getElementById("Arxiv").value = editItem["Arxiv"];
    document.getElementById("UrishArxiv").value = editItem["UrishArxiv"];
}

function editData(id) {
    var tmp = id.split("edit_");
    var item_id = tmp[1];

    loadedData.forEach(item => {
        if ( item._id == item_id) {
            console.log(item); 
            localStorage = window.localStorage;
            localStorage.setItem('editItem', JSON.stringify(item));
            if (item["project"] == "Photo") {
            document.location  = "Photo.html"; 
            } else {
            document.location  = "Book.html"; 
            }
        }
    })
}

function deleteData(id) {

    var r = confirm("Are you sure you want to delete the item with the following ID? " + id);
    if (r == false) {
        return;
    }

    var tmp = {
        "id": id
    }

    $.ajax({
        type: 'POST',
        url: "https://cse120-2021-api-maria.herokuapp.com/data/delete",
        data: tmp,
        cache: false,
        dataType : 'json',
        success: function (data) {
            console.log("success");
            document.getElementById("div" + id).style.display = "none";
        },
        error: function (xhr) {
            console.error("Error in post", xhr);
        },
        complete: function () {
            console.log("Complete");  
        }
    });
}

function saveData() {
	var tmp = {
		"test": "Data"
	}

  $.ajax({
      type: 'POST',
      url: "https://cse120-2021-api-maria.herokuapp.com/data",
      data: tmp,
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
  myBookData = [];
  myPhotoData = [];
    $.ajax({
        type : "GET",
        url : "https://cse120-2021-api-maria.herokuapp.com/data",
        dataType : "json",
        success : function(data) {
          loadedData = data.data;
        	console.log("success", data);
            data.data.forEach(elem => {
          if (elem["owner"] == "Maria Yeritsyan") {
            if (elem["project"] == "Photo") {
              myPhotoData.push(elem);
            } else {
              myBookData.push(elem);
            }
          }
        })
        displayData(myPhotoData, "photoDataContainer");
        displayData(myBookData, "bookDataContainer");
      },
        error : function(data) {
            console.log("Error");
        }
    });
}


function displayData(data, containerDivName) {
  document.getElementById(containerDivName).innerHTML = "";
  data.forEach(elem => {
    var item = document.createElement("div");
    item.id = "div" + elem["_id"];
    item.className = "item";
    if (Object.keys(elem).length == 1) {
      var span = document.createElement("span");
      span.innerHTML = "<i>Empty Element with autogenerated ID: </i>" + elem["_id"];
      item.appendChild(span);
    }
    Object.keys(elem).forEach(key => {
      if (key != "_id") {
        var span = document.createElement("span");

        var b = document.createElement("b");
        b.innerHTML = key + ": ";
        span.appendChild(b);
        
        span.className = "item";
        if (elem[key]) {
            span.innerHTML += elem[key];
        } else {
            var span1 = document.createElement("span");
            span1.className = "undefined";
            span1.innerHTML = "N/A";
            span.appendChild(span1)
        }
        item.appendChild(span);

        var br = document.createElement("br");
        item.appendChild(br);
      }
    })
    var edit_button = document.createElement("button");
    edit_button.innerHTML = "Edit";
    edit_button.id = "edit_" + elem["_id"];
    edit_button.className = "edit";
    edit_button.addEventListener("click", function(e){
        editData(e.target.id);
    }, false);
    item.appendChild(edit_button);

    var button = document.createElement("button");
    button.innerHTML = "Delete";
    button.id = elem["_id"];
    button.addEventListener("click", function(e){
        deleteData(e.target.id);
    }, false);
    item.appendChild(button);
    document.getElementById(containerDivName).appendChild(item);
  })

}


function togglePhotoData() {
  var photoData = document.getElementById("photoDataContainer");
  if (photoData.style.display == "block") {
    photoData.style.display = "none";
  } else {
    photoData.style.display = "block";
  }
}

function toggleBookData() {
  var bookData = document.getElementById("bookDataContainer");
  if (bookData.style.display == "block") {
    bookData.style.display = "none";
  } else {
    bookData.style.display = "block";
  }
}

function UpdateData(e) {
  e.preventDefault();
  var updatedBook = {};
    updateBook.id = document.getElementById("_id").value;
    updateBook.anun = document.getElementById("anun").value;
    updateBook.vernagir = document.getElementById("vernagir").value;   
    updateBook.grox = document.getElementById("grox").value;
    updateBook.guyn = document.getElementById("guyn").value;
    updateBook.coverurish = document.getElementById("coverurish").value;
    updateBook.ejiqanak = document.getElementById("EjiQanak").value;
    updateBook.gin = document.getElementById("Gin").value;
    updateBook.pox = document.getElementById("Pox").value;
    updateBook.bnakan = document.getElementById("bnakan").value;
    updateBook.anpetq = document.getElementById("Anpetq").value;
    updateBook.chapser = document.getElementById("Chapser").value;
    updateBook.tpagrox = document.getElementById("Tpagrox").value;
    updateBook.or = document.getElementById("Or").value;
    updateBook.iskakanor = document.getElementById("IskakanOr").value;
    updateBook.tesak = document.getElementById("Tesak").value;
    updateBook.tariq = document.getElementById("Tariq").value;    
    updateBook.language = document.getElementById("language").value;  
    updateBook.grelvalue = document.getElementById("grelvalue").value;
	
      $.ajax({
      type: 'POST',
      url: "/data/update",
      data: updatedBook,
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


function UpdatePhotoData(e) {
  e.preventDefault();
  var updatedPhoto = {};
    updatePhoto.id = document.getElementById("_id").value; 
    updatePhoto.anunazganun = document.getElementById("AnunAzganun").value;
    updatePhoto.internethxum = document.getElementById("InternetHxum").value; 
    updatePhoto.siracaparat = document.getElementById("SiracAparat").value;
    updatePhoto.lusankarich = document.getElementById("Lusankarich").value;
    updatePhoto.nkarahanum = document.getElementById("Nkarahanum").value;
    updatePhoto.urishnkar = document.getElementById("UrishNkar").value;      
    updatePhoto.nkar = document.getElementById("Nkar").value;
    updatePhoto.oracuyc = document.getElementById("Oracuyc").value;
    updatePhoto.haytni = document.getElementById("Haytni").value;
    updatePhoto.nastroyka = document.getElementById("Nastroyka").value;
    updatePhoto.amenor = document.getElementById("AmenOr").value;
    updatePhoto.vochamenor = document.getElementById("VochAmenOr").value;
    updatePhoto.arajin = document.getElementById("Arajin").value;
    updatePhoto.arxiv = document.getElementById("Arxiv").value;
    updatePhoto.urisharxiv = document.getElementById("UrishArxiv").value;
      $.ajax({
      type: 'POST',
      url: "/data/update",
      data: updatedPhoto,
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
