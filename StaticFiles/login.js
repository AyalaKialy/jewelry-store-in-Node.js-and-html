
function login() {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    fetch("/user/" + email + "/" + password)
        .then(res => {
             if (res.ok && res.status == 200)
            return res.json();
            else
            throw new Error(res.status);
        })
        .then(data => {
                if(!data.user)
                    alert("You are not recognized in the system \n please sign up");
                else
                    {
                        alert("welcome back " + data.user.firstName + " " + data.user.lastName +
                        "\n your last login was on " + data.user.lastVisit);
                        sessionStorage.setItem('user', JSON.stringify(data));
                        window.location.href = "existingUser.html";
                        sessionStorage.setItem('userId', data.user._id);
                    }
        }).catch(err => console.log(err));
};