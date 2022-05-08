window.addEventListener('load', (event) => {
    showHeader();
    showBag();
});

function showHeader() {
    document.getElementById("itemCount").innerHTML = sessionStorage.getItem("count");
    document.getElementById("totalAmount").innerHTML = sessionStorage.getItem("price");
}
function showBag() {
    var productsList = JSON.parse(sessionStorage.getItem("productArray"));
    for (var i = 0; i < productsList.length; i++) {
        viewOrder(productsList[i]);
    }
}
function viewOrder(orderItem) {
    let s = document.getElementById("temp-row");
    var cln = s.content.cloneNode(true);
    cln.querySelector(".image").src = "./imgs/" + orderItem.pictureName;
    cln.querySelector(".itemName").innerHTML = orderItem.name;
    cln.querySelector(".price").innerHTML = orderItem.price + ' ' + 'ש"ח ';
    cln.querySelector(".expandoHeight").addEventListener("click", () => {
        deleteItem(orderItem);
    });
    document.querySelector("tbody").appendChild(cln);
}
function deleteItem(orderItem) {
    var productsList = JSON.parse(sessionStorage.getItem("productArray"));
    var count = JSON.parse(sessionStorage.getItem("count")) - 1;
    var price = JSON.parse(sessionStorage.getItem("price")) - orderItem.price;

    for (var i = 0; i < productsList.length; i++) {
        if (orderItem._id == productsList[i]._id) {
            var p1 = productsList.slice(0, i);
            var p2 = productsList.slice(i + 1, productsList.length);
            p1 = p1.concat(p2);

            sessionStorage.setItem("productArray", JSON.stringify(p1));
            document.querySelector("tbody").replaceChildren();
            var productsList = JSON.parse(sessionStorage.getItem("productArray"));
            sessionStorage.setItem("count", JSON.stringify(count));
            sessionStorage.setItem("price", JSON.stringify(price));
            showHeader();
            showBag();
            break;
        }
    }
}
function placeOrder() {
    var order = {
        "userID" : sessionStorage.getItem('userId'),
        "amount" : sessionStorage.getItem('price'),
        "products" : JSON.parse(sessionStorage.getItem('productArray'))
    }
    fetch("/order", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(order)
    })

        .then(response => {
            if (response.ok)
                return response.json();
            else
                console.log("error");
        })
        .then(data => {
            if (data) {
                console.log("data", data);
                alert( " הזמנה בוצעה בהצלחה");
            }

            else alert("ההזמנה נכשלה...")
        })

}








