export default (code, userFirstName) => {
  //aqui se introduce todo lo de SEO preferiblemente otra opcion es helmet pero en el server ojo

  const webURL = process.env.WEB_URL;

  return `
  <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:v="urn:schemas-microsoft-com:vml">
<head>
<!--[if gte mso 9]><xml><o:OfficeDocumentSettings><o:AllowPNG/><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml><![endif]-->
<meta content="text/html; charset=utf-8" http-equiv="Content-Type"/>
<meta content="width=device-width" name="viewport"/>
<!--[if !mso]><!-->
<meta content="IE=edge" http-equiv="X-UA-Compatible"/>
<!--<![endif]-->
<title></title>
<!--[if !mso]><!-->
<!--<![endif]-->
<style type="text/css">

@import url('https://fonts.googleapis.com/css?family=Work+Sans&display=swap');
		body {
			margin: 0;
			padding: 0;
		}
		p{
			font-family:"Work Sans", sans-serif
		}

		.username{
			color:#F95F0B
		}
		table,
		td,
		tr {
			vertical-align: top;
			border-collapse: collapse;
		}

		* {
			line-height: inherit;
		}

		a[x-apple-data-detectors=true] {
			color: inherit !important;
			text-decoration: none !important;
		}
	</style>
<style id="media-query" type="text/css">
		@media (max-width: 520px) {

			.block-grid,
			.col {
				min-width: 320px !important;
				max-width: 100% !important;
				display: block !important;
			}

			.block-grid {
				width: 100% !important;
			}

			.col {
				width: 100% !important;
			}

			.col>div {
				margin: 0 auto;
			}

			img.fullwidth,
			img.fullwidthOnMobile {
				max-width: 100% !important;
			}

			.no-stack .col {
				min-width: 0 !important;
				display: table-cell !important;
			}

			.no-stack.two-up .col {
				width: 50% !important;
			}

			.no-stack .col.num4 {
				width: 33% !important;
			}

			.no-stack .col.num8 {
				width: 66% !important;
			}

			.no-stack .col.num4 {
				width: 33% !important;
			}

			.no-stack .col.num3 {
				width: 25% !important;
			}

			.no-stack .col.num6 {
				width: 50% !important;
			}

			.no-stack .col.num9 {
				width: 75% !important;
			}

			.video-block {
				max-width: none !important;
			}

			.mobile_hide {
				min-height: 0px;
				max-height: 0px;
				max-width: 0px;
				display: none;
				overflow: hidden;
				font-size: 0px;
			}

			.desktop_hide {
				display: block !important;
				max-height: none !important;
			}
		}
	</style>
</head>
<body class="clean-body" style="margin: 0; padding: 0; -webkit-text-size-adjust: 100%; background-color: #FFFFFF;">
<!--[if IE]><div class="ie-browser"><![endif]-->
<table bgcolor="#FFFFFF" cellpadding="0" cellspacing="0" class="nl-container" 
role="presentation" style="table-layout: fixed; vertical-align: top; min-width: 320px; Margin: 0 auto; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #FFFFFF; width: 100%;" valign="top" width="100%">
<tbody>
<tr style="vertical-align: top;" valign="top">
<td style="word-break: break-word; vertical-align: top;" valign="top">
<!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color:#FFFFFF"><![endif]-->
<div style="background-color:transparent;">
<div class="block-grid" style="Margin: 0 auto; min-width: 320px; max-width: 500px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: transparent;">
<div style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;">
<!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:500px"><tr class="layout-full-width" style="background-color:transparent"><![endif]-->
<!--[if (mso)|(IE)]><td align="center" width="500" style="background-color:transparent;width:500px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;"><![endif]-->
<div class="col num12" style="min-width: 320px; max-width: 500px; display: table-cell; vertical-align: top; width: 500px;">
<div style="width:100% !important;">
<!--[if (!mso)&(!IE)]><!-->
<div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;">
<!--<![endif]-->
<div align="center" class="img-container center autowidth fullwidth">
<!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr style="line-height:0px"><td style="" align="center"><![endif]--><img align="center" alt="Image" border="0" class="center autowidth fullwidth" src="https://cdn.swordvoice.com/templates/confirmEmail.png" style="text-decoration: none; -ms-interpolation-mode: bicubic; border: 0; height: auto; width: 100%; max-width: 500px; display: block;" title="Image" width="500"/>
<!--[if mso]></td></tr></table><![endif]-->
</div>
<!--[if (!mso)&(!IE)]><!-->
</div>
<!--<![endif]-->
</div>
</div>
<!--[if (mso)|(IE)]></td></tr></table><![endif]-->
<!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
</div>
</div>
</div>
<div style="background-color:transparent;">
<div class="block-grid" style="Margin: 0 auto; min-width: 320px; max-width: 500px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: transparent;">
<div style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;">
<!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:500px"><tr class="layout-full-width" style="background-color:transparent"><![endif]-->
<!--[if (mso)|(IE)]><td align="center" width="500" style="background-color:transparent;width:500px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;"><![endif]-->
<div class="col num12" style="min-width: 320px; max-width: 500px; display: table-cell; vertical-align: top; width: 500px;">
<div style="width:100% !important;">
<!--[if (!mso)&(!IE)]><!-->
<div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;">
<!--<![endif]-->
<!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Arial, sans-serif"><![endif]-->
<div style="color:#555555;font-family:'Work Sans';line-height:120%;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
<div style="font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size: 14px; line-height: 16px; color: #555555;">
<p style="font-size: 18px; line-height: 21px; margin: 0;">Hello <span class="username"><strong>${userFirstName}</strong></span>,</p>
<p style="font-size: 18px; line-height: 21px; margin: 0;"> </p>
<p style="font-size: 18px; line-height: 21px; margin: 0;">Thank you for joining our online community. Before we start please <a href="${webURL}/api/emailVerification?id=${code}" rel="noopener" style="text-decoration: underline; color: #0068A5;" target="_blank">Click Here</a> or the link below for confirm your email address:</p>
<p style="font-size: 18px; line-height: 21px; margin: 0;"><br/>

<a href="${webURL}/api/emailVerification?id=${code}" rel="noopener" style="text-decoration: underline; color: #0068A5;" target="_blank">https://www.swordvoice.com/api/emailVerification?id=${code}</a>

</p>
<p style="font-size: 18px; line-height: 21px; margin: 0;"> </p>
<p style="font-size: 18px; line-height: 21px; margin: 0;"> </p>
<p style="font-size: 18px; line-height: 21px; margin: 0;"> </p>
<p style="font-size: 18px; line-height: 21px; margin: 0;"><strong>Please do not reply to this automated message. For any additional info you need, <a href="http://www.swordvoice.com/contact" rel="noopener" style="text-decoration: underline; color: #0068A5;" target="_blank">Contact Us Here</a>  or follow us on our social media bellow:</strong></p>
</div>
</div>
<!--[if mso]></td></tr></table><![endif]-->
<table cellpadding="0" cellspacing="0" class="social_icons" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" valign="top" width="100%">
<tbody>
<tr style="vertical-align: top;" valign="top">
<td style="word-break: break-word; vertical-align: top; padding-top: 10px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px;" valign="top">
<table activate="activate" align="center" alignment="alignment" cellpadding="0" cellspacing="0" class="social_table" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: undefined; mso-table-tspace: 0; mso-table-rspace: 0; mso-table-bspace: 0; mso-table-lspace: 0;" to="to" valign="top">
<tbody>
<tr align="center" style="vertical-align: top; display: inline-block; text-align: center;" valign="top">
<td style="word-break: break-word; vertical-align: top; padding-bottom: 5px; padding-right: 3px; padding-left: 3px;" 
valign="top">
<a href="https://twitter.com/SwordVoice_1" 
target="_blank"><img alt="Twitter" 
width="32" src="https://cdn.swordvoice.com/templates/twitter.png" 
style="text-decoration: none; -ms-interpolation-mode: bicubic; height: auto; border: none; display: block;" title="Twitter" width="32"/></a></td>
<td 
style="word-break: break-word; vertical-align: top; padding-bottom: 5px; padding-right: 3px; padding-left: 3px;" 
valign="top">
<a href="https://www.facebook.com/SwordVoice/" 
target="_blank"><img alt="Facebook" 
width="32" src="https://cdn.swordvoice.com/templates/facebook.png" 
style="text-decoration: none; -ms-interpolation-mode: bicubic; height: auto; border: none; display: block;" title="Facebook" width="32"/></a></td>
<td 
style="word-break: break-word; vertical-align: top; padding-bottom: 5px; padding-right: 3px; padding-left: 3px;" 
valign="top">
<a href="https://www.instagram.com/swordvoice_official/" 
target="_blank"><img alt="Instagram" 
width="32" src="https://cdn.swordvoice.com/templates/instagram.png" 
style="text-decoration: none; -ms-interpolation-mode: bicubic; height: auto; border: none; display: block;" title="Instagram" width="32"/></a></td>

<td 
style="word-break: break-word; vertical-align: top; padding-bottom: 5px; padding-right: 3px; padding-left: 3px;" 
valign="top">
<a href="https://www.youtube.com/channel/UCle-HTb2TPvcVk0AaljQyOQ" 
target="_blank"><img alt="YouTube"
 width="32" src="https://cdn.swordvoice.com/templates/youtube.png" 
 style="text-decoration: none; -ms-interpolation-mode: bicubic; height: auto; border: none; display: block;" title="YouTube" width="32"/></a></td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
<!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Arial, sans-serif"><![endif]-->
<div style="color:#555555;font-family:'Work Sans';line-height:120%;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
<div style="font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size: 14px; line-height: 16px; color: #555555;">
<p style="font-size: 18px; line-height: 16px; text-align: left; margin: 0;"><span style="font-size: 14px;">We’ve sent you this email because you or someone in your behalf used your email address for signing up for our system; if you do not approve this action, skip this communication.</span></p>
</div>
</div>
<!--[if mso]></td></tr></table><![endif]-->
<!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Arial, sans-serif"><![endif]-->
<div style="color:#555555;font-family:'Work Sans';line-height:120%;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
<div style="font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size: 14px; line-height: 16px; color: #555555;">
<p style="font-size: 14px; line-height: 16px; text-align: center; margin: 0;">© 2019 SwordVoice.com. All rights reserved.</p>
</div>
</div>
<!--[if mso]></td></tr></table><![endif]-->
<!--[if (!mso)&(!IE)]><!-->
</div>
<!--<![endif]-->
</div>
</div>
<!--[if (mso)|(IE)]></td></tr></table><![endif]-->
<!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
</div>
</div>
</div>
<!--[if (mso)|(IE)]></td></tr></table><![endif]-->
</td>
</tr>
</tbody>
</table>
<!--[if (IE)]></div><![endif]-->
</body>
</html>

`;
};
