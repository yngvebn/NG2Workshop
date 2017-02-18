import { OtherModule } from './app2/other.module';
import { OtherComponent } from './app2/other.component';
import { SiteModule } from './site/site.module';
import { GreetingService } from './greeting.service';
import { NgModule, Inject, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

const entryComponents: any[] = [
    OtherComponent,
    AppComponent
]

@NgModule({
    entryComponents: [
        ...entryComponents
    ],
    imports: [
        BrowserModule,
        SiteModule,
        OtherModule
    ],
    declarations: [
        AppComponent,
    ],
    providers: [
        GreetingService
    ]
})
export class AppModule {
    constructor() {
        console.log(`AppModule instansiated`);
    }

    ngDoBootstrap(appRef: ApplicationRef) {
        // entryComponents.forEach(comp => {
        if (document.querySelectorAll('app').length > 0) {
            appRef.bootstrap(AppComponent);
        }
        if (document.querySelectorAll('other').length > 0) {
            appRef.bootstrap(OtherComponent);
        }
        // const metadata = Reflect.getMetadata('Component', comp);
        // console.log(`I'm bootstrapping manually!`, metadata, comp);
        // });

    }
}