import menuArray from '/data.js'

let cart = []
let clientName = ''

document.addEventListener('click', e => {
    e.target.dataset.add && addItem(e.target.dataset.add)
    e.target.dataset.remove && removeItem(e.target.dataset.remove)
    e.target.id === 'order__btn' && openModal()
})

document.addEventListener('submit', e => {
    e.preventDefault()
    const formData = new FormData(document.getElementById('modal__form'))

    const cardName = formData.get('card-name')
    clientName = cardName

    closeModal()
    cart = []
    render()
    document.getElementById('confirmation').classList.toggle('hidden')
    setTimeout(() => {
        document.getElementById('confirmation').classList.toggle('hidden')
    }, 1500)
})

function addItem(id) {
    const itemObj = menuArray.filter(i => i.id.toString() === id)[0]
    !cart.includes(itemObj) && cart.push(itemObj)
    render()
    document.getElementById('order').classList.toggle('hidden')
}

function removeItem(id) {
    const idx = cart.findIndex(el => el.id.toString() === id)
    cart.splice(idx, 1)
    render()
    cart.length !== 0 && document.getElementById('order').classList.toggle('hidden')
}

function openModal() {
    document.getElementById('modal').style.display = 'block';
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
}

function getMenuHtml() {
    let menuHtml = ``
    menuArray.forEach(item => {
        const { name, ingredients, id, price } = item
        menuHtml += `
            <div class="item">
                <img src="./assets/${name.toLowerCase()}.png" alt="" class="item__img"/>
                <span class="item__title">${name}</span>
                <span class="item__ingredients">${ingredients}</span>
                <span class="item__price">$${price}</span>
                <button class="item__btn">
                    <img src="./assets/add-btn.png" alt="" class="item__btn-img" data-add="${id}">
                </button>
            </div>
            `
    })
    return menuHtml
}

function getCartHtml() {
    let cartHtml = ``
    cart.forEach(item => {
        const { name, id, price } = item
        cartHtml += `
            <div class="order__item">
                <span class="order__item-name">${name}</span>
                <button class="order__remove" data-remove="${id}">remove</button>
                <span class="order__item-price">$${price}</span>
            </div>
            `
    })
    return cartHtml
}

function getHtml() {
    let menuHtml = getMenuHtml()
    let cartHtml = getCartHtml()

    const totalOrder = cart.reduce((prev, current) => prev + current.price, 0)

    let htmlString = `
        <div class="items">
            ${menuHtml}
        </div>
        <div class="order hidden" id="order">
            <h2 class="order__title">Your order</h2>
            <div class="order__items">
                 ${cartHtml}
            </div>
            <div class="order__summary">
                <span class="order__total">Total</span>
                <span class="order__total-amount">$${totalOrder}</span>
            </div>
            <button class="order__btn" id="order__btn">Complete order</button>
        </div> 
        <div class="modal" id="modal">
            <p class="modal__title">Enter card details</p>
            <form class="modal__form" id="modal__form">
                <input 
                    type="text" 
                    aria-label="Card name" 
                    placeholder="Enter your card name" 
                    required 
                    class="modal__input"
                    name="card-name"
                    title="Insert only letters or spaces."
                    pattern="^[a-zA-Z ]+$"
                />
                <input 
                    type="text" 
                    aria-label="Card number" 
                    placeholder="Enter your card number" 
                    required 
                    class="modal__input"
                    name="card-number"
                    title="Insert only numbers."
                    pattern="^[0-9]+$"
                />
                <input 
                    type="text" 
                    aria-label="Card CVV" 
                    placeholder="Enter CVV" 
                    required 
                    class="modal__input"
                    name="card-cvv"
                    title="Insert only numbers."
                    pattern="^[0-9]+$"
                />
                <button class="modal__btn" type="submit">Pay</button>
            </form>
        </div>
        <div class="confirmation hidden" id="confirmation">
            <span class="confirmation-msg">Thanks, ${clientName}! Your order is on its way!</span>
        </div>
        `
    return htmlString
}

function render() {
    document.getElementById('root').innerHTML = getHtml()
}

render()