import { AppComponent } from './app.component';
import { async } from '@angular/core/testing';

describe('app.component', () => {
    it('should be defined', () => {
        let appComponent = new AppComponent();
        expect(appComponent).toBeDefined();
    });

    it('should also fail', () => {
        expect(false).toBe(true);
    });

    it('should run async', async(() => {
        expect(true).toBe(true);
    }))
})