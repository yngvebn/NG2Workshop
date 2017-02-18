import { BehaviorSubject } from 'rxjs/Rx';
import { Injectable } from '@angular/core';

@Injectable()
export class GreetingService {
    public greeting$: BehaviorSubject<string> = new BehaviorSubject<string>('Initial greeting');

    constructor() {
        console.log('I was constructed');
     }
    public updateGreeting(greeting) {
        this.greeting$.next(greeting);
    }
    
}