FROM node:16
WORKDIR /src
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000

# docker build -t node-wordle-react-ts .
# docker run -d -it -v $(pwd):/src -p 5000:3000 --name wordle-react-ts node-wordle-react-ts
