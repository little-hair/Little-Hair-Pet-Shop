import fetchProducts from './DataBase.js';

const searchIpt = document.querySelector('.ipt-search');
const form = document.querySelector('#form-search');
const products = document.querySelectorAll('.product-i');

fetchProducts().then(allProducts => {
    if (!allProducts) return; // Verifica se houve erro na requisição

    // Event listener para o input de busca
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const Form = new FormData(form);
        const searchValue = Form.get('ipt-search').toLowerCase().trim();
        const searchTerms = searchValue.split(' ');
        let listProductsFound = [];

        // Verifica se há um termo de busca
        if (searchValue.length < 1) {
            alert('Digite um termo para pesquisar!');
            return
        }

        // Limpa o input de busca após a busca
        searchIpt.value = '';

        products.forEach((i) => {
            const productCode = i.getAttribute('data-code');
            const productAcess = `product${productCode}`;
            const productData = allProducts[productAcess];

            // Chama a função para fazer a pesquisa
            if (productData && searchMatches(productData.name, searchTerms)) {
                listProductsFound.push(productData);
            }
        });

        if (listProductsFound.length < 1) {
            console.log('Nenhum produto encontrado');
        } else {
            const length = listProductsFound.length;
            displaySearchResults(listProductsFound, length);
        };

        // Limpa a lista de produtos encontrados
        listProductsFound = [];
    });
});

// Função para verificar se o nome do produto contém todos os termos de busca
function searchMatches(name, searchTerms) {
    const nameLowerCase = name.toLowerCase();
    return searchTerms.some(term => nameLowerCase.includes(term));
};

// Função para exibir os resultados da busca na interface do usuário
function displaySearchResults(products, length) {
    const containerMain = document.querySelector('.result-products');
    const resultsContainer = document.querySelector('.results-products');
    const backProductsContainer = document.querySelector('.back-main-products');

    resultsContainer.innerHTML = ''; // Limpa os resultados anteriores

    products.forEach(product => {
        const productElement = document.createElement('article');
        const selectCloseElements = document.querySelectorAll('.sec-prod');

        productElement.classList.add('product-i');
        productElement.dataset.code = product.code;
        productElement.dataset.name = product.name;
        productElement.dataset.category = product.category;
        productElement.dataset.tags = product.tags;
        productElement.innerHTML = `
            <span class="product-img">
                <img src="${product.url}" alt="${product.name}">
            </span>

            <div class="product-desc">
                <p class="text-desc">${product.name}</p>
                <div class="product-price">
                    <span class="price">R$ ${product.price}</span>
                    <span class="old-price">R$ ${product.oldprice}</span>
                </div>
            </div>
        `;

        containerMain.classList.remove('off');
        selectCloseElements.forEach((element) => {
            element.classList.add('off');
        });

        document.getElementById('title-results-products').textContent = `Produto(s) escontrado(s): ${length}`;
        resultsContainer.appendChild(productElement);

        // Ouvinte de evento do botão voltar do resultado dos produtos:
        backProductsContainer.addEventListener('click', () => {
            containerMain.classList.add('off');
            selectCloseElements.forEach((element) => {
                element.classList.remove('off');
            });
        })
    });
};
