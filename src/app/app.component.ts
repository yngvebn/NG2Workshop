import { GreetingService } from './greeting.service';
import { Component, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app',
    templateUrl: 'app.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
    public greetingText: string = "Angular Workshop from Component";

    constructor(public greetingService: GreetingService) {
    }

    ngOnInit() {
        this.greetingService.greeting$.subscribe((greeting) => {
            this.greetingText = greeting;
        });

    }

    changeGreeting() {
        this.greetingService.updateGreeting("I was changed!");
    }
}