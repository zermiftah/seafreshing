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
            typeVehicle: [
                {
                    key: 'WALKER',
                    name: "Walker",
                    restrictions: 10,
                },
                {
                    key: 'MOTORCYCLE',
                    name: "Motorcycle",
                    restrictions: 10,
                },
                {
                    key: 'CAR',
                    name: "Car",
                    restrictions: 20,
                },
                {
                    key: 'SEDAN',
                    name: "Sedan",
                    restrictions: 100,
                },
                {
                    key: 'VAN',
                    name: 'Van',
                    restrictions: 700,
                },
                {
                    key: 'TRUCK175',
                    name: 'Pickup Truck',
                    restrictions: 800,
                },
                {
                    key: 'TRUCK330',
                    name: '1-Ton Lorry',
                    restrictions: 1000,
                },
                {
                    key: 'TRUCK550',
                    name: '5.5 Ton',
                    restrictions: 1200,
                }
            ]
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
            typeVehicle: [
                {
                    key: 36,
                    name: "Pickup Truck",
                    restrictions: 10,
                },
            ]
        },
    ];
};
