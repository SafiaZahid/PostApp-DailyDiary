var backgroundImg = "";
function addPost() {
  var title = document.getElementById("title");
  var description = document.getElementById("description");
  //console.log(title.value, description.value);
  var descText = description.innerHTML;

  if (title.value.trim() && descText.trim()) {
    if (selectedPost){
      let cardBody = selectedPost.querySelector(".card-body");
      
      cardBody.querySelector("p").innerText = title.value;
      cardBody.querySelector(".blockquote-footer").innerHTML = descText;

      let index = selectedPost.dataset.index;
      let allPosts = JSON.parse(localStorage.getItem("posts")) || [];

      allPosts[index].title = title.value;
      allPosts[index].description = descText;

      localStorage.setItem("posts", JSON.stringify(allPosts));

      selectedPost = null;
      title.value = "";
      description.innerHTML = "";
      return;
    }
    var posts = document.getElementById("post-container");
    let allPosts = JSON.parse(localStorage.getItem("posts")) || [];
    posts.innerHTML =
      `
    <div class="card mb-3" data-index = "${allPosts.length}">
                    <div class="card-header">
                        Dear ${userLocalData.name}<br>
                       <span style="
        font-family: 'Poppins', sans-serif;
        font-size: 13px;
        letter-spacing: 0.5px
        font-weight: 900;
        
    ">${moment().format("DD MMMM YYYY, hh : mm A")}</span>
                    </div>
                    <div style ="background-image:url(${backgroundImg}) "  class="card-body">
                        <figure>
                            <blockquote class="blockquote mb-0">
                                <p>${title.value}</p>
                            
                            <footer class="blockquote-footer">
                                ${descText}
                            </footer>
                            </blockquote>
                        </figure>
                        <div class="button">
            <button onclick="editPost(this)" class="edit-btn">
                <i class="fa-solid fa-pen-to-square" style="color: #801f4f;"></i>
            </button>
            <button onclick="deletePost(this)" class="delete-btn">
                <i class="fa-solid fa-trash-can" style="color: #801f4f;"></i>
            </button>
                    </div>
                    </div>
                </div>` + posts.innerHTML;
    renderPost();
    title.value = "";
    description.innerHTML = "";
  } else {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Enter your title & description!",
    });
  }
}

function selectedImg(src) {
  backgroundImg = src;
  var bgImg = document.getElementsByClassName("bg-image");
  console.log(bgImg);
  for (var i = 0; i < bgImg.length; i++) {
    bgImg[i].className = "bg-image";
  }

  event.target.className += " selected-img";
}

function renderPost() {
  var title = document.getElementById("title");
  var description = document.getElementById("description");
  var post = document.getElementById("post-container");
  var descText = description.innerHTML;

  if (title.value.trim() && descText.trim()) {
    var postObj = {
      title: title.value,
      description: descText,
      image: backgroundImg,
      date: moment().format("DD MMMM YYYY, hh : mm A"),
    };
    var allPosts = JSON.parse(localStorage.getItem("userPost_"+ userLocalData.email)) || [];
    allPosts.push(postObj);
    localStorage.setItem(userLocalData.email, JSON.stringify(allPosts));
  }
}

var userLocalData = JSON.parse(localStorage.getItem("userData"));
console.log(userLocalData);
function redirection() {
  window.location.href = "./index.html";
}
function logOut() {
  setTimeout(redirection, 500);
}
function setGreeting() {
  let hour = moment().hour();
  let greeting = "";

  if (hour >= 5 && hour < 12) {
    greeting = "Good Morning";
  } else if (hour >= 12 && hour < 17) {
    greeting = "Good Afternoon";
  } else if (hour >= 17 && hour < 23) {
    greeting = "Good Evening";
  } else {
    greeting = "Good Night";
  }
  document.getElementById("greet").innerText =
    greeting + ", " + userLocalData.name;
}

window.onload = function () {
  setGreeting();
  var allPosts = JSON.parse(localStorage.getItem(userLocalData.email)) || [];
  var posts = document.getElementById("post-container");

  for (var i = 0; i < allPosts.length; i++) {
    posts.innerHTML =
      `
    
<div class="card mb-3" data-index= ${i}>
    <div class="card-header">
        Dear ${userLocalData.name}<br>
        ${allPosts[i].date}
    </div>
    <div style="background-image:url(${
      allPosts[i].image || ""
    }) " class="card-body">
        <figure>
            <blockquote class="blockquote mb-0">
                <p>${allPosts[i].title}</p>

                <footer class="blockquote-footer">
                    ${allPosts[i].description}
                </footer>
            </blockquote>
        </figure>
        <div class="button">
            <button onclick="editPost(this)" class="edit-btn">
                <i class="fa-solid fa-pen-to-square" style="color: #801f4f;"></i>
            </button>
            <button onclick="deletePost(this)" class="delete-btn">
                <i class="fa-solid fa-trash-can" style="color: #801f4f;"></i>
            </button>
        </div>
        </div>
    </div>` + posts.innerHTML;
  }
};
function format(command, value = null) {
  document.execCommand(command, false, value);
}
// let colorPicker = document.getElementById("colorPicker");
// colorPicker.addEventListener("input", function(){
//   document.execCommand("foreColor", false, this.value);
// } )

function searchPost() {
  let searchValue = document.getElementById("searchInput").value.toLowerCase();
  let allPosts = document.querySelectorAll("#post-container .card");
  console.log(allPosts);

  for (let i = 0; i < allPosts.length; i++) {
    let text = allPosts[i].innerText.toLowerCase();

    if (searchValue === "") {
      allPosts[i].style.display = "block";
    } else if (text.includes(searchValue)) {
      allPosts[i].style.display = "block";
    } else {
      allPosts[i].style.display = "none";
    }
  }
}

let deletePost = (e) =>{
let card = e.parentElement.parentElement.parentElement;

let index = card.dataset.index;
let allPosts = JSON.parse(localStorage.getItem("posts")) || [];
allPosts.splice(index,1);
localStorage.setItem("posts", JSON.stringify(allPosts));
card.remove();

}
let selectedPost = null;

let editPost = (e) => {
  selectedPost  = e.parentElement.parentElement.parentElement;

  let cardBody = e.parentElement.parentElement;
  let title = cardBody.querySelector("p").innerText;
  let description = cardBody.querySelector(".blockquote-footer").innerHTML;
  document.getElementById("title").value = title;
  document.getElementById("description").innerHTML = description;


}