import { OrderComponent } from './orders/order/order.component';
import { CoffeeDetailComponent } from "./coffee-detail/coffee-detail.component";
import { HomePageComponent } from './home-page/home-page.component';

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
        label : 'Coffee Detail'
    }, 
    {
        name : 'home-page',
        url: '/home-page',
        component: HomePageComponent,
        label : 'Home Page'
    }
];