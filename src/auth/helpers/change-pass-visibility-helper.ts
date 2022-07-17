export function changePassVisibility(target: any, id: string): void {
  if (target.classList.contains('icon-hide-pass')) {
    target.classList.remove('icon-hide-pass')
    target.classList.add('icon-show-pass');
    document.getElementById(id)?.setAttribute('type', 'text');
  } else {
    target.classList.remove('icon-show-pass')
    target.classList.add('icon-hide-pass');
    document.getElementById(id)?.setAttribute('type', 'password');
  }
}
