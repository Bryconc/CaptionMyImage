function checkUsername() {
    var username = $("#username").val();
    if (username == "") {
        return false;
    }
    $.ajax({
        'url': "../php/check_username.php",
        'type': "POST",
        'data': {
            'username': username
        },
        'success': function(data) {
            updateUsername(data);
        }
    });
}

function updateUsername(data) {
    if (data == "") {
        var usernameRegex = /^[a-z0-9_-]{5,30}$/;
        var usernamePass = usernameRegex.test($("#username").val().toLowerCase());

        if (usernamePass) {
            $("#usernameCheck").html("Username is available!").attr("class", "successMessage");
        }
        else {
            $("#usernameCheck").html("Username must be between 5 and 30 characters (letters, numbers, _, -)").attr("class", "errorMessage");
        }
    } else {
        $("#usernameCheck").html("Username is taken!").attr("class", "errorMessage");
    }
}

function checkEmail() {
    var email = $("#email").val();
    if (email == "") {
        return false;
    }
    $.ajax({
        'url': "../php/check_email.php",
        'type': "POST",
        'data': {
            'user_email': email
        },
        'success': function(data) {
            updateEmail(data);
        }
    });
}

function updateEmail(data) {
    if (data == "") {
        var emailRegex = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
        var emailPass = emailRegex.test($("#email").val());
        if (emailPass) {
            $("#emailCheck").html("Email address is available!").attr("class", "successMessage");
        }
        else {
            $("#emailCheck").html("Invalid Email entered.").attr("class", "errorMessage");
        }
    } else {
        $("#emailCheck").html("Email address is already in use!").attr("class", "errorMessage");
    }
}

function validateForm() {
    var username = $("#username").val();
    var email = $("#email").val();
    var password = $("#password").val();

    if ($("#usernameCheck").hasClass("errorMessage")) {
        $("#usernameCheck").empty().removeClass("errorMessage");
    }

    if ($("#emailCheck").hasClass("errorMessage")) {
        $("#emailCheck").empty().removeClass("errorMessage");
    }

    if ($("#passwordCheck").hasClass("errorMessage")) {
        $("#passwordCheck").empty().removeClass("errorMessage");
    }

    if (username === "" || email === "" || password === "")
    {
        if (username === "") {
            $("#usernameCheck").html("Username is required").addClass("errorMessage");
        }
        if (email === "") {
            $("#emailCheck").html("Email is required").addClass("errorMessage");
        }
        if (password === "") {
            $("#passwordCheck").html("Password is required").addClass("errorMessage");
        }
        canRegister();
    } else {
        checkPassword();
        if (canRegister())
        {
            submitRegistration(username, email, password);
        }
    }
}

function checkPassword() {
    var passwordRegex = /^[a-z0-9_-]{6,30}$/
    var passwordPass = passwordRegex.test($("#password").val());

    if (!passwordPass) {
        $("#passwordCheck").html("Password must be between 6 and 30 characters (letters, numbers, _, -)").attr("class", "errorMessage");
    }
}

function canRegister() {
    var error = $("#overallError").empty();
    var userCheck = $("#usernameCheck").attr("class") == "errorMessage";
    var emailCheck = $("#emailCheck").attr("class") == "errorMessage";
    var passCheck = $("#passwordCheck").attr("class") == "errorMessage";

    if (userCheck || emailCheck || passCheck) {
        error.html("The following errors have occured.");
        var errorList = $("<ul></ul>");
        if (userCheck) {
            errorList.append("<li>Username entered was invalid.</li>");
        }
        if (emailCheck) {
            errorList.append("<li>Email address entered was invalid.</li>");
        }

        if (passCheck) {
            errorList.append("<li>Password entered was invalid.</li>");
        }
        error.append(errorList);
        error.slideDown();
        return false;
    }
    else {
        return true;
    }
}

function submitRegistration(username, email, password) {
    var posting = $.post("../php/register_user.php", {
        "username": username,
        "email": email,
        "password": password
    }
    );

    posting.done(function() {
        document.location.href = '../login/';
    });
}

$(document).ready(function() {
    $("#username").change(checkUsername);
    $("#email").change(checkEmail);
    $("#registerForm").submit(function() {
        validateForm();
        return false;
    });
});