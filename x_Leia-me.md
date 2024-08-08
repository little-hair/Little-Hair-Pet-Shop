# Guia de Padronização de Design para Website

**POR FAVOR FORNEÇA COMENTÁRIOS AO LONGO DO SEU CÓDIGO PARA SABERMOS DO QUE SE TRATA!**

## HTML
### Estrutura de Layout

**Header**
> Deve conter o logotipo, menu de navegação, e opções de conta do usuário.


Exemplo:
```
<header>
  <div class="logo">
    <img src="logo.png" alt="Little Hair">
  </div>
  
  <nav>
    <ul>
      <li><a href="#">Início</a></li>
      <li><a href="#">Agendamentos</a></li>
      <li><a href="#">Meu Pet</a></li>
      <li><a href="#">Minha Conta</a></li>
    </ul>
  </nav>
</header>
```
<hr>

**Main Section**
> Deve ser dividido em seções claras usando `<section>`.

Exemplo:
```
<main>
  <section class="banner">
    <h1>Aqui temos um plano de Saúde pensado só para seu PET</h1>
    <span class="discount">10% off</span>
  </section>
  
  <section class="categories">
    <article class="category">
      <h2>Rações</h2>
      <img src="racoes.jpg" alt="Rações">
    </article>
    
    <article class="category">
      <h2>Acessórios</h2>
      <img src="acessorios.jpg" alt="Acessórios">
    </article>
    
    <!-- Adicionar outras categorias conforme necessário -->
  </section>
</main>
```
<hr>

**Footer**
> Deve incluir informações de contato, links de redes sociais, e avisos legais.

Exemplo:
```
<footer>
  <p>&copy; 2024 Little Hair Pet shop & Clínica</p>
  <nav>
    <ul>
      <li><a href="#">Política de Privacidade</a></li>
      <li><a href="#">Termos de Uso</a></li>
    </ul>
  </nav>
</footer>
```
<hr>

## CSS

**Padrão de Cores**
> Utilize uma paleta de cores consistente. 

Exemplo:
```
:root {
  --primary-color: #6A5ACD; /* cor principal */
  --secondary-color: #FFD700; /* cor secundária */
  --background-color: #F0F0F0; /* cor de fundo */
  --text-color: #333333; /* cor do texto */
}
```
<hr>

**Layout e Grid**
> Utilize o sistema de grid de 8px para margens e paddings.

Exemplo:
```
.container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px; /* 2 * 8px */
}
```
<hr>

**Estilos de Borda**
> Cantos arredondados devem seguir a regra de que elementos filhos têm menos arredondamento que seus pais.

Exemplo:
```
.parent {
  border-radius: 16px;
}

.child {
  border-radius: 8px;
}
```
<hr>

**Animações**
> Animações devem ser fluidas e não excessivas.

Exemplo:
```
.button {
  transition: background-color 0.3s ease;
}

.button:hover {
  background-color: var(--secondary-color);
}
```
<hr>

**Definição de Variáveis no `:root`**
> Utilize o seletor `:root` para definir todas as variáveis CSS globais que serão utilizadas em todo o projeto. Isso facilita a manutenção e permite ajustes rápidos no design do site.

Exemplo:
```
:root {
  /* Cores */
  --primary-color: #6A5ACD; /* Azul Royal */
  --secondary-color: #FFD700; /* Dourado */
  --background-color: #F0F0F0; /* Cinza Claro */
  --text-color: #333333; /* Preto Cinza */
  --white-color: #FFFFFF; /* Branco */
  --accent-color: #FF69B4; /* Rosa Choque */

  /* Tipografia */
  --font-family: 'Arial, sans-serif';
  --font-size-base: 16px;
  --font-size-large: 24px;
  --font-size-small: 14px;

  /* Espaçamento (Baseado no Grid de 8px) */
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 32px;
  --spacing-xl: 64px;

  /* Bordas */
  --border-radius-sm: 4px;
  --border-radius-md: 8px;
  --border-radius-lg: 16px;

  /* Sombreamento */
  --box-shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.1);
  --box-shadow-md: 0 4px 8px rgba(0, 0, 0, 0.1);
  --box-shadow-lg: 0 8px 16px rgba(0, 0, 0, 0.1);

  /* Transições */
  --transition-speed: 0.3s;
  --transition-ease: ease-in-out;
}
```
<hr>

### Layout de Componentes

**Header Css**

Exemplo:
```
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 32px;
  background-color: var(--primary-color);
  color: #ffffff;
}

header .logo img {
  height: 40px;
}

header nav ul {
  list-style: none;
  display: flex;
  gap: 16px;
}

header nav ul li a {
  text-decoration: none;
  color: #ffffff;
}
```
<hr>

**Main Section Css**

Exemplo:
```
.banner {
  background-color: var(--secondary-color);
  text-align: center;
  padding: 32px;
  border-radius: 16px;
}

.banner h1 {
  margin: 0;
  color: var(--text-color);
}

.banner .discount {
  font-size: 1.2em;
  color: var(--primary-color);
}

.categories {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin: 32px 0;
}

.category {
  flex: 1 1 calc(33.333% - 16px);
  background-color: #ffffff;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.category img {
  max-width: 100%;
  border-radius: 4px;
}
```
<hr>

**Footer Css** 

Exemplo:
```
footer {
  background-color: var(--primary-color);
  color: #ffffff;
  padding: 16px 32px;
  text-align: center;
}

footer nav ul {
  list-style: none;
  display: flex;
  justify-content: center;
  gap: 16px;
  padding: 0;
  margin: 16px 0 0 0;
}

footer nav ul li a {
  text-decoration: none;
  color: #ffffff;
}
```
<hr>

## Considerações Finais

**HTML Semântico:** Priorize o uso de elementos semânticos como `<header>`, `<nav>`, `<main>`, `<section>`, e `<footer>` em vez de `<div>`.

**Reutilização de Estilos:** Centralize os estilos reutilizáveis em classes CSS para evitar duplicação e facilitar a manutenção.

**Responsividade:** Certifique-se de que o design seja responsivo, utilizando media queries conforme necessário para adaptar a interface a diferentes tamanhos de tela.

Seguindo este guia, todos os desenvolvedores poderão criar e manter páginas que seguem um padrão de design consistente e profissional, facilitando a colaboração e a manutenção do projeto.