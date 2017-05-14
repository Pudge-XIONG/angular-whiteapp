exports.config = {
    // The address of a running selenium server.
    seleniumAddress: 'http://127.0.0.1:4444/',
    specs: ['./**/*.spec.js'],
    capabilities: {
	  'browserName': 'chrome',
	  'chromeOptions': {
	    'args': ['--disable-web-security', '--user-data-dir=~/.e2e-chrome-profile']
	  }
	}
};
