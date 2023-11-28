FROM node:18-alpine as webapp

WORKDIR /app/frontend/

COPY package.json package-lock.json /app/frontend/
RUN npm install --legacy-peer-deps
COPY . /app/frontend/

CMD ["npm", "run", "dev", "--", "--host"]

# nginx config, to be introduced
# FROM nginx:alpine
# WORKDIR /app/
# COPY --from=webapp /webapp/apps/web/build/ /app/public