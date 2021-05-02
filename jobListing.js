var filterArr = [];
var numOfFilters = 0;
var checkArr = [];
var filterCheck = 0;

//adding selected filter to filter arr and to .filters section
$(".filter-item").on("click", function(){
    var selectedFilter = $(this).text();

    $(".filter-card").show();

    //add only if it doesn't exist
    if(!(filterArr.includes(selectedFilter))){
        filterArr.push(selectedFilter);
        $(".filters").append("<li class='selected-filter'>"+
                                selectedFilter+
                                "<img class='remove-icon' src='images/icon-remove.svg' alt=''></li>"
                            );
        numOfFilters++;

        $(".job-card").hide();
        sortJobs();
    }
});

//sort job cards 
function sortJobs() {
    $(".job-card").each(function(){
        var jobFilterArr = $(this).find(".job-filters").children();
        for(var i = 0 ; i<filterArr.length ; i++){
         jobFilterArr.each(function(){
             if(filterArr[i] === $(this).text()){
                 checkArr[i]=1;
                 return false;
             }else{
                 checkArr[i] = 0;
             }
         });
        }

        for(var j = 0 ; j<checkArr.length ; j++){
            if(checkArr[j] === 0){
                filterCheck = 0;
                break;
            }else{
                filterCheck = 1;
            }
        }
        if(filterCheck === 1){
            $(this).show();
        }

        checkArr = [];
        filterCheck = 0;
     });
}

//remove filter 
$("ul").on("click", ".remove-icon", function(){
    numOfFilters--;
    $(this).parent().remove();
    filterArr.splice($.inArray($(this).parent().text(),filterArr) ,1 );
    console.log(filterArr);

    if(numOfFilters === 0){
        $(".filter-card").hide();
    }

    if(filterArr.length === 0){
        $(".job-card").show();
    }else{
        sortJobs();
    }
});

//remove all filters
$("#clear-btn").on("click",function(){
    $(".filter-card").hide();
    filterArr = [];
    $(".job-card").show();
    $("ul").empty();
});