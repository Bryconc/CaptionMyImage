$(document).ready(function (){
    $("#loginForm").submit(function(e) {
        validateForm();
        e.preventDefault();
    });
});

function validateForm() {
    var username = $("#username").val();
    var password = $("#password").val();

    if ($("#usernameCheck").hasClass("errorMessage")) {
        $("#usernameCheck").empty().attr("class", "");
    }

    if ($("#passwordCheck").hasClass("errorMessage")) {
        $("#passwordCheck").empty().attr("class", "");
    }

    if (username === "" || password === "")
    {
        if (username === "") {
            $("#usernameCheck").html("Username is required").attr("class", "errorMessage");
        }
        if (password === "") {
            $("#passwordCheck").html("Password is required").attr("class", "errorMessage");
        }
    } else {
        submitLogin();
    }
}

function submitLogin() {
    var posting = $.post('../php/validate_login.php', {
        'username' : $("#username").val(),
        'password' : $("#password").val()
    });
    
    posting.done(function (ret) {
        var data = ret.split(" ");
        if(data[0] !== "") {
            $.ajax({
                'url' : '../php/login.php',
                'type' : 'POST',
                'data' : { 
                    'user_id' : data[0],
                    'username' : data[1]
                },
                'success' : function() {
                    location.href = '../';
                }
            });
        } else {
            loginInvalid();
        }
    });
}

function loginInvalid() {
    $("#loginError").html("Username/Password is invalid. Please try again.").addClass("errorMessage").slideDown();
}

