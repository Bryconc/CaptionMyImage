function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
            return pair[1];
        }
    }
    return(false);
}

function setLoginPanel(data) {
    var loginPanel;
    if (data === "") {
        loginPanel = createLogin();
    } else {
        loginPanel = showLoggedIn(data);
    }

    $("#loginPanel").replaceWith(loginPanel);
}

function showLoggedIn(data) {
    var loginPanel = $("<div id='loginPanel'></div>");
    var loginBar = document.createElement("A");
    var data = data.split(" ");
    loginBar.innerHTML = data[0];
    loginBar.href = "/carpenterba/CS3440/project/people/user.html?id="+data[1];
    
    username = data[0];
    user_id = data[1];

    var loginMenuDiv = document.createElement("DIV");
    var loginMenuRegister = document.createElement("A");
    loginMenuRegister.href = "/carpenterba/CS3440/project/php/logout.php";
    loginMenuRegister.innerHTML = "Sign Out";
    loginMenuDiv.id = "loginMenu";
    loginMenuDiv.appendChild(loginMenuRegister)

    $(loginMenuDiv).hide();

    loginPanel.append(loginBar);
    loginPanel.append(loginMenuDiv);

    loginPanel.hover(
            function() {
                if (!$(this).is(":animated")) {
                    $(loginMenuDiv).slideDown();
                }
            },
            function() {
                if (!$(this).is(":animated")) {
                    $(loginMenuDiv).slideUp();
                }
            });

    return loginPanel;
}

function checkForLogin() {
    $.ajax({
        "url": "/carpenterba/CS3440/project/php/login_verify.php",
        "type": "POST",
        "success": function(data) {
            setLoginPanel(data);
        }
    });
}

function login(username, user_id) {
    var posting = $.post("/carpenterba/CS3440/project/php/login.php", {
        'username': username,
        'user_id': user_id
    });

    posting.done(function(data) {
        checkForLogin();
    });

    posting.fail(function() {
        alert("failed");
    });
}

function createLogin() {
    var loginPanel = $("<div id='loginPanel'></div>");
    var loginBar = document.createElement("A");
    loginBar.innerHTML = "Sign In";
    loginBar.href = "/carpenterba/CS3440/project/login/";

    var loginMenuDiv = document.createElement("DIV");
    var loginMenuRegister = document.createElement("A");
    loginMenuRegister.href = "/carpenterba/CS3440/project/register/";
    loginMenuRegister.innerHTML = "Register";
    loginMenuDiv.id = "loginMenu";
    loginMenuDiv.appendChild(loginMenuRegister)

    $(loginMenuDiv).hide();

    loginPanel.append(loginBar);
    loginPanel.append(loginMenuDiv);

    loginPanel.hover(
            function() {
                if (!$(this).is(":animated")) {
                    $(loginMenuDiv).slideDown();
                }
            },
            function() {
                if (!$(this).is(":animated")) {
                    $(loginMenuDiv).slideUp();
                }
            });

    return loginPanel;
}

function getSessionLogin() {
    $.ajax({
        "url": "/carpenterba/CS3440/project/php/login_verify.php",
        "type": "POST",
        "success": function(data) {
            if(data == "") {
                return null;
            }
            else {
                return data;
            }
        }
    });
}

$(document).ready(function() {
    checkForLogin();
});