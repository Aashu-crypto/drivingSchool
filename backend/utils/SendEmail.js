// Import the Brevo package
const brevo = require("@getbrevo/brevo");
// Import your API key from your global configuration
const API_KEY =
  "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";

// Function to send a transactional email
async function sendTransactionalEmail(emailDetails) {
  let defaultClient = brevo.ApiClient.instance;

  // Configure the API key authorization
  let apiKey = defaultClient.authentications["api-key"];
  apiKey.apiKey = API_KEY;

  let apiInstance = new brevo.TransactionalEmailsApi();
  let sendSmtpEmail = new brevo.SendSmtpEmail(emailDetails);

  try {
    const data = await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log(
      "API called successfully. Returned data: " + JSON.stringify(data)
    );
  } catch (error) {
    console.error(error);
  }
}

// Example usage of the function
const emailDetails = {
  subject: "My {{params.subject}}",
  htmlContent:
    "<html><body><h1>Common: This is my first transactional email {{params.parameter}}</h1></body></html>",
  sender: { name: "Aashutosh", email: "ashugandotra14@gmail.com" },
  to: [{ email: "gandotra1971@gmail.com", name: "Aashutosh" }],
  replyTo: { email: "brevo@brevo.com", name: "John" },
  headers: { "Some-Custom-Name": "unique-id-1234" },
  params: {
    parameter: "My param value",
    subject: "common subject",
  },
  messageVersions: [
    // Include your message versions here as in the original example
  ],
};

// Call the function with your email details
sendTransactionalEmail(emailDetails);
