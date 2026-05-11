var backgroundImg = ""
function addPost() {
  var title = document.getElementById("title");
  var description = document.getElementById("description");
  //console.log(title.value, description.value);
  var descText = description.innerHTML;

  if (title.value.trim() && descText.trim()) {
    var posts = document.getElementById("post-container");
    posts.innerHTML = `
    <div class="card mb-3">
                    <div class="card-header">
                        Dear ${userLocalData.name}<br>
                       <span style="
        font-family: 'Poppins', sans-serif;
        font-size: 13px;
        letter-spacing: 0.5px
        font-weight: 900;
        
    ">${moment().format('DD MMMM YYYY, hh : mm A')}</span>
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

function renderPost(){
  var title = document.getElementById("title");
  var description = document.getElementById("description");
  var post = document.getElementById("post-container");
  var descText = description.innerHTML;

  if (title.value.trim() && descText.trim() ){
    var postObj = {
      title : title.value,
      description:descText,
      image : backgroundImg

    };
    var allPosts = JSON.parse(localStorage.getItem("posts")) || [];
    allPosts.push(postObj);
    localStorage.setItem("posts", JSON.stringify(allPosts))
  }
}

var userLocalData = JSON.parse(localStorage.getItem("userData"));
console.log(userLocalData);
function redirection(){
  window.location.href = "./index.html";
}
function logOut(){
setTimeout(redirection, 500);
}
function setGreeting(){
  let hour = moment().hour();
  let greeting ="";

  if (hour >= 5 && hour < 12){
greeting = "Good Morning";
  }
  else if (hour >= 12 && hour < 17){
    greeting = "Good Afternoon";

  }
  else if (hour >= 17 && hour < 23){
    greeting = "Good Evening";
    
  }
  else {
    greeting = "Good Night";
    
  }
  document.getElementById("greet").innerText = greeting + ", "+ userLocalData.name;
}

window.onload = function(){
  setGreeting();
  var allPosts = JSON.parse(localStorage.getItem("posts")) || [];
  var posts = document.getElementById("post-container");

  for(var i = 0; i < allPosts.length; i++){
    posts.innerHTML = `
    <div class="card mb-3">
                    <div class="card-header">
                        Dear ${userLocalData.name}<br>
                        ${moment().format('DD MMMM YYYY')}
                    </div>
                    <div style ="background-image:url(${allPosts[i].image || ""}) "  class="card-body">
                        <figure>
                            <blockquote class="blockquote mb-0">
                                <p>${allPosts[i].title}</p>
                            
                            <footer class="blockquote-footer">
                                ${allPosts[i].description}
                            </footer>
                            </blockquote>
                        </figure>
                    </div>
                </div>` + posts.innerHTML;
  }
}
function format(command, value = null){
  document.execCommand(command, false, value);
}
// let colorPicker = document.getElementById("colorPicker");
// colorPicker.addEventListener("input", function(){
//   document.execCommand("foreColor", false, this.value);
// } )

