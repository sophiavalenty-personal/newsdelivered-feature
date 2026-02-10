import { NewsletterContent } from '@/components/newsletter/NewsletterTemplate';

export const generateEmailHtml = (content: NewsletterContent, logoUrl?: string): string => {
  const logo = logoUrl 
    ? `<img src="${logoUrl}" alt="${content.firmName}" style="max-width: 200px; margin-bottom: 15px;" />`
    : `<div style="margin-bottom: 10px; color: #86C733; font-size: 12px;">[Logo placeholder]</div>`;

  const headlinesHtml = content.headlines.map(h => `
    <div style="margin-bottom: 15px;">
      <h3 style="color: #1a4a6e; font-size: 16px; font-weight: bold; margin: 0 0 5px 0; font-family: Georgia, Times, serif;">${h.title}</h3>
      <p style="color: #4a5568; font-size: 14px; margin: 0; line-height: 1.5; font-family: Georgia, Times, serif;">${h.description}</p>
    </div>
  `).join('');

  const insightsHtml = content.keyInsights.map(insight => `
    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom: 10px;" role="presentation">
      <tr>
        <td style="width: 4px; background-color: #86C733;"></td>
        <td style="background-color: #f5f3ef; padding: 20px 25px;">
          <p style="color: #2d3748; font-size: 14px; margin: 0; line-height: 1.6; font-family: Georgia, Times, serif;">${insight}</p>
        </td>
      </tr>
    </table>
  `).join('');

  const stepsHtml = content.actionSteps.map((step, index) => `
    <table cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 15px; width: 100%;" role="presentation">
      <tr>
        <td style="width: 43px; vertical-align: top;">
          <div style="background-color: #1a4a6e; color: #ffffff; width: 28px; height: 28px; border-radius: 50%; text-align: center; line-height: 28px; font-size: 14px; font-weight: bold; font-family: Arial, sans-serif;">${index + 1}</div>
        </td>
        <td style="vertical-align: top;">
          <p style="color: #2d3748; font-size: 14px; line-height: 1.6; margin: 0; font-family: Georgia, Times, serif;">${step}</p>
        </td>
      </tr>
    </table>
  `).join('');

  // Replace newlines in story content with <br> tags
  const storyContentHtml = content.story.content.replace(/\n\n/g, '</p><p style="color: #2d3748; font-size: 15px; line-height: 1.7; margin: 0 0 15px 0; font-family: Georgia, Times, serif;">').replace(/\n/g, '<br>');

  return `<!DOCTYPE html>
<html lang="en" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="x-apple-disable-message-reformatting">
  <title>${content.firmName} Newsletter</title>
  <!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <![endif]-->
  <style>
    /* Reset styles */
    body, table, td, p, a, li, blockquote {
      -webkit-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
    }
    table, td {
      mso-table-lspace: 0pt;
      mso-table-rspace: 0pt;
    }
    img {
      -ms-interpolation-mode: bicubic;
      border: 0;
      outline: none;
      text-decoration: none;
    }
    body {
      margin: 0;
      padding: 0;
      width: 100% !important;
      height: 100% !important;
    }
    /* Responsive styles */
    @media screen and (max-width: 600px) {
      .container {
        width: 100% !important;
      }
      .content-padding {
        padding-left: 20px !important;
        padding-right: 20px !important;
      }
      .mobile-center {
        text-align: center !important;
      }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #f5f3ef; font-family: Georgia, Times, serif;">
  
  <!-- Preheader text (hidden) -->
  <div style="display: none; max-height: 0; overflow: hidden;">
    ${content.headlines[0]?.title || 'Your monthly tax and financial insights'}
    &nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;
  </div>

  <!-- Email wrapper -->
  <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #f5f3ef;" role="presentation">
    <tr>
      <td align="center" style="padding: 20px;">
        
        <!-- Main container -->
        <table class="container" cellpadding="0" cellspacing="0" border="0" width="600" style="max-width: 600px; background-color: #ffffff;" role="presentation">
          
          <!-- Header -->
          <tr>
            <td style="background-color: #ffffff; padding: 30px 40px; text-align: center;">
              ${logo}
              <p style="color: #1a4a6e; margin: 0; font-size: 14px; font-family: Arial, sans-serif; text-transform: uppercase; letter-spacing: 2px;">Prepared for</p>
              <h1 style="color: #1a4a6e; margin: 10px 0 0 0; font-size: 24px; font-weight: bold; font-family: Georgia, Times, serif;">${content.preparedFor}</h1>
            </td>
          </tr>

          <!-- Contact Bar -->
          <tr>
            <td style="background-color: #86C733; padding: 12px 40px; text-align: center;">
              <p style="color: #1a4a6e; margin: 0; font-size: 13px; font-family: Arial, sans-serif;">
                <a href="mailto:${content.contactEmail}" style="color: #1a4a6e; text-decoration: none;">${content.contactEmail}</a> | 
                <a href="tel:${content.contactPhone.replace(/[^0-9]/g, '')}" style="color: #1a4a6e; text-decoration: none;">${content.contactPhone}</a> | 
                <a href="${content.websiteUrl}" style="color: #1a4a6e; text-decoration: none;">Visit Website</a>
              </p>
            </td>
          </tr>

          <!-- Headlines Section -->
          <tr>
            <td class="content-padding" style="padding: 30px 40px;">
              <h2 style="color: #1a4a6e; font-size: 20px; font-weight: bold; margin: 0 0 20px 0; border-bottom: 2px solid #86C733; padding-bottom: 10px; font-family: Georgia, Times, serif;">Featured</h2>
              ${headlinesHtml}
            </td>
          </tr>

          <!-- Soft CTA 1 -->
          <tr>
            <td style="background-color: #f0f7e6; padding: 20px 40px; text-align: center;">
              <p style="color: #1a4a6e; font-size: 14px; margin: 0; font-family: Georgia, Times, serif;">
                Have questions about these updates? <a href="${content.ctaButton.url}" style="color: #86C733; font-weight: bold; text-decoration: underline;">Let's talk</a>
              </p>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding: 0 40px;">
              <table cellpadding="0" cellspacing="0" border="0" width="100%" role="presentation">
                <tr>
                  <td style="border-top: 1px solid #d4e8c0; font-size: 1px; line-height: 1px;">&nbsp;</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Story Section -->
          <tr>
            <td class="content-padding" style="padding: 30px 40px;">
              <h2 style="color: #1a4a6e; font-size: 20px; font-weight: bold; margin: 0 0 20px 0; border-bottom: 2px solid #86C733; padding-bottom: 10px; font-family: Georgia, Times, serif;">Real-World Scenario</h2>
              <h3 style="color: #1a4a6e; font-size: 22px; font-weight: bold; margin: 0 0 15px 0; font-family: Georgia, Times, serif;">${content.story.title}</h3>
              <p style="color: #2d3748; font-size: 15px; line-height: 1.7; margin: 0; font-family: Georgia, Times, serif;">${storyContentHtml}</p>
            </td>
          </tr>

          <!-- Key Insights Section -->
          <tr>
            <td class="content-padding" style="padding: 30px 40px;">
              <h2 style="color: #1a4a6e; font-size: 20px; font-weight: bold; margin: 0 0 20px 0; border-bottom: 2px solid #86C733; padding-bottom: 10px; font-family: Georgia, Times, serif;">Key Insights</h2>
              ${insightsHtml}
            </td>
          </tr>

          <!-- Action Steps Section -->
          <tr>
            <td class="content-padding" style="padding: 30px 40px;">
              <h2 style="color: #1a4a6e; font-size: 20px; font-weight: bold; margin: 0 0 20px 0; border-bottom: 2px solid #86C733; padding-bottom: 10px; font-family: Georgia, Times, serif;">Your Action Steps</h2>
              ${stepsHtml}
            </td>
          </tr>

          <!-- Soft CTA 2 -->
          <tr>
            <td style="background-color: #f0f7e6; padding: 20px 40px; text-align: center;">
              <p style="color: #1a4a6e; font-size: 14px; margin: 0; font-family: Georgia, Times, serif;">
                Need help with your specific situation? <a href="${content.ctaButton.url}" style="color: #86C733; font-weight: bold; text-decoration: underline;">Schedule a quick call</a>
              </p>
            </td>
          </tr>

          <!-- Humor Section -->
          <tr>
            <td style="background-color: #f5f3ef; padding: 30px 40px; text-align: center;">
              
              <table cellpadding="0" cellspacing="0" border="0" width="100%" role="presentation">
                <tr>
                  <td style="background-color: #ffffff; padding: 20px; text-align: center; border: 2px dashed #86C733;">
                    <img src="{{HUMOR_IMAGE_URL}}" alt="${content.humorSection.altText}" width="520" style="width: 100%; max-width: 520px; height: auto; display: block; margin: 0 auto;" />
                  </td>
            </td>
          </tr>

          <!-- CTA Section -->
          <tr>
            <td style="background-color: #1a4a6e; padding: 40px; text-align: center;">
              <p style="color: #ffffff; font-size: 18px; margin: 0 0 20px 0; font-family: Georgia, Times, serif;">Ready to protect your retirement?</p>
              <!--[if mso]>
              <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${content.ctaButton.url}" style="height:50px;v-text-anchor:middle;width:320px;" arcsize="10%" strokecolor="#86C733" fillcolor="#86C733">
                <w:anchorlock/>
                <center style="color:#1a4a6e;font-family:Arial,sans-serif;font-size:16px;font-weight:bold;">${content.ctaButton.text}</center>
              </v:roundrect>
              <![endif]-->
              <!--[if !mso]><!-->
              <a href="${content.ctaButton.url}" style="background-color: #86C733; color: #1a4a6e; padding: 15px 35px; font-size: 16px; font-weight: bold; text-decoration: none; border-radius: 5px; display: inline-block; font-family: Arial, sans-serif;">${content.ctaButton.text}</a>
              <!--<![endif]-->
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #2d3748; padding: 30px 40px; text-align: center;">
              <!-- Feedback -->
              <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom: 20px;" role="presentation">
                <tr>
                  <td align="center">
                    <p style="color: #a0aec0; font-size: 14px; margin: 0 0 10px 0; font-family: Arial, sans-serif;">Was this info helpful?</p>
                  </td>
                </tr>
                <tr>
                  <td align="center">
                    <table cellpadding="0" cellspacing="0" border="0" role="presentation">
                      <tr>
                        <td style="padding: 0 5px;">
                          <!--[if mso]>
                          <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" href="{{FEEDBACK_POSITIVE_LINK}}" style="height:40px;v-text-anchor:middle;width:80px;" arcsize="10%" strokecolor="#4a5568" fillcolor="#2d3748">
                            <center style="color:#a0aec0;font-family:Arial,sans-serif;font-size:20px;">Yes</center>
                          </v:roundrect>
                          <![endif]-->
                          <!--[if !mso]><!-->
                          <a href="{{FEEDBACK_POSITIVE_LINK}}" style="border: 1px solid #4a5568; color: #a0aec0; padding: 8px 20px; font-size: 20px; text-decoration: none; border-radius: 5px; font-family: Arial, sans-serif; mso-hide: all;">Yes</a>
                          <!--<![endif]-->
                        </td>
                        <td style="padding: 0 5px;">
                          <!--[if mso]>
                          <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" href="{{FEEDBACK_NEGATIVE_LINK}}" style="height:40px;v-text-anchor:middle;width:80px;" arcsize="10%" strokecolor="#4a5568" fillcolor="#2d3748">
                            <center style="color:#a0aec0;font-family:Arial,sans-serif;font-size:20px;">No</center>
                          </v:roundrect>
                          <![endif]-->
                          <!--[if !mso]><!-->
                          <a href="{{FEEDBACK_NEGATIVE_LINK}}" style="border: 1px solid #4a5568; color: #a0aec0; padding: 8px 20px; font-size: 20px; text-decoration: none; border-radius: 5px; font-family: Arial, sans-serif; mso-hide: all;">No</a>
                          <!--<![endif]-->
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Social Icons -->
              <table cellpadding="0" cellspacing="0" border="0" style="margin: 0 auto 20px auto;" role="presentation">
                <tr>
                  <td align="center" style="padding: 0 5px;">
                    <a href="{{FACEBOOK_LINK}}" style="color: #ffffff; text-decoration: none; font-family: Arial, sans-serif; font-size: 14px;">
                      <table cellpadding="0" cellspacing="0" border="0" role="presentation">
                        <tr>
                          <td width="35" height="35" align="center" valign="middle" style="background-color: #4a5568; border-radius: 50%; color: #ffffff; font-family: Arial, sans-serif; font-size: 14px;">
                            f
                          </td>
                        </tr>
                      </table>
                    </a>
                  </td>
                  <td align="center" style="padding: 0 5px;">
                    <a href="{{LINKEDIN_LINK}}" style="color: #ffffff; text-decoration: none; font-family: Arial, sans-serif; font-size: 12px;">
                      <table cellpadding="0" cellspacing="0" border="0" role="presentation">
                        <tr>
                          <td width="35" height="35" align="center" valign="middle" style="background-color: #4a5568; border-radius: 50%; color: #ffffff; font-family: Arial, sans-serif; font-size: 12px;">
                            in
                          </td>
                        </tr>
                      </table>
                    </a>
                  </td>
                  <td align="center" style="padding: 0 5px;">
                    <a href="{{TWITTER_LINK}}" style="color: #ffffff; text-decoration: none; font-family: Arial, sans-serif; font-size: 14px;">
                      <table cellpadding="0" cellspacing="0" border="0" role="presentation">
                        <tr>
                          <td width="35" height="35" align="center" valign="middle" style="background-color: #4a5568; border-radius: 50%; color: #ffffff; font-family: Arial, sans-serif; font-size: 14px;">
                            X
                          </td>
                        </tr>
                      </table>
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Disclaimer -->
              <p style="color: #718096; font-size: 11px; line-height: 1.5; margin: 0 0 15px 0; font-family: Arial, sans-serif;">${content.footer.disclaimer}</p>

              <!-- Unsubscribe -->
              <p style="color: #a0aec0; font-size: 12px; margin: 0; font-family: Arial, sans-serif;">
                <a href="${content.footer.unsubscribeUrl}" style="color: #a0aec0; text-decoration: underline;">Unsubscribe</a> | 
                <a href="{{PREFERENCES_LINK}}" style="color: #a0aec0; text-decoration: underline;">Update Preferences</a>
              </p>
            </td>
          </tr>

        </table>
        <!-- End main container -->

      </td>
    </tr>
  </table>
  <!-- End email wrapper -->

</body>
</html>`;
};
