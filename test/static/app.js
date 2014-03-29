// JavaScript source code
requirejs.config({
    paths: {
        "jquery": "http://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min",
        "jqueryui": "http://ajax.googleapis.com/ajax/libs/jqueryui/1.10.4/jquery-ui.min"
    },
    shim: {
        "jqueryui": {
            export: "$",
            deps: ['jquery']
        }
    }
});

// Load the main app module to start the app
requirejs(["main"]);
