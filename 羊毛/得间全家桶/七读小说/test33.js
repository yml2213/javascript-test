const data = [
    {
        id: 9,
        value: '723756771#16665431356#{"usr":"j184835459","utdid":"ZMDmjRs4Vh4Jw0pd8FZsTacE","token":"a75e7ac2f488881afaba59f9c06657c3","authToken":"15c136fe317185f57fa39e750ae8f32d","nickname":"回风雷阁锻炼滴崔百胜"}',
        timestamp: 'Tue Dec 05 2023 13:02:16 GMT+0800 (China Standard Time)',
        status: 0,
        position: 4499945000000000,
        name: 'qdxs',
        remarks: '723756771',
        createdAt: '2023-12-04T15:41:23.341Z',
        updatedAt: '2023-12-05T05:02:16.171Z'
    },
    {
        id: 12,
        value: '5292953419#13320935461#{"usr":"j185134359","utdid":"ZMsfr1o8VmG9LLEE90Qj98Ih","token":"5b3a00a83565cbb46c581a1b8354e54b","authToken":"c772298aa315ec48269c46cbfba0cc40","nickname":"来炎武城赴约的小茂典"}',
        timestamp: 'Tue Dec 05 2023 00:15:56 GMT+0800 (China Standard Time)',
        status: 0,
        position: 4499940000000000,
        name: 'qdxs',
        remarks: '5292953419',
        createdAt: '2023-12-04T16:15:56.139Z',
        updatedAt: '2023-12-04T16:15:56.139Z'
    },
];

const filteredIds = [];
const phoneNumbers = [];

for (const item of data) {
    const phoneNumber = item.value.split('#')[1];
    if (!phoneNumbers.includes(phoneNumber)) {
        phoneNumbers.push(phoneNumber);
        filteredIds.push(item.id);
    }
}

console.log(filteredIds);