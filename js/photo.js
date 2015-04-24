function buildPhotoPage() {

    photoId = getQueryVariable("id");
    photoFile = "../images/" + photoId + ".jpg";

    document.title = "Picture #" + photoId + " | Caption My Image";
    getUploader();
    $("#photoImage").replaceWith($('<img src="' + photoFile + '" class="mainImage">'));

    getComments();

    $("#submitButton").click(checkComment);
}

var commentsOnPage = [];

function getComments() {
    var posting = $.post("../php/get_comment.php", {
        photo_id: photoId
    });

    posting.done(function(data) {
        parseComments(data);
    });

    posting.fail(function() {
        alert("failed");
    });
}

function parseComments(data) {
    var comments = data.split("\n");
    var arr = [];

    for (var i = 0; i < comments.length - 1; i++) {
        var vals = comments[i].split("&");
        arr[i] = new Comment(vals[0], vals[1], vals[2], vals[3], vals[4], vals[5], vals[6], vals[7]);
    }

    buildComments(arr);
}

function getCommentRatingBlock(comment) {

    var thumbsUp = $("<div><img src='../images/thumbsUpTrans.gif' class='rateUpButton' id='rateUp" + comment.id + "' data-comment-id='" + comment.id + "'></div>");
    var thumbsDown = $("<div><img src='../images/thumbsDownTrans.gif' class='rateDownButton' id='rateDown" + comment.id + "' data-comment-id='" + comment.id + "'></div>");

    var table = $("<table></table>");
    var pictureRow = $("<tr></tr>").html("<td id='ratingValue" + comment.id + "'></td><td>" + thumbsUp.html() + "</td><td><a >" + thumbsDown.html() + "</a></td>");
    
    setRatingValue(comment.id);

    table.append(pictureRow);

    return table;
}

function setRatingValue(comment_id) {
    $.post("../php/get_comment_rating.php", {
        'comment_id': comment_id
    }).done(function(data) {
        var color;
        
        if(parseInt(data) < 0) {
            color = "red";
        }
        else if (data === '0') {
            color = "black";
        }
        else {
            color = "green";
        }
        $("#ratingValue" + comment_id).html(data).css('color', color);
    });
}

function buildComments(commentArr) {
    for (var i = 0; i < commentArr.length; i++) {
        var comment = commentArr[i];
        var commentBlock = document.createElement("DIV");
        var commentText = document.createElement("SPAN");
        var commentInfo = document.createElement("SPAN");
        var rating = getCommentRatingBlock(comment);
        rating.addClass("commentRating");


        commentText.innerHTML = comment.text;
        commentText.className += "commentText";
        commentInfo.innerHTML = "Posted by: <a href='../people/user.html?id=" + comment.commenter_id + "'>" + comment.commenter_name + "</a>  on " + comment.getDate();
        commentInfo.className += "commentInfo";
        $(commentBlock).append(rating);
        commentBlock.appendChild(commentText);
        commentBlock.appendChild(commentInfo);
        
        commentBlock.className = "comment";
        commentsOnPage.push(comment.id);
        document.getElementById("commentContainer").appendChild(commentBlock);
        
        
    }
    
    $(".rateUpButton").click(function() {
        rateUpComment($(this).attr("data-comment-id"));
    });
        
    $(".rateDownButton").click(function() {
        rateDownComment($(this).attr("data-comment-id"));
    });
    
    setRateButtons();
}

function setRateButtons() {
    if (!(typeof username === 'undefined')) {
        $.post('../php/get_user_photo_rating.php', {
            'user_id' : user_id,
            'photo_id' : photoId
        }).done(function (data) {
            var commentString = data.substring(0, data.indexOf("]") + 1);
            var ratingString = data.substring(data.indexOf("]") + 1, data.lastIndexOf("]") + 1);
            var comments = JSON.parse(commentString);
            var ratings = JSON.parse(ratingString);
            console.log(commentsOnPage);
            for (var index in commentsOnPage) {
                var id = commentsOnPage[index];
                var pos = $.inArray(id, comments);
                if (pos > -1) {
                    var ratingValue = ratings[pos];
                    if (ratingValue == 1) {
                        $("#rateUp" + id).attr("src", "../images/thumbsUpActive.gif");
                    }
                    else
                    {
                        $("#rateDown" + id).attr("src", "../images/thumbsDownActive.gif");
                    }
                }
            }
        });
    }
}

function rateUpComment(comment_id) {
    if(typeof username === 'undefined') {
        alert("You must be logged in to rate a comment.");
    }
    else {
        $.post('../php/rate_comment.php', {
            'user_id' : user_id,
            'comment_id' : comment_id,
            'photo_id' : photoId,
            'rate_value' : 1
        }).done( function () {
            $("#rateUp" + comment_id).attr("src", "../images/thumbsUpActive.gif");
            $("#rateDown" + comment_id).attr("src", "../images/thumbsDownTrans.gif");
            setRatingValue(comment_id);
        });
    }
}

function rateDownComment(comment_id) {
    if(typeof username === 'undefined') {
        alert("You must be logged in to rate a comment.");
    }
    else {
        $.post('../php/rate_comment.php', {
            'user_id' : user_id,
            'comment_id' : comment_id,
            'photo_id' : photoId,
            'rate_value' : -1
        }).done( function () {
            $("#rateUp" + comment_id).attr("src", "../images/thumbsUpTrans.gif");
            $("#rateDown" + comment_id).attr("src", "../images/thumbsDownActive.gif");
            setRatingValue(comment_id);
        });
    }
}

function Comment(photo_id, id, text, commenter_id, commenter_name, date, upvotes, downvotes)
{
    this.id = id;
    this.text = text;
    this.photo_id = photo_id;
    this.commenter_id = commenter_id;
    this.commenter_name = commenter_name;
    this.date = date;
    this.upvotes = upvotes;
    this.downvotes = downvotes;

    this.getDate = function() {
        var t = date.split(/[- :]/);
        var d = new Date(t[0], t[1] - 1, t[2], t[3], t[4], t[5]);

        var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        return monthNames[d.getMonth()] + " " + d.getDate() + " " + d.getFullYear() + "  at " + d.toLocaleTimeString();
    };
}

function getUploader() {
    $.ajax({
        'url': '../php/get_photo_uploader.php',
        'type': 'POST',
        'data': {
            'photo_id': photoId
        }
    }).done(function(data) {
        var user = JSON.parse(data);
        $("#photoHeader").html("Picture #" + photoId + "<br>Uploaded by: <a href='../people/user.html?id=" + user.id + "'>" + user.name + " </a>");
    });
}

function checkComment() {
    var comment = $("#commentText").val();

    if (comment == "") {
        alert("No comment text entered.");
        return false;
    }

    submitComment(comment);
}

function submitComment(comment) {
    var posting = $.post("../php/submit_comment.php", {
        comment_text: comment,
        photo_id: photoId
    });

    posting.done(function(data) {
        location.reload();
    });

    posting.fail(function() {
        alert("failed");
    });
}
$(document).ready(buildPhotoPage);