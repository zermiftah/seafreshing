export const paymentMethods = [
    { id: 'credit-card', title: 'Credit card' },
    { id: 'paypal', title: 'PayPal' },
    { id: 'etransfer', title: 'eTransfer' },
];

export const methods = ({ lalamovePrice, grabPrice, delivereePrice }) => {
    return [
        {
            id: 'alamove',
            title: 'Lalamove',
            turnaround: '1 - 2 business days',
            price: `Rp.${lalamovePrice}`,
            clear: lalamovePrice,
        },
        {
            id: 'grab_express',
            title: 'GrabExpress',
            turnaround: '1 - 2 business days',
            price: `Rp.${grabPrice}`,
            clear: grabPrice,
        },
        {
            id: 'deliveree',
            title: 'Deliveree',
            turnaround: '1 - 2 business days',
            price: `Rp.${delivereePrice}`,
            clear: delivereePrice,
        },
    ];
};
