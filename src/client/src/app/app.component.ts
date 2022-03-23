import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { context, trace } from '@opentelemetry/api';
import { ConsoleSpanExporter, SimpleSpanProcessor } from '@opentelemetry/sdk-trace-base';
import { WebTracerProvider } from '@opentelemetry/sdk-trace-web';
import { registerInstrumentations } from '@opentelemetry/instrumentation';
import { B3Propagator } from '@opentelemetry/propagator-b3';
import { ZoneContextManager } from '@opentelemetry/context-zone';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { XMLHttpRequestInstrumentation } from '@opentelemetry/instrumentation-xml-http-request';

interface WeatherForecast {
        date: Date;
        temperatureC: number;
        temperatureF: number;
        summary: string;
    }

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'client';
  result: WeatherForecast[] = [];
  private provider: WebTracerProvider;

  constructor(private http: HttpClient) {
    console.log('AppComponent constructor');
    this.getData();

    //https://github.com/open-telemetry/opentelemetry-js/blob/main/examples/tracer-web/examples/xml-http-request/index.js
    this.provider = new WebTracerProvider();

    this.provider.addSpanProcessor(new SimpleSpanProcessor(new ConsoleSpanExporter()));
    this.provider.addSpanProcessor(new SimpleSpanProcessor(new OTLPTraceExporter({
      url: 'traces'
    })));

    this.provider.register({
      contextManager: new ZoneContextManager(),
      propagator: new B3Propagator()
    });

    registerInstrumentations({
      instrumentations: [
        new XMLHttpRequestInstrumentation({
          ignoreUrls: [/localhost:8090\/sockjs-node/],
          propagateTraceHeaderCorsUrls: [
            'https://httpbin.org/get',
          ],
        }),
      ],
    });
  }

  getData() {
    this.http.get('/weatherforecast').subscribe((data) => {
      console.log(data);
      this.result = data as WeatherForecast[];
    });
  }

  refreshWeatherData() {

    const webTracerWithZone = this.provider.getTracer('test_client');

    const span1 = webTracerWithZone.startSpan('get-weather-data');

    console.log('refreshing weather data');

    context.with(trace.setSpan(context.active(), span1), () => {
      this.http.get('/weatherforecast').subscribe((data) => {
        console.log(data);
        trace.getSpan(context.active())?.addEvent('fetching-span1-completed');
        span1.end();
        this.result = data as WeatherForecast[];
      }, (error) => {
        trace.getSpan(context.active())?.addEvent('fetching-span1-error');
        span1.end();
      });
    });
  }

}
