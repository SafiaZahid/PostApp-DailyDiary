function checkIn (event){
    event.preventDefault();
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var cPassword = document.getElementById("cPassword").value;

    if(name === "" || email === "" || password === "" || cPassword === ""){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Please fill all the fields",
         
          });
        return;
    } 
    if(password !== cPassword){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Password do not match. Please try again.",
         
          });
        return;
    }
    var userData = {
      name, 
      email, 
      password
    }
    localStorage.setItem("userData", JSON.stringify(userData));
    
        Swal.fire({
           
            icon: "success",
            title: `Welcome ${name}! Your account has been created successfully.`,
            showConfirmButton: false,
            timer: 1500
          });
         
        setTimeout(() =>{
       window.location.href = "./dboard.html";
        }, 2000)
        }
        


function logIn(event){
  event.preventDefault();
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  
  var logInData = JSON.parse(localStorage.getItem("userData"));

  if(!logInData){
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "No account found. Please sign up first.",
   
    });
    return;
   }
    if (name !== logInData.name || email !== logInData.email || password !== logInData.password){
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Nice try, but that's not the secret code",
    });
      return;
}

  Swal.fire({
    icon: "success",
    title: `Welcome back ${name}! You have logged in successfully.`,
    showConfirmButton: false,
    timer: 1500
  });
  setTimeout(() =>{
    window.location.href = "./dboard.html";
     }, 2000)
}