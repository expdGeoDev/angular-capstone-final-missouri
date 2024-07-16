import { Ng2StateDeclaration, Transition } from '@uirouter/angular';
import { OrderComponent } from './orders/order/order.component';

export const appRouting: Ng2StateDeclaration[] = [
    {
        name: 'orders',
        url: '/order',
        component: OrderComponent,
    },
];