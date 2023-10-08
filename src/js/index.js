if(localStorage.getItem("basket") == null){
    localStorage.setItem("basket", JSON.stringify([]))
}

fetch("db.json")
.then(res => res.json())
.then(data => {
    let html = ""
    data.products.forEach(element => {
        html += 
        `
      <div class="card">
        <div class="card-image">
          <img src="${element.image}">
        </div>
        <div class="card-text">
          <p>${element.title1}</p>
          <h1>${element.title2}</h1>
          <h2>${element.title3}</h2>
          <span>$${element.price}</span>
          <span class="little-span">$${element.price}</span>
          <a href="cart.html" data-id="${element.id}" data-title1="${element.title1}"  data-title2="${element.title2}" data-title3="${element.title3}" data-price="${element.price}" data-image=${element.image} class="addtobasket">Add</a>
        </div>
      </div>
        
        `
    });



    document.querySelector(".bottom-section").innerHTML = html

    let btns = document.querySelectorAll(".addtobasket");
    let basket = JSON.parse(localStorage.getItem("basket"));

    btns.forEach(btn => {
        btn.addEventListener("click", function() {
            if(localStorage.getItem("basket") == null){
                localStorage.setItem("basket", JSON.stringify([]))
            }

            let data_id = this.getAttribute("data-id")
            let data_price = this.getAttribute("data-price")
            let data_image = this.getAttribute("data-image")
            let data_title1 = this.getAttribute("data-title1")
            let data_title2 = this.getAttribute("data-title2")
            let data_title3 = this.getAttribute("data-title3")


            let exist = basket.find(a => {
                return a.id == data_id;
            })

            if(exist == undefined){
                let item = {
                    id: data_id,
                    price: data_price,
                    count: 1,
                    image: data_image,
                    title1: data_title1,
                    title2: data_title2,
                    title3: data_title3
                }

                basket.push(item);
            }else{
                exist.count++
            }

            localStorage.setItem("basket", JSON.stringify(basket));


        })
    })

})


let cartbtn = document.querySelector("#cartbtn");

cartbtn.addEventListener('click',function (e) {


    let header_cart = document.querySelector('.header-cart')

    header_cart.classList.toggle('show')
    
})

function getBasket() {
    let basket = JSON.parse(localStorage.getItem('basket'))
    console.log(basket)
    let html = ""
    basket.forEach(item => {
        html+= `

                <div class="cart-product">
                    <div class="pr-img">
                        <img src=${item.image} alt="">
                    </div>
                    <div class="pr-detail">
                        <div class="pr-title">${item.title1}</div>
                        <div class="pr-price">$${item.price}</div>
                    </div>
                    <div data-id=${item.id} class="pr-btn"><i class="fa-solid fa-x"></i></div>
                </div>
            
        `
    })

    document.querySelector('.cart-products').innerHTML = html
    

    
}

getBasket()

var xBtns = document.querySelectorAll('.pr-btn')

    console.log(xBtns)
    xBtns.forEach(btn => {
        btn.addEventListener("click", function() {
            let basket = JSON.parse(localStorage.getItem("basket"))

            let data_id = this.getAttribute("data-id")
            let item = basket.find(a => {
                return a.id == data_id
            })

            
                basket.splice(basket.indexOf(item), 1)
                this.closest(".cart-product").remove()
            

            localStorage.setItem("basket", JSON.stringify(basket))

            
        })
    })

