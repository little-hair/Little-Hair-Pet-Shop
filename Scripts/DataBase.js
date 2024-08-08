// Fetch
const url = 'https://raw.githubusercontent.com/little-hair/Data-Base-Pet/main/Data-Base-Json/Products-Data.json';

async function fetchProducts() {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.Products;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}

export default fetchProducts;
