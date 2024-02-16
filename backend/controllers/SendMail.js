const SibApiV3Sdk = require("@getbrevo/brevo");
const { generateEmailTemplate } = require("../utils/emailTemplate");

const SendMail = (name, mail, password) => {
  let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
  const API =
    "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";
  let apiKey = apiInstance.authentications["apiKey"];
  apiKey.apiKey = API;

  let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
  const emailContent = generateEmailTemplate(name, mail, password);

  sendSmtpEmail.subject = "My {{params.subject}}";
  sendSmtpEmail.htmlContent = emailContent;
  sendSmtpEmail.sender = {
    name: "Aashutosh Gandotra",
    email: "ashugandotra14@gmail.com",
  };
  sendSmtpEmail.to = [{ email: "gandotra1971@gmail.com", name: "Aashutosh" }];

  sendSmtpEmail.replyTo = {
    email: "replyto@ashugandotra14.com",
    name: "Aashutosh Gadnotra",
  };
  sendSmtpEmail.headers = { "Some-Custom-Name": "unique-id-1234" };
  sendSmtpEmail.params = {
    parameter: "My param value",
    subject: "New Subject",
  };

  apiInstance.sendTransacEmail(sendSmtpEmail).then(
    function (data) {
      console.log(
        "API called successfully. Returned data: " + JSON.stringify(data)
      );
    },
    function (error) {
      console.error(error);
    }
  );
};

module.exports = {
  SendMail,
};
