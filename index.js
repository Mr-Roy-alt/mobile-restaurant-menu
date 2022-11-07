import menuArray from '/data.js'

const cart = []

document.addEventListener('click', e => {
    e.target.dataset.add && addItem(e.target.dataset.add)
    e.target.dataset.remove && removeItem(e.target.dataset.remove)
})

function addItem(id) {
    const itemObj = menuArray.filter(i => i.id.toString() === id)[0]
    !cart.includes(itemObj) && cart.push(itemObj)
    render()
}

function removeItem(id) {
    const idx = cart.findIndex(el => el.id.toString() === id)
    cart.splice(idx, 1)
    render()
}

function getHtml() {
    let itemsHtmlString = ``
    let cartHtmlString = ``
    const totalOrder = cart.reduce((prev, current) => prev + current.price, 0)

    menuArray.forEach(item => {
        const { name, ingredients, id, price } = item
        itemsHtmlString += `
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

    cart.forEach(item => {
        const { name, id, price } = item
        cartHtmlString += `
            <div class="order__item">
                <span class="order__item-name">${name}</span>
                <div class="order__remove" data-remove="${id}">remove</div>
                <span class="order__item-price">$${price}</span>
            </div>
            `
    })

    let htmlString = `
        <div class="items">
            ${itemsHtmlString}
        </div>
        <div class="order" id="order">
            <h2 class="order__title">Your order</h2>
            <div class="order__items">
                 ${cartHtmlString}
            </div>
            <div class="order__summary">
                <span class="order__total">Total</span>
                <span class="order__total-amount">$${totalOrder}</span>
            </div>
            <button class="order__btn">Complete order</button>
        </div> 
        `
    return htmlString
}

function render() {
    document.getElementById('root').innerHTML = getHtml()
}

render()