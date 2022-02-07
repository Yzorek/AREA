const fctToken = require("../../tools/fctToken");
const fctDataBase = require("../../tools/fctDBRequest");
const fctMail = require("../../tools/fctMail");
const {settings: settingsToken} = require("../../config/token.json");
const bcrypt = require("bcrypt");
const moment = require("moment");

function makeCode(length) {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}

async function sendToken(req, res) {
    try {
        let ip = req.socket.remoteAddress

        if (ip.substr(0, 7) == "::ffff:") {
            ip = ip.substr(7)
        }
        await fctDataBase.request('INSERT INTO connexion_history(id_user, ip, date) VALUES ($1, $2, $3);', [res.locals.id, ip, `${moment().format('YYYY-MM-DDTHH:mm:ss')}`]);

        res.status(200).json({
            accessToken: fctToken.generateToken(res.locals.id),
            duration: settingsToken.expiresIn,
        });
    } catch (err) {
        res.status(500).send({
            error: 'BDD error',
        });
    }
}

function identificationMail(req, res, next) {
    try {
        fctMail.createMail(req.body.email, "Welcome to Ulys! Please confirme your email! to Ulys application!", `http://localhost:8082/identification/${res.locals.id}?code=${makeCode(6)}`,
            `<!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN"
        "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml"
      xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
    <!--[if gte mso 9]>
    <xml>
        <o:OfficeDocumentSettings>
            <o:AllowPNG/>
            <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
    </xml>
    <![endif]-->
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="x-apple-disable-message-reformatting">
    <!--[if !mso]><!-->
    <meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]-->
    <title></title>

    <style type="text/css">
        table, td {
            color: #000000;
        }

        a {
            color: #0000ee;
            text-decoration: underline;
        }

        @media only screen and (min-width: 520px) {
            .u-row {
                width: 500px !important;
            }

            .u-row .u-col {
                vertical-align: top;
            }

            .u-row .u-col-100 {
                width: 500px !important;
            }

        }

        @media (max-width: 520px) {
            .u-row-container {
                max-width: 100% !important;
                padding-left: 0px !important;
                padding-right: 0px !important;
            }

            .u-row .u-col {
                min-width: 320px !important;
                max-width: 100% !important;
                display: block !important;
            }

            .u-row {
                width: calc(100% - 40px) !important;
            }

            .u-col {
                width: 100% !important;
            }

            .u-col > div {
                margin: 0 auto;
            }
        }

        body {
            margin: 0;
            padding: 0;
        }

        table,
        tr,
        td {
            vertical-align: top;
            border-collapse: collapse;
        }

        .ie-container table,
        .mso-container table {
            table-layout: fixed;
        }

        * {
            line-height: inherit;
        }

        a[x-apple-data-detectors='true'] {
            color: inherit !important;
            text-decoration: none !important;
        }

        @media (max-width: 480px) {
            .hide-mobile {
                max-height: 0px;
                overflow: hidden;
                display: none !important;
            }

        }
    </style>


    <!--[if !mso]><!-->
    <link href="https://fonts.googleapis.com/css?family=Rubik:400,700&display=swap" rel="stylesheet" type="text/css">
    <!--<![endif]-->

</head>

<body class="clean-body u_body"
      style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #e7e7e7;color: #000000">
<!--[if IE]>
<div class="ie-container"><![endif]-->
<!--[if mso]>
<div class="mso-container"><![endif]-->
<table style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #e7e7e7;width:100%"
       cellpadding="0" cellspacing="0">
    <tbody>
    <tr style="vertical-align: top">
        <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
            <!--[if (mso)|(IE)]>
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                    <td align="center" style="background-color: #e7e7e7;"><![endif]-->


            <div class="u-row-container" style="padding: 0px;background-color: transparent">
                <div class="u-row"
                     style="Margin: 0 auto;min-width: 320px;max-width: 500px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
                    <div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
                        <!--[if (mso)|(IE)]>
                        <table width="100%" cellpadding="0" cellspacing="0" border="0">
                            <tr>
                                <td style="padding: 0px;background-color: transparent;" align="center">
                                    <table cellpadding="0" cellspacing="0" border="0" style="width:500px;">
                                        <tr style="background-color: transparent;"><![endif]-->

                        <!--[if (mso)|(IE)]>
                        <td align="center" width="500"
                            style="width: 500px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"
                            valign="top"><![endif]-->
                        <div class="u-col u-col-100"
                             style="max-width: 320px;min-width: 500px;display: table-cell;vertical-align: top;">
                            <div style="width: 100% !important;">
                                <!--[if (!mso)&(!IE)]><!-->
                                <div style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                                    <!--<![endif]-->

                                    <table style="font-family:arial,helvetica,sans-serif;" role="presentation"
                                           cellpadding="0" cellspacing="0" width="100%" border="0">
                                        <tbody>
                                        <tr>
                                            <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;"
                                                align="left">

                                                <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                                    <tr>
                                                        <td style="padding-right: 0px;padding-left: 0px;"
                                                            align="center">

                                                            <img align="center" border="0" src="http://localhost:8080/download/image-5.png"
                                                                 alt="" title=""
                                                                 style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 37%;max-width: 177.6px;"
                                                                 width="177.6"/>

                                                        </td>
                                                    </tr>
                                                </table>

                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>

                                    <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
                            </div>
                        </div>
                        <!--[if (mso)|(IE)]></td><![endif]-->
                        <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                    </div>
                </div>
            </div>


            <div class="u-row-container" style="padding: 0px;background-color: transparent">
                <div class="u-row"
                     style="Margin: 0 auto;min-width: 320px;max-width: 500px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
                    <div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
                        <!--[if (mso)|(IE)]>
                        <table width="100%" cellpadding="0" cellspacing="0" border="0">
                            <tr>
                                <td style="padding: 0px;background-color: transparent;" align="center">
                                    <table cellpadding="0" cellspacing="0" border="0" style="width:500px;">
                                        <tr style="background-color: transparent;"><![endif]-->

                        <!--[if (mso)|(IE)]>
                        <td align="center" width="500"
                            style="width: 500px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"
                            valign="top"><![endif]-->
                        <div class="u-col u-col-100"
                             style="max-width: 320px;min-width: 500px;display: table-cell;vertical-align: top;">
                            <div style="width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                                <!--[if (!mso)&(!IE)]><!-->
                                <div style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                                    <!--<![endif]-->

                                    <table style="font-family:arial,helvetica,sans-serif;" role="presentation"
                                           cellpadding="0" cellspacing="0" width="100%" border="0">
                                        <tbody>
                                        <tr>
                                            <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;"
                                                align="left">

                                                <h1 style="margin: 0px; line-height: 140%; text-align: center; word-wrap: break-word; font-weight: normal; font-family: terminal,monaco; font-size: 22px;">
                                                    ULYS
                                                </h1>

                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>

                                    <table style="font-family:arial,helvetica,sans-serif;" role="presentation"
                                           cellpadding="0" cellspacing="0" width="100%" border="0">
                                        <tbody>
                                        <tr>
                                            <td style="overflow-wrap:break-word;word-break:break-word;padding:18px;font-family:arial,helvetica,sans-serif;"
                                                align="left">

                                                <div align="center">
                                                    <!--[if mso]>
                                                    <table width="100%" cellpadding="0" cellspacing="0" border="0"
                                                           style="border-spacing: 0; border-collapse: collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;font-family:arial,helvetica,sans-serif;">
                                                        <tr>
                                                            <td style="font-family:arial,helvetica,sans-serif;"
                                                                align="center">
                                                                <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml"
                                                                             xmlns:w="urn:schemas-microsoft-com:office:word"
                                                                             href=""
                                                                             style="height:36px; v-text-anchor:middle; width:288px;"
                                                                             arcsize="19.5%" stroke="f"
                                                                             fillcolor="#234066">
                                                                    <w:anchorlock/>
                                                                    <center style="color:#FFFFFF;font-family:arial,helvetica,sans-serif;">
                                                    <![endif]-->
                                                    <a href="http://localhost:8082/identification/${res.locals.id}?code=${makeCode(6)}" target="_blank"
                                                       style="box-sizing: border-box;display: inline-block;font-family:arial,helvetica,sans-serif;text-decoration: none;-webkit-text-size-adjust: none;text-align: center;color: #FFFFFF; background-color: #234066; border-radius: 7px;-webkit-border-radius: 7px; -moz-border-radius: 7px; width:62%; max-width:100%; overflow-wrap: break-word; word-break: break-word; word-wrap:break-word; mso-border-alt: none;border-top-width: 0px; border-top-style: dotted; border-top-color: #CCC; border-left-width: 0px; border-left-style: dotted; border-left-color: #CCC; border-right-width: 0px; border-right-style: dotted; border-right-color: #CCC; border-bottom-width: 0px; border-bottom-style: dotted; border-bottom-color: #CCC;">
                                                        <span style="display:block;padding:10px 20px;line-height:120%;"><span
                                                                style="font-size: 14px; line-height: 16.8px;">Click here to confirm your email</span></span>
                                                    </a>
                                                    <!--[if mso]></center></v:roundrect></td></tr></table><![endif]-->
                                                </div>

                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>

                                    <table style="font-family:arial,helvetica,sans-serif;" role="presentation"
                                           cellpadding="0" cellspacing="0" width="100%" border="0">
                                        <tbody>
                                        <tr>
                                            <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;"
                                                align="left">

                                                <table height="0px" align="center" border="0" cellpadding="0"
                                                       cellspacing="0" width="100%"
                                                       style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 1px solid #BBBBBB;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                                    <tbody>
                                                    <tr style="vertical-align: top">
                                                        <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                                            <span>&#160;</span>
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </table>

                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>

                                    <table style="font-family:arial,helvetica,sans-serif;" role="presentation"
                                           cellpadding="0" cellspacing="0" width="100%" border="0">
                                        <tbody>
                                        <tr>
                                            <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;"
                                                align="left">

                                                <div class="menu" style="text-align:center">
                                                    <!--[if (mso)|(IE)]>
                                                    <table role="presentation" border="0" cellpadding="0"
                                                           cellspacing="0" align="center">
                                                        <tr><![endif]-->

                                                    <!--[if (mso)|(IE)]>
                                                    <td style="padding:10px"><![endif]-->

                                                    <a href="http://localhost:8082" target="_self"
                                                       style="padding:10px;display:inline-block;color:#0068A5;font-family:'Rubik',sans-serif;font-size:14px;text-decoration:none">
                                                        Accueil
                                                    </a>

                                                    <!--[if (mso)|(IE)]></td><![endif]-->

                                                    <!--[if (mso)|(IE)]>
                                                    <td style="padding:10px"><![endif]-->
                                                    <span style="padding:10px;display:inline-block;color:#444444;font-family:'Rubik',sans-serif;font-size:14px"
                                                          class="hide-mobile">
      |
    </span>
                                                    <!--[if (mso)|(IE)]></td><![endif]-->


                                                    <!--[if (mso)|(IE)]>
                                                    <td style="padding:10px"><![endif]-->

                                                    <a href="http://localhost:8082/App/Dashboard" target="_self"
                                                       style="padding:10px;display:inline-block;color:#0068A5;font-family:'Rubik',sans-serif;font-size:14px;text-decoration:none">
                                                        Dashboard
                                                    </a>

                                                    <!--[if (mso)|(IE)]></td><![endif]-->

                                                    <!--[if (mso)|(IE)]>
                                                    <td style="padding:10px"><![endif]-->
                                                    <span style="padding:10px;display:inline-block;color:#444444;font-family:'Rubik',sans-serif;font-size:14px"
                                                          class="hide-mobile">
      |
    </span>
                                                    <!--[if (mso)|(IE)]></td><![endif]-->


                                                    <!--[if (mso)|(IE)]>
                                                    <td style="padding:10px"><![endif]-->

                                                    <a href="http://localhost:8082/App/Profile/Me" target="_self"
                                                       style="padding:10px;display:inline-block;color:#0068A5;font-family:'Rubik',sans-serif;font-size:14px;text-decoration:none">
                                                        Profile
                                                    </a>

                                                    <!--[if (mso)|(IE)]></td><![endif]-->

                                                    <!--[if (mso)|(IE)]>
                                                    <td style="padding:10px"><![endif]-->
                                                    <span style="padding:10px;display:inline-block;color:#444444;font-family:'Rubik',sans-serif;font-size:14px"
                                                          class="hide-mobile">
      |
    </span>
                                                    <!--[if (mso)|(IE)]></td><![endif]-->


                                                    <!--[if (mso)|(IE)]>
                                                    <td style="padding:10px"><![endif]-->

                                                    <a href="http://localhost:8082/App/Service" target="_self"
                                                       style="padding:10px;display:inline-block;color:#0068A5;font-family:'Rubik',sans-serif;font-size:14px;text-decoration:none">
                                                        Service
                                                    </a>

                                                    <!--[if (mso)|(IE)]></td><![endif]-->


                                                    <!--[if (mso)|(IE)]></tr></table><![endif]-->
                                                </div>

                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>

                                    <table style="font-family:arial,helvetica,sans-serif;" role="presentation"
                                           cellpadding="0" cellspacing="0" width="100%" border="0">
                                        <tbody>
                                        <tr>
                                            <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;"
                                                align="left">

                                                <table height="0px" align="center" border="0" cellpadding="0"
                                                       cellspacing="0" width="100%"
                                                       style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 1px solid #BBBBBB;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                                    <tbody>
                                                    <tr style="vertical-align: top">
                                                        <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                                            <span>&#160;</span>
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </table>

                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>

                                    <table style="font-family:arial,helvetica,sans-serif;" role="presentation"
                                           cellpadding="0" cellspacing="0" width="100%" border="0">
                                        <tbody>
                                        <tr>
                                            <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;"
                                                align="left">

                                                <div align="center">
                                                    <div style="display: table; max-width:184px;">
                                                        <!--[if (mso)|(IE)]>
                                                        <table width="184" cellpadding="0" cellspacing="0" border="0">
                                                            <tr>
                                                                <td style="border-collapse:collapse;" align="center">
                                                                    <table width="100%" cellpadding="0" cellspacing="0"
                                                                           border="0"
                                                                           style="border-collapse:collapse; mso-table-lspace: 0pt;mso-table-rspace: 0pt; width:184px;">
                                                                        <tr><![endif]-->


                                                        <!--[if (mso)|(IE)]>
                                                        <td width="32" style="width:32px; padding-right: 5px;"
                                                            valign="top"><![endif]-->
                                                        <table align="left" border="0" cellspacing="0" cellpadding="0"
                                                               width="32" height="32"
                                                               style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 5px">
                                                            <tbody>
                                                            <tr style="vertical-align: top">
                                                                <td align="left" valign="middle"
                                                                    style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                                                                    <a href="https://discord.gg/gMXwfedawm"
                                                                       title="Discord" target="_blank">
                                                                        <img src="http://localhost:8080/download/image-4.png" alt="Discord"
                                                                             title="Discord" width="32"
                                                                             style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
                                                                    </a>
                                                                </td>
                                                            </tr>
                                                            </tbody>
                                                        </table>
                                                        <!--[if (mso)|(IE)]></td><![endif]-->

                                                        <!--[if (mso)|(IE)]>
                                                        <td width="32" style="width:32px; padding-right: 5px;"
                                                            valign="top"><![endif]-->
                                                        <table align="left" border="0" cellspacing="0" cellpadding="0"
                                                               width="32" height="32"
                                                               style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 5px">
                                                            <tbody>
                                                            <tr style="vertical-align: top">
                                                                <td align="left" valign="middle"
                                                                    style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                                                                    <a href="https://email.com/damien.maillard@epitech.eu"
                                                                       title="Email" target="_blank">
                                                                        <img src="http://localhost:8080/download/image-2.png" alt="Email"
                                                                             title="Email" width="32"
                                                                             style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
                                                                    </a>
                                                                </td>
                                                            </tr>
                                                            </tbody>
                                                        </table>
                                                        <!--[if (mso)|(IE)]></td><![endif]-->

                                                        <!--[if (mso)|(IE)]>
                                                        <td width="32" style="width:32px; padding-right: 5px;"
                                                            valign="top"><![endif]-->
                                                        <table align="left" border="0" cellspacing="0" cellpadding="0"
                                                               width="32" height="32"
                                                               style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 5px">
                                                            <tbody>
                                                            <tr style="vertical-align: top">
                                                                <td align="left" valign="middle"
                                                                    style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                                                                    <a href="https://messenger.com/" title="Messenger"
                                                                       target="_blank">
                                                                        <img src="
                                                                        http://localhost:8080/download/image-7.png" alt="Messenger"
                                                                             title="Messenger" width="32"
                                                                             style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
                                                                    </a>
                                                                </td>
                                                            </tr>
                                                            </tbody>
                                                        </table>
                                                        <!--[if (mso)|(IE)]></td><![endif]-->

                                                        <!--[if (mso)|(IE)]>
                                                        <td width="32" style="width:32px; padding-right: 5px;"
                                                            valign="top"><![endif]-->
                                                        <table align="left" border="0" cellspacing="0" cellpadding="0"
                                                               width="32" height="32"
                                                               style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 5px">
                                                            <tbody>
                                                            <tr style="vertical-align: top">
                                                                <td align="left" valign="middle"
                                                                    style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                                                                    <a href="https://github.com/" title="GitHub"
                                                                       target="_blank">
                                                                        <img src="http://localhost:8080/download/image-4.png" alt="GitHub"
                                                                             title="GitHub" width="32"
                                                                             style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
                                                                    </a>
                                                                </td>
                                                            </tr>
                                                            </tbody>
                                                        </table>
                                                        <!--[if (mso)|(IE)]></td><![endif]-->

                                                        <!--[if (mso)|(IE)]>
                                                        <td width="32" style="width:32px; padding-right: 0px;"
                                                            valign="top"><![endif]-->
                                                        <table align="left" border="0" cellspacing="0" cellpadding="0"
                                                               width="32" height="32"
                                                               style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 0px">
                                                            <tbody>
                                                            <tr style="vertical-align: top">
                                                                <td align="left" valign="middle"
                                                                    style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                                                                    <a href="https://linkedin.com/" title="LinkedIn"
                                                                       target="_blank">
                                                                        <img src="http://localhost:8080/download/image-1.png
                                                                        " alt="LinkedIn"
                                                                             title="LinkedIn" width="32"
                                                                             style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
                                                                    </a>
                                                                </td>
                                                            </tr>
                                                            </tbody>
                                                        </table>
                                                        <!--[if (mso)|(IE)]></td><![endif]-->


                                                        <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                                                    </div>
                                                </div>

                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>

                                    <table style="font-family:arial,helvetica,sans-serif;" role="presentation"
                                           cellpadding="0" cellspacing="0" width="100%" border="0">
                                        <tbody>
                                        <tr>
                                            <td style="overflow-wrap:break-word;word-break:break-word;padding:2px;font-family:arial,helvetica,sans-serif;"
                                                align="left">

                                                <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                                    <tr>
                                                        <td style="padding-right: 0px;padding-left: 0px;"
                                                            align="center">

                                                            <img align="center" border="0" src="http://localhost:8080/download/image-3.jpeg"
                                                                 alt="" title=""
                                                                 style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 100%;max-width: 496px;"
                                                                 width="496"/>

                                                        </td>
                                                    </tr>
                                                </table>

                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>

                                    <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
                            </div>
                        </div>
                        <!--[if (mso)|(IE)]></td><![endif]-->
                        <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                    </div>
                </div>
            </div>


            <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
        </td>
    </tr>
    </tbody>
</table>
<!--[if mso]></div><![endif]-->
<!--[if IE]></div><![endif]-->
</body>

</html>`)
        next();
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: 'Error send mail',
        });
    }
}

async function insertIntoClients(req, res, next) {
    try {
        await bcrypt.hash(req.body.password, 10, (err, hash) => {
            return new Promise(async (resolve, reject) => {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                try {
                    await fctDataBase.request("INSERT INTO clients(username, first_name, last_name, email, password, is_identified, avatar, auth, id_theme, id_status, is_tutorial_mode) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11);",
                        [req.body.username, req.body.firstName, req.body.lastName, req.body.email, hash, false, req.body.avatar ? req.body.avatar : null, req.body.auth, 1, 1, true]);
                    next();
                    resolve();
                } catch (err) {
                    res.status(500).send({
                        message: 'BDD error',
                    });
                    reject(err);
                }
            })
        })
    } catch (err) {
        res.status(500).send({
            message: 'BDD error',
        });
    }
}

async function checkInsert(req, res, next) {
    try {
        let data = await fctDataBase.request("SELECT id FROM clients WHERE email=$1;", [req.body.email]);

        if (data.rowCount === 0) {
            res.status(500).send({
                message: 'Insert error'
            });
        } else {
            res.locals = {
                id: data.rows[0].id
            }
            next();
        }
    } catch (err) {
        res.status(500).send({
            message: 'Error server',
        });
    }
}

async function checkUserIsAlreadyCreate(req, res, next) {
    try {
        let data = await fctDataBase.request("SELECT id FROM clients WHERE email=$1;", [req.body.email]);

        if (data.rowCount >= 1) {
            res.status(403).send({
                message: 'This clients have already create a account.'
            });
        } else {
            next();
        }
    } catch (err) {
        res.status(500).send({
            message: 'BDD error',
        });
    }
}

module.exports = {
    checkUserIsAlreadyCreate,
    insertIntoClients,
    identificationMail,
    checkInsert,
    sendToken
}