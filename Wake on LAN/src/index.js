var APP_ID = undefined; //replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";
var AlexaSkill = require('./AlexaSkill');
var Computer = function () {
    AlexaSkill.call(this, APP_ID);
};
Computer.prototype = Object.create(AlexaSkill.prototype);
Computer.prototype.constructor = Computer;

Computer.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    console.log("HelloWorld onSessionStarted requestId: " + sessionStartedRequest.requestId + ", sessionId: " + session.sessionId);
    // any initialization logic goes here
};

Computer.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    response.ask("What do you want your computer to do?", "You can say wake up.");
};

Computer.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    console.log("HelloWorld onSessionEnded requestId: " + sessionEndedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any cleanup logic goes here
};

Computer.prototype.intentHandlers = {
    "WakeOnLan": function (intent, session, response) {
		// TODO send post to php page
		console.log("The id to post: "+ intent.sourceIP);
        response.tell("Wake up.");
    },
    "AMAZON.HelpIntent": function (intent, session, response) {
        response.ask("You can ask your computer to wake up.", "Any time.");
    }
};

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    var computer = new Computer();
    computer.execute(event, context);
};
