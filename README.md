# Open Telemetry Example

A working example of open telemetry with front end and back end correlation. 

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
- Frontend on http://localhost:9999

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
docker build -t frontend-example-app:develop .
```
