const styles = {
  container: `background-color: #0f0f0f; font-family: sans-serif; padding: 40px; color: #f1f1f1;`,
  card: `background-color: #1e1e1e; padding: 30px; border-radius: 12px; border: 1px solid #333; max-width: 600px; margin: 0 auto;`,
  header: `color: #fbbf24; font-size: 24px; font-weight: bold; margin-bottom: 20px; border-bottom: 1px solid #333; padding-bottom: 10px;`,
  text: `color: #a1a1a1; line-height: 1.6; margin-bottom: 20px;`,
  credentialBox: `background-color: #000; padding: 15px; border-radius: 8px; border-left: 4px solid #fbbf24; margin: 20px 0;`,
  label: `color: #fbbf24; font-size: 12px; text-transform: uppercase; font-weight: bold;`,
  value: `color: #fff; font-size: 16px; font-family: monospace; margin-bottom: 10px; display: block;`,
  button: `background-color: #fbbf24; color: #000; padding: 12px 24px; text-decoration: none; font-weight: bold; border-radius: 6px; display: inline-block; margin-top: 10px;`,
  footer: `margin-top: 30px; text-align: center; color: #555; font-size: 12px;`
};

export const getApprovalEmail = (name: string, username: string, pass: string) => `
<div style="${styles.container}">
  <div style="${styles.card}">
    <div style="${styles.header}">Welcome to SUCSS Family</div>
    <p style="${styles.text}">Dear <strong>${name}</strong>,</p>
    <p style="${styles.text}">
      We are pleased to inform you that your membership application for <strong>Sijgeria Umesh Chandra Smriti Sangha</strong> has been
      <span style="color: #4ade80; font-weight: bold;">APPROVED</span>.
    </p>
    <p style="${styles.text}">You can now access the member portal using the credentials below:</p>

    <div style="${styles.credentialBox}">
      <span style="${styles.label}">Username</span>
      <span style="${styles.value}">${username}</span>

      <span style="${styles.label}">Password</span>
      <span style="${styles.value}">${pass}</span>
    </div>

    <p style="${styles.text}">Please keep these credentials safe. We look forward to your active participation.</p>

    <a href="https://www.sijgeriaclub.com/login" style="${styles.button}">Login to Portal</a>

    <div style="${styles.footer}">
      &copy; ${new Date().getFullYear()} Sijgeria Umesh Chandra Smriti Sangha.<br/>
      Vill: Sijgeria, Paschim Medinipur, WB.
    </div>
  </div>
</div>
`;

export const getRejectionEmail = (name: string) => `
<div style="${styles.container}">
  <div style="${styles.card}">
    <div style="${styles.header}">Application Status Update</div>
    <p style="${styles.text}">Dear <strong>${name}</strong>,</p>
    <p style="${styles.text}">
      Thank you for your interest in joining <strong>Sijgeria Umesh Chandra Smriti Sangha</strong>.
    </p>
    <p style="${styles.text}">
      After careful review by our executive committee, we regret to inform you that your application has been
      <span style="color: #ef4444; font-weight: bold;">NOT APPROVED</span> at this time.
    </p>
    <p style="${styles.text}">
      This decision may be due to incomplete documentation or residency criteria. You are welcome to apply again in the future or contact the club office for more details.
    </p>

    <div style="${styles.footer}">
      &copy; ${new Date().getFullYear()} Sijgeria Umesh Chandra Smriti Sangha.
    </div>
  </div>
</div>
`;

export const getSpecialInvitationEmail = (name: string, username: string, pass: string) => `
<div style="${styles.container}">
  <div style="${styles.card}">
    <div style="${styles.header}">Membership Invitation</div>
    <p style="${styles.text}">Dear <strong>${name}</strong>,</p>
    <p style="${styles.text}">
      We are honored to invite you to join <strong>Sijgeria Umesh Chandra Smriti Sangha</strong> as a distinguished member.
    </p>
    <p style="${styles.text}">
      Recognizing your value to our community, the executive committee has created a membership account for you directly. You do not need to go through the standard application process.
    </p>
    <p style="${styles.text}">Here are your personal login credentials:</p>

    <div style="${styles.credentialBox}">
      <span style="${styles.label}">Username</span>
      <span style="${styles.value}">${username}</span>

      <span style="${styles.label}">Password</span>
      <span style="${styles.value}">${pass}</span>
    </div>

    <p style="${styles.text}">We look forward to your guidance and participation.</p>

    <a href="https://www.sijgeriaclub.com/login" style="${styles.button}">Access Your Account</a>

    <div style="${styles.footer}">
      &copy; ${new Date().getFullYear()} Sijgeria Umesh Chandra Smriti Sangha.
    </div>
  </div>
</div>
`;

export const getOtpEmail = (name: string, otp: string) => `
<div style="${styles.container}">
  <div style="${styles.card}">
    <div style="${styles.header}">Password Reset Request</div>
    <p style="${styles.text}">Hello <strong>${name}</strong>,</p>
    <p style="${styles.text}">
      We received a request to reset the password for your SUCSS account.
      Use the One-Time Password (OTP) below to proceed.
    </p>

    <div style="text-align: center; margin: 30px 0;">
      <span style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #fbbf24; background: #000; padding: 10px 20px; border-radius: 8px; border: 1px solid #333;">
        ${otp}
      </span>
    </div>

    <p style="${styles.text}">
      This OTP is valid for <strong>10 minutes</strong>. Do not share this code with anyone.
    </p>
    <p style="${styles.text}">
      If you did not request a password reset, please ignore this email.
    </p>

    <div style="${styles.footer}">
      &copy; ${new Date().getFullYear()} Sijgeria Umesh Chandra Smriti Sangha.
    </div>
  </div>
</div>
`;
