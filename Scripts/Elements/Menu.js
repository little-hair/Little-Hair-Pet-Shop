const btnOpenCart = document.querySelector('.burger.icon');
const modalCart = document.querySelector('.rigth-bar-menu');

// Função para criar o Menu
modalCart.innerHTML = `
        <h3>Menu</h3>

        <nav class="nav">
            <ul>
                <li class="hover">
                    <div class="home icon">
                        <span>
                            <img src="./Images/Home.png" class="" alt="Home (Início)">
                        </span>
                    </div>
                    <a href="./Index.html">Início</a>
                </li>

                <li class="hover">
                    <div class="store icon">
                        <span>
                            <img src="./Images/Store.png" class="" alt="Loja para pets">
                        </span>
                    </div>
                    <a href="./Pet-Store.html">Pet Store</a>
                </li>

                <li class="hover">
                    <div class="plans icon">
                        <span>
                            <img src="./Images/Pet.png" class="" alt="Pet Planos">
                        </span>
                    </div>
                    <a href="./Plans.html">Pet Planos</a>
                </li>

                <li class="hover">
                    <div class="indicate icon">
                        <span>
                            <img src="./Images/Conta.png" class="" alt="Indique o Pet Shop e Ganhe">
                        </span>
                    </div>
                    <a href="./Share.html">Indique e Ganhe</a>
                </li>

                <li class="hover">
                    <div class="cart-bar icon">
                        <span>
                            <img src="./Images/Cart.png" class="" alt="Carrinho de Compras">
                        </span>
                    </div>
                    <a href="./Cart.html">Carrinho</a>
                </li>
            </ul>
        </nav>

        <button type="button" data-url="Accounts" class="btn-style-01">Criar ou Entrar</button>
    `;

btnOpenCart.addEventListener('click', () => { modalCart.classList.toggle('off') });