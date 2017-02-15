import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {AppDevModule} from './app/app.dev.module';

export function main() {
  return platformBrowserDynamic().bootstrapModule(AppDevModule);
}

if (document.readyState === 'complete') {
  main();
} else {
  document.addEventListener('DOMContentLoaded', main);
}