import { Injectable } from '@angular/core';

@Injectable()
export class GreetingService {

    constructor() { }

    public getGreeting(): string{
        return "Greetings from Service";
    }
}