var APP_ID = undefined; //replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";
var AlexaSkill = require('./AlexaSkill');
var God = function () {
    AlexaSkill.call(this, APP_ID);
};
God.prototype = Object.create(AlexaSkill.prototype);
God.prototype.constructor = God;

God.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    console.log("HelloWorld onSessionStarted requestId: " + sessionStartedRequest.requestId + ", sessionId: " + session.sessionId);
    // any initialization logic goes here
};

God.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    var speechOutput = "Welcome to the Alexa Skills Kit, you can say hello";
    var repromptText = "You can say hello";
    response.ask(speechOutput, repromptText);
};

God.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    console.log("HelloWorld onSessionEnded requestId: " + sessionEndedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any cleanup logic goes here
};

God.prototype.intentHandlers = {
    "Why": function (intent, session, response) {
        response.ask("What is the question?", "Hello?");
    },
    "ExecutionOrder": function (intent, session, response) {
        var sayResponse = "";
        switch(intent.slots.Order.value){
            case "1":
                sayResponse = "Executing order 1.";
                break;
            case "2":
                sayResponse = "Executing order 2.";
                break;
           case "3":
                sayResponse = "Executing order 3.";
                break;
            case "sixtysix":
                sayResponse = "Yes my lord.";
                break;
            default:
                sayResponse = "Undefined order.";
        }
        response.tell(sayResponse);
    },
    "AMAZON.HelpIntent": function (intent, session, response) {
        response.ask("This is a sandbox fox has created to test his code.", "help");
    }
};

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    var god = new God();
    god.execute(event, context);
};