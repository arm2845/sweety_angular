export enum OrderStatuses {
    pending = 1,
    accepted = 2,
    rejected = 3,
    paid = 4,
    given = 5,
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
