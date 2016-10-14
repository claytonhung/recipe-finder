var ingredientList = [];

/*
  Show the dishes on the right side of the screen
  Want the image to show up
  WHen mouse hovers over the image, show the name of the dish
  When image is clicked, go to the link of the dish
*/
function populateSearch(profileData){
  var obj = profileData;
  // obj.dishList[i].dishImage PROVIDES THE IMAGE
  for (var i=0; i < obj.dishes; i++) {
    var startString = " <tr class=\"dish-item\"><td class=\"dish-item-label\"> "
    var endString = " </td></tr>"
    var dish = '<a target="_blank" href="' + obj.dishList[i].dishLink + '">' + obj.dishList[i].dishName + '</a>';
    var newSidebarListItem = startString + dish + endString;
    var x = $(newSidebarListItem).appendTo('.dishes-table');
  }
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

  $.ajax({
    type: "POST",
    url: '/api/v1/user',
    data: profileData
  })
  .done(function( msg ) {
    var recipeFinderUserData = msg


    // Returns a list of dishes if the user had previous logged in already
    // Format:
    // var dishes = {
    //   "dishes": 5,
    //   "dishList": [
    //     { "id": 1,
    //     "dishName": "Buffalo Pulled Chicken Breast"
    //   }]
    // };

    if (recipeFinderUserData.dishes === 0){
      displayFirstTimeMsg();
    }
    // console.log(msg);
  });
  // populateSearch(profileData); //this needs to be in .done callback
  fadeToSearch();
}

function displayFirstTimeMsg(){
}

function setIngredientRemoveBinding(ingredientItem){
  var ingredientIcon = ingredientItem.children(".ingredient-item-icon")[0]
  $(ingredientIcon).click(function(){
    this.parentElement.remove();
    ingredientList.pop(ingredientIcon.innerHTML);
    //INCLUDE REMOVE ANIMATION HERE *****************************************************************************
  });
}

function addIngredient(){
  var newIngredient = $(".ingredient-search").val();

  if(newIngredient === ''){
    swal({   title: "Error!",   text: "Enter an ingredient!",   type: "error",   confirmButtonText: "Cool" });
  }else{
    ingredientList.push(newIngredient.toLowerCase());
    var startString = " <tr class=\"ingredient-item\"><td class=\"ingredient-item-label\"> "
    var endString = " </td><td class=\"ingredient-item-icon\"><div class=\"ingredient-item-icon-image\"></div></td></tr>"
    var newSidebarListItem = startString + newIngredient + endString;
    var x = $(newSidebarListItem).appendTo('.sidebar-table');
    setIngredientRemoveBinding(x);
    $(".ingredient-search").val('');
  }
}

function setupEventBindings(){
  $(".search-item-icon").click(function(){
    addIngredient();
  });

  $(".ingredient-search").keypress(function (e) {
    var key = e.which;
    if(key == 13)  // the enter key code
    {
      addIngredient();
    }
  });
}

function calcSidebarTableHeight(){
  var height = $(".page").height() - $(".header").height() - $(".search-recipe").height() -50;
  $(".sidebar-table-wrapper").css("height", height+"px");
}

/*
  Create AJAX call searching for recipes
  data: list of ingredients passed into ingredientSearch variable
  returns: a list of ingredients with 3 fields (dishName, dishLink, dishImage)
  dishName: Name of the dish
  dishLink: link sent to the site for recipe / instructions
  dishImage: image of the dish
*/
function searchRecipes(){
  $(".search-recipe").click(function(){
    var ingredientSearch = { ingredients: ingredientList };

    $.ajax({
      type: "POST",
      url: '/api/v1/searchRecipes',
      dataType: 'json',
      data: ingredientSearch
    }).done(function(msg) {

      console.log(msg);
      var newRecipes = msg;

      // The return message from backend is 0 (number of dishes returned in backend)
      if (newRecipes == 0) {
        swal({   title: "Error!",   text: "Sorry, there are no recipes!",   type: "error",   confirmButtonText: "Okay" });
      } else {
        $("#dishes tr").remove(); // clears the old search
        $(".content").replaceWith(''); //clears "Enter your ingredients and find a recipe!" tag
        populateSearch(newRecipes);
      }
    });
  });
}

$(document).ready(function() {
  setupEventBindings();
  calcSidebarTableHeight();
  searchRecipes();
});

