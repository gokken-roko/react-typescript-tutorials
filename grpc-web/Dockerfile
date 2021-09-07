FROM node:14.9.0-alpine as build

COPY . .
#eslint面倒だったのでとりあえず、全部 install
#RUN yarn install --production
RUN yarn install
RUN NODE_ENV=production yarn build

FROM nginx:1.19.6-alpine

COPY --from=build /build /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
