import { Intl } from 'react-intl';

export function formatPrice(shekel) {
    const formatter = new Intl.NumberFormat(undefined, {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        // the default value for minimumFractionDigits depends on the currency
        // and is usually already 2
    });
    return formatter.format(shekel);
}
