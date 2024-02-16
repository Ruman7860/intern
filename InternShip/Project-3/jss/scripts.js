let cartImg = document.querySelector('.cart-img');
let body = document.querySelector('body');
let close = document.querySelector('.close');
let prodListHTML = document.querySelector('.product-list');
let listCartHTML = document.querySelector('.list-cart');
let iconCartSpan = document.querySelector('.cart-span');
let totalAmount = document.querySelector('.totalAmount');
let buy = document.querySelector('.buy');

let listProduct = [];
let cart = [];

cartImg.addEventListener('click',() => {
    body.classList.toggle('showCart');
});

close.addEventListener('click',() => {
    body.classList.toggle('showCart');
});

buy.addEventListener('click',() => {
    if(cart.length <= 0){
        alert('No item is added to Cart');
    }else{
        alert('Order Placed successfully');
    }
});

const addDataToHTML = () => {
    prodListHTML.innerHTML = '';
    if(listProduct.length > 0){
        listProduct.forEach(product => {
            let newProduct = document.createElement('div');
            newProduct.classList.add('row3');
            newProduct.dataset.id = product.id;
            newProduct.innerHTML = `
                <div class="item">
                    <a><img src="${product.image}" width="100%"></a>
                    <h4><a>${product.name}</a></h4>
                    <div class="rating">
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-regular fa-star"></i>
                    </div>
                    <p>₹ ${product.price}</p>
                    <button class="btn">Add to cart</button>
                </div>
            `;
            prodListHTML.appendChild(newProduct);
        })
    }
}
// getting product id.
prodListHTML.addEventListener('click',(event) => {
    let positionClick = event.target;
    if(positionClick.classList.contains('btn')){
        let productId = positionClick.parentElement.parentElement.dataset.id;
        addToCart(productId);
        // console.log(productId);
    }
})

const addToCart = (productId) => {
    let presentAlready = cart.findIndex((value) => value.productId == productId);
    if(cart.length <=0){
        cart = [{
            productId : productId,
            quantity : 1,
        }]
    }
    else if(presentAlready < 0){
        cart.push({
            productId : productId,
            quantity : 1,
        })
    }
    else{
        cart[presentAlready].quantity += 1;
    }
    addCartToHTML();
    addCartToMemory();
}
const addCartToMemory = () =>{
    localStorage.setItem('cart',JSON.stringify(cart));
}
const addCartToHTML = () => {
    listCartHTML.innerHTML = '';
    let totalQuantity = 0;
    let totalPrice = 0;
    if(cart.length > 0){
        cart.forEach(carts => {
            totalQuantity += carts.quantity; 
            let newCart = document.createElement('div');
            newCart.classList.add('item1');
            newCart.dataset.id = carts.productId;
            let positionProduct = listProduct.findIndex((value) => value.id == carts.productId);
            let info = listProduct[positionProduct];
            let itemTotalPrice = info.price * carts.quantity;
            totalPrice += itemTotalPrice;
            newCart.innerHTML = `
                <div class="image detail">
                    <img src="${info.image}" width="100%">
                </div>
                <div class="name detail">${info.name}</div>
                <div class="totalPrice detail">₹ ${info.price * carts.quantity}</div>
                <div class="quantity detail">
                <span class="minus"><</span>
                <span>${carts.quantity}</span>
                <span class="plus">></span>
                </div>
            `;
            listCartHTML.appendChild(newCart);
        });
    }
    const totalAmount = document.querySelector('.totalAmount');
    if (totalAmount) {
        totalAmount.textContent = `Total Price :  ₹ ${totalPrice}`;
    }
    iconCartSpan.innerText = totalQuantity;
}

listCartHTML.addEventListener('click',(event) => {
    let positionClick = event.target;
    if(positionClick.classList.contains('minus') || positionClick.classList.contains('plus')){
        let productId = positionClick.parentElement.parentElement.dataset.id;
        let type = 'minus';
        if(positionClick.classList.contains('plus')){
            type = 'plus';
        }
        changeQunatity(productId,type);
    }
})

const changeQunatity = (productId,type) => {
    let presentAlready = cart.findIndex((value) => value.productId == productId);
    if(presentAlready >= 0){
        switch(type){
            case 'plus':
                cart[presentAlready].quantity = cart[presentAlready].quantity + 1;
                break;
            default:
                let valueChange = cart[presentAlready].quantity - 1;
                if(valueChange > 0){
                    cart[presentAlready].quantity = valueChange;
                }else{
                    cart.splice(presentAlready,1);
                }
                break;
        }
    }
    addCartToMemory();
    addCartToHTML();
}

// let listProduct = [];
// let cart = [];

const initApp = () => {
    // get data from json.
    fetch('product.json')
    .then(response => response.json())
    .then(data => {
        listProduct = data;
        addDataToHTML();

        // get cart from memory
        if(localStorage.getItem('cart')){
            cart = JSON.parse(localStorage.getItem('cart'));
            addCartToHTML();
        }
    })
};
initApp();




