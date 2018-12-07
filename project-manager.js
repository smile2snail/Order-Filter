// Def a striped table function
function striped(){
  $("table").each(function(){
    $(this).find("tr:visible:gt(0):even").css("background-color","#ededed");

  });
}

function hide(){
  $("tr").css("display", "none");
  $("#filter-title-wrap").css("display", "table-row");
}

function show(){
  $("tr").css("display", "table-row");
}

//Def fiter month function for DATE SUBMITTED & EST START DATE
function filter1(id, className, num){
  var time = $(id + " option:nth(" + num + ")").val();
  var i = 0;
  $(id).change(function() {
    if ($(id + " option:nth(" + num + ")").is(":selected")) {
      hide();
      for(i = 0; i < 14; i++){
        var data = $(className + ":eq("+ i + ")").html().slice(0,2);
        if(data == time){
          $(className + ":eq("+ i + ")").parent().css("display", "table-row");
        }


      }
    }else if ($(id + " option:nth(0)").is(":selected")) {
      show();


    }
  });
}

// Def String filter function for Job Name, Contact Name, Consultant, City, State
function filter2(id, className, num){
  var str = $(id + " option:nth(" + num + ")").val().toLowerCase();
  var i = 0;
  $(id).change(function() {
    if ($(id + " option:nth(" + num + ")").is(":selected")) {
      hide();
      for(i = 0; i < 14; i++){
        var data = $(className + ":eq("+ i + ")").html().toLowerCase();
        if(data == str){
          $(className + ":eq("+ i + ")").parents("tr").css("display", "table-row");
        }


      }
    }else if ($(id + " option:nth(0)").is(":selected")) {
      show();


    }
  });
}

// Def String filter function for Status
function filter3(id, className, num){
  var str = $(id + " option:nth(" + num + ")").val().toLowerCase();
  var i = 0;
  $(id).change(function() {
    if ($(id + " option:nth(" + num + ")").is(":selected")) {
      hide();
      for(i = 0; i < 14; i++){
        var data = $(className + ":eq("+ i + ")").text().toLowerCase();
        if(data == str){
          $(className + ":eq("+ i + ")").parents("tr").css("display", "table-row");
        }
      }
      striped()
    }else if ($(id + " option:nth(0)").is(":selected")) {
      show();


    }
  });
}

// Def String filter function for states and countries
function filter4(id, className, num){
  var i;
  $(id).change(function() {
    if ($(id + " option:nth(" + num + ")").is(":selected")) {
      hide();
      var str = $(id + " option:nth(" + num + ")").val().toLowerCase();
      for(i = 0; i < 14; i++){
        var data = $(className + ":eq(" +i+ ") span").text().toLowerCase();
        if(str == data){
          $(className + ":eq(" +i+ ")").parents("tr").css("display", "table-row");
        }


      }
    }else if ($(id + " option:nth(0)").is(":selected")) {
      show();


    }
  });
}

// Def remove project function when user click "remove inquiry"
$(".delete").click(function(){
  var row = $(this).parents("tr").children("td");
    $(row).children("a").text("");
    $(row).children("a:last").text("PDF DOWNLOAD");
    $(row).children("a:first").text("REMOVED");
    $(row).children("a:first").attr('class', "closed btn btn-danger csv-data");

    return false;
});

// Def Search function
function searchBar(){
  (function($){
  	$.fn.tableSearch = function(options){
  		if(!$(this).is('table')){
  			return;
  		}
  		var tableObj = $(this),
  			divObj = $("<label style='width: 40%;'> </label>"),
  			inputObj = $("<input class='form-control fa' id='searchInput' placeholder='&#xf002; Search...' type='text' />");
  		  inputObj.off("keyup").on("keyup", function(){
  			var searchFieldVal = $(this).val();
  			tableObj.find("tbody tr").hide().each(function(){
  				var currentRow = $(this);
  				currentRow.find("td").each(function(){
  					if($(this).html().indexOf(searchFieldVal)>-1){
  						currentRow.show();
  						return false;
  					}
  				});
  			});
  		});
  		tableObj.before(divObj.append(inputObj));
  	}
  }(jQuery));
}

// Def change icon function if button is clicked
function changeIcon(id,i){
  var count = 0;
  $(id+i).parent().click(function(){
    count++;
    if(count%2!=0){
      $(id+i).attr("src","/leopard/resources/img/sort_asc.png");
    }else{
      $(id+i).attr("src","/leopard/resources/img/sort_desc.png");
    }
    for(var c=1; c<=9; c++){
      if(c!=i){
        $(id+c).attr("src","/leopard/resources/img/sort_both.png");
      }
    }
  });
}

$(document).ready(function(){
//Enable striped table function
  striped();
//Enable searchBar function
  searchBar();
//Enable sort table function if customer click sort arrow
  $(function() {
    $("#customer-tbl").tablesorter();
  });
  for(var k=1; k<=9; k++){
    changeIcon("#icon", k);
  }
//Enable search function
$("#customer-tbl ").tableSearch();
//Enable all the filter functions
  for(var m=1; m<=12; m++){
    filter1("#date", ".submit-month",m);
  }
  for(var n=1; n<=11; n++){
    filter2("#city-name", ".city", n);
  }
  for(var o=1; o<=8; o++){
    filter2("#contact-name", ".contact", o);
  }
  for(var p=1; p<=73; p++){
    filter4("#state-name", ".state-text", p);
  }
  for(var q=1; q<=5; q++){
    filter2("#consultant-name", ".consultant", q);
  }
  for(var r=1; r<=9; r++){
    filter2("#job-name", ".job", r);
  }
  for(var s=1; s<=4; s++){
    filter3("#status-name", ".status", s);
  }
});
