import { Component } from '@angular/core';
import { SrefStatus, UIRouterModule } from '@uirouter/angular';

@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [UIRouterModule],
    template: `
		<div class="row">
			<div class="col">
				<nav class="navbar navbar-expand-md bg-primary-subtle">
					<div class="collapse navbar-collapse">
						<ul class="navbar-nav">
							<li
								class="nav-item"
								(uiSrefStatus)="handleLiChange($event, 'orders')"
							>
								<a
									uiSref="orders"
									uiSrefActive="active"
									[attr.aria-current]="ariaCurrentStates['orders']"
									class="nav-link"
								>
									Coffe Orders
								</a>
							</li>
						</ul>
					</div>
				</nav>
			</div>
		</div>
	`,
    styles: ``,
})
export class NavbarComponent {
    handleLiChange(event: SrefStatus, linkName: string) {
        // Only run this when event.active is true
        if (!event.active) return;

        // Reset everything to false, briefly.
        for (let key of Object.keys(this.ariaCurrentStates)) {
            this.ariaCurrentStates[key] = false;
        }

        // Update the appropriate value
        this.ariaCurrentStates[linkName] = 'page';
    }

    ariaCurrentStates: { [key: string]: boolean | string } = {
        conceptDemos: false,
        realWorld: false,
        routingLazily: false,
    };
}