FROM node:10
# Create app directory
WORKDIR /usr/src/app
# Install app dependencies
COPY package*.json ./
RUN yarn install
# Copy app source code
COPY . .
#Expose port and start application
EXPOSE 3000
CMD [ "npm", "start" ]