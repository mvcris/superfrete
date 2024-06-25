FROM node:20
RUN apt-get update && apt-get install -y default-jdk
WORKDIR /usr/src/app
COPY . .
RUN npm install -g firebase-tools
WORKDIR /usr/src/app/functions
RUN npm install
WORKDIR /usr/src/app
CMD ["firebase", "emulators:start"]