import alertMessage from './Script.js';

function cart() {
    const submitForm = document.querySelector('form.add-cart .btn-style-01');

    submitForm.addEventListener('click', (e) => {
        e.preventDefault();

        // Obter dados do formulário e calcular a subtotal
        const form = document.querySelector('form.add-cart');
        const Form = new FormData(form);
        const code = form.getAttribute('data-code');
        const quantity = Form.get('quantity');

        alertMessage("Produto adicionado ao carrinho!")

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
    });
};

export default cart;