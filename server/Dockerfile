FROM node:16-slim
# Create app directory
WORKDIR /usr/src/app
# Install app dependencies
COPY package*.json ./

RUN npm install
# Copy app source code

ENV PORT 5000
COPY . .

#Expose port and start application
EXPOSE 5000
CMD [ "npm", "start" ]