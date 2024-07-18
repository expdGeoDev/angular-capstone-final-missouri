import { OrderComponent } from './orders/order/order.component';
import { CoffeeDetailComponent } from "./coffee-detail/coffee-detail.component";
import { AboutComponent } from './about/about.component';

export const appRouting = [
    {
        name: 'orders',
        url: '/order',
        component: OrderComponent,
        label : 'Coffees to Order'
    },  {
        name : 'coffee-detail',
        url: '/coffee-detail',
        component: CoffeeDetailComponent,
        label : 'Coffee Detail',
        params: {
            data: null 
        }
    },
    {
        name: 'about-detail',
        url: '/about-detail',
        component: AboutComponent,
        label: 'About Detail'
    }
];