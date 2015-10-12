# Weather for top 5 US cities

Uses NOAA US National Weather Service, the source of most weather data.
Free, no api key required!

## Demo

http://www.premierpilatesandyoga.us/bruce/weather/

## Requirements

* Linux compatible system, such as Mac OSX. Untested on Cygwin.
* Modern Chrome or Firefox web browser
* Root privileges, to install NodeJS
* 150M disk space, mostly for npm libraries

## Setup

* Unpack and cd into project directory
** Optional: unpack into a web directory

```npm install```

```sudo npm install -g live-server```

```sudo npm install -g webdriver-manager```

```rehash  # option to refresh PATH```

```webdriver-manager update```

In a new terminal window, run:

```cd ./app```

```live-server;```

* open http://localhost:8080
* Enjoy!

## Usage

This application is designed to survive updates to Google's Material Design.
It also validates, as much as is feasible.

## Testing

With live-server still running, In a new terminal window, run:

```webdriver-manager start &```

You can also check for errors in `http://localhost:4444/wd/hub`
If you see errors, verify path in `e2e-tests/protractor.conf.js` 
for `chromeDriver` and `seleniumServerJar`

```npm test```

Note that a vendor library throws the following warning. Unless you need 
accessibility aid, the application performs as expected.

```
Warning in Chrome A11Y - (WARNING) These elements are focusable but either 
invisible or obscured by another element
```

Code is also checked with

* eslint
* jshint
* jscs

but no task runners (gulp, grunt) yet.

## To Do

Emphasis is on mobile-first experience, and high quality display.
Img src-set, HTTP/2 and similiar techniques are on the cusp of adoption, at 
the time this code was created.
To Do: compress the background images and add responsive performance. 
