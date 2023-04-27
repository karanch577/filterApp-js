const productContainer = document.querySelector(".productContainer")
const sorting = document.querySelector(".sorting")
const category = document.querySelector(".category")
const resetBtn = document.querySelector("#reset")

let products = [];


// fetching the product from the json file
(function() {
    fetch("https://fakestoreapi.com/products")
    .then(res => res.json())
    .then(data => {
        products = data
        generateProduct(products)
    })
    .catch(err => console.log(err))
    
})()

function generateProduct(products) {
    products?.map(product => {
        let productDiv = document.createElement("div")
        productDiv.classList.add("product")
    
        let imgContainer = document.createElement("div")
        imgContainer.classList.add("imgContainer")
        let imgTag = document.createElement("img")
        imgTag.src = product.image
        imgContainer.appendChild(imgTag)
    
        let h3 = document.createElement("h3")
        h3.classList.add("title")
        h3.innerText = product.title
    
        let rating = document.createElement("div")
        rating.classList.add("rating")
        let starsContainer = document.createElement("div")
        starsContainer.classList.add("starsContainer")
        let ratingValue = document.createElement("p")

        // add the rating value
        ratingValue.innerText = `${product.rating.rate} / 5`

        rating.append(starsContainer, ratingValue)
    
        // create the 5 stars
        for(let i=0; i<5; i++) {
            let iTag = document.createElement("i")
            iTag.classList.add("star")
            starsContainer.append(iTag)
        }

        productDiv.append(imgContainer, h3, rating)

        const stars = productDiv.querySelectorAll(".starsContainer .star")
        // display the rating
        if(product.rating) {
            handleRating(product.rating, stars);

        }

        let price = document.createElement("p")
        price.classList.add("price")
        price.innerText = `$ ${product.price}`

        let stock = document.createElement("p")
        stock.classList.add("stock")
        stock.innerText = `Stock - ${product.rating.count}`

        productDiv.append(price, stock)

        productContainer.appendChild(productDiv)
    })
}

function handleRating(value, stars) {
    
    let rating = value.rate
    stars.forEach(ele => {
        if(rating >= 1 && rating <= 5) {
            ele.classList.add("fas", "fa-star")
        }else if (rating > 0 && rating < 1) {
            ele.classList.add("fas", "fa-star-half-alt")
        }else{
            ele.classList.add("far", "fa-star")
        }

        if(rating < 0) {
            return
        }
        rating--;

    });
}

// handle the sorting part
sorting.addEventListener("change", handleForm)

function handleForm(e) {
    if(e.target.id === "price") {
        products.sort((a,b) => a.price - b.price)
        removeProducts()
        generateProduct(products)
    }else if(e.target.id === "stock") {
        products.sort((a,b) => a.rating.count - b.rating.count)
        removeProducts()
        generateProduct(products)   
    }
}

function removeProducts() {
    productContainer.innerHTML = "";
}

// handle the category
category.addEventListener("change", handleCategory)

function handleCategory(e) {
    let updatedProducts = products.filter((ele => ele.category === e.target.value))
    if(updatedProducts.length) {
        removeProducts()
        generateProduct(updatedProducts)
    }
}

// reset the sort and filter
resetBtn.addEventListener("click", function() {
    removeProducts()
        fetch("https://fakestoreapi.com/products")
        .then(res => res.json())
        .then(data => {
            products = data
            generateProduct(products)
        })
        .catch(err => console.log(err))
        
})