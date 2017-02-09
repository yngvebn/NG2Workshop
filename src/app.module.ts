import { SiteFooterComponent } from './site-footer/site-footer.component';
import { SiteHeaderComponent } from './site-header/site-header.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

@NgModule({
    imports: [BrowserModule],
    declarations: [
        AppComponent,
        SiteHeaderComponent,
        SiteFooterComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }