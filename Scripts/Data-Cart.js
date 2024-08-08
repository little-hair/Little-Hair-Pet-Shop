function cart() {
    const submitForm = document.querySelector('form.add-cart .btn-style-01');

    submitForm.addEventListener('click', (e) => {
        e.preventDefault();

        // Obter dados do formulário e calcular a subtotal
        const form = document.querySelector('form.add-cart');
        const Form = new FormData(form);
        const code = form.getAttribute('data-code');
        const quantity = Form.get('quantity');

        const detailsScreen = document.querySelector('body');
        const alertAddToCart = document.createElement('div');
        alertAddToCart.classList.add('alert-cart');
        alertAddToCart.innerHTML = `<p class="alert-add-cart">Produto adicionado ao carrinho!</p>`;
        detailsScreen.appendChild(alertAddToCart);

        // Enviar dados do cart para o localStorage
        const cartProducts = JSON.parse(localStorage.getItem('cartProducts')) || [];
        const productData = `product${code}`;

        const productInCart = cartProducts.find(product => product.code === code);

        if (productInCart) {
            productInCart.quantity += Number(quantity);
        } else {
            cartProducts.push({ productData, quantity: Number(quantity) });
        }

        localStorage.setItem('cartProducts', JSON.stringify(cartProducts));

        // Limpar formulário
        form.reset();

        // Destruir alert após 5 segundos
        setTimeout(() => {
            const alertCart = document.querySelector('.alert-cart');
            alertCart.remove();
        }, 5000);
    });
};

export default cart;