FROM node:14.17

# Create app directory
USER node
WORKDIR /home/node/

# Install dependencies
COPY package.json ./
COPY ormconfig.ts ./
COPY .env ./
RUN yarn install

# Bundle app source
COPY . .

# Exports
EXPOSE 3001
CMD [ "yarn", "dev" ]