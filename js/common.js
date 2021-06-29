window.onload=function(){
    // 此处是确定当前是哪个页面，在头部导航栏中显示高亮
    var Navs=document.getElementById("items").getElementsByTagName("a");
    // console.log(Navs);
    var Navli=document.getElementById("items").getElementsByTagName("li");
    // console.log(Navli);
    strUrl=location.href.substring(location.href.lastIndexOf("/")+1);
    // console.log(strUrl);
    for(var i=0;i<Navs.length;i++){
      strHref=Navs[i].getAttribute("href").substring(Navs[i].getAttribute("href").lastIndexOf('/')+1);
      if(strUrl===strHref){
        Navli[i].classList.add("active");
      }else{
        Navli[i].classList.remove("active");
      }
    }
  }

  // 刷新按钮
const updateBtn=document.getElementById("update");
updateBtn.onclick=function(){
    location.reload();
}

