const footer = document.querySelector('footer');

// Add a footer to the body
footer.innerHTML = `
    <!-- Footer - Rodapé -->
    <div class="newsletter">
        <h3>Cadastre-se para receber nossas promoções e novidades!</h3>
        <form>
            <input type="email" placeholder="Seu e-mail">
            <input type="text" placeholder="Qual seu Pet">
            <button type="submit" class="btn-style-01">Cadastrar</button>
        </form>
        <p><small>Ao se cadastrar você concorda com a nossa <a href="#">política de privacidade.</a></small></p>
    </div>
    <div class="footer-content">
        <div class="footer-section">
            <h3>Institucional</h3>
            <ul>
                <li><a href="#">Sobre a Little Hair</a></li>
                <li><a href="#">Trabalhe Conosco</a></li>
                <li><a href="#">Canal de Denúncias</a></li>
                <li><a href="#">Relações com Investidores</a></li>
                <li><a href="#">Portal Little Hair</a></li>
            </ul>
        </div>
        <div class="footer-section">
            <h3>Aqui Você Encontra</h3>
            <ul>
                <li><a href="#">Assinatura Little Hair</a></li>
                <li><a href="#">Retire na Loja</a></li>
                <li><a href="#">Pesquise Lá, Compre Aqui</a></li>
                <li><a href="#">Nossos Diferenciais</a></li>
                <li><a href="#">Como Comprar</a></li>
            </ul>
        </div>
        <div class="footer-section">
            <h3>Nossas Políticas</h3>
            <ul>
                <li><a href="#">Entrega e Frete</a></li>
                <li><a href="#">Pagamentos e Reembolso</a></li>
                <li><a href="#">Trocas e Devolução</a></li>
                <li><a href="#">Campanhas e Promoções</a></li>
                <li><a href="#">Política de Privacidade</a></li>
            </ul>
        </div>
        <div class="footer-section">
            <h3>Ajuda</h3>
            <ul>
                <li><a href="#">Atendimento</a></li>
                <li><a href="#">Meus Pedidos</a></li>
                <li><a href="#">Meu Cadastro</a></li>
                <li><a href="#">Minhas Assinaturas</a></li>
                <li><a href="#">Ouvidoria</a></li>
            </ul>
        </div>
        <div class="footer-section">
            <h3>Baixe o Nosso App</h3>
            <div class="app-links">
                <img src="./Images/QR Code.png" alt="QR Code">
                <div class="img-links">
                    <a href="#"><img src="./Images/apple-app.png" alt="App Store"></a>
                    <a href="#"><img src="./Images/play-app.png" alt="Google Play"></a>
                </div>
            </div>
        </div>
    </div>`;