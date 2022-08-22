# Dockerfile
FROM node:16
WORKDIR /src
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000 3001

# Build Image
# docker build -t node-16 .

# Run Container
# In this example, port 3000 in the container will be available at localhost:5000.
# docker run -d -it -v $(pwd):/src -p 5000:3000 -p 5001:3001 --name ps3-ui-react-ts node-16

# SSH Into Container
# docker exec -it ps3-ui-react-ts /bin/sh
