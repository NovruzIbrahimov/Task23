let totalBasketCount = document.querySelector("#totalbasketcount");
let totalBasketPrice = document.querySelector("#totalbasketprice")
let basket = JSON.parse(localStorage.getItem("basket"))

if(localStorage.getItem("basket") == null){
    localStorage.setItem("basket", JSON.stringify([]))
    totalBasketCount.innerHTML = 0
    totalBasketPrice.innerHTML = 0
}else{

    let sum = 0;
    let price = 0
    basket.map(a => sum += a.count);
    basket.map(a => price += Number(a.count) * Number(a.price));
    
    totalBasketPrice.innerHTML = price.toFixed(2)
    totalBasketCount.innerHTML = sum
}

let db;
fetch("db.json")
.then(res => res.json())
.then(data => {
    db = data.products;

    let html = ""
    basket.forEach(element => {

        let dbItem = db.find(a => {
            return a.id == element.id
        })
        
        html += 
        `
        <div class="custom-card">
            <div class="img-div">
                <img src="${dbItem.image}" alt="">
            </div>
            <div class="content">
                <h3 class="title">${dbItem.title1}</h3>
                <h2 class="price">${dbItem.price}$</h2>
            </div>
            <div class="count-controller">
                <button data-id="${element.id}" class="minusBtn"><i class="fa-solid fa-minus"></i></button>
                <span class="item-count">${element.count}</span>
                <button data-id="${element.id}" class="plusBtn"><i class="fa-solid fa-plus"></i></button>
            </div>
        </div>
        `
    });

    document.querySelector(".basket-products").innerHTML = html;

    let minusBtns = document.querySelectorAll(".minusBtn");
    let plusBtns = document.querySelectorAll(".plusBtn");

    minusBtns.forEach(btn => {
        btn.addEventListener("click", function() {
            let data_id = this.getAttribute("data-id")
            let item = basket.find(a => {
                return a.id == data_id
            })

            if(item.count > 1){
                item.count--
                this.nextElementSibling.innerHTML = item.count
            }else{
                basket.splice(basket.indexOf(item), 1)
                this.closest(".custom-card").remove()
            }

            localStorage.setItem("basket", JSON.stringify(basket))

            let sum = 0;
            let price = 0
            basket.map(a => sum += a.count);
            basket.map(a => price += Number(a.count) * Number(a.price));
            
            totalBasketCount.innerHTML = sum
            totalBasketPrice.innerHTML = price.toFixed(2)
        })
    })

    plusBtns.forEach(btn => {
        btn.addEventListener("click", function() {
            let data_id = this.getAttribute("data-id")
            let item = basket.find(a => {
                return a.id == data_id
            })

            item.count++
            this.previousElementSibling.innerHTML = item.count

            localStorage.setItem("basket", JSON.stringify(basket))

            let sum = 0;
            let price = 0
            basket.map(a => sum += a.count);
            basket.map(a => price += Number(a.count) * Number(a.price));
           
            totalBasketCount.innerHTML = sum
            totalBasketPrice.innerHTML = price.toFixed(2)
        })
    })
})