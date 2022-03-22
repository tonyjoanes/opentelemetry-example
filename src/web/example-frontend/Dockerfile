FROM node:latest as build-step
RUN mkdir -p /app

WORKDIR /app
COPY package.json /app/
RUN npm install

COPY . /app/
RUN npm run build --prod

FROM nginx:latest
COPY --from=build-step /app/dist/example-frontend /usr/share/nginx/html

COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD nginx -g "daemon off;"