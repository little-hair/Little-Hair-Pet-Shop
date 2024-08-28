import fetchProducts from './DataBase.js';
import cart from './Data-Cart.js';

// Fetch dos dados dos produtos
fetchProducts().then(allProducts => {
    // Verifica se houve erro na requisição
    if (!allProducts) return;
    loadProductsData(allProducts, '.product-i');
});

// Carrega dados dos produtos
function loadProductsData(allProducts, selector) {
    const products = document.querySelectorAll(selector);

    products.forEach((i) => {
        const productCode = i.getAttribute('data-code');
        const productAcess = `product${productCode}`;
        const productData = allProducts[productAcess];

        i.setAttribute('data-name', productData.name);
        i.setAttribute('data-tags', productData.tags);
        i.setAttribute('data-category', productData.category);
        i.innerHTML = loadProducts(productData);

        i.addEventListener('click', (i) => {
            buildProductsWindow(productData, allProducts);
        });
    });
}

// Constrói o conteúdo dos produtos
function loadProducts({ name, price, oldprice, url }) {
    return `
    <span class="product-img">
        <img src="${url}" alt="${name}">
    </span>
    <div class="product-desc">
        <p class="text-desc">${name}</p>
        <div class="product-price">
            <span class="price">R$ ${price}</span>
            <span class="old-price">R$ ${oldprice}</span>
        </div>
    </div>
    `;
}

// Constrói a janela dos produtos
function buildProductsWindow(productData, allProducts) {
    const { name, price, oldprice, url, description, category, tags, code } = productData;
    const modal = document.querySelector('.buy-products');

    // Limpar o conteúdo anterior do modal
    modal.innerHTML = '';
    modal.classList.remove('off-modal');
    document.body.style.overflowY = 'hidden';

    const productWindow = `
        <!-- Cabeçalho da tela de Detalhes -->
        <div class="header-window-product">
            <h1>Detalhes</h1>
            <div class="icon hover">
                <img src="./Images/Icons/Close.png" class="close-modal" alt="Fechar Modal">
            </div>
        </div>

        <article class="main-window-product">
            <section class="side-left">
                <!-- Área das Miniaturas -->
                <div class="thumbnails">
                    <img src="${url}" alt="${name}">
                    <img src="${url}" alt="${name}">
                    <img src="${url}" alt="${name}">
                    <img src="${url}" alt="${name}">
                </div>

                <!-- Área da Imagem Principal sendo Exibida -->
                <div class="img-product">

                    <!-- Botões de Compartilhar e Gostei (Like) -->
                    <div class="btn-buttons">
                        <span class="icon">
                            <img src="./Images/Icons/btn-share-2.jpeg" alt="Botão Compartilhar" class="btn-share">
                        </span>
                        <span class="icon">
                            <img src="./Images/Icons/btn-like-2.jpeg" alt="Botão Curtir" class="btn-like">
                        </span>
                    </div>

                    <!-- Imagem Principal da tela -->
                    <img src="${url}" alt="${name}" class="img-main">
                </div>
            </section>

            <section class="side-rigth">
                <!-- Área das Especificações do Produto -->
                <div class="specifications">

                    <!-- Texto com as especificações do produto -->
                    <div class="title-products">
                        <h2>${name}</h2>
                        <p>${description}</p>
                    </div>

                    <div class="subtitle-products">
                        <p class="product-category"><strong>Categoria:</strong> ${category}</p>
                        <p class="product-tags"><strong>Tags:</strong> ${tags}</p>
                    </div>

                    <!-- Preço normal e preço com desconto -->
                    <div class="prices">
                        <h3 class="old-price">${oldprice}</h3>
                        <h2 class="new-price">${price}</h2>
                    </div>
        
                    <!-- Botões de incremento, decremento e input para inserir a quantidade -->
                    <form method="get" class="add-cart" data-code="${code}">
                        <div class="btn-amount">
                            <button class="decrease-quantity">-</button>
                            <input type="number" id="quantity" name="quantity" value="1" />
                            <button class="increase-quantity">+</button>
                        </div>
                        
                        <!-- Botão para adicionar ao carrinho -->
                        <button type="submit" value="Adicionar ao Carrinho" class="btn-style-01">Adicionar ao Carrinho</button>
                    </form>
                </div>
            </section>
        </article>

        <!-- Área contendo as imagens de produtos relacionados -->
        <article class="others">
            <div class="title-others-products">
                <h3>Outros produtos semelhantes</h3>
            </div>
            <div class="same-products">
            </div>
        </article>
    `;

    const detailsScreen = document.createElement('section');
    detailsScreen.classList.add('details-screen');
    detailsScreen.innerHTML = productWindow;
    modal.appendChild(detailsScreen);

    findSimilarProducts(allProducts, productData);


    const closeModal = document.querySelector(".close-modal");
    closeModal.addEventListener('click', () => {
        modal.classList.add('off-modal');
        document.body.style.overflowY = 'scroll';
        modal.innerHTML = '';
    });

    amountProducts();
    cart();

}

// Buscar produtos semelhantes
function findSimilarProducts(allProducts, thisProduct) {
    const similarProducts = [];
    const tagsThisProduct = thisProduct.tags.split(', ');

    for (const key in allProducts) {
        const product = allProducts[key];

        if (thisProduct.category === product.category && tagsThisProduct.some(tag => product.tags.includes(tag))) {
            similarProducts.push(product);
        }
    }

    similarProducts.forEach((similar) => {
        const sameProduct = document.createElement('article');
        sameProduct.dataset.code = similar.code;
        sameProduct.classList.add('same-product', 'product-i');
        sameProduct.innerHTML = loadProducts(similar);
        document.querySelector('.same-products').appendChild(sameProduct);
    });

    // Adiciona event listeners aos produtos semelhantes criados
    loadProductsData(allProducts, '.same-product');
}

// Contar quantidade de produtos
function amountProducts() {
    const decrease = document.querySelector('.decrease-quantity');
    const increase = document.querySelector('.increase-quantity');
    const quantity = document.querySelector('#quantity');

    // Verificar se os botões existem
    if (!increase || !decrease || !quantity) {
        console.error('Elementos de quantidade não encontrados');
        return;
    }

    let valueCount = 1;

    increase.addEventListener('click', (e) => {
        e.preventDefault();
        valueCount += 1;
        quantity.value = valueCount;
    });

    decrease.addEventListener('click', (e) => {
        e.preventDefault();
        if (valueCount > 1) {
            valueCount -= 1;
            quantity.value = valueCount;
        }
    });
}

export { amountProducts, loadProductsData };