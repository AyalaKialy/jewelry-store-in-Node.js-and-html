
window.addEventListener('load', (event) => {
    getAllProducts();
    getAllCategories();
    document.getElementById("ItemsCountText").innerHTML = count;
});

    var arr = JSON.parse(sessionStorage.getItem("productArray"));
    if (arr == null)
       arr = [];

    var count = JSON.parse(sessionStorage.getItem("count"));
        if (count == null)
    count = 0;

 
   
    var price = JSON.parse(sessionStorage.getItem("price"));
    if (price == null)
        price = 0;



function getAllProducts() {
    fetch("/product")
        .then(res => {
            if (res.ok && res.status == 500)
                alert("לא נמצאו מוצרים")
            else if (res.ok)
                return res.json()
            else
                throw new Error(res.status)
        })
        .then(data => {
            // data = JSON.parse(data);
            if (data) {
                var c = 0;
                data.products.forEach(data => { viewProducts(data), c += 1 })
                document.getElementById("counter").innerHTML = c;
            } 
        })
        .catch(err => console.log(err))
}

function viewProducts(product) {
    var x = document.getElementById("temp-card");
    var cln = x.content.cloneNode(true);
    cln.querySelector("img").src = "./imgs/" + product.pictureName  ;
    cln.querySelector(".price").innerText = "מחיר: " + product.price +" ₪ ";
    cln.querySelector(".description").innerText = product.description;
    cln.querySelector("button").addEventListener("click", () => { addItem(product) })
    document.getElementById("ProductList").appendChild(cln);
}

function addItem(prod) {
    arr.push(prod);
    sessionStorage.getItem('productArray');
    count = count + 1;
    sessionStorage.setItem('count',count);
    sessionStorage.setItem('productArray', JSON.stringify(arr));
    price += prod.price;
    sessionStorage.setItem('price', price);
    document.getElementById("ItemsCountText").innerHTML = JSON.parse(sessionStorage.getItem("count"));
}

function getAllCategories() { 
    fetch("/category")
        .then(res => {
            if (res.ok && res.status == 204)
                alert("לא נמצאו קטגוריות")
            else if (res.ok)
                return res.json()
            else
                throw new Error(res.status)
        })
        .then(data => {
            // data = JSON.parse(data);
            if (data) {
                data.Categoryies.forEach(data => viewCategory(data))
            }
        }).catch(error => console.log(error))
}

function viewCategory(category) {
    var x = document.getElementById("temp-category");
    var cln = x.content.cloneNode(true);
    cln.querySelector(".OptionName").innerText = category.name;
    cln.querySelector(".opt").id = category._id;
    cln.querySelector(".lbl").for = category._id;
    cln.querySelector(".opt").addEventListener("change", () => {
        if (document.getElementById(category._id).checked)
            getProductsByCategory(category);
        else {
            window.location.href = "";
            getAllProducts();

        }
    });
    document.getElementById("filters").appendChild(cln);
}

function getProductsByCategory(category) {
    fetch("/product/" + category._id)
        .then(res => {
            if (res.ok && res.status == 204)
                alert("לא נמצאו מוצרים")
            else if (res.ok)
                return res.json()
            else
                throw new Error(res.status)
        }).then(data => {
            if (data) {
                document.body.removeChild(document.getElementById("ProductList"))
                var t = document.createElement('div');
                t.setAttribute("id", "ProductList");
                document.body.appendChild(t);
                c = 0;
                data.products.forEach(data => { return (viewProducts(data), c = c + 1) })
                document.getElementById("counter").innerHTML = c;
            }
        })
        .catch(err => console.log(err))
}

