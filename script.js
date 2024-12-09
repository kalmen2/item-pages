// const items = [
//     {
//         itemId: "001",
//         itemName: "Wireless Mouse",
//         orderDate: "2024-12-01",
//         quantity: 2,
//         store: "TechMart",
//         cost: "$25.99",
//         payback: "$5.00"
//     },
//     {
//         itemId: "002",
//         itemName: "Bluetooth Headphones",
//         orderDate: "2024-11-28",
//         quantity: 1,
//         store: "AudioWorld",
//         cost: "$79.99",
//         payback: "$10.00"
//     },
//     {
//         itemId: "003",
//         itemName: "Mechanical Keyboard",
//         orderDate: "2024-12-05",
//         quantity: 1,
//         store: "KeyboardKing",
//         cost: "$49.99",
//         payback: "$7.50"
//     },
//     {
//         itemId: "004",
//         itemName: "USB-C Charger",
//         orderDate: "2024-12-03",
//         quantity: 3,
//         store: "ChargerHub",
//         cost: "$29.99",
//         payback: "$8.00"
//     },
//     {
//         itemId: "005",
//         itemName: "External Hard Drive",
//         orderDate: "2024-11-30",
//         quantity: 1,
//         store: "StorageDepot",
//         cost: "$120.00",
//         payback: "$15.00"
//     }
// ];

const KEYS = [
    'itemId',
    'itemName',
    'orderDate',
    'quantity',
    'store',
    'cost',
    'payback',
];
const APP_URL = 'https://script.google.com/macros/s/AKfycbwRIuv4W5SO8GPypd6l_Dqp5aS1zSV0cHF8W9rX8EAMue1KCJzCYqpjb0E8m_W-kOEK/exec';

const elements = KEYS.reduce((acc, id) => {
    acc[id] = document.getElementById(id);
    return acc;
}, {});

const urlParams = new URLSearchParams(window.location.search);
const itemId = urlParams.get('itemId');

(async () => {
    const response = await fetch(APP_URL);
    const items = await response.json();

    const data = items.find(item => item.itemId === itemId);

    Object.keys(data).forEach(key => {
        const element = elements[key];
        let value = data[key];

        switch (key) {
            case 'orderDate':
                value = formatDate(value);
                break;

            default:
                break;
        }

        element.innerText = value;
    });
})();


function formatDate(value) {
    const date = new Date(value);
    if (!+date) return value;
    return date.toLocaleDateString();
}