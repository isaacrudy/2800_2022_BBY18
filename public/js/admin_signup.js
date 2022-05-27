"use strict";
ready(function () {

    function ajaxPOST(url, callback, data) {

        let params = typeof data == 'string' ? data : Object.keys(data).map(
            function (k) { return encodeURIComponent(k) + '=' + encodeURIComponent(data[k]); }
        ).join('&');

        const xhr = new XMLHttpRequest();

        xhr.onload = function () {
            if (this.readyState == XMLHttpRequest.DONE) {
                callback(this.responseText, this.status);

            }
        };
        xhr.open("POST", url);
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send(params);
    }

    document.querySelector("#signupBtn").addEventListener("click", function (e) {
        e.preventDefault();
        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;
        let check_password = document.getElementById("password_confirm").value;
        let firstName = document.getElementById("firstName").value;
        let lastName = document.getElementById("lastName").value;
        let userType = document.getElementById("user-type").value;

        let queryString = "email=" + email + "password=" + password + "firstName=" + firstName + "lastName=" + lastName + "userType=" + userType;
        const vars = { "email": email.trim(), "password": password.trim(), "password_confirm": check_password.trim(), "firstName": firstName.trim(), "lastName": lastName.trim(), "userType": userType };

        ajaxPOST("/add", async function (data, status) {
            if (status == 200) {
                window.location.replace("/home");
            } else {
                let dataParsed = JSON.parse(data);
                document.getElementById("error-message").innerHTML = dataParsed.msg;
            }
        }, vars);
    });
});

function ready(callback) {
    if (document.readyState != "loading") {
        callback();
    } else {
        document.addEventListener("DOMContentLoaded", callback);
    }
}