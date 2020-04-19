FROM node:10
# Create app directory
WORKDIR /home/node/app
# Install app dependencies
COPY package.json yarn.lock ./
RUN yarn install
# Copy app source code
COPY . .
#Expose port and start application
EXPOSE 3000
CMD [ "npm", "start" ]