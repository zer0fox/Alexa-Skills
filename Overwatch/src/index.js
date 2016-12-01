var APP_ID = undefined; //replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";
var AlexaSkill = require('./AlexaSkill');
var Overwatch = function () {
    AlexaSkill.call(this, APP_ID);
};
Overwatch.prototype = Object.create(AlexaSkill.prototype);
Overwatch.prototype.constructor = Overwatch;

Overwatch.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    console.log("HelloWorld onSessionStarted requestId: " + sessionStartedRequest.requestId + ", sessionId: " + session.sessionId);
    // any initialization logic goes here
};

Overwatch.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    response.ask("What hero would you like to counter?", "Any time.");
};

Overwatch.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    console.log("HelloWorld onSessionEnded requestId: " + sessionEndedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any cleanup logic goes here
};

Overwatch.prototype.intentHandlers = {
    "Counter": function (intent, session, response) {
        var responseString = intent.slots.Hero.value + " can be countered by ";
        switch(intent.slots.Hero.value){
            case "genji":
                responseString += "Mei, Winston, Symmetra and Zarya.";
                break;
            case "mccree":
                responseString += "Widowmaker, Bastion and Roadhog.";
                break;
            case "pharah":
                responseString += "Widowmaker, Solder 76, McCree and Roadhog.";
                break;
            case "reaper":
                responseString += "McCree, Pharah and Tracer.";
                break;
            case "solder 76": case "solder seventy six": case "solder seventysix": case "seventysix": case "seventy six": case "76":
                responseString += "Genji, Reinhardt and Mei.";
                break;
            case "sombra":
                responseString += "Winston, Mei, Symmetra, Solder 76 and Widowmaker.";
                break;
            case "tracer":
                responseString += "Solder 76, Lúcio, McCree and Roadhog.";
                break;
            case "bastion":
                responseString += "Genji, Junkrat, Widowmaker and Tracer.";
                break;
            case "hanzo":
                responseString += "Reinhardt, Winston, Genji and Tracer.";
            case "junkrat":
                responseString += "Pharah, Zarya, Tracer and Genji.";
                break;
            case "mei":
                responseString += "Reaper, Pharah, Zarya and Widowmaker.";
            case "torbjörn": case "torbiorn": case "torbeorn": case "torbion": case "torbeon": case "dwarf": case "turret":
                responseString += "Pharah, Widowmaker, Hanzo and Junkrat.";
                break;
            case "widowmaker":
                responseString += "Genji, Winston, D.Va and Tracer.";
            case "d.va": case "dva": case "diva":
                responseString += "Zenyatta, Roadhog and Mei.";
                break;
            case "reinhardt": case "german":
                responseString += "Bastion, Reaper, Pharah and Tracer.";
            case "roadhog":
                responseString += "Zenyatta, Zarya and Reaper.";
                break;
            case "winston": case "monkey": case "scientist": case "gorila": case "harambe":
                responseString += "Bastion, Reaper, Zenyatta and Roadhog.";
                break;
            case "zarya": case "russian":
                responseString += "Pharah, Soldier 76 and Widowmaker.";
                break;
            case "ana": case "anna":
                responseString += "Winston, Genji, Tracer and Widowmaker.";
                break;
            case "lúcio": case "lucio":
                responseString += "Mei, Pharah, McCree, Widowmaker and Zarya.";
                break;
            case "mercy":
                responseString += "Pharah, Winston, Tracer, Widowmaker and Soldier 76.";
                break;
            case "symmetra":
                responseString += "McCree, Soldier 76, Widowmaker, Hanzo and Tracer.";
                break;
            case "zenyatta":
                responseString += "Widowmaker, Hanzo, Genji and Zarya";
                break;
            default:
                responseString = "";
                response.ask("I don't know who " + intent.slots.Hero.value + ' is.', "Whould you like to counter an other hero?");
        }
        if(responseString != ""){
            response.tell(responseString);
        }
    },
    "AMAZON.HelpIntent": function (intent, session, response) {
        response.ask("You can ask what hero you would like to counter.", "Any time.");
    },
	"AMAZON.StopIntent": function (intent, session, response) {
        response.tell("Ok.");
    },
};

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    var overwatch = new Overwatch();
    overwatch.execute(event, context);
};