export function updateCartCount(increase: boolean, value?: number) {
    let current_value = Number(localStorage.getItem('cartCount'));
    const updated_value = value ? current_value - value : (increase ? current_value + 1 : current_value - 1);
    localStorage.setItem('cartCount', String(updated_value));
}
