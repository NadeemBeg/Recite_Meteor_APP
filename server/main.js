import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
  // code to run on server at startup

  /*
  * Google Account Used for app.
  * User Name: recite.app.2019@gmail.com
  * Password: reciteapp2019

  * Cloudinary Account Used for app.
  * User Name: recite.app.2019@gmail.com
  * Password: Reciteapp_2019
  */
  
  process.env.MAIL_URL="smtps://mukesh.sachdev%40ifuturz.com:ifuturzjs@smtp.gmail.com:465";
  Accounts.emailTemplates.siteName = 'Recite App';
  Accounts.emailTemplates.from = 'Recite App <no-reply@recite-app.com>';
  Accounts.emailTemplates.resetPassword.from = () => {
  // Overrides the value set in `Accounts.emailTemplates.from` when resetting
  // passwords.
    return 'Recite App <no-reply@recite-app.com>';
  };
  Accounts.emailTemplates.resetPassword = {
     subject() {
        return "Reset your password!";
     },
     html(user, url) {
        //return `Hey ${user}! Verify your e-mail by following this link: ${url}`;
        return `<html style="width:100%;font-family:helvetica, \'helvetica neue\', arial, verdana, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0;"><head><meta charset="UTF-8"><meta content="width=device-width, initial-scale=1" name="viewport"><meta name="x-apple-disable-message-reformatting"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta content="telephone=no" name="format-detection"><title>New email template 2019-09-26</title><style type="text/css">@media only screen and (max-width:600px){p, ul li, ol li,a{font-size:16px!important;line-height:150%!important}h1{font-size:30px!important;text-align:center;line-height:120%!important}h2{font-size:26px!important;text-align:center;line-height:120%!important}h3{font-size:20px!important;text-align:center;line-height:120%!important}h1 a{font-size:30px!important}h2 a{font-size:26px!important}h3 a{font-size:20px!important}.es-menu td a{font-size:14px!important}.es-header-body p, .es-header-body ul li, .es-header-body ol li, .es-header-body a{font-size:14px!important}.es-footer-body p, .es-footer-body ul li, .es-footer-body ol li, .es-footer-body a{font-size:14px!important}.es-infoblock p, .es-infoblock ul li, .es-infoblock ol li, .es-infoblock a{font-size:12px!important}*[class="gmail-fix"]{display:none!important}.es-m-txt-c, .es-m-txt-c h1, .es-m-txt-c h2, .es-m-txt-c h3{text-align:center!important}.es-m-txt-r, .es-m-txt-r h1, .es-m-txt-r h2, .es-m-txt-r h3{text-align:right!important}.es-m-txt-l, .es-m-txt-l h1, .es-m-txt-l h2, .es-m-txt-l h3{text-align:left!important}.es-m-txt-r img, .es-m-txt-c img, .es-m-txt-l img{display:inline!important}.es-button-border{display:inline-block!important}a.es-button{font-size:20px!important;display:inline-block!important}.es-btn-fw{border-width:10px 0px!important;text-align:center!important}.es-adaptive table,.es-btn-fw,.es-btn-fw-brdr,.es-left,.es-right{width:100%!important}.es-content table, .es-header table, .es-footer table,.es-content,.es-footer,.es-header{width:100%!important;max-width:600px!important}.es-adapt-td{display:block!important;width:100%!important}.adapt-img{width:100%!important;height:auto!important}.es-m-p0{padding:0px!important}.es-m-p0r{padding-right:0px!important}.es-m-p0l{padding-left:0px!important}.es-m-p0t{padding-top:0px!important}.es-m-p0b{padding-bottom:0!important}.es-m-p20b{padding-bottom:20px!important}.es-mobile-hidden,.es-hidden{display:none!important}.es-desk-hidden{display:table-row!important;width:auto!important;overflow:visible!important;float:none!important;max-height:inherit!important;line-height:inherit!important}.es-desk-menu-hidden{display:table-cell!important}table.es-table-not-adapt, .esd-block-html table{width:auto!important}table.es-social{display:inline-block!important}table.es-social td{display:inline-block!important}}#outlook a{padding:0}.ExternalClass{width:100%}.ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div{line-height:100%}.es-button{mso-style-priority:100!important;text-decoration:none!important}a[x-apple-data-detectors]{color:inherit!important;text-decoration:none!important;font-size:inherit!important;font-family:inherit!important;font-weight:inherit!important;line-height:inherit!important}.es-desk-hidden{display:none;float:left;overflow:hidden;width:0;max-height:0;line-height:0;mso-hide:all}</style></head><body style="width:100%;font-family:helvetica, \'helvetica neue\', arial, verdana, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0;"><div class="es-wrapper-color" style="background-color:#FFFFFF;"> <!--[if gte mso 9]> <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t"> <v:fill type="tile" color="#ffffff"></v:fill> </v:background> <![endif]--><table class="es-wrapper" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top;" width="100%" cellspacing="0" cellpadding="0"><tbody><tr style="border-collapse:collapse;"><td valign="top" style="padding:0;Margin:0;"><table class="es-header" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;background-color:transparent;background-repeat:repeat;background-position:center top;"><tbody><tr style="border-collapse:collapse;"><td align="center" style="padding:0;Margin:0;"><table class="es-header-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;" width="600" cellspacing="0" cellpadding="0" align="center"><tbody><tr style="border-collapse:collapse;"><td align="left" style="padding:0;Margin:0;"><table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;"><tbody><tr style="border-collapse:collapse;"><td width="600" valign="top" align="center" style="padding:0;Margin:0;"><table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;"><tbody><tr style="border-collapse:collapse;"><td class="es-m-txt-c" align="center" style="padding:0;Margin:0;padding-top:20px;padding-bottom:20px;"><a href="https://recite-app.herokuapp.com" target="_blank" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:helvetica, \'helvetica neue\', arial, verdana, sans-serif;font-size:14px;text-decoration:none;color:#F6A1B4;"><img src="https://ecjuei.stripocdn.email/content/guids/81c066bb-0f74-4f26-bef3-04e2c6643ca1/images/86661569480292938.png" alt="Recite" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic;" title="Recite" width="104"></a></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table><table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;"><tbody><tr style="border-collapse:collapse;"><td align="center" style="padding:0;Margin:0;"><table class="es-content-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;" width="600" cellspacing="0" cellpadding="0" align="center"><tbody><tr style="border-collapse:collapse;"><td align="left" style="padding:0;Margin:0;"><table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;"><tbody><tr style="border-collapse:collapse;"><td width="600" valign="top" align="center" style="padding:0;Margin:0;"><table style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:separate;border-spacing:0px;border-radius:3px;background-color:#FCFCFC;" width="100%" cellspacing="0" cellpadding="0" bgcolor="#fcfcfc"><tbody><tr style="border-collapse:collapse;"><td bgcolor="#fcfcfc" align="left" style="padding:0;Margin:0;padding-top:10px;padding-left:20px;padding-right:20px;"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:helvetica, \'helvetica neue\', arial, verdana, sans-serif;line-height:21px;color:#333333;">Hi ${user.profile.fullName},<br><br>You recently requested to reset your password for your Recite Account. Click the button below to reset it.<br><br><div style=" text-align: center; "><a href="${url}" style=" background: #66bfe1; height: 40px; padding: 15px; border-radius: 5px; text-align: center; color: #fff; text-decoration: none; /* margin: 25%; */ ">Reset your password.</a></div><br>If you did not request a password reset, please ignore this email or reply to us and let us know. The password reset is only valid for the next 10 minutes.<br><br>P.S. We also love hearing from you and helping with any issues you may have. Please reply to this email with any questions or just to say hi.<br><br>Thank you,<br> The Recite Team @TribeAppsLLC.<br><br>If you’re having trouble clicking the password reset button, copy and paste the URL below into your browser.<br><br>${url}</p></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table><table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;"><tbody><tr style="border-collapse:collapse;"><td align="center" style="padding:0;Margin:0;"><table class="es-content-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FCFCFC;" width="600" cellspacing="0" cellpadding="0" bgcolor="#fcfcfc" align="center"><tbody><tr style="border-collapse:collapse;"><td align="left" style="Margin:0;padding-left:20px;padding-right:20px;padding-bottom:25px;padding-top:40px;"> <!--[if mso]><table width="560" cellpadding="0" cellspacing="0"><tr><td width="274" valign="top"><![endif]--><table class="es-left" cellspacing="0" cellpadding="0" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left;"><tbody><tr style="border-collapse:collapse;"><td class="es-m-p0r es-m-p20b" width="254" align="center" style="padding:0;Margin:0;"><table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;"><tbody><tr style="border-collapse:collapse;"><td align="left" style="padding:0;Margin:0;"><h3 style="Margin:0;line-height:20px;mso-line-height-rule:exactly;font-family:roboto, \'helvetica neue\', helvetica, arial, sans-serif;font-size:17px;font-style:normal;font-weight:normal;color:#333333;">Download the app and enjoy purchases</h3></td></tr></tbody></table></td><td class="es-hidden" width="20" style="padding:0;Margin:0;"></td></tr></tbody></table> <!--[if mso]></td><td width="133" valign="top"><![endif]--><table class="es-left" cellspacing="0" cellpadding="0" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left;"><tbody><tr style="border-collapse:collapse;"><td class="es-m-p20b" width="133" align="center" style="padding:0;Margin:0;"><table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;"><tbody><tr style="border-collapse:collapse;"><td align="center" style="padding:0;Margin:0;"><a target="_blank" href="https://viewstripo.email/" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:helvetica, \'helvetica neue\', arial, verdana, sans-serif;font-size:14px;text-decoration:none;color:#F6A1B4;"><img src="https://ecjuei.stripocdn.email/content/guids/CABINET_e48ed8a1cdc6a86a71047ec89b3eabf6/images/92051534250512328.png" alt="App Store" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic;" class="adapt-img" title="App Store" width="133"></a></td></tr></tbody></table></td></tr></tbody></table> <!--[if mso]></td><td width="20"></td><td width="133" valign="top"><![endif]--><table class="es-right" cellspacing="0" cellpadding="0" align="right" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right;"><tbody><tr style="border-collapse:collapse;"><td width="133" align="center" style="padding:0;Margin:0;"><table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;"><tbody><tr style="border-collapse:collapse;"><td align="center" style="padding:0;Margin:0;"><a target="_blank" href="https://viewstripo.email/" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:helvetica, \'helvetica neue\', arial, verdana, sans-serif;font-size:14px;text-decoration:none;color:#F6A1B4;"><img class="adapt-img" src="https://ecjuei.stripocdn.email/content/guids/CABINET_e48ed8a1cdc6a86a71047ec89b3eabf6/images/82871534250557673.png" alt="Google Play" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic;" title="Google Play" width="133"></a></td></tr></tbody></table></td></tr></tbody></table> <!--[if mso]></td></tr></table><![endif]--></td></tr></tbody></table></td></tr></tbody></table><table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;"><tbody><tr style="border-collapse:collapse;"><td align="center" style="padding:0;Margin:0;"><table class="es-content-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;" width="600" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center"><tbody><tr style="border-collapse:collapse;"><td align="left" style="padding:0;Margin:0;"><table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;"><tbody><tr style="border-collapse:collapse;"><td width="600" valign="top" align="center" style="padding:0;Margin:0;"><table style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFF4F7;" width="100%" cellspacing="0" cellpadding="0" bgcolor="#fff4f7"><tbody><tr style="border-collapse:collapse;"><td align="center" style="Margin:0;padding-bottom:5px;padding-top:20px;padding-left:20px;padding-right:20px;"><h3 style="Margin:0;line-height:22px;mso-line-height-rule:exactly;font-family:roboto, \'helvetica neue\', helvetica, arial, sans-serif;font-size:18px;font-style:normal;font-weight:normal;color:#333333;">Let\'s get social</h3></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table><table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;"><tbody><tr style="border-collapse:collapse;"><td style="padding:0;Margin:0;background-color:#FFFFFF;" bgcolor="#ffffff" align="center"><table class="es-content-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;" width="600" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center"><tbody><tr style="border-collapse:collapse;"><td align="left" style="padding:0;Margin:0;"><table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;"><tbody><tr style="border-collapse:collapse;"><td width="600" valign="top" align="center" style="padding:0;Margin:0;"><table style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:separate;border-spacing:0px;background-color:#FFF4F7;border-radius:3px;" width="100%" cellspacing="0" cellpadding="0" bgcolor="#fff4f7"><tbody><tr style="border-collapse:collapse;"><td bgcolor="#fff4f7" align="center" style="Margin:0;padding-top:5px;padding-bottom:5px;padding-left:20px;padding-right:20px;"><table width="100%" height="100%" cellspacing="0" cellpadding="0" border="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;"><tbody><tr style="border-collapse:collapse;"><td style="padding:0;Margin:0px;border-bottom:1px solid #FFF4F7;background:rgba(0, 0, 0, 0) none repeat scroll 0% 0%;height:1px;width:100%;margin:0px;"></td></tr></tbody></table></td></tr><tr style="border-collapse:collapse;"><td align="center" style="Margin:0;padding-top:5px;padding-left:20px;padding-right:20px;padding-bottom:25px;"><table class="es-table-not-adapt es-social" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;"><tbody><tr style="border-collapse:collapse;"><td valign="top" align="center" style="padding:0;Margin:0;padding-right:10px;"><a target="_blank" href="https://viewstripo.email/" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:helvetica, \'helvetica neue\', arial, verdana, sans-serif;font-size:14px;text-decoration:none;color:#F6A1B4;"><img title="Facebook" src="https://ecjuei.stripocdn.email/content/assets/img/social-icons/logo-black/facebook-logo-black.png" alt="Fb" width="32" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic;"></a></td><td valign="top" align="center" style="padding:0;Margin:0;padding-right:10px;"><a target="_blank" href="https://viewstripo.email/" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:helvetica, \'helvetica neue\', arial, verdana, sans-serif;font-size:14px;text-decoration:none;color:#F6A1B4;"><img title="Twitter" src="https://ecjuei.stripocdn.email/content/assets/img/social-icons/logo-black/twitter-logo-black.png" alt="Tw" width="32" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic;"></a></td><td valign="top" align="center" style="padding:0;Margin:0;padding-right:10px;"><a target="_blank" href="https://viewstripo.email/" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:helvetica, \'helvetica neue\', arial, verdana, sans-serif;font-size:14px;text-decoration:none;color:#F6A1B4;"><img title="Instagram" src="https://ecjuei.stripocdn.email/content/assets/img/social-icons/logo-black/instagram-logo-black.png" alt="Inst" width="32" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic;"></a></td><td valign="top" align="center" style="padding:0;Margin:0;padding-right:10px;"><a target="_blank" href="https://viewstripo.email/" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:helvetica, \'helvetica neue\', arial, verdana, sans-serif;font-size:14px;text-decoration:none;color:#F6A1B4;"><img title="Youtube" src="https://ecjuei.stripocdn.email/content/assets/img/social-icons/logo-black/youtube-logo-black.png" alt="Yt" width="32" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic;"></a></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></div></body></html>`;
     }
  };
  
  Push.Configure({
    /*apn: {
      certData: Assets.getText('apnDevCert.pem'),
      keyData: Assets.getText('apnDevKey.pem'),
      passphrase: 'xxxxxxxxx',
      production: true,
      //gateway: 'gateway.push.apple.com',
    },*/
    gcm: {
      apiKey: 'AAAA5kO_PSI:APA91bGZdLa-eTEP2Ic5U41h-XavM-qi33ZE7piQ9FHnQ3kjPy9PxjRcMwcfgJ-v4JTnHxs-cxHQVV3NGNUNvsPEPZZf802f5d2dAD053HXVADA8vnCzCk0qA1zrq26rjCmnuHjSwo9e',  // GCM/FCM server key
    }
    // production: true,
    // 'sound' true,
    // 'badge' true,
    // 'alert' true,
    // 'vibrate' true,
    // 'sendInterval': 15000, Configurable interval between sending
    // 'sendBatchSize': 1, Configurable number of notifications to send per batch
    // 'keepNotifications': false,
  //
  });
  Push.allow({
      send: function(userId, notification) {
        
          return true; // Allow all users to send
      }
  });
  Push.debug = true;
  
  var keys = adminSettings.findOne({});
  console.log("keys   r",keys);
  
  var keys = adminSettings.findOne({});
  console.log("keys   r",keys);
  if(typeof keys !== "undefined")
  {
    var twilio = require('twilio');
    var accountSid =  keys.twilioSID; //'AC5853c868f6e7a8ace0eb10dd39a748a6'; // Your Account SID from www.twilio.com/console
    var authToken =  keys.twilioAuthToken; //'974cda7845bb1c3fcf9775cad3032a5a';
    
    Cloudinary.config({
      cloud_name: keys.cloudinaryCloudName,//Meteor.settings.public.CLOUDINARY_CLOUD_NAME,
      api_key: keys.cloudinaryApiKey,//Meteor.settings.public.CLOUDINARY_API_KEY,
      api_secret: keys.cloudinaryApiSecret,//Meteor.settings.CLOUDINARY_API_SECRET
    });

    ServiceConfiguration.configurations.remove({
      service: "facebook"
    });


    ServiceConfiguration.configurations.insert({
      service: "facebook",
      appId: keys.facebookAppId,//'2219465048129241',
      secret: keys.facebookSecret,//'837c4542ec72b1506b1efdde34173b60'
    });

    ServiceConfiguration.configurations.remove({
      service: "google"
    });

    ServiceConfiguration.configurations.insert({
      service: "google",
      clientId: keys.googleAppId, //"761389318478-5sjbv2r9pu25b5heqdnu8mnoov2ticp6.apps.googleusercontent.com",
      secret: keys.googleSecret, //"FaWx8_aAttwkAuMkOUrqHZkd"
    });
  }
  else
  {
    var twilio = require('twilio');
    var accountSid =  'ACdc6379cd4a3172997233febede12862a'; // Your Account SID from www.twilio.com/console
    var authToken =  'b9f3291e5214fc3ad405c8d1a1636540';
    

    Cloudinary.config({
      cloud_name: Meteor.settings.public.CLOUDINARY_CLOUD_NAME,
      api_key: Meteor.settings.public.CLOUDINARY_API_KEY,
      api_secret: Meteor.settings.CLOUDINARY_API_SECRET
    });

    ServiceConfiguration.configurations.remove({
      service: "facebook"
    });

    ServiceConfiguration.configurations.insert({
      service: "facebook",
      appId: '2219465048129241',
      secret: '837c4542ec72b1506b1efdde34173b60'
    });

    ServiceConfiguration.configurations.remove({
      service: "google"
    });

    ServiceConfiguration.configurations.insert({
      service: "google",
      clientId: "988979084578-m644kabm7lo2v4v4h539qhhjh4ebparl.apps.googleusercontent.com",
      secret: "GVZMfkOr9L1OxfjMnDmLFNkM"
    });
  }
  
  
  Accounts.onCreateUser(function(options, user) {
    if (user.services.facebook) {
          var email = user.services.facebook.email;
          var fname = user.services.facebook.first_name;
          var lname = user.services.facebook.last_name;
          var emails = [{"address":email,"verified":true}]
          user.emails = emails;
          user.username = user.services.facebook.email;
          user.profile = {};
          user.profile.fullName = fname + " " + lname;
          user.profile.isActive = true;
      }
      else if (user.services.google) {
            var email = user.services.google.email;
            var fullName = user.services.google.given_name;
            var lname = user.services.google.family_name;
            var emails = [{"address":email,"verified":true}]
            user.emails = emails;
            user.username = user.services.google.email;
            user.profile = {};
            user.profile.fullName = fullName + " " + lname;
            //user.profile.lastName = lname;
            //user.profile.isActive = true;
        }
      else
      {
        user.profile = {};
        user.profile = options.profile;
      }
      return user;
  });

  Meteor.methods({
    isUserExist(emailAddress)
    {
      var userDetails = Meteor.users.find({
        "username": emailAddress
      });
      if(userDetails.count() > 0)
      {
        return {message: "User Exist.", exist: 1};
      }
      else
      {
        return {message: "User does not exist.", exist: 0};
      }
    },
    sendVerificationEmail(emailAddress)
    {
      var userDetails = Meteor.users.findOne({
        "username": emailAddress
      });
      return Accounts.sendResetPasswordEmail(userDetails._id, emailAddress);
    },
    sendSMS(numbertosend, msg)
    {
      console.log(numbertosend);
      console.log(msg);
      var twilio = require('twilio');
      console.log(twilio);
      var client = new twilio(accountSid, authToken);
      console.log(client);
      client.messages.create({
          body: msg,
          to: numbertosend,  // Text this number
          from: '+12055512668' // From a valid Twilio number
      }).then(function(message){
        console.log(message)
      });

    },
    saveInvitation(userId, invitedNumber){
      console.log(userId);
      console.log(invitedNumber);
      return userInvitess.insert({
        "userId": userId,
        "invitedUserId": invitedNumber,
        "dateInvited": new Date()
      });
    },
    singleInvite(userId, numbertoinvite, msg)
    {
      var oldInvitation = userInvitess.findOne({
        "userId": userId,
        "invitedUserId": numbertoinvite
      }, {
        "dateInvited": -1
      });
      if(typeof oldInvitation !== "undefined")
      {
        if(oldInvitation != null){
          var dateInvited = oldInvitation.dateInvited;
          var currentDate = new Date();
          var diff = (currentDate.getTime()) - (dateInvited.getTime());
          var oneDay = 1000*60*60*24;
          var diffInDays = diff/oneDay;
          if(diffInDays >= 1)
          {
            var twilio = require('twilio');
            var client = new twilio(accountSid, authToken);
            client.messages.create({
                body: msg,
                to: numbertoinvite,  // Text this number
                from: '+12055512668' // From a valid Twilio number
            }).then(function(message){
              if(typeof message.sid !== "undefined")
              {
                console.log("1");
                
              }
            });
            Meteor.call("saveInvitation",userId, numbertoinvite);
          }
        }
      }
      else
      {
        
        var twilio = require('twilio');
        var client = new twilio(accountSid, authToken);
        var t = Math.random()*1000000000;
        var aa = {
          "userId": userId,
          "invitedUserId": numbertoinvite,
          "recId": t,
          "dateInvited": new Date()
        };
        console.log(aa);
        var a = userInvitess.insert(aa);
        console.log(a);
        if(a)
        {
          client.messages.create({
              body: msg,
              to: numbertoinvite,  // Text this number
              from: '+12055512668' // From a valid Twilio number
          }).then(function(message){
            console.log(message)
            
          });
        }
      }
      return true;
    },
    inviteContactAll(contacts, userId, msg)
    {
      for(var i = 0; i < contacts.length; i++)
      {
        //contacts[i].contactNumber = "+919714843622";
        Meteor.call("singleInvite", userId, contacts[i].contactNumber, msg)
      }
    },
    updateOTP(userId, otp, otpTime, num)
    {
      return Meteor.users.update({
        "_id": userId
      },{
        $set: {
          "profile.otp": otp,
          "profile.otpTime": otpTime,
          "profile.phoneNumber": num
        }
      });
    },
    verifyUser(userId)
    {
      return Meteor.users.update({
        "_id": userId
      },{
        $set: {
          "profile.isNumberVerified": true
        }
      });
    },
    saveFile(userId, data, originalName, originalFileType, folderName)
    {
      console.log(data);
      console.log(originalName);
      var format = originalName.substr(originalName.lastIndexOf(".") + 1)
      if(folderName == "Reports")
      {
        var insertDate = {
          "fileName": originalName,
          "userId": userId,
          "publicId": data.public_id,
          "fileSize": data.bytes,
          "fileType": originalFileType,
          "resourceType": data.resource_type,
          "dateCreated": new Date(),
          "dateModified": new Date(),
          "fileFormat": format,
          "isDeleted": false,
          "fileUrl": data.url,
          "fileFolder": folderName,
          "showInReports": true
        };
        var a = userFiles.insert(insertDate);
      }
      else
      {
        var insertDate = {
          "fileName": originalName,
          "userId": userId,
          "publicId": data.public_id,
          "fileSize": data.bytes,
          "fileType": originalFileType,
          "resourceType": data.resource_type,
          "dateCreated": new Date(),
          "dateModified": new Date(),
          "fileFormat": format,
          "isDeleted": false,
          "fileUrl": data.url,
          "fileFolder": folderName,
          "showInReports": false
        };
        var a = userFiles.insert(insertDate);
      }      
      return a;
    },
    saveFileProfilePic(userId, data, originalName, originalFileType)
    {
      var insertDate = {
        "profile.profilePic": data.url
      };
      return Meteor.users.update({
        "_id": userId
      },{
        $set: insertDate
      });
    },
    createFolder(folderName, userId, subFolder, path, referenceId)
    {
      if(subFolder == "Reports")
      {
        return userFolders.insert({
          "folderName": folderName,
          "userId": userId,
          "dateCreated": new Date(),
          "dateModified": new Date(),
          "isDeleted": false,
          "parentId": "",
          "folderPath": path,
          "referenceId": referenceId,
          "showInReports": true
        });
      }
      else
      {
        return userFolders.insert({
          "folderName": folderName,
          "userId": userId,
          "dateCreated": new Date(),
          "dateModified": new Date(),
          "isDeleted": false,
          "parentId": subFolder,
          "folderPath": path,
          "referenceId": referenceId
        });
      }
    },
    renameFile(fileId, newFileName)
    {
      console.log("fileId",fileId);
      var fileData =  userFiles.find({
        "_id": fileId
      });
      if(fileData.count() > 0)
      {
        fileData =  userFiles.findOne({
          "_id": fileId
        });
        if(fileData !== null)
        {
          var fileNameInDB = fileData.fileName;
          var fileExtension = fileNameInDB.substr(fileNameInDB.lastIndexOf("."));
          var newFileNameWithExtension = newFileName + fileExtension;
          return userFiles.update({
            "_id": fileId
          },{
            $set: {
              "fileName": newFileNameWithExtension
            }
          });
        }
      }
      else
      {
        fileData =  userReportFiles.find({
          "_id": fileId
        });
        if(fileData.count() > 0)
        {
          fileData =  userReportFiles.findOne({
            "_id": fileId
          });
          if(fileData !== null)
          {
            var fileNameInDB = fileData.fileName;
            var fileExtension = fileNameInDB.substr(fileNameInDB.lastIndexOf("."));
            var newFileNameWithExtension = newFileName + fileExtension;
            return userReportFiles.update({
              "_id": fileId
            },{
              $set: {
                "fileName": newFileNameWithExtension
              }
            });
          }
          
        }
        else{
          fileData =  userFolders.find({
              "_id": fileId
            });
            console.log("fileData",fileData.fetch());
            if(fileData.count() > 0)
            {
              fileData =  userFolders.findOne({
                "_id": fileId
              });
              if(fileData !== null)
              {
                //var fileNameInDB = fileData.folderName;
                //var fileExtension = fileNameInDB.substr(fileNameInDB.lastIndexOf("."));
                var newFileNameWithExtension = newFileName;
                return userFolders.update({
                  "_id": fileId
                },{
                  $set: {
                    "folderName": newFileNameWithExtension
                  }
                });
              }
            }
            else
            {
              fileData =  userReportFolders.find({
                "_id": fileId
              });
              if(fileData.count() > 0)
              {
                var fileData =  userReportFolders.findOne({
                  "_id": fileId
                });
                if(fileData !== null)
                {
                  //var fileNameInDB = fileData.folderName;
                  //var fileExtension = fileNameInDB.substr(fileNameInDB.lastIndexOf("."));
                  var newFileNameWithExtension = newFileName;
                  return userReportFolders.update({
                    "_id": fileId
                  },{
                    $set: {
                      "folderName": newFileNameWithExtension
                    }
                  });
                }
              }
            }
        }
      }
    },
    deleteFileFromReports(fileId)
    {
      var data = userFiles.find({
        "_id": fileId
      });
      if(data.count() > 0)
      {
        console.log(data);
        return userFiles.update({
          "_id": fileId
        },{
          $set: {
            "showInReports": false
          }
        });
      }
    },
    deleteFile(fileId)
    {
      var data = userFiles.find({
        "_id": fileId
      });
      if(data.count() > 0)
      {
        return userFiles.update({
          "_id": fileId
        },{
          $set: {
            "isDeleted": true
          }
        });
      }
      else
      {
        data = userReportFiles.find({
          "_id": fileId
        });
        if(data.count() > 0)
        {
          return userReportFiles.update({
            "_id": fileId
          },{
            $set: {
              "isDeleted": true
            }
          });
        }
      }
    },
    deleteFolderFromReports(folderId)
    {
      console.log("folderId", folderId);
      return userFolders.update({
        "_id": folderId
      },{
        $set: {
          "showInReports": false
        }
      });
    },
    deleteFolder(fileId, action)
    {
      if(typeof action == "undefined")
      {
        action = "files";
      }
      if(action == "reports")
      {
        var data = userReportFolders.find({
          $or: [
            {
              "_id": fileId
            },
            {
              "folderPath": {
                $regex: new RegExp(fileId,'i')
              }
            }
          ]
        },{
          fields: {
            '_id': 1,
            'folderPath': 1
          }
        }).fetch();
      }
      else
      {
        var data = userFolders.find({
          $or: [
            {
              "_id": fileId
            },
            {
              "folderPath": {
                $regex: new RegExp(fileId,'i')
              }
            }
          ]
        },{
          fields: {
            '_id': 1,
            'folderPath': 1
          }
        }).fetch();
      }
      
      console.log(data);
      var folderIds = [];
      for(var i = 0; i < data.length; i++)
      {
        folderIds.push(data[i]._id);
      }
      console.log(folderIds);
      if(action == "reports")
      {
        var filesData = userReportFiles.update({
          "fileFolder": {
            $in: folderIds
          }
        },{
          $set: {
            "isDeleted": true
          }
        },{multi:true});
        console.log(filesData);
        return userReportFolders.update({
          "_id": {
            $in: folderIds
          }
        },{
          $set: {
            "isDeleted": true
          }
        },{multi:true});
      }
      else{
        var filesData = userFiles.remove({
          "publicId": {
            $regex: new RegExp(folderIds, "i")
          }
        },{
          $set: {
            "isDeleted": true
          }
        },{multi:true});
        console.log(filesData);
        return userFolders.remove({
          "_id": {
            $in: folderIds
          }
        });
      }
    },
    deleteReportFolder(fileId)
    {
      if(typeof action == "undefined")
      {
        action = "files";
      }
      if(action == "reports")
      {
        var data = userReportFolders.find({
          $or: [
            {
              "_id": fileId
            },
            {
              "folderPath": {
                $regex: new RegExp(fileId,'i')
              }
            }
          ]
        },{
          fields: {
            '_id': 1,
            'folderPath': 1
          }
        }).fetch();
      }
      else
      {
        var data = userFolders.find({
          $or: [
            {
              "_id": fileId
            },
            {
              "folderPath": {
                $regex: new RegExp(fileId,'i')
              }
            }
          ]
        },{
          fields: {
            '_id': 1,
            'folderPath': 1
          }
        }).fetch();
      }
      
      console.log(data);
      var folderIds = [];
      for(var i = 0; i < data.length; i++)
      {
        folderIds.push(data[i]._id);
      }
      console.log(folderIds);
      if(action == "reports")
      {
        var filesData = userReportFiles.update({
          "fileFolder": {
            $in: folderIds
          }
        },{
          $set: {
            "isDeleted": true
          }
        },{multi:true});
        console.log(filesData);
        return userReportFolders.update({
          "_id": {
            $in: folderIds
          }
        },{
          $set: {
            "isDeleted": true
          }
        },{multi:true});
      }
      else{
        var filesData = userFiles.update({
          "fileFolder": {
            $in: folderIds
          }
        },{
          $set: {
            "isDeleted": true
          }
        },{multi:true});
        console.log(filesData);
        return userFolders.update({
          "_id": {
            $in: folderIds
          }
        },{
          $set: {
            "isDeleted": true
          }
        },{multi:true});
      }
    },
    deleteFileMultiple(fileIds)
    {
      return userFiles.update({
        "_id": {
          $in: fileIds
        }
      },{
        $set: {
          "isDeleted": true
        }
      },{multi:true});
    },
    markFileAsStarred(userId, fileId, status)
    {
      var tableName = "";
      var fileIds = [];
      var fileDetails = userFiles.find({
        "_id": fileId
      });
      if(fileDetails.count() > 0)
      {
        tableName = "files";
        fileIds.push(fileId);
        var reportDetails = userReportFiles.find({
          "fileTableId": fileId
        });
        if(reportDetails.count() > 0)
        {
          fileIds.push(reportDetails._id);
        }
      }
      var isAlreadyExist = userStarredFiles.find({
        "userId": userId,
        "fileId": {
          $in: fileIds
        }
      });
      console.log(isAlreadyExist.count());
      if(isAlreadyExist.count() > 0)
      {
        if(status == false)
        {
          var a = userStarredFiles.remove({
            "userId": userId,
            "fileId": {
              $in: fileIds
            }
          });
        }
      }
      else
      {
        var recs = [];
        for(var i = 0; i < fileIds.length; i++)
        {
          recs.push({
            "userId": userId,
            "fileId": fileIds[i]
          });
          userStarredFiles.batchInsert(recs);
        }
      }
      /*var fileDetails = userReportFiles.find({
        "fileTableId": fileId
      });
      if(fileDetails.count() > 0)
      {
        fileDetails = userReportFiles.findOne({
          "fileTableId": fileId
        });
        var isAlreadyExist = userStarredFiles.find({
          "userId": userId,
          "fileId": fileDetails._id
        });
        console.log(isAlreadyExist.count());
        if(isAlreadyExist.count() > 0)
        {
          if(status == false)
          {
            var a1 = userStarredFiles.remove({
              "userId": userId,
              "fileId": fileDetails._id
            });
          }
        }
        else
        {
          var a1 = userStarredFiles.insert({
              "userId": userId,
              "fileId": fileDetails._id
            });
        }
      }*/
      return a;
    },
    markFolderAsStarred(userId, fileId, status)
    {
      console.log(userId, fileId, status);
      var isAlreadyExist = userStarredFolders.find({
        "userId": userId,
        "fileId": fileId
      });
      if(isAlreadyExist.count() > 0)
      {
        if(status == false)
        {
          return userStarredFolders.remove({
            "userId": userId,
            "fileId": fileId
          });
        }
      }
      else
      {
        return userStarredFolders.insert({
            "userId": userId,
            "fileId": fileId
          });
      }
    },
    markFileAsStarredMultiple(userId, fileIds, status)
    {
      for(var i = 0; i < fileIds.length; i++)
      {
        var isAlreadyExist = userStarredFiles.find({
          "userId": userId,
          "fileId": fileIds[i]
        });
        if(isAlreadyExist.count() == 0)
        {
          var a = userStarredFiles.insert({
            "userId": userId,
            "fileId": fileIds[i]
          });
        }
        else{
          var a = userStarredFiles.remove({
            "userId": userId,
            "fileId": fileIds[i]
          });
        }
      }
      return true;
    },
    addCommentForFile(data)
    {
      return fileComments.insert(data);
    },
    editProfile(userId, data)
    {
      return Meteor.users.update({
        "_id": userId
      },{
        $set: data
      });
    },
    addTag(data)
    {
      for(var i = 0; i < data.length; i++)
      {
        var oldTag = userTaggedFiles.find({
          "userId": data[i].userId,
          "tagText": data[i].tagText,
          "tagColor": data[i].tagColor,
          "resourceId": data[i].resourceId
        });
        if(oldTag.count() == 0) {
          var a = userTaggedFiles.insert(data[i]);
        }
      }
      return true;
    },
    removeTag(tagId){
      return userTaggedFiles.remove({
        "_id": tagId
      });
    },
    addNewContact(data)
    {
      var isAlreadyExist = userContacts.find({
        "userId": data.userId,
        "personalNumber": data.personalNumber
      });
      if(isAlreadyExist.count() > 0)
      {
        var userId = data.userId;
        var personalNumber = data.personalNumber;
        delete data["userId"];
        delete data["personalNumber"];
        return userContacts.update({
          "userId": userId,
          "personalNumber": personalNumber
        },{
          $set: data
        });
      }
      else
      {
        return userContacts.insert(data);
      }
    },
    editNewContact(id, data)
    {
      return userContacts.update({
        "_id": id,
      },{
        $set: data
      });
    },
    addNewContactMultiple(arr)
    {
      for(var i = 0; i < arr.length; i++)
      {
        //contacts[i].contactNumber = "+919714843622";
        Meteor.call("addNewContact", arr[i])
      }
    },
    setContactProfilePic(fileName, contactId)
    {
      var fileUrl = fileName.url;
      return userContacts.update({
        "_id": contactId
      },{
        $set: {
          "profilePic": fileUrl
        }
      });
    },
    sendEmail(to, from, subject, text) {
      // Make sure that all arguments are strings.

      // Let other method calls from the same client start running, without
      // waiting for the email sending to complete.
      this.unblock();
      Email.send({
        to: to,
        from: from,
        subject: subject,
        html: text
      });
      //Email.send({ to, from, subject, text });
    },
    shareFile(sendTo, fileDetails, html, userId, viewCheckbox, editCheckbox, messageTextArea)
    {
      var userDetails = Meteor.users.findOne({
        "_id": userId
      }); 
      var token = parseInt(Math.random()*100000000000000);
      if(viewCheckbox == false && editCheckbox == false){
        viewCheckbox = true;
      }
      var finalArray = [];
      for(var i = 0; i < sendTo.length; i++)
      {
        var rec = sendTo[i];
        var tempEmail = "";
        if(rec.endsWith("_personal") || rec.endsWith("_work"))
        {
          var splittedRec = rec.split("_");
          var contactDetails = userContacts.findOne({
            "_id": splittedRec[0]
          });
          var contactId = contactDetails._id;
          var contactEmail = "";
          if(rec.endsWith("_work"))
          {
            contactEmail = contactDetails.workEmail;
            tempEmail = contactDetails.workEmail;
          }
          if(rec.endsWith("_personal"))
          {
            contactEmail = contactDetails.personalEmail;
            tempEmail = contactDetails.personalEmail;
          }
          var userEmail = "";
        }
        else
        {
          var contactId = "";
          var contactEmail = "";
          var userEmail = rec;
          tempEmail = rec 
        }
        var update = 0;
        var insert = 0;
        for(var j = 0; j < fileDetails.length; j++)
        {
          var fileRec = fileDetails[j];
          var fileId = fileRec._id;
          var getOldDetails = userSharedFiles.find({
            "fileId": fileId,
            $or: [
              {
                "contactUserEmail": tempEmail
              },
              {
                "toUserEmail": tempEmail
              }
            ],
            "fromUserId": userId
          });
          console.log("test",getOldDetails.fetch());

          if(getOldDetails.count() > 0)
          {
            userSharedFiles.update({
              "fileId": fileId,
              $or: [
                {
                  "contactUserEmail": tempEmail
                },
                {
                  "toUserEmail": tempEmail
                }
              ],
              "fromUserId": userId
            },{
              $set: {
                "viewPermission": viewCheckbox,
                "editPermission": editCheckbox,
                "messageForUser": messageTextArea,
                "dateUpdated": new Date()
              }
            });
            update = 1;
            insert = 0;
            
          }
          else
          {
            var a = userSharedFiles.insert({
              "fromUserId": userId,
              "contactUserId": contactId,
              "contactUserEmail": contactEmail,
              "token": token,
              "toUserEmail": userEmail,
              "fileId": fileId,
              "viewPermission": viewCheckbox,
              "editPermission": editCheckbox,
              "messageForUser": messageTextArea,
              "dateCreated": new Date(),
              "dateUpdated": new Date()
            });
            update = 0;
            insert = 1;
            
          }


        }

        if(update == 1 && insert == 0)
        {
          var userInvitedDetails = Meteor.users.find({
            "username": tempEmail.toLowerCase()
          });
          if(userInvitedDetails.count() > 0)
          {
            userInvitedDetails = Meteor.users.findOne({
              "username": tempEmail.toLowerCase()
            });
            Push.send({
                from: 'Recite',
                title: "File Permission Updated!!!!",
                text: "File Permission Updated by " + userDetails.profile.fullName+", Click here! To enter Recite.",
                badge: 1,
                android_channel_id:userInvitedDetails._id,
                query: {
                    userId: userInvitedDetails._id
                },
                notId: parseInt(Math.random() * 1000000000, 10),
                payload: {
                    "adminNotification": false,
                    "updatePermissionNotificaion": true
                }
            });
          }
          Email.send({
            to: tempEmail,
            from: "recite.app.2019@gmail.com",
            subject: "File Permission Updated!!!!",
            html: html
          });
        }
        else
        {
          var userInvitedDetails = Meteor.users.find({
              "username": tempEmail.toLowerCase()
            });
            if(userInvitedDetails.count() > 0)
            {
              userInvitedDetails = Meteor.users.findOne({
                "username": tempEmail.toLowerCase()
              });
              notificationDetails.insert({
                "toUserId": userInvitedDetails._id,
                "fromUserId": userId,
                "shareedFileTableId": token,
                "notificationDate": new Date(),
                "readStatus": false
              });
              Push.send({
                  from: 'Recite',
                  title: "File Shared!!!!",
                  text: "File Shared by " + userDetails.profile.fullName+", Click here! To enter Recite.",
                  badge: 1,
                  android_channel_id:userInvitedDetails._id,
                  query: {
                      userId: userInvitedDetails._id
                  },
                  notId: parseInt(Math.random() * 1000000000, 10),
                  payload: {
                      "adminNotification": false,
                      "sharedNotification": true
                  }
              });
            }
            Email.send({
              to: tempEmail,
              from: "recite.app.2019@gmail.com",
              subject: "File Shared!!!!",
              html: html
            });
        }
      }

      return true;



      if(viewCheckbox == false && editCheckbox == false){
        console.log("test ndm shareFile in");
        viewCheckbox = true;
        // console.log("check value of viewCheckbox in if ",viewCheckbox);
      }
      // console.log("check value of viewCheckbox",viewCheckbox);

      var userDataEmails = [];
      var notificationUserIds = [];
      var userDataInsert = [];
      var loggedInUser = Meteor.users.findOne({
        "_id": userId
      });
      for(var i = 0; i < sendTo.length; i++)
      {
        var a = sendTo[i];
        var emailAddressForNotification = "";
        if(a.endsWith("_work") || a.endsWith("_personal"))
        {
          var splited = a.split("_");
          var contactId = userContacts.findOne({
            "_id": splited[0]
          });
          if(a.endsWith("_work"))
          {
            var emailAdd = contactId.workEmail;
          }
          if(a.endsWith("_personal"))
          {
            var emailAdd = contactId.personalEmail;
          }
          var dataUser = {
            "userId": contactId._id,
            "userEmail": "",
            "contactUserEmail": emailAdd,
            "isEmail": false,
            "sharedFileDate" : new Date()
          }
          userDataInsert.push(dataUser);
          emailAddressForNotification = emailAdd;
          if(userDataEmails.indexOf(emailAdd) == -1)
          {
            userDataEmails.push(emailAdd);
          }
        }
        else
        {
          var dataUser = {
            "userId": "",
            "userEmail": a,
            "contactUserEmail": "",
            "isEmail": true,
            "sharedFileDate" : new Date()
          }
          userDataInsert.push(dataUser);
          emailAddressForNotification = a;
          if(userDataEmails.indexOf(a) == -1)
          {
            userDataEmails.push(a);
          }
        }
        var userDetailsForNotification = Meteor.users.find({
          $or: [
            {"username": emailAddressForNotification},
            {"profile:companyEmail": emailAddressForNotification}
          ]
        });
        if(userDetailsForNotification.count() > 0)
        {
          var data = userDetailsForNotification.fetch()[0];
          if(notificationUserIds.indexOf(data._id) == -1)
          {
            notificationUserIds.push(data._id);
          }
        }
      }
      var sharedFileDetails = {
        "userId": userId,
        "viewPermission": viewCheckbox,
        "editPermission": editCheckbox,
        "shareMessage": messageTextArea,
        "sharedDate": new Date()
      }
      var sharedFileDetailsInsert = sharedFilesDetails.insert(sharedFileDetails, function(err, res){
        if(err)
        {
          console.log("Error occured in sharedFileDetailsInsert.");
        }
        else
        {
          var fileIds = [];
          for(var i = 0; i < fileDetails.length; i++)
          {
            fileIds.push(fileDetails[i]._id);
          }
          var fileData = {
            "sharedFilesDetailsTableId": sharedFileDetailsInsert,
            "fileIds": fileIds
          }
          var sharedFilesInsert = sharedFilesList.insert(fileData);
          if(notificationUserIds.length > 0)
          {
            var notificationInsertData = [];
            for(var j = 0; j < notificationUserIds.length; j++)
            {
              notificationInsertData.push({
                "toUserId": notificationUserIds[j],
                "fromUserId": userId,
                "shareedFileTableId": sharedFileDetailsInsert,
                "notificationDate": new Date,
                "readStatus": false
              });
            }
            notificationDetails.batchInsert(notificationInsertData);
          }
          if(userDataInsert.length > 0)
          {
            for(var j = 0; j < userDataInsert.length; j++)
            {
              userDataInsert[j]["sharedFileId"] = sharedFileDetailsInsert;
            }
            console.log(userDataInsert);
            sharedFilesUsersDetails.batchInsert(userDataInsert);
          }
          Meteor.call("sendPushNotification", userDataEmails, "File Shared!!! by " + loggedInUser.profile.fullName, "Click here! To enter Recite.");
          Meteor.call("sendEmail", userDataEmails, "recite.app.2019@gmail.com", "File Shared!!!", html);
          
        }
      });
      return sharedFileDetailsInsert;
    },
    sendPushNotification: function(emailAddresses, title, body){
      console.log(Meteor.users.find().fetch());
      for(var i = 0; i < emailAddresses.length; i++)
      {
        var email = emailAddresses[i];
        var userDetails = Meteor.users.find({
          "username": email
        });
        
        if(userDetails.count() > 0)
        {
          userDetails = Meteor.users.findOne({
            "username": email
          });
          console.log("userDetails", userDetails);
          Push.send({
              from: 'Recite',
              title: title,
              text: body,
              badge: 1,
              android_channel_id:userDetails._id,
              query: {
                  userId: userDetails._id
              },
              notId: parseInt(Math.random() * 1000000000, 10),
              payload: {
                  "adminNotification": false
              }
          });
        }
      }
    },
    setNotificationSettings(userId, notificationOnOff, alwaysOn, eighttoeight, off)
    {
      return Meteor.users.update({
        "_id": userId
      },{
        $set: {
          "profile.pushNotificationRegister": notificationOnOff,
          "profile.pushAlwaysOn": alwaysOn,
          "profile.pusheighttoeight": eighttoeight,
          "profile.pushOff": off
        }
      });
    },
    setNotificationSettingsValues(userId, alwaysOn, eighttoeight, off)
    {
      return Meteor.users.update({
        "_id": userId
      },{
        $set: {
          "profile.pushAlwaysOn": alwaysOn,
          "profile.pusheighttoeight": eighttoeight,
          "profile.pushOff": off
        }
      });
    },
    changeModifiedDateFolder(folderId, d)
    {
      return userFolders.update({
        "_id": folderId
      },{
        $set: {
          "dateModified": d
        }
      });
    },
    changeModifiedDateFile(fileId, d)
    {
      return userFiles.update({
        "_id": fileId
      },{
        $set: {
          "dateModified": d
        }
      });
    },
    copyFile(fileId, contactId, userId, action, replace)
    {
      var filDetails = userFiles.find({
        "_id": fileId
      });
      var filePresent = "";
      if(filDetails.count() > 0)
      {
        filDetails = userFiles.findOne({
          "_id": fileId
        });
        filePresent = "files";
      }
      else
      {
        filDetails = userReportFiles.find({
          "_id": fileId
        });
        if(filDetails.count() > 0)
        {
          filePresent = "reportfiles";
          filDetails = userReportFiles.findOne({
            "_id": fileId
          });
        }
      }
      console.log("filDetails",filDetails);
      if(typeof filDetails !== null)
      {
        if(action == "copy")
        {
          var fileName = filDetails.fileName;
          fileName = fileName.substr(0,fileName.lastIndexOf("."));
          var existData = userFiles.find({
            "fileName": {
              $regex: new RegExp(fileName)
            },
            "userId": userId,
            "fileFolder": contactId
          });
          if(existData.count() > 0)
          {
            var explodedFileName = filDetails.fileName;
            explodedFileName = explodedFileName.split(".");
            var finalFileName = fileName + "(" + (existData.count() + 1) + ")." + explodedFileName[(explodedFileName.length - 1)];
          }
          else
          {
            existData = userReportFiles.find({
              "fileName": {
                $regex: new RegExp(fileName)
              },
              "userId": userId,
              "fileFolder": contactId
            });
            if(existData.count() > 0)
            {
              var explodedFileName = filDetails.fileName;
              explodedFileName = explodedFileName.split(".");
              var finalFileName = fileName + "(" + (existData.count() + 1) + ")." + explodedFileName[(explodedFileName.length - 1)];
            }
            else
            {
              var finalFileName = filDetails.fileName;
            }
          }
          console.log("finalFileName", finalFileName);
          var fileArr = filDetails;
          delete fileArr["_id"];
          fileArr["fileName"] = finalFileName
          fileArr["dateCreated"] = new Date();
          fileArr["dateModified"] = new Date();
          fileArr["fileFolder"] = contactId;
          console.log("filePresent", fileArr);
          if(filePresent == "files")
          {
            return userFiles.insert(fileArr);
          }
          else
          {
            console.log("1");
            return userFiles.insert(fileArr);
          }
        }
        else
        {
          if(replace)
          {
            console.log("replace");
            var fileName = filDetails.fileName;
            fileName = fileName.substr(0,fileName.lastIndexOf("."));
            if(filePresent == "files")
            {
              userFiles.remove({
                "fileName": filDetails.fileName,
                "userId": userId,
                "fileFolder": contactId
              });
            }
            else
            {
              userReportFiles.remove({
                "fileName": filDetails.fileName,
                "userId": userId,
                "fileFolder": contactId
              });
            }
            var fileArr = filDetails;
            delete fileArr["_id"];
            fileArr["fileName"] = filDetails.fileName
            fileArr["dateCreated"] = new Date();
            fileArr["dateModified"] = new Date();
            fileArr["fileFolder"] = contactId;
            if(filePresent == "files")
            {
              userFiles.remove({
                "_id": fileId
              });
              return userFiles.insert(fileArr);
            }
            else
            {
              userFiles.remove({
                "_id": fileId
              });
              return userFiles.insert(fileArr);
            }
          }
          else
          {
            console.log("keep both");
            var fileName = filDetails.fileName;
            fileName = fileName.substr(0,fileName.lastIndexOf("."));
            var existData = userFiles.find({
              "fileName": {
                $regex: new RegExp(fileName)
              },
              "userId": userId,
              "fileFolder": contactId
            });
            if(existData.count() > 0)
            {
              var explodedFileName = filDetails.fileName;
              explodedFileName = explodedFileName.split(".");
              var finalFileName = fileName + "(" + (existData.count() + 1) + ")." + explodedFileName[(explodedFileName.length - 1)];
            }
            else
            {
              existData = userReportFiles.find({
                "fileName": {
                  $regex: new RegExp(fileName)
                },
                "userId": userId,
                "fileFolder": contactId
              });
              if(existData.count() > 0)
              {
                var explodedFileName = filDetails.fileName;
                explodedFileName = explodedFileName.split(".");
                var finalFileName = fileName + "(" + (existData.count() + 1) + ")." + explodedFileName[(explodedFileName.length - 1)];
              }
              else
              {
                var finalFileName = filDetails.fileName;
              }
            }
            var fileArr = filDetails;
            delete fileArr["_id"];
            fileArr["fileName"] = finalFileName
            fileArr["dateCreated"] = new Date();
            fileArr["dateModified"] = new Date();
            fileArr["fileFolder"] = contactId;
            if(filePresent == "files")
            {
              userFiles.remove({
                "_id": fileId
              });
              return userFiles.insert(fileArr);
            }
            else
            {
              userFiles.remove({
                "_id": fileId
              });
              return userFiles.insert(fileArr);
            }
            
          }
        }
      }
    },
    copyMultipleFile(fileId, contactId, userId, action, replace){
      console.log("fileId",fileId);
      console.log("contactId",contactId);
      console.log("userId",userId);
      console.log("action",action);
      console.log("replace",replace);
      var fileIds = [];
      for(var k = 0; k < fileId.length; k++)
      {
        fileIds.push(fileId[k]._id);
      }
      var filDetails = userFiles.find({
        "_id": {
          $in: fileIds
        }
      });

      if(filDetails.count() > 0)
      {
        filDetails = filDetails.fetch();
      }
      else
      {
        filDetails = userReportFiles.find({
          "_id": {
            $in: fileIds
          }
        });
        if(filDetails.count() > 0)
        {
          filDetails = filDetails.fetch();
        }
      }
      console.log("filDetails",filDetails);
      if(filDetails.length > 0)
      {
        var finalFilesArray = [];
          for(var i = 0; i< filDetails.length; i++){
            var filDetails1 = filDetails[i];
            var filePresent = "";
            var fileName = filDetails1.fileName;
            console.log("fileName",fileName);
            fileName = fileName.substr(0,fileName.lastIndexOf("."));
            console.log("fileName222",fileName);
            var existData = userFiles.find({
              "fileName": {
                $regex: new RegExp(fileName)
              },
              "userId": userId,
              "fileFolder": contactId
            });
            if(existData.count() > 0)
            {
              var explodedFileName = filDetails1.fileName;
              explodedFileName = explodedFileName.split(".");
              var finalFileName = fileName + "(" + (existData.count() + 1) + ")." + explodedFileName[(explodedFileName.length - 1)];
            }
            else
            {
              existData = userReportFiles.find({
                "fileName": {
                  $regex: new RegExp(fileName)
                },
                "userId": userId,
                "fileFolder": contactId
              });
              if(existData.count() > 0)
              {
                var explodedFileName = filDetails1.fileName;
                explodedFileName = explodedFileName.split(".");
                var finalFileName = fileName + "(" + (existData.count() + 1) + ")." + explodedFileName[(explodedFileName.length - 1)];
              }
              else
              {
                var finalFileName = filDetails1.fileName;
              }
            }
            var fileArr = filDetails1;
            delete fileArr["_id"];
            fileArr["fileName"] = finalFileName
            fileArr["dateCreated"] = new Date();
            fileArr["dateModified"] = new Date();
            fileArr["fileFolder"] = contactId;
            finalFilesArray.push(fileArr);
          }
          console.log("finalFilesArray",finalFilesArray);
          var a = userFiles.batchInsert(finalFilesArray);
        if(action == "move")
        {
            var b = userFiles.remove({
              "_id": {
                $in: fileIds
              }
            });
                  
        }
        return a;
      }
    },
    copyFolder(fileId, contactId, action)
    {
      copyFolder(fileId,contactId);
      if(action == "move")
        {
          var subFolders = userFolders.remove({
            parentId: fileId
          });
          var currentFolder = userFolders.remove({
            _id: fileId
          });
          var currentFolderFiles = userFiles.remove({
            fileFolder: fileId
          });

          var subFolders = userReportFolders.remove({
            parentId: fileId
          });
          var currentFolder = userReportFolders.remove({
            _id: fileId
          });
          var currentFolderFiles = userReportFiles.remove({
            fileFolder: fileId
          });

        }
      /*var filDetails = userFolders.findOne({
        "_id": fileId
      });
      var subFolders = userFolders.find({
        "folderPath": {
          $regex: new RegExp(fileId)
        }
      }).fetch();
      var subFoldersId = [];
      for(var i = 0; i < subFolders.length; i++)
      {
        subFoldersId.push(subFolders[i]._id);
      }
      var filesList = userFiles.find({
        "fileFolder": {
          $in: subFoldersId
        }
      }).fetch();
      if(typeof filDetails !== null)
      {
        if(action == "copy")
        {
          var fileName = filDetails.folderName;
          //fileName = fileName.substr(0,fileName.lastIndexOf("."));
          var existData = userFolders.find({
            "folderName": {
              $regex: new RegExp(fileName)
            },
            "userId": userId,
            "parentId": contactId
          });
          if(existData.count() > 0)
          {
            var explodedFileName = filDetails.folderName;
            explodedFileName = explodedFileName.split(".");
            var finalFileName = fileName + "(" + (existData.count() + 1) + ")";
          }
          else
          {
            var finalFileName = filDetails.folderName;
          }
          var fileArr = filDetails;
          delete fileArr["_id"];
          fileArr["folderName"] = finalFileName
          fileArr["dateCreated"] = new Date();
          fileArr["dateModified"] = new Date();
          fileArr["parentId"] = contactId;
          var newFolderId = userFolders.insert(fileArr);
          var fileListMainFolder = userFiles.find({
            "fileFolder": fileId
          }).fetch();
          if(fileListMainFolder.length > 0)
          {
            for(var i = 0; i < fileListMainFolder.length; i++)
            {
              delete fileListMainFolder[i]["_id"];
              fileListMainFolder[i]["fileFolder"] = newFolderId;
            }
            userFiles.batchInsert(fileListMainFolder);
          }
        }
        else
        {
          if(replace)
          {
            console.log("replace");
            var fileName = filDetails.folderName;
            //fileName = fileName.substr(0,fileName.lastIndexOf("."));
            userFiles.remove({
              "folderName": filDetails.folderName,
              "userId": userId,
              "parentId": contactId
            });
            var fileArr = filDetails;
            delete fileArr["_id"];
            fileArr["folderName"] = filDetails.fileName
            fileArr["dateCreated"] = new Date();
            fileArr["dateModified"] = new Date();
            fileArr["parentId"] = contactId;
            userFolders.remove({
              "_id": fileId
            });
            var newFolderId = userFolders.insert(fileArr);
            var fileListMainFolder = userFiles.find({
            "fileFolder": fileId
            }).fetch();
            if(fileListMainFolder.length > 0)
            {
              for(var i = 0; i < fileListMainFolder.length; i++)
              {
                delete fileListMainFolder[i]["_id"];
                fileListMainFolder[i]["fileFolder"] = newFolderId;
              }
              userFiles.batchInsert(fileListMainFolder);
            }
          }
          else
          {
            console.log("keep both");
            var fileName = filDetails.folderName;
            //fileName = fileName.substr(0,fileName.lastIndexOf("."));
            var existData = userFolders.find({
              "folderName": {
                $regex: new RegExp(fileName)
              },
              "userId": userId,
              "parentId": contactId
            });
            if(existData.count() > 0)
            {
              var explodedFileName = filDetails.folerName;
              explodedFileName = explodedFileName.split(".");
              var finalFileName = fileName + "(" + (existData.count() + 1) + ")";
            }
            else
            {
              var finalFileName = filDetails.folerName;
            }
            var fileArr = filDetails;
            delete fileArr["_id"];
            fileArr["folerName"] = finalFileName
            fileArr["dateCreated"] = new Date();
            fileArr["dateModified"] = new Date();
            fileArr["parentId"] = contactId;
            userFolders.remove({
              "_id": fileId
            });
            var newFolderId = userFolders.insert(fileArr);
            var fileListMainFolder = userFiles.find({
            "fileFolder": fileId
            }).fetch();
            if(fileListMainFolder.length > 0)
            {
              for(var i = 0; i < fileListMainFolder.length; i++)
              {
                delete fileListMainFolder[i]["_id"];
                fileListMainFolder[i]["fileFolder"] = newFolderId;
              }
              userFiles.batchInsert(fileListMainFolder);
            }
          }
        }
      }*/

    },
    setNotificationAsRead(id)
    {
      return notificationDetails.update({
        "_id": id
      },{
        $set: {
          "readStatus": true
        }
      });
    },
    checkFileAlreadyExist(fileId, folderId, userId)
    {
      var result = userFiles.find({
        "userId": userId,
        "_id": fileId
      });
      if(result.count() > 0)
      {
        result = result.fetch();
        var fileName = result[0].fileName;
        var fileExist = userFiles.find({
          "fileName": fileName,
          "fileFolder": folderId,
          "userId": userId
        });
        if(fileExist.count() > 0)
        {
          return true;
        }
        else
        {
          return false;
        }
      }
      else
      {
        result = userReportFiles.find({
          "userId": userId,
          "_id": fileId
        });
        if(result.count() > 0)
        {
          result = result.fetch();
          var fileName = result[0].fileName;
          var fileExist = userReportFiles.find({
            "fileName": fileName,
            "fileFolder": folderId,
            "userId": userId
          });
          if(fileExist.count() > 0)
          {
            return true;
          }
          else
          {
            return false;
          }
        }
      }
    },
    checkMultipleFileAlreadyExist(fileId, folderId, userId){
        var result = userFiles.find({
          "userId": userId,
          "_id": {
          $in: fileId
          }
        });
        if(result.count() > 0)
        {
          result = result.fetch();
          var fileName = result[0].fileName;
          var fileExist = userFiles.find({
            "fileName": fileName,
            "fileFolder": folderId,
            "userId": userId
          });
          if(fileExist.count() > 0)
          {
            return true;
          }
          else
          {
            return false;
          }
        }
        else
        {
          result = userReportFiles.find({
            "userId": userId,
            "_id": fileId
          });
          if(result.count() > 0)
          {
            result = result.fetch();
            var fileName = result[0].fileName;
            var fileExist = userReportFiles.find({
              "fileName": fileName,
              "fileFolder": folderId,
              "userId": userId
            });
            if(fileExist.count() > 0)
            {
              return true;
            }
            else
            {
              return false;
            }
          }
        }
    },
    checkFolderAlreadyExist(fileId, folderId, userId)
    {
      var result = userFolders.findOne({
        "userId": userId,
        "_id": fileId
      });
      if(result !== null)
      {
        var fileName = result.folderName;
        var fileExist = userFolders.find({
          "folderName": fileName,
          "parentId": folderId,
          "userId": userId
        });
        if(fileExist.count() > 0)
        {
          return true;
        }
        else
        {
          return false;
        }
      }
      else
      {
        result = userReportFolders.findOne({
          "userId": userId,
          "_id": fileId
        });
        if(result !== null)
        {
          var fileName = result.folderName;
          var fileExist = userReportFolders.find({
            "folderName": fileName,
            "parentId": folderId,
            "userId": userId
          });
          if(fileExist.count() > 0)
          {
            return true;
          }
          else
          {
            return false;
          }
        }
      }
    },
    addFileToReportFolder(fileId, userId)
    {
      var fileDetails = userFiles.findOne({
        "_id": fileId,
        "userId": userId
      });
      return userFiles.update({
        "_id": fileId
      },{
        $set: {
          "showInReports": true
        }
      });
    },
    removeFileFromReportFolder(fileId, userId)
    {
      var fileDetails = userFiles.findOne({
        "_id": fileId,
        "userId": userId
      });
      return userFiles.update({
        "_id": fileId
      },{
        $set: {
          "showInReports": false
        }
      });
    },
    isFolderExist(folderName, folderId, userId)
    {
      var isExist = 0;
      console.log(folderName);
      console.log(folderId);
      console.log(userId);
      if(folderId == "")
      { 
        var folderFiles = userFolders.find({
          "referenceId": userId
        });
      }
      else
      {
        var folderFiles = userFolders.find({
          "parentId": folderId,
          "userId": userId
        });
      }
      if(folderFiles.count() > 0)
      {
        folderFiles = folderFiles.fetch();
        
        for(var i = 0; i < folderFiles.length; i++)
        {
          var f = folderFiles[i].folderName.trim();
          
          f = f.toLowerCase();
          if(f == folderName.toLowerCase().trim())
          {
            isExist = 1;
            break;
          }
        }
      }
      return isExist;
    },
    addFolderToReportFolder(folderId, userId)
    {
      var folderDetails = userFolders.find({
        "_id": folderId,
        "userId": userId
      });
      return userFolders.update({
        "_id": folderId
      },{
        $set: {
          "showInReports": true
        }
      });
      /*var folderName = folderDetails.folderName;
      if(folderDetails.count() > 0)
      {
        folderName = folderName + " (" + (folderDetails.count()+1) + ")";
        copyFolderToReport(folderId,"",1);
        return true;
      }*/
    },
    removeFolderFromReportFolder(folderId, userId)
    {

      var folderDetails = userFolders.find({
        "_id": folderId,
        "userId": userId
      });
      return userFolders.update({
        "_id": folderId
      },{
        $set: {
          "showInReports": false
        }
      });
      /*var folderName = folderDetails.folderName;
      if(folderDetails.count() > 0)
      {
        folderName = folderName + " (" + (folderDetails.count()+1) + ")";
        copyFolderToReport(folderId,"",1);
        return true;
      }*/
    },
    savePayment(paymentRes, userId, paymentDate)
    {
      var data = {
        "userId": userId,
        "paymentId": paymentRes.id,
        "paymentDate": paymentDate,
        "paymentResponse": JSON.stringify(paymentRes),
        "paymentStatus": "Success"
      }
      console.log(data);
      return payments.insert(data);
    },
    setUserPlan(userId, paymentId, planType)
    {
      if(planType == "Monthly")
      {
        var storageSpace = "100";
      }
      else
      {
        var storageSpace = "100000000000000000";
      }
      var oldData = userPlans.find({
        "userId": userId,
        "isExpired": false
      },{
        sort: {
          "recordDate": -1
        }
      });
      if(oldData.count() > 0)
      {
        oldData = userPlans.findOne({
          "userId": userId,
          "isExpired": false
        },{
          sort: {
            "recordDate": -1
          }
        });
        var startDate = oldData.planEndDate;
        var endDate = oldData.planEndDate;
        endDate.setDate(endDate.getDate() + 30);
      }
      else
      {
        var startDate = new Date();
        var endDate = new Date;
        endDate.setDate(endDate.getDate() + 30);
      }
      var data = {
        "userId": userId,
        "paymentId": paymentId,
        "planType": planType,
        "storageSpace": storageSpace,
        "planStartDate": startDate,
        "planEndDate": endDate,
        "isExpired": false,
        "recordDate": new Date()
      }
      return userPlans.insert(data);
    },
    deleteAccount(userId)
    {
      console.log("userId", userId);
      var a = Meteor.users.remove({
        "_id": userId
      });
      console.log("a", a);
      return a; 
    },
    isDeletedAccount(userId)
    {
      var userData = Meteor.users.find({
         "username": userId
      });
      if(userData.count() > 0)
      {
        userData = Meteor.users.findOne({
          "username": userId
        });
        if(typeof userData.profile.isDeleted !== "undefined")
        {
          if(userData.profile.isDeleted)
          {
            return true;
          }
          else
          {
            return false;
          }
        }
        else
        {
          return false;
        }
      }
      else
      {
        return false;
      }
    },
    addCollaborator(userId, selectedEmails, selectedContacts, selectedProjects, permission)
    {
      var userDetails = Meteor.users.findOne({
        "_id": userId
      });
      if(selectedEmails !== null && selectedEmails !== undefined)
      {
        console.log("1",selectedEmails);
        console.log("selectedEmails.length",selectedEmails.length)
        if(selectedEmails.length > 0)
        {
          console.log("2");
          for(var i = 0; i < selectedEmails.length; i++)
          {
            console.log("3");
            var checkFullAcess = userCollaborations.findOne({"userId": userId,"emailAddress": selectedEmails[i],"fullAccess": true});
            var findata = userCollaborations.findOne({"userId": userId,"emailAddress": selectedEmails[i],"permission": permission});
            var findataWithContact = userCollaborations.findOne({"userId": userId,"contactEmail": selectedEmails[i],"permission": permission});
            if(checkFullAcess !== null && checkFullAcess !== undefined){
              userCollaborations.remove({"userId": userId,"emailAddress": selectedEmails[i],"fullAccess": true});
            }
            if(findata !== null && findata !== undefined)
            {
              console.log("4");
              var projectList = findata.projectIds;
              console.log("findata",projectList);
              var margeProject = projectList.concat(selectedProjects);
              var unique = margeProject.filter(function(itm, i, margeProject) {
               return i == margeProject.indexOf(itm); 
              });
              console.log("unique",unique);
              userCollaborations.update({"userId": userId,"emailAddress": selectedEmails[i],"permission": permission},{$set:{"projectIds":unique}});
            }
            else if(findataWithContact !== null && findataWithContact !== undefined){
              console.log("4");
              var projectList = findataWithContact.projectIds;
              console.log("findata",projectList);
              var margeProject = projectList.concat(selectedProjects);
              var unique = margeProject.filter(function(itm, i, margeProject) {
               return i == margeProject.indexOf(itm); 
              });
              console.log("unique",unique);
              userCollaborations.update({"userId": userId,"contactEmail": selectedEmails[i],"permission": permission},{$set:{"projectIds":unique}});
            }
            else{
              console.log("5");
              var insertData = {
                "userId": userId,
                "emailAddress": selectedEmails[i],
                "contactId": "",
                "contactEmail": "",
                "permission": permission,
                "fullAccess": false,
                "projectIds": selectedProjects,
                "dateCreated": new Date()
              };
            userCollaborations.insert(insertData);
              var html = "Hello,<br><br>";
              //html += "\n\nWelcome to Recite App. \n\nThank You,\nRecite App Team.";
              html += userDetails.profile.fullName + ' has invited you use recite app. Please accept the invitation by logging into the recite app or registering in the recite app.<br><br>Thank You, <br>Recite App Team.';
              //html.replace("{{username}}", Meteor.user().profile.fullName);
              Meteor.call("sendEmail", selectedEmails[i], "recite.app.2019@gmail.com", "Invitation from Recite!!!", html);
            }            
          }
        }
      }
      
      if(selectedContacts !== null){
        console.log("6");
        if(selectedContacts.length > 0)
        {
          console.log("7");
          for(var i = 0; i < selectedContacts.length; i++)
          {
            console.log("8");
            var userContact = userContacts.findOne({
              "_id": selectedContacts[i]
            });
            var contactEmail = "";
            if(typeof userContact.personalEmail !== "undefined")
            {
              contactEmail = userContact.personalEmail
            }
            else if(typeof userContact.workEmail !== "undefined")
            {
              contactEmail = userContact.workEmail
            }
            else{
              contactEmail = "";
            }
            var checkFullAcess = userCollaborations.findOne({"userId": userId,"emailAddress": contactEmail,"fullAccess": true});
            var findInCollaborator = userCollaborations.findOne({"userId": userId,"emailAddress":contactEmail,"permission": permission});
            var findContactId = userCollaborations.findOne({"userId": userId,"contactId":selectedContacts[i],"permission": permission});
            console.log("findInCollaborator",findInCollaborator);
            console.log("findContactId",findContactId);

            if(checkFullAcess !== null && checkFullAcess !== undefined){
              userCollaborations.remove({"userId": userId,"emailAddress": contactEmail,"fullAccess": true});
            }
            if(findInCollaborator !== null && findInCollaborator !== undefined){
              console.log("9");
              console.log("email id isAlreadyExist");
              var projectList = findInCollaborator.projectIds;
              console.log("findata",projectList);
              var margeProject = projectList.concat(selectedProjects);
              var unique = margeProject.filter(function(itm, i, margeProject) {
               return i == margeProject.indexOf(itm); 
              });
              console.log("unique",unique);
              userCollaborations.update({"userId": userId,"emailAddress":contactEmail,"permission": permission},{$set:{"projectIds":unique}});
            }
            else if(findContactId !== null && findContactId !== undefined){
              console.log("10");
              var projectList = findContactId.projectIds;
              console.log("findata",projectList);
              var margeProject = projectList.concat(selectedProjects);
              var unique = margeProject.filter(function(itm, i, margeProject) {
               return i == margeProject.indexOf(itm); 
              });
              console.log("unique",unique);
              userCollaborations.update({"userId": userId,"contactId":selectedContacts[i],"permission": permission},{$set:{"projectIds":unique}});
            }
            else{
              console.log("11");
              var insertData = {
                "userId": userId,
                "emailAddress": "",
                "contactId": selectedContacts[i],
                "contactEmail": contactEmail,
                "permission": permission,
                "fullAccess": false,
                "projectIds": selectedProjects,
                "dateCreated": new Date()
              };
              userCollaborations.insert(insertData); 
              var html = "Hello,<br><br>";
              //html += "\n\nWelcome to Recite App. \n\nThank You,\nRecite App Team.";
              html += userDetails.profile.fullName + ' has invited you use recite app. Please accept the invitation by logging into the recite app or registering in the recite app.<br><br>Thank You, <br>Recite App Team.';
              //html.replace("{{username}}", Meteor.user().profile.fullName);
              Meteor.call("sendEmail", contactEmail, "recite.app.2019@gmail.com", "Invitation from Recite!!!", html);
            }            
          }
        }
      }      
      return true;
    },
    updateCollaborator(id, selectedProjects, permission){
      var findCollaboration = userCollaborations.findOne({_id:id});
      if(findCollaboration){
        return userCollaborations.update({_id:id},{$set:{"projectIds":selectedProjects,"permission":permission}})
      }
    },
    removeCollaborator(id){
      var findCollaboration = userCollaborations.findOne({_id:id});
      if(findCollaboration){
        return userCollaborations.remove({_id:id});
      }
    },
    addCollaboratorSystemAdmin(userId, userEmail)
    {
      var userDetails = Meteor.users.findOne({
        "_id": userId
      });
      var findInCollaborator = userCollaborations.find({"userId": userId,"emailAddress":userEmail}).fetch();
      // console.log("findInCollaborator",findInCollaborator);
      var findContactId = userCollaborations.find({"userId": userId,"contactEmail":userEmail}).fetch();
      // console.log("findContactId",findContactId);
      if(findInCollaborator !== null && findInCollaborator !== undefined){
        userCollaborations.remove({"userId": userId,"emailAddress":userEmail});
      }
      if(findContactId !== null && findContactId !== undefined){
        userCollaborations.remove({"userId": userId,"contactEmail":userEmail});
      }
        var insertData = {
          "userId": userId,
          "emailAddress": userEmail,
          "contactId": "",
          "contactEmail": "",
          "permission": "",
          "fullAccess": true,
          "projectIds": [],
          "dateCreated": new Date()
        };
        var a = userCollaborations.insert(insertData);   
        var html = "Hello,<br><br>";
              //html += "\n\nWelcome to Recite App. \n\nThank You,\nRecite App Team.";
              html += userDetails.profile.fullName + ' has invited you use recite app. Please accept the invitation by logging into the recite app or registering in the recite app.<br><br>Thank You, <br>Recite App Team.';
              //html.replace("{{username}}", Meteor.user().profile.fullName);
              Meteor.call("sendEmail", userEmail, "recite.app.2019@gmail.com", "Invitation from Recite!!!", html);
           return a;
    },
    insertCardDetails(arr){
        // console.log("insertCardDetails arrr",arr.cardNumber)
        var oldData =  paymentDetails.find({CardNumber: arr.cardNumber, userId: arr.userId});
        // console.log("oldData",oldData,"oldData.count()",oldData.count());
        if(oldData.count() == 0)
        {
          console.log("payments");
          return paymentDetails.insert(arr);
        }
        else
        {
          oldData = oldData.fetch();
          return oldData[0]._id;
        }
     },
     DeleteContact(contactId)
     {
      return userContacts.remove({
        "_id": contactId
      });
     },
     markAllNotificationAsRead(userId)
     {
      return notificationDetails.update({
        "toUserId": Meteor.userId()
      },{
        $set: {
          "readStatus": true
        }
      },{multi:true});
     },
     singleInviteEmail(to, from, subject, text, userID) {
      this.unblock();
      Email.send({
        to: to,
        from: from,
        subject: subject,
        html: text
      });
    },
    inviteContactAllEmails(to, from, subject, text, userID){
      for(var i = 0; i < to.length; i++)
      {
        //contacts[i].contactNumber = "+919714843622";
        Meteor.call("singleInviteEmail", to[i].contactPersonalEmail, from,subject,text,userID)
      }
    }
  });
});
function sendFile(fileRef, fileArr, pos, otherVars, callback)
{
  var data = {
    "fileId": fileRef._id,
    "userId": otherVars.userId,
    "viewPermission": otherVars.viewCheckbox,
    "editPermission": otherVars.editCheckbox,
    "shareMessage": otherVars.messageTextArea,
    "sharedDate": new Date()
  }
  var fileIndertId = sharedFilesDetails.insert(data);

  var userData = [];
  var sendTo = otherVars.sendTo;
  for(var i = 0; i < sendTo.length; i++)
  {
    var a = sendTo[i];
    if(a.endsWith("_work") || a.endsWith("_personal"))
    {
      var splited = a.split("_");
      var contactId = userContacts.findOne({
        "_id": splited[0]
      });
      if(a.endsWith("_work"))
      {
        var emailAdd = contactId.workEmail;
      }
      if(a.endsWith("_personal"))
      {
        var emailAdd = contactId.personalEmail;
      }
      var dataUser = {
        "sharedFileId": fileIndertId,
        "userId": contactId._id,
        "userEmail": "",
        "isEmail": false
      }
      userData.push(dataUser);
    }
    else
    {
      var dataUser = {
        "sharedFileId": fileIndertId,
        "userId": "",
        "userEmail": a,
        "isEmail": true
      }
      userData.push(dataUser);
    }
  }
  sharedFilesUsersDetails.batchInsert(userData);

  pos = pos + 1;
  if(pos < fileArr.length)
  {
    sendFile(fileArr[pos], fileArr, pos, otherVars, callback);
  }
  else
  {
    callback();
  }
}
function copyFolder(FolderId, newParentId)
  {
    var subFolders = userFolders.find({
      parentId: FolderId
    });
    if(subFolders.count() > 0)
    {
      subFolders = subFolders.fetch();
    }
    
    var currentFolder = userFolders.find({
      _id: FolderId
    });
    if(currentFolder.count() > 0)
    {
      currentFolder = userFolders.findOne({
        _id: FolderId
      });
    }
    
    var currentFolderFiles = userFiles.find({
      fileFolder: FolderId
    });
    if(currentFolderFiles.count() > 0)
    {
      currentFolderFiles = currentFolderFiles.fetch();
    }
    
    delete currentFolder["_id"];
    currentFolder["parentId"] = newParentId;
    console.log("currentFolder", currentFolder);
    isAlreadyExistSubFolder = userFolders.find({
       $or:[
        {
          "folderName": currentFolder.folderName
        },
        {
          "folderName": {
            $regex: new RegExp(currentFolder.folderName + " ()")
          } 
        }
      ],
      "parentId": newParentId
    });
    if(isAlreadyExistSubFolder.count() > 0)
    {
      var c = isAlreadyExistSubFolder.count();
      c = c + 1;
      var fname = currentFolder.folderName + " (" + c +")";
    }
    else
    {
      var fname = currentFolder.folderName;
    }
    currentFolder["folderName"] = fname;
    var res = userFolders.insert(currentFolder);
    if(currentFolderFiles.length > 0)
    {
      for(var i = 0; i < currentFolderFiles.length; i++)
      {
        delete currentFolderFiles[i]["_id"];
        currentFolderFiles[i]["fileFolder"] = res;
      }
      userFiles.batchInsert(currentFolderFiles);
    }
    if(subFolders.length > 0)    
    {
      for(var i = 0; i < subFolders.length; i++)
      {
        copyFolder(subFolders[i]._id, res);
      }
    }
  }
function copyFolderToReport(FolderId, newParentId, firstNode)
  {
    var subFolders = userFolders.find({
      parentId: FolderId,
      "isDeleted": false
    }).fetch();
    var currentFolder = userFolders.findOne({
      _id: FolderId,
      "isDeleted": false
    });
    console.log(currentFolder.folderName);
    var currentFolderFiles = userFiles.find({
      fileFolder: FolderId,
      "isDeleted": false
    }).fetch();
    delete currentFolder["_id"];
    currentFolder["parentId"] = newParentId;
    if(firstNode)
    {
      var folderDetailsCounts = userReportFolders.find({
        "userId": currentFolder.userId,
        "folderName": {
          $regex: new RegExp(currentFolder.folderName)
        },
        $or: [
            {
              "parentId":{
                    $exists: false
                }
              },
              {
                "parentId": ""
              }
          ],
      "isDeleted": false
      });
      var folderName = currentFolder.folderName;
      if(folderDetailsCounts.count() > 0)
      {
        folderName = folderName + " (" + (folderDetailsCounts.count()+1) + ")";
        currentFolder["folderName"] = folderName;
      }
    }
    var res = userReportFolders.insert(currentFolder);
    if(currentFolderFiles.length > 0)
    {
      for(var i = 0; i < currentFolderFiles.length; i++)
      {
        delete currentFolderFiles[i]["_id"];
        currentFolderFiles[i]["fileFolder"] = res;
      }
      userReportFiles.batchInsert(currentFolderFiles);
    }
    if(subFolders.length > 0)    
    {
      for(var i = 0; i < subFolders.length; i++)
      {
        copyFolderToReport(subFolders[i]._id, res, 0);
      }
    }
  }