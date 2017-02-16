import { GreetingService } from './greeting.service';
import { Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'app',
    templateUrl: 'app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    public greetingText: string = "Angular Workshop from Component";

    constructor(greetingService: GreetingService) {
        this.greetingText = greetingService.getGreeting();
    }

    changeGreeting(){
        this.greetingText = "I was changed!";
    }

    changeGreeting1(){
        this.greetingText = "I'm single!";
    }
    
    changeGreeting2(){
       this.greetingText = "Double trouble!";
    }
}