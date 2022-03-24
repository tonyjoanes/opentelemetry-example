# Open Telemetry Example

A working example of open telemetry with front end and back end correlation.

## Prerequisite

- Docker for windows
- .NET SDK and Runtime
- Angular

## Starting it up

Bring the demo up with the following:

```powershell
docker-compose up -d
```

## Playing around

The docker compose file will expose the following:

- Jaeger on http://localhost:16686
- Zipkin on http://localhost:9411
- Prometheus on http://localhost:9090
- Frontend Client on http://localhost:4200
- Backend TestApi http://localhost:4200/weatherforecast

### Client

This is an example Angular application which will load some example weather data from the backend test api, there is a button click with an click event which will refresh data from the test api backend endpoint for weather data.

#### Nginx

Nginx is being used to host the website project and there is also a proxy pass being used so that we can proxy requests to the backend services from the same host meaning we will not get any issues with CORs.

Passes have been setup for the following:

##### /weatherforecast

This means you can call the backend via the same localhost:4200 address. Just use `http://localhost:4200/weatherforecast`.

##### /traces

This is setup for the OTel Collector agent and means that trace can be sent from the Angular application on `http://localhost:4200traces`.

### TestApi

This is based on the .NET template for Web API projects and is basically out of the box template with the Weatherdata as an example.

## Bringing it down

Bring things down with the following:

```powershell
docker-compose down
```

## Angular app

Installed Angular CLI

```powershell
npm install -g @angular/cli

ng version

Angular CLI: 13.3.0
```

```powershell
docker build -t client:develop .
```

## Resolving Issues

### NPM Package issues

I had some issues while having multiple Angular application on my machine which were using different versions of global/local packages. I found a tool which helped upgrade this project so that the packages were inline.

#### Enter npm-check-updates

Run the following to install the package `npm-check-updates`

```powershell
npm i -g npm-check-updates
```

Now you can do an upgrade check:

```powershell
ncu -u
```

This will have upgraded your `packages.json` file. Ane example running this command will be like the following:

```powershell
❯ ncu -u
Upgrading C:\d\opentelemetry-example\src\client\package.json
[====================] 31/31 100%

 @angular/animations                 ~13.0.0  →   ~13.3.0
 @angular/common                     ~13.0.0  →   ~13.3.0
 @angular/compiler                   ~13.0.0  →   ~13.3.0
 @angular/core                       ~13.0.0  →   ~13.3.0
 @angular/forms                      ~13.0.0  →   ~13.3.0
 @angular/platform-browser           ~13.0.0  →   ~13.3.0
 @angular/platform-browser-dynamic   ~13.0.0  →   ~13.3.0
 @angular/router                     ~13.0.0  →   ~13.3.0
 rxjs                                 ~7.4.0  →    ~7.5.5
 tslib                                ^2.3.0  →    ^2.3.1
 zone.js                             ~0.11.4  →   ~0.11.5
 @angular/cli                        ~13.0.3  →   ~13.3.0
 @angular/compiler-cli               ~13.0.0  →   ~13.3.0
 @types/jasmine                      ~3.10.0  →    ~4.0.0
 @types/node                        ^12.11.1  →  ^17.0.23
 jasmine-core                        ~3.10.0  →    ~4.0.1
 karma                                ~6.3.0  →   ~6.3.17
 karma-chrome-launcher                ~3.1.0  →    ~3.1.1
 karma-coverage                       ~2.0.3  →    ~2.2.0
 karma-jasmine                        ~4.0.0  →    ~4.0.1
 typescript                           ~4.4.3  →    ~4.6.2
 ```

 Last thing you need to do is install all the updates:

 ```powershell
 npm install
 ```