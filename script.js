const POST_KEYS = [
    'bfmr',
    'usa',
    'b&m',
];
const KEYS = [
    'itemId',
    'itemName',
    'orderDate',
    'quantity',
    'store',
    'cost',
    'payback',
    ...POST_KEYS,
];
const APP_URL = 'https://script.google.com/macros/s/AKfycbwRIuv4W5SO8GPypd6l_Dqp5aS1zSV0cHF8W9rX8EAMue1KCJzCYqpjb0E8m_W-kOEK/exec';
const params = window.location.search || '';
const appFetch = async (info) => {
    const response = await fetch(`${APP_URL}${params}`, { method: 'POST', ...info });
    return response.json();
};

const elements = KEYS.reduce((acc, id) => (
    acc[id] = document.getElementById(id), acc
), {});

const saveBtn = document.getElementById('saveBtn');
saveBtn.addEventListener('click', saveData);


const urlParams = new URLSearchParams(params);
const itemId = urlParams.get('itemId');

let data;

getData();

//

async function getData() {
    const res = await appFetch();

    if (typeof res === 'object') {
        data = res;

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

            const valueMethod = element.tagName === 'INPUT' ? 'value' : 'innerText';
            element[valueMethod] = value;
        });
    }
}

async function saveData() {
    const keysData = POST_KEYS.reduce((acc, key) => (
        acc[key] = elements[key].value, acc
    ), {});

    const postData = POST_KEYS.reduce((acc, key) => {
        const value = keysData[key];

        if (data[key] !== value) {
            acc[getKeyIdx(key)] = value;
        } else {
            delete keysData[key];
        }

        return acc;
    }, {});

    if (!Object.keys(postData).length) return;

    const res = await appFetch({
        body: JSON.stringify(postData),
    });

    if (res.status === 'OK') {
        for (const key in keysData) {
            const value = keysData[key];
            data[key] = value;
            elements[key].value = value;
        }
    }
}

//

function formatDate(value) {
    const date = new Date(value);
    if (!+date) return value;
    return date.toLocaleDateString();
}

function getKeyIdx(key) {
    return KEYS.findIndex(k => k === key) + 1;
}