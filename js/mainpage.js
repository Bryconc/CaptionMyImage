function buildMainPage() {
    var table = document.createElement("TABLE");
    var photoOffset = getOffset();
    getImageData(photoOffset, table);
    getCommentData();
    createPageSelector();

    $("#recentImages").append(table);
}

function addMostRecentImages(ids, table) {
    var imgCounter = 0;
    var imgMax = ids.length;

    for (var row = 0; row < 3; row++) {
        var tableRow = document.createElement("TR");
        for (var col = 0; col < 3; col++) {
            var imageCell = document.createElement("TD");


            if (imgCounter < imgMax)
            {
                var image = document.createElement("IMG");
                var link = document.createElement("A");
                link.href = "picture-pages/picture.html?id=" + ids[imgCounter];
                image.src = "images/" + ids[imgCounter] + ".jpg";

                $(image).css({
                    "height": "200px",
                    "width": "200px"
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
}

function addMostRecentComments(commentArr) {
    var commentContainer = document.getElementById("recentCommentContainer");
    
    for (var i = 0; i < commentArr.length; i++) {
        var comment = commentArr[i];
        var commentSpan = document.createElement("P");
        commentSpan.innerHTML = "<a href='picture-pages/picture.html?id=" + comment.photo_id + "' class='commentText'>" + comment.text + "</a><em> by <a href ='people/user.html?id=" + comment.commenter_id + "'>" + comment.commenter_name + "</a></em>";
        commentContainer.appendChild(commentSpan);
    }
    
}

function createPageSelector() {
    var currentPage = getQueryVariable("page");
    
    if (currentPage == 0) {
        currentPage = 1;
    }

    if (currentPage > 5) {
        currentPage = 5;
    }
    var pageSelector = document.getElementById("pageSelector");
    
    for (var i = 1; i < 6; i++) {
        var selector;
        if (i == currentPage) {
            selector = document.createElement("SPAN");
        }
        else {
            selector = document.createElement("A");
            selector.href = "index.html?page="+i;
        }
        selector.innerHTML = i;
        pageSelector.appendChild(selector);
    }
}

function parseComments(data) {
    var comments = data.split("\n");
    var arr = [];
    
    for (var i=0; i < comments.length - 1; i++) {
        var vals = comments[i].split("&");
        arr[i] = new Comment(vals[0], vals[1], vals[2], vals[3], vals[4], vals[5], vals[6], vals[7]);
    }
    
    addMostRecentComments(arr);
}

function Comment (photo_id, id, text, commenter_id, commenter_name, date, upvotes, downvotes)
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
        var d = new Date(t[0], t[1]-1, t[2], t[3], t[4], t[5]);
        
        var monthNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
        
        return monthNames[d.getMonth()] + " " + d.getDate() + " " + d.getFullYear() + "  at " + d.toLocaleTimeString();
    };
}

function getOffset() {
    var page = getQueryVariable("page");

    if (page == 0) {
        page = 1;
    }

    if (page > 5) {
        page = 5;
    }

    return (page - 1) * 9;
}

function getImageData(photoOffset, table) {
    var posting = $.post("php/main_images.php", {
        photo_offset: photoOffset
    });

    posting.done(function(data) {
        addMostRecentImages(data.split(" "), table);
    });

    posting.fail(function() {
        alert("failed");
    });
}

function getCommentData() {
    var posting = $.post("php/main_comments.php");

    posting.done(function(data) {
        parseComments(data);
    });

    posting.fail(function() {
        alert("failed");
    });
}

$(document).ready(buildMainPage);