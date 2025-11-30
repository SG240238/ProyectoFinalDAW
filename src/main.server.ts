import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app';
import { config } from './app/app.config.server';
import { provideServerRendering } from '@angular/ssr';

const bootstrap = (context: unknown) =>
  bootstrapApplication(AppComponent, {
    ...config,
    providers: [
      ...(config.providers ?? []),
      provideServerRendering()
    ]
  });

export default bootstrap;