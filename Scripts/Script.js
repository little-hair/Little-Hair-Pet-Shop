// Variáveis para o código
const element_li = document.querySelectorAll('header li.hover');
const event_off = document.querySelectorAll('#off');
const event_on = document.querySelectorAll('.on');
const categories = document.querySelectorAll('.link');

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
    i.addEventListener('click', () => {
        window.location.href = `${i.getAttribute('data-url')}.html`;
    });
});