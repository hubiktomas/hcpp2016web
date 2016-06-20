# HCPP 2016 website

### Requirements:

- Node.js

## Development

### Install dependencies
```
npm install -g gulp
npm install
```

### Build styles
```
gulp styles
```

### Run development server
(builds styles and runs livereload)
```
gulp
```

## Production

### Install dependencies
```
npm install
```

### Run app
Deploy app to server...

Set enviroment variable ``MAILCHIMP_KEY`` as your Mailchimp API key

Then run:
```
npm start
```

You're welcome