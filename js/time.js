$(document).ready(()=>{
    new Promise((resolve,reject)=>{
        $.ajax({
            url:"http://localhost:5000/api/photo/getallVedio",
            type:"GET",
            headers:{
                Authorization:localStorage.getItem('token')
            },
            dataType:'JSON',
            success:(data)=>{
                resolve(data)
            }
        })
    }).then(value=>{
        console.log(value)
        const ul=document.getElementById("imgs")
        ul.innerHTML="";
        const vedios=value.vedio
        vedios.map(vedio=>{
            const div=document.createElement("div");
            div.innerHTML=`
                    <video src=${vedio.url} controls=controls></video>
            `;
            ul.appendChild(div);   
            
        })
    })
})