import { SiteHeaderComponent } from './header/site-header.component';
import { SiteFooterComponent } from './footer/site-footer.component';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [
        SiteFooterComponent,
        SiteHeaderComponent
    ],
    exports: [
        SiteFooterComponent,
        SiteHeaderComponent
    ]
})
export class SiteModule{
    constructor(){
    }
}