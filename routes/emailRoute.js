const express = require("express");
const router = express.Router();
const EmailService = require("../services/EmailService");

function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

function getPasswordResetEmailContent(otp) {
    return `
        <html>
        <head>
            <style>
              body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
              }
              .container {
                max-width: 600px;
                margin: 0 auto;
              }
              .header {
                background-color: #f8f9fa;
                padding: 20px;
                text-align: center;
              }
              .content {
                padding: 20px;
              }
              .footer {
                background-color: #f8f9fa;
                padding: 20px;
                text-align: center;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h2>Password Reset OTP</h2>
              </div>
              <div class="content">
                <p>Your OTP for password reset is: <strong>${otp}</strong></p>
                <p>This OTP will expire in 10 minutes.</p>
              </div>
              <div class="footer">
                <p>If you didn't request this password reset, you can safely ignore this email.</p>
              </div>
            </div>
          </body>
        </html>
      `;
}

function getEmployeeWelcomeEmailContent(username, password, name) {
    return `
        <html>
        <head>
            <style>
              body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
              }
              .container {
                max-width: 600px;
                margin: 0 auto;
              }
              .header {
                background-color: #f8f9fa;
                padding: 20px;
                text-align: center;
              }
              .content {
                padding: 20px;
              }
              .footer {
                background-color: #f8f9fa;
                padding: 20px;
                text-align: center;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h2>Welcome to Our Company, ${name}!</h2>
              </div>
              <div class="content">
                <p>Your account has been created successfully. Please find your login credentials below:</p>
                <p><strong>Username:</strong> ${username}</p>
                <p><strong>Password:</strong> ${password}</p>
                <p>Please login using the provided credentials and change your password for security reasons.</p>
              </div>
              <div class="footer">
                <p>If you have any questions or concerns, please feel free to contact us.</p>
              </div>
            </div>
          </body>
        </html>
      `;
}

function getSalaryConfirmationEmailContent(name, netSalary, employeeId, toDate, fromDate) {
    return `
      <html>
      <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
            }
            .header {
              background-color: #f8f9fa;
              padding: 20px;
              text-align: center;
            }
            .content {
              padding: 20px;
            }
            .footer {
              background-color: #f8f9fa;
              padding: 20px;
              text-align: center;
            }
            .button {
              display: inline-block;
              background-color: #007bff;
              color: #ffffff;
              text-decoration: none;
              padding: 10px 20px;
              border-radius: 5px;
              margin-top: 10px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>Salary Confirmation from ${toDate} to ${fromDate}</h2>
            </div>
            <div class="content">
              <p>Dear ${name} (${employeeId}),</p>
              <p>Your salary for this month has been successfully processed.</p>
              <p>Your Net Salary: ${netSalary} LKR</p>
              <p>You can download your paysheet from the employee dashboard.</p>
              <p><a href="http://www.evnify.com/login" target="_blank">Go to Employee Dashboard</a></p>
            </div>
            <div class="footer">
              <p>If you have any questions or concerns, please feel free to contact us.</p>
            </div>
          </div>
        </body>
      </html>
    `;
}

module.exports = { getEmployeeWelcomeEmailContent };

router.post("/otp", async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: "Email is required" });
    }

    const otp = generateOTP();
    const emailContent = getPasswordResetEmailContent(otp);
    const subject = "Password Reset OTP";

    try {
        await EmailService.sendOTP({ email }, emailContent, subject);
        return res.status(200).json({ message: "OTP sent successfully", otp });
    } catch (error) {
        console.error("Error sending OTP:", error);
        return res.status(500).json({ message: "Error sending OTP" });
    }
});

router.post("/welcomeEmployee", async (req, res) => {
    const { email, password, firstName, LastName } = req.body;

    if (!email) {
        return res.status(400).json({ message: "Email is required" });
    }

    const otp = generateOTP();
    const emailContent = getEmployeeWelcomeEmailContent(
        email,
        password,
        `${firstName} ${LastName}`
    );
    const subject = "Employee Account Temporary Credentials";

    try {
        await EmailService.sendOTP({ email }, emailContent, subject);
        return res.status(200).json({ message: "Mail sended successfully" });
    } catch (error) {
        console.error("Error sending Mail:", error);
        return res.status(500).json({ message: "Error sending Mail" });
    }
});

router.post("/salaryConformation", async (req, res) => {
    const { name, netSalary, salaryID, email, fromDate, toDate } = req.body;

    if (!email) {
        return res.status(400).json({ message: "Email is required" });
    }

    const emailContent = getSalaryConfirmationEmailContent(
        name,
        netSalary,
        salaryID,
        toDate,
        fromDate
    );
    const subject = `Salary Confirmation from ${fromDate} to ${toDate}`;

    try {
        await EmailService.sendOTP({ email }, emailContent, subject);
        return res.status(200).json({ message: "Mail sended successfully" });
    } catch (error) {
        console.error("Error sending Mail:", error);
        return res.status(500).json({ message: "Error sending Mail" });
    }
});

module.exports = router;
