export function updateCartCount(increase: boolean, value: number) {
    let current_value = Number(localStorage.getItem('cartCount'));
    const updated_value = increase ? current_value + value : current_value - value;
    localStorage.setItem('cartCount', String(updated_value));
}
