const signInBtn = document.getElementById("signIn");
const signUpBtn = document.getElementById("signUp");
const firstForm = document.getElementById("form1");
const secondForm = document.getElementById("form2");
const container = document.querySelector(".container");

signInBtn.addEventListener("click", () => {
	container.classList.remove("right-panel-active");
});


signUpBtn.addEventListener("click", () => {
	container.classList.add("right-panel-active");
});

$("#register").click(()=>{
    const username=$("#form1 .username").val()
    const password=$("#form1 .password").val()
    const user={
        username,
        password
    }
    $.ajax({
        url:"http://localhost:5000/api/user",
        type:"POST",
        data:user,
        dataType:'JSON',
        success:(data)=>{
            console.log(data)
        }
    })
})

$("#loginbtn").click((e)=>{
    const username=$("#form2 .username").val()
    const password=$("#form2 .password").val()
    const user={
        username,
        password
    }
    $.ajax({
        url:"http://localhost:5000/api/user/login",
        type:"POST",
        data:user,
        dataType:'JSON',
        success:(data)=>{
            localStorage.setItem('token',data.token)
            window.location.href="./index.html";
        }
    })
})

// window.location.href="你所要跳转的页面";
// $("#logup").click(()=>{
//     const username=$("#username").val()
//     const password=$("#password").val()
//     const user={
//         username,
//         password
//     }
//     $.ajax({
//         url:"http://localhost:5000/api/user",
//         type:"POST",
//         data:user,
//         dataType:'JSON',
//         success:(data)=>{
//             console.log(data)
//         }
//     })
// })

// $("#login").click(()=>{
//     const username=$("#username").val()
//     const password=$("#password").val()
//     const user={
//         username,
//         password
//     }
//     $.ajax({
//         url:"http://localhost:5000/api/user/login",
//         type:"POST",
//         data:user,
//         dataType:'JSON',
//         success:(data)=>{
//             localStorage.setItem('token',data.token)
//             console.log(localStorage.getItem('token'))
//         }
//     })
// })

// $("#getphoto").click(()=>{
    
//     $.ajax({
//         url:"http://localhost:5000/api/photo",
//         type:"GET",
//         headers:{
//             Authorization:localStorage.getItem('token')
//         },
//         dataType:'JSON',
//         success:(data)=>{
//             console.log(data)
//         },
//         error: (error)=>{
//             console.log(error);
//         }
//     })
// })