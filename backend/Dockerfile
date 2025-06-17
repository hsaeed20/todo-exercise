#This file will handle building and packaging the backend.
#Will be used to run docker on any platform without the need to run it on a local environment.

#Starts the container. 
FROM node:18

#Set working directory inside container
WORKDIR /usr/src/app

#Install netcat for wait-for.sh to work
RUN apt-get update && apt-get install -y netcat-openbsd

#Copy package.json into /usr/src/app in the container
COPY package*.json ./

#Install backend dependencies
RUN npm install

#Copy the rest of the backend code
COPY . .

#Expose the port your app is using
EXPOSE 4000

#Only copy wait-for.sh once
COPY wait-for.sh .
#Then copy the rest of the code, excluding it in .dockerignore if needed.

#Run server 
CMD ["./wait-for.sh", "db", "5432", "--", "node", "server.js"]
