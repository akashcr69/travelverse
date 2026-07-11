// TravelVerse Home JavaScript



function createPost(){


let text=document.getElementById("postText").value;


if(text==""){

alert("Write something first");

return;

}



let postContainer=document.getElementById("postContainer");



let post=document.createElement("div");


post.className="post-card";



post.innerHTML=`

<div class="post-user">

<img src="assets/images/user1.jpg">


<div>

<h4>You</h4>

<span>
📍 Travel Place
</span>

</div>


</div>


<p style="margin-top:20px">

${text}

</p>



<div class="actions">


<button onclick="likePost(this)">

❤️ Like

</button>


<button>

💬 Comment

</button>


</div>

`;



postContainer.prepend(post);



document.getElementById("postText").value="";


}





function likePost(button){


button.innerHTML="❤️ Liked";


button.style.color="red";


}




function logout(){


localStorage.removeItem("travelUser");


window.location.href="login.html";


}