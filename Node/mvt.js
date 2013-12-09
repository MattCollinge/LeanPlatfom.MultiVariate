var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app);

app.configure(function(){
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.static(__dirname + '/static'));
    app.use(express.bodyParser());
});

var port = 8000;
server.listen(port);
console.log("Listening on port " + port);

app.post('/visitor/:visitorId', function(req, res){
    res.send({visitor:'Published'});
});

app.post('/visit', function(req, res){
    //res.render('pos', { title: "POS", drinks: drinks});
});

app.post('/pageview', function(req, res){
    //res.render('monitor',  { title: "Monitor"});
});

app.get('/MVTest/:id/:visit/Exposure', function(req, res){
    var testId = req.param("id", 0);
    var visitId = req.param("visit", "unknown");
    var visitorId = getVisitorId(visitId);
    var variant = recordExposure(testId, visitorId, visitId);
    var variantUrl = getVariantUrl(testId, variant.id);
    
    
    res.status(303);
    res.location(variantUrl);

    res.json({
        exposureRecorded: testId,
        visit: visitId,
        variant: variantUrl
    });
});

app.get('/MVTest/:id/Variant/:variantId', function(req, res){
    var testId = req.param("id", 0);
    var variantId = req.param("variantId", "unknown");
    
    res.json({
    "VariantName": "VariantA",
    "VariantId": variantId,
    "Properties":{
        "MainLogoURL":"http://blaaaaaaa",
        "CssURL":"http://css_blaa",
        "HelpText":"ipsum lorem skdnsjnds"
        }
    });

});

function getVisitorId(visitId){
    return '098765432';
}

function getVariantUrl(testId, variantId){
    return ['MVTest/', testId, '/Variant/', variantId].join('');
}

function recordExposure(testId, visitorId, visitId){
    return {
        id: 'qwertyuiop',
        name: 'VariantA'
    }
}

