function populateSearch(profileData){

}

function fadeToSearch(){
  $("#splash").fadeOut(1000)
  $("#search").fadeIn(1000, function(){
  })


  // $(".splash").css("background", "#E1E3D7")


}
function transitionToSearch(fbProfile) {
  var id = fbProfile.id;
  var firstName = fbProfile.first_name;
  var lastName = fbProfile.last_name;
  var profileData = { id: id, firstname: firstName, lastname: lastName };
  // $.ajax({
  //   type: "GET",
  //   url: 'http://localhost:3000/api',
  //   data: profileData
  // })
  // .done(function( msg ) {
  //   var recipeFinderUserData = msg
  //   alert( "Data Retrieved: " + msg );
  // });
  console.log("AJAX REQUEST SENT TO LOCALHOST:3000");
  populateSearch(profileData); //this needs to be in .done callback
  fadeToSearch();
}