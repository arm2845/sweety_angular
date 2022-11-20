export enum OrderStatuses {
    pending = 1,
    accepted = 2,
    rejected = 3,
    ready = 4,
    paid = 5,
    given = 6,
}

export const OrderStatusesData = [
    {
        id: OrderStatuses.pending,
        name: 'Pending',
        color: '#ffd60a',
    },
    {
        id: OrderStatuses.accepted,
        name: 'Accepted',
        color: '#00b4d8',
    },
    {
        id: OrderStatuses.rejected,
        name: 'Rejected',
        color: '#ef233c',
    },
    {
        id: OrderStatuses.ready,
        name: 'Ready',
        color: '#7209b7',
    },
    {
        id: OrderStatuses.paid,
        name: 'Paid',
        color: '#52b788',
    },
    {
        id: OrderStatuses.given,
        name: 'Given',
        color: '#001f54',
    },
]
