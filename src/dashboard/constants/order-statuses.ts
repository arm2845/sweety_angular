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
        name: 'MAIN-PHRASES.ORDER.STATUSES.PENDING',
        color: '#ffd60a',
    },
    {
        id: OrderStatuses.accepted,
        name: 'MAIN-PHRASES.ORDER.STATUSES.ACCEPTED',
        color: '#00b4d8',
    },
    {
        id: OrderStatuses.rejected,
        name: 'MAIN-PHRASES.ORDER.STATUSES.REJECTED',
        color: '#ef233c',
    },
    {
        id: OrderStatuses.ready,
        name: 'MAIN-PHRASES.ORDER.STATUSES.READY',
        color: '#7209b7',
    },
    {
        id: OrderStatuses.paid,
        name: 'MAIN-PHRASES.ORDER.STATUSES.PAID',
        color: '#52b788',
    },
    {
        id: OrderStatuses.given,
        name: 'MAIN-PHRASES.ORDER.STATUSES.GIVEN',
        color: '#001f54',
    },
]
