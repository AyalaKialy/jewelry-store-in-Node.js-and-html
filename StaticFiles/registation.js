
function registration() {
    let User = {
        email: document.getElementById("email2").value,
        password: document.getElementById("password2").value,
        firstName: document.getElementById("fname").value,
        lastName: document.getElementById("lname").value,
        adress:{city:document.getElementById("city").value,
                 street:document.getElementById("street").value,
                 bilding:document.getElementById("bilding").value,}
    }
    fetch('/user/', {
        method: "POST",
        body: JSON.stringify(User),
        headers: { "Content-Type": "application/json; charset=UTF-8" }
    })
        .then(res => {
            if(res.status == 500)
                alert("validation problem")
            else if (res.ok && res.status == 200)
                return res.json();
            else
                throw new Error(res.status);
         }).then(data => {
            if(!data.user)
                alert("registration failed!");
            else
                alert('registration complate succsesfuly!');
                window.location.href = "existingUser.html";
                sessionStorage.setItem('user', JSON.stringify(data));
                sessionStorage.setItem('userId',data.user._id);
         })
        .catch(err => console.log(err));
};
function user() {
    let user = JSON.parse(sessionStorage.getItem('user'));
    document.getElementById("email3").value = user.user.email;
    document.getElementById("password3").value = user.user.password;
    document.getElementById("firstName3").value = user.user.firstName;
    document.getElementById("lastName3").value = user.user.lastName;
    document.getElementById("city2").value = user.user.adress[0].city;
    document.getElementById("street2").value = user.user.adress[0].street;
    document.getElementById("bilding2").value = user.user.adress[0].bilding;

};
function updateData() {
    let User = {
        email: document.getElementById("email3").value,
        password: document.getElementById("password3").value,
        firstName: document.getElementById("firstName3").value,
        lastName: document.getElementById("lastName3").value,
        adress:{city:document.getElementById("city2").value,
                 street:document.getElementById("street2").value,
                 bilding:document.getElementById("bilding2").value,}
    }
    id = sessionStorage.getItem('userId');
    fetch("/user/" + id, {
        method: "PATCH",
        body: JSON.stringify(User),
        headers: { "Content-Type": "application/json; charset=UTF-8" }
    })
        .then(res => res.json())
        .then(data => {
            alert('update complate succsesfuly!');
            sessionStorage.setItem('user', JSON.stringify(data));
            window.location.href = "products.html";
        })
        .catch(err => { console.log(err), alert('update failed!'); });
};
function getAllOrder(){
    var id =sessionStorage.getItem('userId');
    fetch("/user/" +id)
        .then((res) => {
            if (res.ok && res.status == 200){
                    return res.json()
            }
            else{
                throw new Error( response.json);
            }  
        })
        .then(data => {  
            if (data != "error") {
                document.getElementById("myOrders").innerText ="" +JSON.stringify(data.allOrdersByUserId);
            }
   
        }).catch((error) => { console.log(error); alert(error) });
   
    }
function getEpenciveOrder(){
    fetch("/order/")
        .then((res) => {
            if (res.ok && res.status == 200){
                    return res.json()
            }
            else{
                throw new Error(response.json);
            }  
        })
        .then(data => {  
            if (data != "error") {
                document.getElementById("ExpenciveOrder").innerText ="" +JSON.stringify(data);
            }
   
        }).catch((error) => { console.log(error); alert(error) });
   
}    

