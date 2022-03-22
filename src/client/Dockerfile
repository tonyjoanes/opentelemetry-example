FROM node:16-alpine3.14 as build

# RUN npm install -g npm@8.1.4
RUN npm install -g @angular/cli

WORKDIR /usr/local/app/frontend/
COPY . .
RUN npm install

RUN ng build --configuration=production
RUN mv dist /usr/local/app/

FROM nginx:1.21.4-alpine
WORKDIR /app
COPY --from=build /usr/local/app/dist/client /usr/share/nginx/html

COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD nginx -g "daemon off;"
