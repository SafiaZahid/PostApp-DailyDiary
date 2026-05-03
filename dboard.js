var backgroundImg = ""
function addPost() {
  var title = document.getElementById("title");
  var description = document.getElementById("description");
  console.log(title.value, description.value);

  if (title.value.trim() && description.value.trim()) {
    var posts = document.getElementById("post-container");
    posts.innerHTML = `
    <div class="card mb-3">
                    <div class="card-header">
                        Dear ${userLocalData.name}<br>
                        ${moment().format('DD MMMM YYYY')}
                    </div>
                    <div style ="background-image:url(${backgroundImg}) "  class="card-body">
                        <figure>
                            <blockquote class="blockquote mb-0">
                                <p>${title.value}</p>
                            
                            <footer class="blockquote-footer">
                                ${description.value}
                            </footer>
                            </blockquote>
                        </figure>
                    </div>
                </div>` + posts.innerHTML;
                renderPost();
    title.value = "";
    description.value = "";
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

  if (title.value.trim() && description.value.trim() ){
    var postObj = {
      title : title.value,
      description: description.value,
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

window.onload = function(){
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

