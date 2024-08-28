// Variáveis para o código
const element_li = document.querySelectorAll('header li.hover');
const categories = document.querySelectorAll('.category');

// Criando a animação na barra de navegação.
element_li.forEach((i) => {
    i.addEventListener('mouseover', () => {
        document.querySelector('.icon.on').classList.add('off');
        document.querySelector('.icon.on').classList.remove('on');
        i.querySelector('div.icon').classList.add('on');
        i.querySelector('div.icon').classList.remove('off');

        i.addEventListener('mouseleave', () => {
            document.querySelector('.icon.on').classList.add('off');
            document.querySelector('.icon.on').classList.remove('on');
            document.querySelector('.active.icon').classList.add('on');
            document.querySelector('.active.icon').classList.remove('off');
        });
    });
});

// Colocando o background-image no css
categories.forEach((i) => {
    const data_name = i.getAttribute('data-name');
    const img_url = `url('./Images/${data_name}.png')`;
    i.style.backgroundImage = img_url;
});

// Permitindo que elementos sejam clicáveis com url
categories.forEach((i) => {
    if (i.classList.contains('link')) {
        i.addEventListener('click', () => {
            window.location.href = `${i.getAttribute('data-url')}.html`;
        });
    } else {
        i.addEventListener('click', () => {
            const dataCategory = i.getAttribute('data-name');
            const term = dataCategory.toLowerCase().trim();
            window.location.href = `${i.getAttribute('data-url')}.html?category=${term}`;
        });
    };
});

function alertMessage(message) {
    // Cria um novo alert com a mensagem passada como parâmetro e adiciona-o ao body do documento
    const detailsScreen = document.querySelector('body');
    const alertAddToCart = document.createElement('div');
    alertAddToCart.classList.add('alert-cart');
    alertAddToCart.innerHTML = `<p class="alert-add-cart">${message}</p>`;
    detailsScreen.appendChild(alertAddToCart);

    // Destrói o alert após 3 segundos
    setTimeout(() => {
        const alertCart = document.querySelector('.alert-cart');
        alertCart.remove();
    }, 3800);
};

export default alertMessage;