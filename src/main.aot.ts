import {enableProdMode} from '@angular/core';
import {platformBrowser} from '@angular/platform-browser';
import {AppAotModuleNgFactory} from './app/app.aot.module.ngfactory';

enableProdMode();

platformBrowser().bootstrapModuleFactory(AppAotModuleNgFactory);