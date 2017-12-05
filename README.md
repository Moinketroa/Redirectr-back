# Redirectr-Back

Redirectr is an app/tool which tries to maintain the relevancy of your references to an online content

Based on New Web's Technologies course with Hapiness by njl69 (https://github.com/njl07/nwt-school-back.git)

Using [Hapiness](https://github.com/hapinessjs/hapiness)

## System Requirements
 
MongoDB  
npm ^v5.5.1  
Node.js ^v8.9.0  

## Installing

mongoimport -d redirectr -c redirectrs --jsonArray < _static/redirectrs.json  
npm install -g npm@latest  
npm install -g yarn  
yarn global add @angular/cli  
yarn install  

## Development server

Start MongoDB

Run `yarn | npm run dev:watch` for a dev server. API will be on `http://localhost:4224/`. Go to `http://localhost:4224/documentation` to see the documentation and test the routes !

## Build

Run `yarn | npm run build` to build the project. The build artifacts will be stored in the `dist/` directory.

