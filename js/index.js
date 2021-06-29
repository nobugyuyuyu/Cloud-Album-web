$(document).ready(()=>{
    const ids=new Array()
    let imgs=null
    new Promise((resolve,reject)=>{
        $.ajax({
            url:"http://localhost:5000/api/photo",
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
        console.log('**************',value)
        const ul=document.getElementById("imgs")
        ul.innerHTML="";
        imgs=value.target
        imgs.map(img=>{
            if(img.deletephoto) ;
            else{
                if(img.favorite){
                    const li=document.createElement("li");
                    li.innerHTML=`
                        <div id="${img.id}" class="img" style="background: url(${img.url});background-size: cover;background-position: center center;"></div>
                        <div class="yuan">
                            <span class="iconfont icon-yuanquan"></span>
                        </div>
                        <div class="favo">
                            <span class="iconfont icon-aixin1" style="color:#ff3838"></span>
                        </div>
                        <div class="type">
                            <p>${img.type}</p>
                            <p>${img.date}</p>
                        </div>
                    `;
                    ul.appendChild(li);
                }else{
                    const li=document.createElement("li");
                    li.innerHTML=`
                        <div id="${img.id}" class="img" style="background: url(${img.url});background-size: cover;background-position: center center;"></div>
                        <div class="yuan">
                            <span class="iconfont icon-yuanquan"></span>
                        </div>
                        <div class="favo">
                            <span class="iconfont icon-aixin"></span>
                        </div>
                        <div class="type">
                            <p>${img.type}</p>
                            <p>${img.date}</p>
                        </div>
                    `;
                    ul.appendChild(li);
                }
            }
            
            
        })
    }).then(value=>{
        // 记住当前打开图片的位置
        let count;
        // 给每个图片添加点击事件响应
        const lis=Array.from(document.getElementById("imgs").getElementsByTagName("li"));
        const length=lis.length;
        lis.map((li,index)=>li.getElementsByClassName("img")[0].addEventListener('click',function(e){
            count=index;
            const url=e.target.style.background.split('"')[1].split('"')[0];
            const bigImg=document.getElementById("bigImg");
            const container=bigImg.getElementsByClassName("container");
            const img=document.createElement("img");
            img.src=`${url}`;
            container[0].appendChild(img);
            bigImg.style.display="block";
        }));

        // 弹出图片的左右切换
        const pre=document.getElementById("pre");
        pre.addEventListener('click',function(){
            if(count==0) ;
            else{
                count--;
                const url=lis[count].children[0].style.background.split('"')[1].split('"')[0];
                const bigImg=document.getElementById("bigImg");
                const container=bigImg.getElementsByClassName("container");
                const img=container[0].lastElementChild;
                img.src=`${url}`;
            }
        })
        const next=document.getElementById("next");
        next.addEventListener('click',function(){
            if(count==length-1) ;
            else{
                count++;
                const url=lis[count].children[0].style.background.split('"')[1].split('"')[0];
                const bigImg=document.getElementById("bigImg");
                const container=bigImg.getElementsByClassName("container");
                const img=container[0].lastElementChild;
                img.src=`${url}`;
            }
        })

        // 弹出大图的关闭
        const closes=Array.from(document.querySelectorAll(".icon-guanbi"));
        const bigImg=document.getElementById("bigImg");
        closes.map(close=>close.addEventListener('click',function(){
            const container=bigImg.getElementsByClassName("container");
            const removeImg=container[0].lastElementChild;
            container[0].removeChild(removeImg);
            bigImg.style.display="none";
        }))
    }).then(value=>{
        const lis=Array.from(document.getElementById("imgs").getElementsByTagName("li"));
        lis.map(li=>{
            li.children[1].children[0].addEventListener('click',(e)=>{
                if(e.target.classList.contains('icon-yuanquan')){
                    ids.push(e.target.parentNode.parentNode.firstElementChild.id);
                    e.target.classList.remove('icon-yuanquan');
                    e.target.classList.add('icon-xuanzhong');
                    e.target.style.color="rgba(255, 255, 255,0.9)";
                }else{
                    const index = ids.indexOf(e.target.parentNode.parentNode.firstElementChild.id); //调用index()函数获取查找的返回值
                    if (index > -1) {
                        ids.splice(index, 1); //利用splice()函数删除指定元素，splice() 方法用于插入、删除或替换数组的元素
                    }
                    e.target.style.color="rgba(255, 255, 255,0.5)";
                    e.target.classList.remove('icon-xuanzhong');
                    e.target.classList.add('icon-yuanquan');
                }
            })
            li.children[2].children[0].addEventListener('click',(e)=>{
                if(e.target.classList.contains('icon-aixin')){
                    $.ajax({
                        url:"http://localhost:5000/api/photo?favorite=true",
                        type:"PUT",
                        headers:{
                            Authorization:localStorage.getItem('token')
                        },
                        data:{ids:[li.children[0].id]},
                        dataType:'JSON',
                        success:(data)=>{
                            console.log(data)
                        }
                    })
                    e.target.classList.remove('icon-aixin');
                    e.target.classList.add('icon-aixin1');
                    e.target.style.color="#ff3838";
                }else{
                    $.ajax({
                        url:"http://localhost:5000/api/photo?favorite=false",
                        type:"PUT",
                        data:{ids:[li.children[0].id]},
                        headers:{
                            Authorization:localStorage.getItem('token')
                        },
                        dataType:'JSON',
                        success:(data)=>{
                            console.log(data)
                        }
                    })
                    e.target.style.color="rgba(255, 255, 255,0.5)" ;
                    e.target.classList.remove('icon-aixin1');
                    e.target.classList.add('icon-aixin');
                }
            })
        })
    }).then(value=>{
        $("#favorite").click(()=>{
            $.ajax({
                url:"http://localhost:5000/api/photo?favorite=true",
                type:"PUT",
                data:{ids:ids},
                headers:{
                    Authorization:localStorage.getItem('token')
                },
                dataType:'JSON',
                success:(data)=>{
                    location.reload();
                    console.log(data)
                }
            })
        })
        $("#bin").click(()=>{
            $.ajax({
                url:"http://localhost:5000/api/photo/delete?deletephoto=true",
                type:"POST",
                data:{ids:ids},
                headers:{
                    Authorization:localStorage.getItem('token')
                },
                dataType:'JSON',
                success:(data)=>{
                    location.reload();
                    console.log(data)
                },
                error: (error)=>{
                    console.log(error);
                }
            })
        })
        $("#vedio").click(()=>{
            const name=prompt("请输入视频的名字")
            if(name){
                 $.ajax({
                    url:`http://localhost:5000/api/photo/makeVedio?name=${name}`,
                    type:"POST",
                    data:{ids:ids},
                    headers:{
                        Authorization:localStorage.getItem('token')
                    },
                    dataType:'JSON',
                    success:(data)=>{
                        location.reload();
                        console.log(data)
                    },
                    error: (error)=>{
                        console.log(error);
                    }
                })
            }
        })
    }).then(value=>{
        // 搜索
        const searchImg=document.getElementById("searchImg");
        searchImg.addEventListener('keyup',(e)=>{
            if(e.keyCode==13){
                const searchText=searchImg.value;
                const searchResult=imgs.filter(img=>{
                    if(img.type==searchText&&(!img.deletephoto)) return img;
                })
                const ul=document.getElementById("imgs")
                ul.innerHTML="";
                searchResult.map(img=>{
                        if(img.favorite){
                            const li=document.createElement("li");
                            li.innerHTML=`
                                <div id="${img.id}" class="img" style="background: url(${img.url});background-size: cover;background-position: center center;"></div>
                                <div class="yuan">
                                    <span class="iconfont icon-yuanquan"></span>
                                </div>
                                <div class="favo">
                                    <span class="iconfont icon-aixin1" style="color:#ff3838"></span>
                                </div>
                                <div class="type">
                                    <p>${img.type}</p>
                                    <p>${img.date}</p>
                                </div>
                            `;
                            ul.appendChild(li);
                        }else{
                            const li=document.createElement("li");
                            li.innerHTML=`
                                <div id="${img.id}" class="img" style="background: url(${img.url});background-size: cover;background-position: center center;"></div>
                                <div class="yuan">
                                    <span class="iconfont icon-yuanquan"></span>
                                </div>
                                <div class="favo">
                                    <span class="iconfont icon-aixin"></span>
                                </div>
                                <div class="type">
                                    <p>${img.type}</p>
                                    <p>${img.date}</p>
                                </div>
                            `;
                            ul.appendChild(li);
                        }
                    
                });
            }
        });
    }).then(value=>{
        
        $("#upload").change(function(){
            
            // var fl=obj.files.length;
            // var flag = false;
            // for(var i=0;i<fl;i++){
            //     var file=obj.files[i];
            //     // 表单对象，用于将文件传到后台
            //     var formData = new FormData();
            //     formData.append('imgFile', file);
            const files=document.getElementById("upload")
            const length=files.files.length
            
            for(let i=0;i<length;i++){
                console.log('*******',i)
                let file=files.files[i]
                const formdata = new FormData()
                formdata.append("image",file)
                $.ajax ({
                    type : "post",
                    url : "http://localhost:5000/api/photo/",
                    data : formdata,
                    contentType : false,
                    processData : false,
                    headers:{
                        Authorization:localStorage.getItem('token')
                    },
                    dataType : 'json',
                    success : function (data) {
                        location.reload();
                        console.log(data)
                    }
                });
            }
        });
    }).catch(reason=>{
        console.log(reason)
    })
    
})