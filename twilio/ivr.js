//Function Name: IVR
//Path: /ivr


exports.handler = function(context, event, callback) {
    // REPLACE THESE
    let ivr_message_url = "https://snaz.s3.ap-southeast-1.amazonaws.com/TRajah/offer_message.mp3";
    let sms_sent_message_url = "https://snaz.s3.ap-southeast-1.amazonaws.com/TRajah/sms_sent.mp3";
    let deflection_path = "https://indigo-moorhen-8243.twil.io/deflection";
    let encoded_auth_details = "QUMzYThhMjQ3MzUwNDQ5ZjNiOWMzNTUyYTU1MTExNzExNDo2YjUyYzM2ODMwZTAyZDQ3ZjUzZWQxMTQ2MTJkNDFkYw==";

    // END

    console.log(event)
    const got = require('got');
    let twiml = new Twilio.twiml.VoiceResponse();
    switch (event.Digits) {
        case "1":
            console.log("Switch Case 1")
            got.post(deflection_path, {
                    headers: {
                        "Authorization": "Basic " + encoded_auth_details
                    },
                    json: true,
                    body: {
                        "From": event.From
                    }
                })
                .then(res => {
                    console.log("Success Sending Message");
                    twiml.play(sms_sent_message_url);
                    callback(null, twiml);
                })
                .catch(err => {
                    console.log("Failed Sending Message");
                    console.log(err)
                    twiml.play(sms_sent_message_url);
                    callback(null, twiml);
                })
            break;
        default:
            console.log("Switch Case default")
            twiml.gather({ numDigits: 1 }).play(ivr_message_url);
            callback(null, twiml);
    }
}