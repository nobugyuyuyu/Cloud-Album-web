$(document).ready(()=>{
    $.ajax({
        url:"http://localhost:5000/api/photo/getalbum ",
        type:"GET",
        headers:{
            Authorization:localStorage.getItem('token')
        },
        dataType:'JSON',
        success:(data)=>{
            console.log(data)
        }
    })
})