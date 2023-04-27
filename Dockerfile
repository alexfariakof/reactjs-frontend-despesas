FROM node:lts-alpine
ENV NODE_ENV=production
WORKDIR /usr/src/app

COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]

RUN npm install -P -force react react-dom @types/react-dom
RUN npm install -P @faker-js/faker
RUN npm install -P @mui/material @emotion/react @emotion/styled @mui/icons-material @mui/x-date-pickers
RUN npm install -P react-chartjs-2 chart.js
RUN npm install -P dayjs @date-io/dayjs
RUN npm install -P axios

RUN npm install -g npm@9.6.5 --production --silent && mv node_modules ../

COPY . .
EXPOSE 3000
RUN chown -R node /usr/src/app
USER node
CMD ["npm", "start"]