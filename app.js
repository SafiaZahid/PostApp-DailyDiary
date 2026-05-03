function checkIn (){
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
    } else if(password !== cPassword){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Password does not match. Please try again.",
         
          });
        return;
    }
    else{
        Swal.fire({
           
            icon: "success",
            title: `Welcome ${name}! Your account has been created successfully.`,
            showConfirmButton: false,
            timer: 1500
          });
          var userData ={
            name: name,
            email: email,
            password: password,
            cPassword: cPassword
        }
        //console.log(userData);
        localStorage.setItem("userData", JSON.stringify(userData));
        // var getData =JSON.parse(localStorage.getItem("userData"));
        // console.log(getData);
        // console.log(window.location);
        setTimeout(() =>{
       window.location.href = "./dboard.html";
        }, 2000)
        }
        
}

function logIn(){
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
   }
    else if (name !== logInData.name || email !== logInData.email || password !== logInData.password){
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Nice try, but that's not the secret code",
    })
}
else{
  Swal.fire({
    icon: "success",
    title: `Welcome back ${name}! You have logged in successfully.`,
    showConfirmButton: false,
    timer: 1500
  });
  setTimeout(() =>{
    window.location.href = "./dboard.html";
     }, 2000)
}}