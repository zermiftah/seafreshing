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
            typeVehicle: [
                {
                    key: "INSTANT",
                    name: "Instant",
                    restrictions: 10,
                },
                {
                    key: "BULK",
                    name: "BULK",
                    restrictions: 10,
                },
            ]
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
                    "name": "Pickup Truck",
                },
                {
                    key: 24,
                    "name": "Engkel Box",
                },
                {
                    key: 23,
                    "name": "Small Box",
                },
                {
                    key: 21,
                    "name": "Small Pickup",
                },
                {
                    key: 14,
                    "name": "Van",
                },
                {
                    key: 75,
                    "name": "Engkel Pickup",
                },
                {
                    key: 76,
                    "name": "Double Engkel Pickup",
                },
                {
                    key: 77,
                    "name": "Fuso Lite",
                },
                {
                    key: 78,
                    "name": "Fuso Heavy",
                }, {
                    key: 107,
                    "name": "Phuc test",
                },
                {
                    key: 108,
                    "name": "Tronton Wing Box",
                },
                {
                    key: 12,
                    "name": "Economy",
                },

            ]
        },
    ];
};
