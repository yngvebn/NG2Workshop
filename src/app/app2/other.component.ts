import { GreetingService } from './../greeting.service';
import { ApplicationRef_ } from '@angular/core/src/application_ref';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'other',
    templateUrl: 'other.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class OtherComponent implements OnInit {
    constructor(public greetingService: GreetingService) { }
    public greetingText: string;
    public emitSomething() {
        this.greetingService.updateGreeting('From other');
    }


    ngOnInit() {
        this.greetingService.greeting$.subscribe((greeting) => {
            this.greetingText = greeting;
        });

    }
}