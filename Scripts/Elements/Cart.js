import fetchProducts from '../DataBase.js';
import { amountProducts } from '../LoadProducts.js';


fetchProducts().then(allProducts => {
    if (!allProducts) return; // Verifica se houve erro na requisição

    // Recuperar dados do localStorege
    const storage = localStorage.getItem('cartProducts');
    const cartProducts = JSON.parse(storage) || [];

    // Verificar se há produtos no carrinho quantity
    if (storage && storage != '[]') {
        cartProducts.forEach(element => {
            const productQuantity = element.quantity;
            const productAcess = element.productData;
            const productData = allProducts[productAcess];
            addProductCart(productData, productQuantity, allProducts);
            document.querySelector('.main-products').style.display = 'flex';
        });

        resumeBalance(allProducts);

    } else {
        noProductCart()
    }
});

function noProductCart() {
    const noProductCart = document.createElement('article');
    noProductCart.classList.add('no-product-cart');
    noProductCart.innerHTML = `
        <img src="./Images/Empty-cart.png" alt="Carrinho Vazio" class="icon-empty">
        <div class="specifications">
            <h2 class="title">Você ainda não possui produtos no carrinho</h2>
            <p class="desc">Seu carrinho da Little Hair ainda não possui itens, que tal visitar a página da
                <a href="./Pet-Store.html">Loja Pet</a>
                para encontrar algo para seu pet?
            </p>
            <p class="desc">Assim que adicionar um produto ele aparecerá aqui!</p>
        </div>
    `;
    document.querySelector('main.content-products').appendChild(noProductCart);
}

function addProductCart({ category, code, name, oldprice, price, tags, url }, productQuantity, allProducts) {
    const buildProduct = document.createElement('article');
    const cartProducts = document.querySelector('.cart-products');
    buildProduct.dataset.code = code;
    buildProduct.classList.add('product-c', 'style-product');

    const buildDataProduct = `
        <div class="product-desc">
            <span class="product-img">
                <img src="${url}" alt="${name}">
            </span>

            <div class="product-opts">
                <div class="subtitle-products">
                    <h2 class="title-desc">${name}</h2>
                    <p class="product-category">${category}</p>
                    <p class="product-tags">${tags}</p>
                </div>

                <div class="opts">
                    <div class="btn-amount">
                        <button class="decrease-quantity">-</button>
                        <input type="number" id="quantity" name="quantity" value="${productQuantity}" />
                        <button class="increase-quantity">+</button>
                    </div>

                    <div class="btn-delete">
                        <button type="button" class="btn-style-02 delete-product">
                            Excluir
                        </button>
                    </div>

                    <div class="btn-edit">
                        <button type="button" class="btn-style-02 edit-product">
                            Editar
                        </button>
                    </div>

                    <div class="btn-save">
                        <button type="button" class="btn-style-02 save-product">
                            Salvar
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div class="product-price">
            <p class="old-price">R$ ${oldprice}</p>
            <p class="price">R$ ${price}</p>
        </div>
    `;

    buildProduct.innerHTML = buildDataProduct;
    cartProducts.appendChild(buildProduct);
    amountProducts();

    // Remover o Produto do localStorage e do html
    document.querySelectorAll('.delete-product').forEach(button => {
        button.addEventListener('click', () => {
            const code = button.closest('.product-c').dataset.code;

            const cartProductsStorage = JSON.parse(localStorage.getItem('cartProducts'));
            const productCode = `product${code}`;
            const productInCart = cartProductsStorage.filter(product => product.productData !== productCode);

            localStorage.setItem('cartProducts', JSON.stringify(productInCart));
            button.closest('.product-c').remove();

            const storage = localStorage.getItem('cartProducts');
            if (!storage || storage === '[]') {
                noProductCart();
            };

            resumeBalance(allProducts);
        });
    });
}

function resumeBalance(allProducts) {
    const mainBalance = document.querySelector('.main-balance');
    mainBalance.innerHTML = '';

    const buildBalance = document.createElement('article');
    buildBalance.classList.add('style-product');

    const storage = localStorage;
    var deliveryQuantity = storage.length;
    var productQuantity = 0;
    var priceTotal = 0;
    var deliveryTotal = 0;
    var discountTotal = 0;
    var finalTotal = 0;

    const cartProducts = JSON.parse(localStorage.getItem('cartProducts')) || [];
    cartProducts.forEach((i) => {
        const acess = allProducts[i.productData];

        var price = ({ price }) => {
            const formatedPrice = price.toString().replace(',', '.');
            return parseFloat(formatedPrice) * parseInt(i.quantity);
        };

        productQuantity += parseInt(i.quantity);
        priceTotal += price(acess);
        deliveryTotal = priceTotal * 0.08;
        discountTotal = priceTotal * 0.23;
        finalTotal = priceTotal + deliveryTotal - discountTotal;
    });

    const buildDataBalance = `
        <div class="products-resume">
            <div class="sec-resume sec-resume-amount">
                <p>Produtos <span class="resume-amount-products">(${productQuantity})</span></p>
                <p class="resume-value-products">R$ ${priceTotal.toFixed(2)}</p>
            </div>

            <div class="sec-resume sec-resume-frete">
                <p>Fretes <span class="resume-amount-frete">(${deliveryQuantity})</span></p>
                <p class="resume-value-frete">R$ ${deliveryTotal.toFixed(2)}</p>
            </div>

            <div class="sec-resume sec-resume-discount">
                <p>Descontos de Cupom</p>
                <p class="resume-value-discount">R$ -${discountTotal.toFixed(2)}</p>
            </div>

            <div class="sec-resume sec-resume-total">
                <h4 class="resume-label-total">Total</h4>
                <h4 class="resume-value-total">R$ ${finalTotal.toFixed(2)}</h4>
            </div>
        </div>

        <button type="button" class="btn-style-01">Confirmar Pedido</button>
    `;

    buildBalance.innerHTML = buildDataBalance;
    mainBalance.appendChild(buildBalance);
}