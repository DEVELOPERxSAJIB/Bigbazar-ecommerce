const User = require("../modals/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const createError = require("http-errors");
const { createJsonWebToken } = require("../helper/jsonWebToken");
const {
  replaceDotWithHeypen,
  replaceHeypenWithDot,
} = require("../helper/dotToHyphen");
const emailWithNodemailer = require("../utils/sendEmail");
const { successResponse } = require("./responseController");
const { cloudUploadAvatar, cloudDeleteAvatar } = require("../utils/cloudinary");
require("dotenv").config();

/**
 * @DESC Process user Registration
 * @ROUTE api/v1/auth/process-register
 * @method POST
 * @access public
 */
const processRegistration = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    let avaterInfo = null;

    if (req.file) {
      avaterInfo = req.file;
    }

    const userExists = await User.exists({ email: email });
    if (userExists) {
      throw createError(
        409,
        "User already exists with this email. Please login"
      );
    }

    // create jwt
    const token = createJsonWebToken(
      { name, email, password, avaterInfo },
      process.env.JWT_ACTIVATION_KEY,
      "10m"
    );

    // setup token for client
    const clientAcceptAbleToken = replaceDotWithHeypen(token);

    const activationURL = `${req.protocol}://${req.get(
      "host"
    )}/user/activation/${clientAcceptAbleToken}`;

    // prepare email
    const emailData = {
      email,
      subject: "Account Activation Email",
      html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html dir="ltr" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">
<head>
  <meta charset="UTF-8">
  <meta content="width=device-width, initial-scale=1" name="viewport">
  <meta name="x-apple-disable-message-reformatting">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta content="telephone=no" name="format-detection">
  <title>New Template</title><!--[if (mso 16)]>
    <style type="text/css">
    a {text-decoration: none;}
    </style>
    <![endif]--><!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]--><!--[if gte mso 9]>
<noscript>
        <xml>
          <o:OfficeDocumentSettings>
          <o:AllowPNG></o:AllowPNG>
          <o:PixelsPerInch>96</o:PixelsPerInch>
          </o:OfficeDocumentSettings>
        </xml>
      </noscript>
<![endif]-->
  <style type="text/css">
.rollover:hover .rollover-first {
  max-height:0px!important;
  display:none!important;
}
.rollover:hover .rollover-second {
  max-height:none!important;
  display:block!important;
}
.rollover span {
  font-size:0px;
}
u + .body img ~ div div {
  display:none;
}
#outlook a {
  padding:0;
}
span.MsoHyperlink,
span.MsoHyperlinkFollowed {
  color:inherit;
  mso-style-priority:99;
}
a.es-button {
  mso-style-priority:100!important;
  text-decoration:none!important;
}
a[x-apple-data-detectors],
#MessageViewBody a {
  color:inherit!important;
  text-decoration:none!important;
  font-size:inherit!important;
  font-family:inherit!important;
  font-weight:inherit!important;
  line-height:inherit!important;
}
.es-desk-hidden {
  display:none;
  float:left;
  overflow:hidden;
  width:0;
  max-height:0;
  line-height:0;
  mso-hide:all;
}
@media only screen and (max-width:600px) {.es-m-p0r { padding-right:0px!important } .es-p-default { } *[class="gmail-fix"] { display:none!important } p, a { line-height:150%!important } h1, h1 a { line-height:120%!important } h2, h2 a { line-height:120%!important } h3, h3 a { line-height:120%!important } h4, h4 a { line-height:120%!important } h5, h5 a { line-height:120%!important } h6, h6 a { line-height:120%!important } .es-header-body p { } .es-content-body p { } .es-footer-body p { } .es-infoblock p { } h1 { font-size:36px!important; text-align:left } h2 { font-size:26px!important; text-align:left } h3 { font-size:20px!important; text-align:left } h4 { font-size:24px!important; text-align:left } h5 { font-size:20px!important; text-align:left } h6 { font-size:16px!important; text-align:left } .es-header-body h1 a, .es-content-body h1 a, .es-footer-body h1 a { font-size:36px!important } .es-header-body h2 a, .es-content-body h2 a, .es-footer-body h2 a { font-size:26px!important } .es-header-body h3 a, .es-content-body h3 a, .es-footer-body h3 a { font-size:20px!important } .es-header-body h4 a, .es-content-body h4 a, .es-footer-body h4 a { font-size:24px!important } .es-header-body h5 a, .es-content-body h5 a, .es-footer-body h5 a { font-size:20px!important } .es-header-body h6 a, .es-content-body h6 a, .es-footer-body h6 a { font-size:16px!important } .es-menu td a { font-size:12px!important } .es-header-body p, .es-header-body a { font-size:14px!important } .es-content-body p, .es-content-body a { font-size:16px!important } .es-footer-body p, .es-footer-body a { font-size:14px!important } .es-infoblock p, .es-infoblock a { font-size:12px!important } .es-m-txt-c, .es-m-txt-c h1, .es-m-txt-c h2, .es-m-txt-c h3, .es-m-txt-c h4, .es-m-txt-c h5, .es-m-txt-c h6 { text-align:center!important } .es-m-txt-r, .es-m-txt-r h1, .es-m-txt-r h2, .es-m-txt-r h3, .es-m-txt-r h4, .es-m-txt-r h5, .es-m-txt-r h6 { text-align:right!important } .es-m-txt-j, .es-m-txt-j h1, .es-m-txt-j h2, .es-m-txt-j h3, .es-m-txt-j h4, .es-m-txt-j h5, .es-m-txt-j h6 { text-align:justify!important } .es-m-txt-l, .es-m-txt-l h1, .es-m-txt-l h2, .es-m-txt-l h3, .es-m-txt-l h4, .es-m-txt-l h5, .es-m-txt-l h6 { text-align:left!important } .es-m-txt-r img, .es-m-txt-c img, .es-m-txt-l img { display:inline!important } .es-m-txt-r .rollover:hover .rollover-second, .es-m-txt-c .rollover:hover .rollover-second, .es-m-txt-l .rollover:hover .rollover-second { display:inline!important } .es-m-txt-r .rollover span, .es-m-txt-c .rollover span, .es-m-txt-l .rollover span { line-height:0!important; font-size:0!important; display:block } .es-spacer { display:inline-table } a.es-button, button.es-button { font-size:20px!important; padding:10px 20px 10px 20px!important; line-height:120%!important } a.es-button, button.es-button, .es-button-border { display:inline-block!important } .es-m-fw, .es-m-fw.es-fw, .es-m-fw .es-button { display:block!important } .es-m-il, .es-m-il .es-button, .es-social, .es-social td, .es-menu { display:inline-block!important } .es-adaptive table, .es-left, .es-right { width:100%!important } .es-content table, .es-header table, .es-footer table, .es-content, .es-footer, .es-header { width:100%!important; max-width:600px!important } .adapt-img { width:100%!important; height:auto!important } .es-mobile-hidden, .es-hidden { display:none!important } .es-desk-hidden { width:auto!important; overflow:visible!important; float:none!important; max-height:inherit!important; line-height:inherit!important } tr.es-desk-hidden { display:table-row!important } table.es-desk-hidden { display:table!important } td.es-desk-menu-hidden { display:table-cell!important } .es-menu td { width:1%!important } table.es-table-not-adapt, .esd-block-html table { width:auto!important } .h-auto { height:auto!important } .es-text-8953, .es-text-8953 p, .es-text-8953 a, .es-text-8953 h1, .es-text-8953 h2, .es-text-8953 h3, .es-text-8953 h4, .es-text-8953 h5, .es-text-8953 h6, .es-text-8953 ul, .es-text-8953 ol, .es-text-8953 li, .es-text-8953 span, .es-text-8953 sup, .es-text-8953 sub, .es-text-8953 u, .es-text-8953 b, .es-text-8953 strong, .es-text-8953 em, .es-text-8953 i { font-size:16px!important } }
@media screen and (max-width:384px) {.mail-message-content { width:414px!important } }
</style>
</head>
<body class="body" style="width:100%;height:100%;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0">
  <div dir="ltr" class="es-wrapper-color" lang="en" style="background-color:#FAFAFA"><!--[if gte mso 9]>
      <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
        <v:fill type="tile" color="#fafafa"></v:fill>
      </v:background>
    <![endif]-->
  <table width="100%" cellspacing="0" cellpadding="0" class="es-wrapper" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top;background-color:#FAFAFA">
    <tr>
      <td valign="top" style="padding:0;Margin:0">
      <table cellpadding="0" cellspacing="0" align="center" class="es-header" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:100%;table-layout:fixed !important;background-color:transparent;background-repeat:repeat;background-position:center top">
        <tr>
          <td align="center" style="padding:0;Margin:0">
          <table bgcolor="#ffffff" align="center" cellpadding="0" cellspacing="0" class="es-header-body" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px">
            <tr>
              <td align="left" data-custom-paddings="true" style="padding:30px;Margin:0">
              <table cellpadding="0" cellspacing="0" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                <tr>
                  <td align="left" style="padding:0;Margin:0;width:540px">
                  <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                    <tr>
                      <td align="center" height="40" style="padding:0;Margin:0;font-size:0"></td>
                    </tr>
                  </table></td>
                </tr>
              </table></td>
            </tr>
            <tr>
              <td align="left" bgcolor="#10AC84" style="Margin:0;padding-top:20px;padding-right:20px;padding-bottom:10px;padding-left:20px;background-color:#10AC84" data-custom-paddings="true">
              <table cellpadding="0" cellspacing="0" align="right" class="es-right" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right">
                <tr>
                  <td valign="top" align="center" class="es-m-p0r" style="padding:0;Margin:0;width:560px">
                  <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                    <tr>
                      <td align="center" style="padding:0;Margin:0;padding-bottom:10px;font-size:0px"><a target="_blank" href="http://localhost:5173/" style="mso-line-height-rule:exactly;text-decoration:underline;color:#666666;font-size:14px"><img src="https://ebdqfmu.stripocdn.email/content/guids/CABINET_4c20da8e704a7908e1e95c6899509ac59a7672fdc45a02c24e317d74d40bfc80/images/logo2.png" alt="" title="Logo" width="299" style="display:block;font-size:12px;border:0;outline:none;text-decoration:none;border-radius:0"></a></td>
                    </tr>
                  </table></td>
                </tr>
              </table></td>
            </tr>
          </table></td>
        </tr>
      </table>
      <table cellpadding="0" cellspacing="0" align="center" class="es-content" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:100%;table-layout:fixed !important">
        <tr>
          <td align="center" style="padding:0;Margin:0">
          <table bgcolor="#ffffff" align="center" cellpadding="0" cellspacing="0" class="es-content-body" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px">
            <tr>
              <td align="left" data-custom-paddings="true" style="Margin:0;padding-right:20px;padding-bottom:10px;padding-left:20px;padding-top:30px">
              <table cellpadding="0" cellspacing="0" width="100%" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                <tr>
                  <td align="center" valign="top" style="padding:0;Margin:0;width:560px">
                  <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                    <tr>
                      <td align="center" style="padding:0;Margin:0;padding-bottom:10px;padding-top:10px;font-size:0px"><img src="https://ebdqfmu.stripocdn.email/content/guids/CABINET_4c20da8e704a7908e1e95c6899509ac59a7672fdc45a02c24e317d74d40bfc80/images/forget.png" alt="" width="125" class="adapt-img" style="display:block;font-size:14px;border:0;outline:none;text-decoration:none"></td>
                    </tr>
                    <tr>
                      <td align="center" style="padding:0;Margin:0;padding-top:20px;padding-bottom:10px"><h1 class="es-m-txt-c" style="Margin:0;font-family:arial, 'helvetica neue', helvetica, sans-serif;mso-line-height-rule:exactly;letter-spacing:0;font-size:46px;font-style:normal;font-weight:bold;line-height:46px;color:#333333">Confirm Your Email</h1></td>
                    </tr>
                    <tr>
                      <td align="center" style="padding:0;Margin:0;padding-right:10px;padding-left:10px"><p style="Margin:0;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;letter-spacing:0;color:#333333;font-size:14px">You’ve received this message because your email address has been registered with our site. Please click the button below to verify your email address and confirm that you are the owner of this account.</p></td>
                    </tr>
                    <tr>
                      <td align="center" style="padding:0;Margin:0;padding-top:10px"><p style="Margin:0;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;letter-spacing:0;color:#333333;font-size:14px">If you did not register with us, please disregard this email.</p></td>
                    </tr>
                    <tr>
                      <td align="center" style="padding:0;Margin:0;padding-top:20px;padding-bottom:10px"><span class="es-button-border" style="border-style:solid;border-color:#2CB543;background:#10AC84;border-width:0px;display:inline-block;border-radius:6px;width:auto"><a target="_blank" href="${activationURL}" class="es-button" style="mso-style-priority:100 !important;text-decoration:none !important;mso-line-height-rule:exactly;color:#FFFFFF;font-size:20px;padding:10px 30px 10px 30px;display:inline-block;background:#10AC84;border-radius:6px;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-weight:normal;font-style:normal;line-height:24px;width:auto;text-align:center;letter-spacing:0;mso-padding-alt:0;mso-border-alt:10px solid #10AC84;border-left-width:30px;border-right-width:30px">CONFIRM YOUR EMAIL</a></span></td>
                    </tr>
                    <tr>
                      <td align="left" style="padding:10px;Margin:0"><p align="center" style="Margin:0;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;letter-spacing:0;color:#333333;font-size:14px">Once confirmed, this email will be uniquely associated with your account.</p></td>
                    </tr>
                    <tr>
                      <td align="center" style="padding:20px;Margin:0;font-size:0">
                      <table border="0" width="100%" height="100%" cellpadding="0" cellspacing="0" class="es-spacer" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                        <tr>
                          <td style="padding:0;Margin:0;border-bottom:1px solid #cccccc;background:none;height:1px;width:100%;margin:0px"></td>
                        </tr>
                      </table></td>
                    </tr>
                  </table></td>
                </tr>
              </table></td>
            </tr>
            <tr>
              <td align="left" bgcolor="#e9e9e9e9" style="padding:0;Margin:0;background-color:#e9e9e9e9" data-custom-paddings="true">
              <table cellpadding="0" cellspacing="0" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                <tr>
                  <td align="left" style="padding:0;Margin:0;padding-top:15px;width:600px">
                  <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                    <tr>
                      <td align="center" style="padding:0;Margin:0;font-size:0">
                      <table cellpadding="0" cellspacing="0" class="es-table-not-adapt es-social" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                        <tr>
                          <td align="center" valign="top" style="padding:0;Margin:0;padding-right:20px"><a target="_blank" href="https://www.facebook.com/Md.SaJib.Raajput/" style="mso-line-height-rule:exactly;text-decoration:underline;color:#5C68E2;font-size:14px"><img title="Facebook" src="https://ebdqfmu.stripocdn.email/content/assets/img/social-icons/logo-black/facebook-logo-black.png" alt="Fb" width="38" height="38" style="display:block;font-size:14px;border:0;outline:none;text-decoration:none"></a></td>
                          <td align="center" valign="top" style="padding:0;Margin:0;padding-right:20px"><a target="_blank" href="https://twitter.com/MdSaJibShikder9" style="mso-line-height-rule:exactly;text-decoration:underline;color:#5C68E2;font-size:14px"><img title="X.com" src="https://ebdqfmu.stripocdn.email/content/assets/img/social-icons/logo-black/x-logo-black.png" alt="X" width="38" height="38" style="display:block;font-size:14px;border:0;outline:none;text-decoration:none"></a></td>
                          <td align="center" valign="top" style="padding:0;Margin:0"><a target="_blank" href="https://www.linkedin.com/in/mdsajibshikder/" style="mso-line-height-rule:exactly;text-decoration:underline;color:#5C68E2;font-size:14px"><img title="Linkedin" src="https://ebdqfmu.stripocdn.email/content/assets/img/social-icons/logo-black/linkedin-logo-black.png" alt="In" width="38" height="38" style="display:block;font-size:14px;border:0;outline:none;text-decoration:none"></a></td>
                        </tr>
                      </table></td>
                    </tr>
                    <tr>
                      <td align="left" class="es-text-8953" style="padding:0;Margin:0;padding-top:15px"><p align="center" style="Margin:0;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:18px;letter-spacing:0;color:#333333;font-size:12px">Style Casual © 2021 Style Casual,​ Inc. All Rights Reserved.</p><p align="center" style="Margin:0;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:18px;letter-spacing:0;color:#333333;font-size:12px">4562 Hazy Panda Limits, Chair Crossing, Kentucky, ​US, 607898</p><span style="font-size:14px;line-height:21px !important"></span></td>
                    </tr>
                  </table></td>
                </tr>
              </table></td>
            </tr>
          </table></td>
        </tr>
      </table>
      <table cellpadding="0" cellspacing="0" align="center" class="es-content" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:100%;table-layout:fixed !important">
        <tr>
          <td align="center" class="es-info-area" style="padding:0;Margin:0">
          <table align="center" cellpadding="0" cellspacing="0" bgcolor="#00000000" class="es-content-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px" role="none">
            <tr>
              <td align="left" style="padding:0;Margin:0;padding-top:20px;padding-right:20px;padding-left:20px">
              <table cellpadding="0" cellspacing="0" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                <tr>
                  <td align="left" style="padding:0;Margin:0;width:560px">
                  <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                    <tr>
                      <td align="center" height="40" style="padding:0;Margin:0;font-size:0"></td>
                    </tr>
                  </table></td>
                </tr>
              </table></td>
            </tr>
            <tr>
              <td align="left" data-custom-paddings="true" style="padding:20px;Margin:0">
              <table cellpadding="0" cellspacing="0" width="100%" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                <tr>
                  <td align="center" valign="top" style="padding:0;Margin:0;width:560px">
                  <table cellpadding="0" cellspacing="0" width="100%" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                    <tr>
                      <td align="center" style="padding:0;Margin:0;display:none"></td>
                    </tr>
                  </table></td>
                </tr>
              </table></td>
            </tr>
          </table></td>
        </tr>
      </table></td>
    </tr>
  </table>
  </div>
</body>
      </html>`,
    };

    // send email with nodemiler
    await emailWithNodemailer(emailData);

    successResponse(res, {
      statusCode: 200,
      message: "Please check your email to verify your account",
      payload: {
        token: clientAcceptAbleToken,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @DESC Verify registered user account
 * @ROUTE api/v1/auth/verify-register
 * @method post
 * @access public
 */
const userAccountActivation = async (req, res, next) => {
  try {
    const { token } = req.body;
    if (!token) {
      throw createError(400, "Unable to get token");
    }

    // server acceptable token
    const mainToken = replaceHeypenWithDot(token);

    // verify token
    const decode = jwt.verify(mainToken, process.env.JWT_ACTIVATION_KEY);

    if (!decode) {
      throw createError(400, "Unable to verify token");
    }

    // get user provided data
    const { name, email, password, avaterInfo } = decode;

    // check if user already exists
    const isUserExist = await User.findOne({ email: email });
    if (isUserExist) {
      throw createError(400, "User already verifyed. Please login");
    }

    // Upload profile photo to cloudnary
    let results = null;
    if (avaterInfo) {
      results = await cloudUploadAvatar(avaterInfo);
    }

    // Create User
    const user = await User.create({
      name,
      email,
      password,
      avatar: {
        public_id: results ? results.public_id : null,
        url: results ? results.secure_url : null,
      },
    });

    successResponse(res, {
      statusCode: 200,
      message: "User successfully registered. Please login",
      payload: {
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @Desc Login user with id and password
 * @ROUTE api/v1/user/login
 * @Method POST
 * @access public
 */
const userLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      throw createError(404, "Invalid Email");
    }

    const matchPassword = await bcrypt.compare(password, user.password);

    if (!matchPassword) {
      throw createError(404, "Invalid Email or password");
    }

    // create cookies
    const accessToken = createJsonWebToken(
      { user },
      process.env.JWT_ACCESS_KEY,
      "7d"
    );
    res.cookie("accessToken", accessToken, {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
    });

    const userWithOutPass = await User.findOne({ email }).select("-password");

    successResponse(res, {
      statusCode: 200,
      message: "User successfully logged in",
      payload: {
        user: userWithOutPass,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @DESC User Logout
 * @ROUTE api/v1/user/logout
 * @method POST
 * @access private
 */
const userLogout = async (req, res, next) => {
  try {
    res.clearCookie("accessToken", null, {
      expires: new Date(),
      httpOnly: true,
    });

    successResponse(res, {
      statusCode: 200,
      message: "Token has been removed and user logged out successfully",
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @DESC Forget password
 * @ROUTE api/v1/users/forget-password
 * @method POST
 * @access public
 */
const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    // if existing user not found
    if (!user) {
      throw createError(404, "No such user registred with this email yet");
    }

    const token = createJsonWebToken(
      { email },
      process.env.JWT_RESET_PASSWORD_KEY,
      "15m"
    );

    // make token accessible
    const acceptableTokenForClient = replaceDotWithHeypen(token);

    const resetUrl = `${req.protocol}://${req.get(
      "host"
    )}/users/reset-password/${acceptableTokenForClient}`;

    // prepare for sent email
    const emailOptions = {
      email: user.email,
      subject: "Reset your password",
      html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html dir="ltr" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">
 <head>
  <meta charset="UTF-8">
  <meta content="width=device-width, initial-scale=1" name="viewport">
  <meta name="x-apple-disable-message-reformatting">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta content="telephone=no" name="format-detection">
  <title>New Template</title><!--[if (mso 16)]>
    <style type="text/css">
    a {text-decoration: none;}
    </style>
    <![endif]--><!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]--><!--[if gte mso 9]>
<noscript>
         <xml>
           <o:OfficeDocumentSettings>
           <o:AllowPNG></o:AllowPNG>
           <o:PixelsPerInch>96</o:PixelsPerInch>
           </o:OfficeDocumentSettings>
         </xml>
      </noscript>
<![endif]-->
  <style type="text/css">
.rollover:hover .rollover-first {
  max-height:0px!important;
  display:none!important;
}
.rollover:hover .rollover-second {
  max-height:none!important;
  display:block!important;
}
.rollover span {
  font-size:0px;
}
u + .body img ~ div div {
  display:none;
}
#outlook a {
  padding:0;
}
span.MsoHyperlink,
span.MsoHyperlinkFollowed {
  color:inherit;
  mso-style-priority:99;
}
a.es-button {
  mso-style-priority:100!important;
  text-decoration:none!important;
}
a[x-apple-data-detectors],
#MessageViewBody a {
  color:inherit!important;
  text-decoration:none!important;
  font-size:inherit!important;
  font-family:inherit!important;
  font-weight:inherit!important;
  line-height:inherit!important;
}
.es-desk-hidden {
  display:none;
  float:left;
  overflow:hidden;
  width:0;
  max-height:0;
  line-height:0;
  mso-hide:all;
}
@media only screen and (max-width:600px) {.es-m-p0r { padding-right:0px!important } .es-m-p0l { padding-left:0px!important } .es-p-default { } *[class="gmail-fix"] { display:none!important } p, a { line-height:150%!important } h1, h1 a { line-height:120%!important } h2, h2 a { line-height:120%!important } h3, h3 a { line-height:120%!important } h4, h4 a { line-height:120%!important } h5, h5 a { line-height:120%!important } h6, h6 a { line-height:120%!important } .es-header-body p { } .es-content-body p { } .es-footer-body p { } .es-infoblock p { } h1 { font-size:36px!important; text-align:left } h2 { font-size:26px!important; text-align:left } h3 { font-size:20px!important; text-align:left } h4 { font-size:24px!important; text-align:left } h5 { font-size:20px!important; text-align:left } h6 { font-size:16px!important; text-align:left } .es-header-body h1 a, .es-content-body h1 a, .es-footer-body h1 a { font-size:36px!important } .es-header-body h2 a, .es-content-body h2 a, .es-footer-body h2 a { font-size:26px!important } .es-header-body h3 a, .es-content-body h3 a, .es-footer-body h3 a { font-size:20px!important } .es-header-body h4 a, .es-content-body h4 a, .es-footer-body h4 a { font-size:24px!important } .es-header-body h5 a, .es-content-body h5 a, .es-footer-body h5 a { font-size:20px!important } .es-header-body h6 a, .es-content-body h6 a, .es-footer-body h6 a { font-size:16px!important } .es-menu td a { font-size:12px!important } .es-header-body p, .es-header-body a { font-size:14px!important } .es-content-body p, .es-content-body a { font-size:16px!important } .es-footer-body p, .es-footer-body a { font-size:14px!important } .es-infoblock p, .es-infoblock a { font-size:12px!important } .es-m-txt-c, .es-m-txt-c h1, .es-m-txt-c h2, .es-m-txt-c h3, .es-m-txt-c h4, .es-m-txt-c h5, .es-m-txt-c h6 { text-align:center!important } .es-m-txt-r, .es-m-txt-r h1, .es-m-txt-r h2, .es-m-txt-r h3, .es-m-txt-r h4, .es-m-txt-r h5, .es-m-txt-r h6 { text-align:right!important } .es-m-txt-j, .es-m-txt-j h1, .es-m-txt-j h2, .es-m-txt-j h3, .es-m-txt-j h4, .es-m-txt-j h5, .es-m-txt-j h6 { text-align:justify!important } .es-m-txt-l, .es-m-txt-l h1, .es-m-txt-l h2, .es-m-txt-l h3, .es-m-txt-l h4, .es-m-txt-l h5, .es-m-txt-l h6 { text-align:left!important } .es-m-txt-r img, .es-m-txt-c img, .es-m-txt-l img { display:inline!important } .es-m-txt-r .rollover:hover .rollover-second, .es-m-txt-c .rollover:hover .rollover-second, .es-m-txt-l .rollover:hover .rollover-second { display:inline!important } .es-m-txt-r .rollover span, .es-m-txt-c .rollover span, .es-m-txt-l .rollover span { line-height:0!important; font-size:0!important; display:block } .es-spacer { display:inline-table } a.es-button, button.es-button { font-size:20px!important; padding:10px 20px 10px 20px!important; line-height:120%!important } a.es-button, button.es-button, .es-button-border { display:inline-block!important } .es-m-fw, .es-m-fw.es-fw, .es-m-fw .es-button { display:block!important } .es-m-il, .es-m-il .es-button, .es-social, .es-social td, .es-menu { display:inline-block!important } .es-adaptive table, .es-left, .es-right { width:100%!important } .es-content table, .es-header table, .es-footer table, .es-content, .es-footer, .es-header { width:100%!important; max-width:600px!important } .adapt-img { width:100%!important; height:auto!important } .es-mobile-hidden, .es-hidden { display:none!important } .es-desk-hidden { width:auto!important; overflow:visible!important; float:none!important; max-height:inherit!important; line-height:inherit!important } tr.es-desk-hidden { display:table-row!important } table.es-desk-hidden { display:table!important } td.es-desk-menu-hidden { display:table-cell!important } .es-menu td { width:1%!important } table.es-table-not-adapt, .esd-block-html table { width:auto!important } .h-auto { height:auto!important } .es-text-8953, .es-text-8953 p, .es-text-8953 a, .es-text-8953 h1, .es-text-8953 h2, .es-text-8953 h3, .es-text-8953 h4, .es-text-8953 h5, .es-text-8953 h6, .es-text-8953 ul, .es-text-8953 ol, .es-text-8953 li, .es-text-8953 span, .es-text-8953 sup, .es-text-8953 sub, .es-text-8953 u, .es-text-8953 b, .es-text-8953 strong, .es-text-8953 em, .es-text-8953 i { font-size:16px!important } .es-text-7907, .es-text-7907 p, .es-text-7907 a, .es-text-7907 h1, .es-text-7907 h2, .es-text-7907 h3, .es-text-7907 h4, .es-text-7907 h5, .es-text-7907 h6, .es-text-7907 ul, .es-text-7907 ol, .es-text-7907 li, .es-text-7907 span, .es-text-7907 sup, .es-text-7907 sub, .es-text-7907 u, .es-text-7907 b, .es-text-7907 strong, .es-text-7907 em, .es-text-7907 i { font-size:20px!important } }
@media screen and (max-width:384px) {.mail-message-content { width:414px!important } }
</style>
 </head>
 <body class="body" style="width:100%;height:100%;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0">
  <div dir="ltr" class="es-wrapper-color" lang="en" style="background-color:#FAFAFA"><!--[if gte mso 9]>
			<v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
				<v:fill type="tile" color="#fafafa"></v:fill>
			</v:background>
		<![endif]-->
   <table width="100%" cellspacing="0" cellpadding="0" class="es-wrapper" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top;background-color:#FAFAFA">
     <tr>
      <td valign="top" style="padding:0;Margin:0">
       <table cellpadding="0" cellspacing="0" align="center" class="es-header" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:100%;table-layout:fixed !important;background-color:transparent;background-repeat:repeat;background-position:center top">
         <tr>
          <td align="center" style="padding:0;Margin:0">
           <table bgcolor="#ffffff" align="center" cellpadding="0" cellspacing="0" class="es-header-body" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px">
             <tr>
              <td align="left" data-custom-paddings="true" style="padding:30px;Margin:0">
               <table cellpadding="0" cellspacing="0" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                 <tr>
                  <td align="left" style="padding:0;Margin:0;width:540px">
                   <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                     <tr>
                      <td align="center" height="40" style="padding:0;Margin:0;font-size:0"></td>
                     </tr>
                   </table></td>
                 </tr>
               </table></td>
             </tr>
             <tr>
              <td align="left" bgcolor="#10AC84" style="Margin:0;padding-top:20px;padding-right:20px;padding-bottom:10px;padding-left:20px;background-color:#10AC84" data-custom-paddings="true">
               <table cellpadding="0" cellspacing="0" align="right" class="es-right" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right">
                 <tr>
                  <td valign="top" align="center" class="es-m-p0r" style="padding:0;Margin:0;width:560px">
                   <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                     <tr>
                      <td align="center" style="padding:0;Margin:0;padding-bottom:10px;font-size:0px"><a target="_blank" href="http://localhost:5173/" style="mso-line-height-rule:exactly;text-decoration:underline;color:#666666;font-size:14px"><img src="https://ebdqfmu.stripocdn.email/content/guids/CABINET_4c20da8e704a7908e1e95c6899509ac59a7672fdc45a02c24e317d74d40bfc80/images/logo2.png" alt="" title="Logo" width="299" style="display:block;font-size:12px;border:0;outline:none;text-decoration:none;border-radius:0"></a></td>
                     </tr>
                   </table></td>
                 </tr>
               </table></td>
             </tr>
           </table></td>
         </tr>
       </table>
       <table cellpadding="0" cellspacing="0" align="center" class="es-content" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:100%;table-layout:fixed !important">
         <tr>
          <td align="center" style="padding:0;Margin:0">
           <table bgcolor="#ffffff" align="center" cellpadding="0" cellspacing="0" class="es-content-body" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px">
             <tr>
              <td align="left" data-custom-paddings="true" style="Margin:0;padding-right:20px;padding-bottom:10px;padding-left:20px;padding-top:30px">
               <table cellpadding="0" cellspacing="0" width="100%" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                 <tr>
                  <td align="center" valign="top" style="padding:0;Margin:0;width:560px">
                   <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                     <tr>
                      <td align="center" style="padding:0;Margin:0;padding-bottom:10px;padding-top:10px;font-size:0px"><img src="https://ebdqfmu.stripocdn.email/content/guids/CABINET_4c20da8e704a7908e1e95c6899509ac59a7672fdc45a02c24e317d74d40bfc80/images/forget.png" alt="" width="125" class="adapt-img" style="display:block;font-size:14px;border:0;outline:none;text-decoration:none"></td>
                     </tr>
                     <tr>
                      <td align="center" style="padding:0;Margin:0;padding-top:20px;padding-bottom:10px"><h1 class="es-m-txt-c" style="Margin:0;font-family:arial, 'helvetica neue', helvetica, sans-serif;mso-line-height-rule:exactly;letter-spacing:0;font-size:46px;font-style:normal;font-weight:bold;line-height:46px;color:#333333">Password reset&nbsp;</h1></td>
                     </tr>
                     <tr>
                      <td align="center" class="es-m-p0r es-m-p0l" style="Margin:0;padding-top:30px;padding-right:40px;padding-bottom:5px;padding-left:10px"><p align="left" style="Margin:0;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px !important;letter-spacing:0;color:#333333;font-size:14px">After you click the button, you'll be asked to complete the following steps:</p></td>
                     </tr>
                     <tr>
                      <td align="center" style="padding:0;Margin:0;padding-bottom:5px">
                       <ol style="font-family:arial, 'helvetica neue', helvetica, sans-serif;padding:0px 0px 0px 40px;margin-top:15px;margin-bottom:15px">
                        <li style="color:#333333;margin:0px 0px 15px;font-size:14px;line-height:16.8px !important"><p align="left" style="Margin:0;mso-line-height-rule:exactly;mso-margin-bottom-alt:15px;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:16.8px !important;letter-spacing:0;color:#333333;font-size:14px;mso-margin-top-alt:15px">Enter a new password.</p></li>
                        <li style="color:#333333;margin:0px 0px 15px;font-size:14px;line-height:16.8px !important"><p align="left" style="Margin:0;mso-line-height-rule:exactly;mso-margin-bottom-alt:15px;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:16.8px !important;letter-spacing:0;color:#333333;font-size:14px">Confirm your new password.</p></li>
                        <li style="color:#333333;margin:0px 0px 15px;font-size:14px;line-height:16.8px !important"><p align="left" style="Margin:0;mso-line-height-rule:exactly;mso-margin-bottom-alt:15px;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:16.8px !important;letter-spacing:0;color:#333333;font-size:14px">Click Submit.</p></li>
                       </ol></td>
                     </tr>
                     <tr>
                      <td align="center" style="padding:0;Margin:0;padding-bottom:10px;padding-top:10px"><span class="es-button-border" style="border-style:solid;border-color:#2CB543;background:#10AC84;border-width:0px;display:inline-block;border-radius:6px;width:auto"><a target="_blank" href="${resetUrl}" class="es-button" style="mso-style-priority:100 !important;text-decoration:none !important;mso-line-height-rule:exactly;color:#FFFFFF;font-size:20px;padding:10px 30px 10px 30px;display:inline-block;background:#10AC84;border-radius:6px;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-weight:normal;font-style:normal;line-height:24px;width:auto;text-align:center;letter-spacing:0;mso-padding-alt:0;mso-border-alt:10px solid #10AC84;border-left-width:30px;border-right-width:30px">RESET YOUR PASSWORD</a></span></td>
                     </tr>
                     <tr>
                      <td align="center" class="es-m-p0r es-m-p0l es-text-7907" style="Margin:0;padding-bottom:5px;padding-left:10px;padding-top:5px;padding-right:10px"><h3 align="center" style="Margin:0;font-family:arial, 'helvetica neue', helvetica, sans-serif;mso-line-height-rule:exactly;letter-spacing:0;font-size:20px;font-style:normal;font-weight:bold;line-height:30px;color:#333333">This link is valid for one use only. Expires in 15 minutes.</h3></td>
                     </tr>
                     <tr>
                      <td align="left" style="padding:10px;Margin:0"><p align="center" style="Margin:0;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;letter-spacing:0;color:#333333;font-size:14px">If you didn't request to reset your password, please disregard this message or contact our customer service department.</p></td>
                     </tr>
                     <tr>
                      <td align="center" style="padding:20px;Margin:0;font-size:0">
                       <table border="0" width="100%" height="100%" cellpadding="0" cellspacing="0" class="es-spacer" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                         <tr>
                          <td style="padding:0;Margin:0;border-bottom:1px solid #cccccc;background:none;height:1px;width:100%;margin:0px"></td>
                         </tr>
                       </table></td>
                     </tr>
                   </table></td>
                 </tr>
               </table></td>
             </tr>
             <tr>
              <td align="left" bgcolor="#e9e9e9e9" style="padding:0;Margin:0;background-color:#e9e9e9e9" data-custom-paddings="true">
               <table cellpadding="0" cellspacing="0" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                 <tr>
                  <td align="left" style="padding:0;Margin:0;padding-top:15px;width:600px">
                   <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                     <tr>
                      <td align="center" style="padding:0;Margin:0;font-size:0">
                       <table cellpadding="0" cellspacing="0" class="es-table-not-adapt es-social" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                         <tr>
                          <td align="center" valign="top" style="padding:0;Margin:0;padding-right:20px"><a target="_blank" href="https://www.facebook.com/Md.SaJib.Raajput/" style="mso-line-height-rule:exactly;text-decoration:underline;color:#5C68E2;font-size:14px"><img title="Facebook" src="https://ebdqfmu.stripocdn.email/content/assets/img/social-icons/logo-black/facebook-logo-black.png" alt="Fb" width="38" height="38" style="display:block;font-size:14px;border:0;outline:none;text-decoration:none"></a></td>
                          <td align="center" valign="top" style="padding:0;Margin:0;padding-right:20px"><a target="_blank" href="https://twitter.com/MdSaJibShikder9" style="mso-line-height-rule:exactly;text-decoration:underline;color:#5C68E2;font-size:14px"><img title="X.com" src="https://ebdqfmu.stripocdn.email/content/assets/img/social-icons/logo-black/x-logo-black.png" alt="X" width="38" height="38" style="display:block;font-size:14px;border:0;outline:none;text-decoration:none"></a></td>
                          <td align="center" valign="top" style="padding:0;Margin:0"><a target="_blank" href="https://www.linkedin.com/in/mdsajibshikder/" style="mso-line-height-rule:exactly;text-decoration:underline;color:#5C68E2;font-size:14px"><img title="Linkedin" src="https://ebdqfmu.stripocdn.email/content/assets/img/social-icons/logo-black/linkedin-logo-black.png" alt="In" width="38" height="38" style="display:block;font-size:14px;border:0;outline:none;text-decoration:none"></a></td>
                         </tr>
                       </table></td>
                     </tr>
                     <tr>
                      <td align="left" class="es-text-8953" style="padding:0;Margin:0;padding-top:15px"><p align="center" style="Margin:0;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:18px;letter-spacing:0;color:#333333;font-size:12px">Style Casual © 2021 Style Casual,​ Inc. All Rights Reserved.</p><p align="center" style="Margin:0;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:18px;letter-spacing:0;color:#333333;font-size:12px">4562 Hazy Panda Limits, Chair Crossing, Kentucky, ​US, 607898</p><span style="font-size:14px;line-height:21px !important"></span></td>
                     </tr>
                   </table></td>
                 </tr>
               </table></td>
             </tr>
           </table></td>
         </tr>
       </table>
       <table cellpadding="0" cellspacing="0" align="center" class="es-content" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:100%;table-layout:fixed !important">
         <tr>
          <td align="center" class="es-info-area" style="padding:0;Margin:0">
           <table align="center" cellpadding="0" cellspacing="0" bgcolor="#00000000" class="es-content-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px" role="none">
             <tr>
              <td align="left" style="padding:0;Margin:0;padding-top:20px;padding-right:20px;padding-left:20px">
               <table cellpadding="0" cellspacing="0" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                 <tr>
                  <td align="left" style="padding:0;Margin:0;width:560px">
                   <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                     <tr>
                      <td align="center" height="40" style="padding:0;Margin:0;font-size:0"></td>
                     </tr>
                   </table></td>
                 </tr>
               </table></td>
             </tr>
             <tr>
              <td align="left" data-custom-paddings="true" style="padding:20px;Margin:0">
               <table cellpadding="0" cellspacing="0" width="100%" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                 <tr>
                  <td align="center" valign="top" style="padding:0;Margin:0;width:560px">
                   <table cellpadding="0" cellspacing="0" width="100%" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                     <tr>
                      <td align="center" style="padding:0;Margin:0;display:none"></td>
                     </tr>
                   </table></td>
                 </tr>
               </table></td>
             </tr>
           </table></td>
         </tr>
       </table></td>
     </tr>
   </table>
  </div>
 </body>
      </html>`,
    };

    // send email with nodemailer
    await emailWithNodemailer(emailOptions);

    successResponse(res, {
      statusCode: 200,
      message: `A reset password link was successfully sent to ${user.email}. Please check your email`,
      payload: { token: acceptableTokenForClient },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @DESC Resets the password
 * @ROUTE api/v1/users/reset-password/:token
 * @method PUT
 * @access private
 */
const resetPassword = async (req, res, next) => {
  try {
    const { token, password, confirmPassword } = req.body;
    const serverAcceptableToken = replaceHeypenWithDot(token);

    const decoded = jwt.verify(
      serverAcceptableToken,
      process.env.JWT_RESET_PASSWORD_KEY
    );

    const user = await User.findOne({
      email: decoded.email,
    });

    if (!user) {
      throw createError(404, "User not found for reset Password");
    }

    if (password !== confirmPassword) {
      throw createError(400, "Confirm password not matched");
    }

    const userAfterResetPass = await User.findByIdAndUpdate(
      user._id,
      {
        password: password,
      },
      { new: true }
    ).select("-password");

    successResponse(res, {
      statusCode: 200,
      message: "Password reset successfully. Please login here!!!",
      payload: {
        user: userAfterResetPass,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @DESC LOGGEDIN USER DETAILS
 * @ROUTE api/v1/user/me
 * @method GET
 * @access private
 */
const loggedInUser = async (req, res, next) => {
  try {
    return successResponse(res, {
      statusCode: 200,
      message: "Logged in user details",
      payload: { user: req.user },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @DESC UPDATE USER PASSWORD
 * @ROUTE api/v1/user/update-password
 * @method PUT
 * @access private
 */
const updatePassword = async (req, res, next) => {
  try {
    const id = req.user.id;
    const { oldPassword, newPassword, confirmNewPassword } = req.body;

    if (!oldPassword || !newPassword || !confirmNewPassword) {
      throw createError(400, "All feilds are required");
    }

    const user = await User.findById(id);

    // check previous user password
    const isPasswordMatch = bcrypt.compareSync(oldPassword, user.password);

    if (!isPasswordMatch) {
      throw createError(400, "old password mismatch");
    }

    if (newPassword !== confirmNewPassword) {
      throw createError(400, "Confirm password not matched");
    }

    const updatedPassUser = await User.findByIdAndUpdate(
      id,
      {
        password: newPassword,
      },
      { new: true }
    ).select("-password");

    res.clearCookie("accessToken", null, {
      httpOnly: true,
    });

    successResponse(res, {
      success: true,
      message: "Password updated successfully. Please login again",
      payload: {
        user: updatedPassUser,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @DESC UPDATE PROFILE
 * @ROUTE api/v1/user/update-profile
 * @method PUT
 * @access private
 */
const updateUserProfile = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;

    if (!name) {
      throw createError(400, "Name and Email must be provided");
    }

    // find user
    const options = { password: 0 };
    const exestingUser = await User.findById(id, options);

    // avatar update
    let userAvatar = null;
    if (req.file) {
      // if new file provided, delete previous avatar
      const public_id = exestingUser?.avatar?.public_id;
      if (public_id) {
        await cloudDeleteAvatar(public_id);
      }

      // set new avatar
      userAvatar = await cloudUploadAvatar(req.file);
    }

    console.log(req.body);

    const data = {
      name,
      email,
      avatar: {
        public_id: userAvatar
          ? userAvatar?.public_id
          : exestingUser?.avatar?.public_id,
        url: userAvatar ? userAvatar?.url : exestingUser?.avatar?.url,
      },
    };

    const updatedUser = await User.findByIdAndUpdate(id, data, { new: true });

    successResponse(res, {
      statusCode: 200,
      message: "Your profile updated successfully",
      payload: {
        user: updatedUser,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  processRegistration,
  userAccountActivation,
  userLogin,
  userLogout,
  loggedInUser,
  forgotPassword,
  resetPassword,
  updatePassword,
  updateUserProfile,
};
