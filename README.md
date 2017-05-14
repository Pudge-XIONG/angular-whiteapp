Angular2 WhiteApp (TypeScript & Gulp)
=================================

*angular2-whiteapp* is application based on *Angular 4* and work with JASON.

Need "Jason-Framework" in folder "webapp/@jason" => https://git.aduneo.com/aduneo-jason/framework.git

#### 1. Get Project

Clone the repository:

> git clone https://git.aduneo.com/aduneo-whiteapps/angular2-whiteapp.git

Navigate to `angular2-whiteapp` main directory (if you don't have renamed the directory git):

> cd angular2-whiteapp


#### 2. Prerequisites "Jason-Framework"

Verify if you can't find `webapp/@jason` if no Checkout "Jason-Framework" in another folder and copy content to `webapp/@jason` with `.gith` directory:

> git clone https://git.aduneo.com/aduneo-jason/framework.git

For launch build/dev application go to `angular2-whiteapp` main directory (if you don't have renamed the directory git):


#### 3. Prerequisites NPM

### *nodejs* must be installed on your system and the below global node packages must be installed:

- nodejs v6.9.1 or highter

- mpn v3.10.8 or highter


### Update npm dependencies global

- Update nodejs with good version

> https://nodejs.org/en/

- Update npm with good version

> npm update -g npm

- Clear cache

> npm cache clean

- Install gulp

> npm i -g gulp

- Install gulp-cli

> npm i -g gulp-cli

- Install typings

> npm i -g typings@1.3.3

- Install typescript

> npm i -g typescript@2.0.2

- Install ts-node

> npm i -g ts-node@1.3.0

- Install/Update minimatch

> npm i -g minimatch

> npm update -g minimatch@3.0.4

- Install/Update graceful-fs

> npm i -g graceful-fs

> npm update -g graceful-fs@4.1.1

- If you have *angular-cli* uninstall it

> npm uninstall -g angular-cli

- Install @angular/cli

> npm npm install -g @angular/cli

- Install ycssmin

> npm install -g ycssmin

- Install recess

> npm install -g recess


### Installing dependencies

Navigate to `angular2-whiteapp` main directory (if you don't have renamed the directory git):

> cd angular2-whiteapp

Install dependencies by running the following command:

> npm install

`node_modules` and `typings` directories will be created during the install.



#### 4. Starting the application

### Build application in DEV

Start the application by running the following command:

> gulp serve

The application will be displayed in the browser at:

- localhost:3000

Remove "Cross-domaine":


- for Google Chrome add --disable-web-security --user-data-dir="C:/chrome" in shortcut/cible(target)

for example: "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" --disable-web-security --user-data-dir="C:/chrome"

### Build application for deploy

Build the project by running the following command:

> gulp build

`build` directory will be created during the build