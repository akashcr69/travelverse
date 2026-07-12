/* =====================================
   TravelVerse
   Hotel Details JavaScript
===================================== */


let selectedHotel =
localStorage.getItem("selectedPlace") || "Hotel Sea Crown";



document.getElementById("hotelName").innerHTML =
selectedHotel;



// LOAD REVIEWS

function loadReviews(){


let hotels =
JSON.parse(localStorage.getItem("hotels")) || [];



let container =
document.getElementById("reviewContainer");


container.innerHTML="";



let totalRating=0;

let totalReview=0;



hotels.forEach(hotel=>{


if(hotel.name === selectedHotel){



hotel.reviews.forEach((review,index)=>{


totalRating += Number(review.rating);

totalReview++;



let card=document.createElement("div");


card.className="review-card";


card.innerHTML=`

<div class="review-header">

<img src="assets/images/user1.jpg">

<div>

<h3>${review.user}</h3>

<p>${"⭐".repeat(review.rating)}</p>

</div>

</div>


<p>

${review.review}

</p>


<div class="review-footer">

<button onclick="deleteReview(${index})"
class="delete-btn">

Delete

</button>

</div>

`;



container.appendChild(card);



});



}



});



if(totalReview>0){


let avg =
(totalRating/totalReview).toFixed(1);


document.getElementById("averageRating")
.innerHTML =
avg+" ⭐";


document.getElementById("reviewCount")
.innerHTML =
totalReview;


}



}





// ADD REVIEW


document
.getElementById("submitReview")
.addEventListener("click",function(){



let text =
document.getElementById("newReview").value;


let rating =
document.getElementById("newRating").value;



if(text===""){

alert("Write your review");

return;

}




let hotels =
JSON.parse(localStorage.getItem("hotels")) || [];



let hotel =
hotels.find(
h=>h.name===selectedHotel
);



if(hotel){


hotel.reviews.push({

user:"Traveler",

rating:rating,

review:text

});



}

else{


hotels.push({

name:selectedHotel,

reviews:[{

user:"Traveler",

rating:rating,

review:text

}]

});


}



localStorage.setItem(
"hotels",
JSON.stringify(hotels)
);



alert("Review Added");


location.reload();


});







// DELETE REVIEW


function deleteReview(index){


let hotels =
JSON.parse(localStorage.getItem("hotels")) || [];



hotels.forEach(hotel=>{


if(hotel.name===selectedHotel){


hotel.reviews.splice(index,1);


}


});



localStorage.setItem(
"hotels",
JSON.stringify(hotels)
);



location.reload();


}




window.onload=function(){

loadReviews();

};