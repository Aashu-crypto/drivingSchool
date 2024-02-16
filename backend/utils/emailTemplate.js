const generateEmailTemplate = (name, email, password) => {
  return `
      <!DOCTYPE html>
      <html>
      <head>
          <title>Welcome to Our Platform</title>
      </head>
      <body>
          <table width="100%" cellspacing="0" cellpadding="0">
              <tr>
                  <td align="center">
                      <table width="600" cellspacing="0" cellpadding="0" style="border-collapse: collapse;">
                          <tr>
                              <td style="background-color: #4CAF50; color: white; text-align: center; padding: 20px 0;">
                                  <h1>Welcome to Our Platform</h1>
                              </td>
                          </tr>
                          <tr>
                              <td style="padding: 20px; text-align: center; border: 1px solid #dddddd;">
                                  <p>Hello ${name},</p>
                                  <p>Your login details are as follows:</p>
                                  <p><strong>Email:</strong> ${email}<br>
                                  <strong>Password:</strong> ${password}</p>
                                  <a href="#" style="background-color: #008CBA; color: white; padding: 10px 20px; text-decoration: none; display: inline-block;">Login Now</a>
                              </td>
                          </tr>
                      </table>
                  </td>
              </tr>
          </table>
      </body>
      </html>
    `;
};

module.exports = { generateEmailTemplate };
