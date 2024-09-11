import fetchProducts from './DataBase.js';
import alertMessage from './Script.js';
import { loadProductsData } from './LoadProducts.js';

const searchIpt = document.querySelector('.ipt-search');
const form = document.querySelector('#form-search');
const products = document.querySelectorAll('.product-i');
const input = document.querySelectorAll('.sec-category input');
const clearFilterBtn = document.querySelector('.filter-btn .ipt-filter');

// Chama a função para limpar o filtro
clearFilterBtn.addEventListener('click', () => {
    clearFilter();
    removeParametrosURL();
});

// Carregar os dados
fetchProducts().then(allProducts => {
    if (!allProducts) return;

    // Atribuir categoria da URL
    assignCategory(allProducts);

    // Event listener para o input de busca
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const searchValue = formData.get('ipt-search').toLowerCase().trim();

        if (searchValue.length < 1) {
            alertMessage('Digite um termo para pesquisar!');
            return;
        } else {
            // Adicionar o termo de busca à URL e atualizar a lista de produtos
            updateUrlParam('search', searchValue);
            search(allProducts, searchValue.split(' '));
        }

        searchIpt.value = '';
    });

    // Event listener para os filtros de categoria
    input.forEach(term => {
        term.addEventListener('click', (e) => {
            const filter = e.target.value.toLowerCase().trim();
            updateUrlParam('category', filter);
            search(allProducts, [filter]);

            input.forEach(i => i.classList.remove('selected'));
            term.classList.toggle('selected');
        });
    });
});

// Função para atribuir categoria da URL
function assignCategory(allProducts) {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category')?.toLowerCase().trim();
    const searchValue = urlParams.get('search')?.toLowerCase().trim();

    if (category) {
        search(allProducts, [category]);
    } else if (searchValue) {
        search(allProducts, searchValue.split(' '));
    }
}

// Função para criar a pesquisa
function search(allProducts, terms) {
    let listProductsFound = [];

    products.forEach(i => {
        const productCode = i.getAttribute('data-code');
        const productAcess = `product${productCode}`;
        const productData = allProducts[productAcess];

        if (productData) {
            const matchesSearch = searchMatches(productData.name, terms) ||
                searchMatches(productData.tags, terms) ||
                searchMatches(productData.category, terms);

            if (matchesSearch) {
                listProductsFound.push(productData);
            }
        }
    });

    if (listProductsFound.length < 1) {
        alertMessage("Nenhum produto encontrado");
    } else {
        const length = listProductsFound.length;
        displaySearchResults(allProducts, listProductsFound, length);
    }

    listProductsFound = [];
}

// Função para verificar se o nome do produto contém todos os termos de busca
function searchMatches(name, searchTerms) {
    const nameLowerCase = name.toLowerCase();
    return searchTerms.some(term => nameLowerCase.includes(term));
}

// Função para exibir os resultados da busca na interface do usuário
function displaySearchResults(allProducts, products, length) {
    const containerMain = document.querySelector('.result-products');
    const resultsContainer = document.querySelector('.results-products');
    const backProductsContainer = document.querySelector('.back-main-products');

    resultsContainer.innerHTML = '';

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
        selectCloseElements.forEach(element => element.classList.add('off'));

        document.getElementById('title-results-products').textContent = `Produto(s) encontrado(s): ${length}`;
        resultsContainer.appendChild(productElement);

        backProductsContainer.addEventListener('click', () => {
            removeParametrosURL();
            clearFilter();
        });
    });

    loadProductsData(allProducts, '.results-products .product-i');
}

// Função para limpar os filtros
function clearFilter() {
    const containerMain = document.querySelector('.result-products');
    const selectCloseElements = document.querySelectorAll('.sec-prod');

    containerMain.classList.add('off');
    selectCloseElements.forEach(element => element.classList.remove('off'));

    input.forEach(i => i.classList.remove('selected'));
}

// Função para remover todos os parâmetros da URL
function removeParametrosURL() {
    const urlBase = window.location.origin + window.location.pathname;
    window.history.pushState({}, '', urlBase);
}

// Função para atualizar os parâmetros da URL sem recarregar a página
function updateUrlParam(key, value) {
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set(key, value);

    const newUrl = `${window.location.pathname}?${urlParams.toString()}`;
    window.history.pushState({}, '', newUrl);
}

export default search;
