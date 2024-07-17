import { AboutComponent } from "./about/about.component";
import { CoffeeDetailComponent } from "./coffee-detail/coffee-detail.component";
import { CoffeeSvcTestComponent } from "./coffee-svc-test/coffee-svc-test.component";

export const routerStates = [
    {
        name : 'coffee-detail',
        url: '/coffee-detail',
        component: CoffeeDetailComponent,
        label : 'Coffee Detail'
    },
    {
        name: 'coffee-svc-test',
        url: '/coffee-svc-test',
        component: CoffeeSvcTestComponent,
        label: 'Service Tests'
    },
    {
        name: 'about-detail',
        url: '/about',
        component: AboutComponent,
        label: 'About Detail'
    }

]