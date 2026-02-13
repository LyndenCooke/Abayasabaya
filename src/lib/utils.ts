export function formatPrice(price: number): string {
  return `QAR ${price.toLocaleString('en-US')}`;
}

export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}
