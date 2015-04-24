$(document).ready(getUserInformation);

function getUserInformation() {
    $.ajax({
        'url': '../php/get_user_info.php',
        'type': 'POST',
        'data': {
            'user_id': getQueryVariable("id")
        }
    }).done(function(data) {
        buildUserPage(data);
    });
}

function getUserPhotoInformation() {
    $.ajax({
        'url': '../php/get_user_photo.php',
        'type': 'POST',
        'data': {
            'user_id': getQueryVariable("id")
        }
    }).done(function(data) {
        buildUserImages(data);
    });
}

function getUserCommentInformation() {
    $.ajax({
        'url': '../php/get_user_comment.php',
        'type': 'POST',
        'data': {
            'user_id': getQueryVariable("id")
        }
    }).done(function(data) {
        buildUserComments(data);
    });
}

function getUserRatingInformation() {
    $.ajax({
        'url': '../php/get_user_rating.php',
        'type': 'POST',
        'data': {
            'user_id': getQueryVariable("id")
        }
    }).done(function(data) {
        buildUserRatings(data);
    });
}

function buildUserPage(data) {
    user = JSON.parse(data);

    if (user.last_login == null) {
        user.last_login = "Never";
    }
    else
    {
        user.last_login = user.last_login.split(" ")[0];
    }

    document.title = user.name + "'s Profile | Caption My Image";
    $("#userInfoName").html(user.name);
    $("#userInfoLogin").html("Last logged in: " + user.last_login);
    $("#barImages").click(imageContentAction);
    $("#barComments").click(commentContentAction);
    $("#barRatings").click(ratingContentAction);
    imageContentAction();
}

function imageContentAction() {
    barSetActive("#barImages");
    getUserPhotoInformation();
}

function commentContentAction() {
    barSetActive("#barComments");
    getUserCommentInformation();
}

function ratingContentAction() {
    barSetActive("#barRatings");
    getUserRatingInformation();
}

function barSetActive(item) {
    $("#barImages").removeClass("active");
    $("#barComments").removeClass("active");
    $("#barRatings").removeClass("active");

    $(item).addClass("active");
}

function buildUserImages(data) {
    var ids = data.split(" ");

    var table = document.createElement("TABLE");

    var imgCounter = 0;
    var imgMax = ids.length - 1;

    for (var row = 0; row < 3; row++) {
        var tableRow = document.createElement("TR");
        for (var col = 0; col < 3; col++) {
            var imageCell = document.createElement("TD");

            if (imgCounter < imgMax)
            {
                var image = document.createElement("IMG");
                var link = document.createElement("A");
                link.href = "../picture-pages/picture.html?id=" + ids[imgCounter];
                image.src = "../images/" + ids[imgCounter] + ".jpg";

                $(image).css({
                    "height": "150px",
                    "width": "150px"
                });

                imgCounter++;
                link.appendChild(image);
                imageCell.appendChild(link);
            }
            else {
                imageCell.className += "emptyCell";
            }

            tableRow.appendChild(imageCell);
        }
        table.appendChild(tableRow);
    }

    $("#userContent").html(table);

}

function buildUserComments(data) {
    var comments = JSON.parse(data);

    var table = document.createElement("TABLE");
    table.id = "commentsTable";

    comments.forEach(function(comment) {
        var row = document.createElement("TR");
        var cell = document.createElement("TD");
        $(cell).html("<a href='../picture-pages/picture.html?id=" + comment.photo_id + "'>" + comment.comment_text + "</a>");

        var postingInfo = document.createElement("TD");
        $(postingInfo).html("<span class='postingInfo'>Posted on " + comment.date_posted + "</span><br><a href='../picture-pages/picture.html?id=" + comment.photo_id + "'><img src='../images/" + comment.photo_id + ".jpg' class='postingInfo' width='100' height='100'></a>");
        row.appendChild(cell);
        row.appendChild(postingInfo);
        table.appendChild(row);
    });

    $("#userContent").html(table);
}

function buildUserRatings(data) {
    var ratings = JSON.parse(data);
    
    var table = document.createElement("TABLE");
    table.id = "ratingsTable";
    
    ratings.forEach(function(rating) {
        var row = document.createElement("TR");
        var cell = document.createElement("TD");
        $(cell).html("<a href='../picture-pages/picture.html?id=" + rating.photo_id + "'>" + rating.comment_text + "</a>");
        
        var ratingValue = document.createElement("TD");
        if (rating.rate_value == 1) {
            $(ratingValue).html("<img src='../images/thumbsUpActive.gif' height='100' width='100'>");
        } else {
            $(ratingValue).html("<img src='../images/thumbsDownActive.gif' height='100' width='100'>");
        }

        var postingInfo = document.createElement("TD");
        $(postingInfo).html("<span class='postingInfo'>Rated on " + rating.rate_date + "</span><br><a href='../picture-pages/picture.html?id=" + rating.photo_id + "'><img src='../images/" + rating.photo_id + ".jpg' class='postingInfo' width='100' height='100'></a>");
        row.appendChild(cell);
        row.appendChild(ratingValue);
        row.appendChild(postingInfo);
        table.appendChild(row);
    });
    
    $("#userContent").html(table);
}


