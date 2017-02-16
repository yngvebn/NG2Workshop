import { GreetingService } from './greeting.service';
import { AppComponent } from './app.component';
import { async } from '@angular/core/testing';

describe('app.component', () => {
    it('should be defined', () => {
        let appComponent = new AppComponent(new GreetingService());
        expect(appComponent).toBeDefined();
    });

    it('should run async', async(() => {
        expect(true).toBe(true);
    }))

    it('should change', () => {
    let appComponent = new AppComponent(new GreetingService());
        appComponent.changeGreeting();
        appComponent.changeGreeting1();
        appComponent.changeGreeting2();
            })
})