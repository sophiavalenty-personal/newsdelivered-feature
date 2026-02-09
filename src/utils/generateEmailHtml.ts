import { NewsletterContent } from '@/components/newsletter/NewsletterTemplate';

export const generateEmailHtml = (content: NewsletterContent, logoUrl?: string): string => {
  const logo = logoUrl 
    ? `<img src="${logoUrl}" alt="${content.firmName}" style="max-width: 200px; margin-bottom: 15px;" />`
    : `<div style="margin-bottom: 10px; color: #c9a227; font-size: 12px;">[Logo placeholder]</div>`;

  const headlinesHtml = content.headlines.map(h => `
    <div style="margin-bottom: 15px;">
      <h3 style="color: #1a4a6e; font-size: 16px; font-weight: bold; margin: 0 0 5px 0; font-family: Georgia, Times, serif;">${h.title}</h3>
      <p style="color: #4a5568; font-size: 14px; margin: 0; line-height: 1.5; font-family: Georgia, Times, serif;">${h.description}</p>
    </div>
  `).join('');

  const insightsHtml = content.keyInsights.map(insight => `
    <div style="background-color: #f5f3ef; padding: 20px 25px; margin-bottom: 10px; border-left: 4px solid #c9a227;">
      <p style="color: #2d3748; font-size: 14px; margin: 0; line-height: 1.6; font-family: Georgia, Times, serif;">${insight}</p>
    </div>
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
            <td style="background-color: #1a4a6e; padding: 30px 40px; text-align: center;">
              ${logo}
              <p style="color: #ffffff; margin: 0; font-size: 14px; font-family: Arial, sans-serif; text-transform: uppercase; letter-spacing: 2px;">Prepared for</p>
              <h1 style="color: #ffffff; margin: 10px 0 0 0; font-size: 24px; font-weight: bold; font-family: Georgia, Times, serif;">${content.preparedFor}</h1>
            </td>
          </tr>

          <!-- Contact Bar -->
          <tr>
            <td style="background-color: #c9a227; padding: 12px 40px; text-align: center;">
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
              <h2 style="color: #1a4a6e; font-size: 20px; font-weight: bold; margin: 0 0 20px 0; border-bottom: 2px solid #c9a227; padding-bottom: 10px; font-family: Georgia, Times, serif;">Featured</h2>
              ${headlinesHtml}
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding: 0 40px;">
              <hr style="border: none; border-top: 1px solid #e2d9c8; margin: 0;">
            </td>
          </tr>

          <!-- Story Section -->
          <tr>
            <td class="content-padding" style="padding: 30px 40px;">
              <h2 style="color: #1a4a6e; font-size: 20px; font-weight: bold; margin: 0 0 20px 0; border-bottom: 2px solid #c9a227; padding-bottom: 10px; font-family: Georgia, Times, serif;">Real-World Scenario</h2>
              <h3 style="color: #1a4a6e; font-size: 22px; font-weight: bold; margin: 0 0 15px 0; font-family: Georgia, Times, serif;">${content.story.title}</h3>
              <p style="color: #2d3748; font-size: 15px; line-height: 1.7; margin: 0; font-family: Georgia, Times, serif;">${storyContentHtml}</p>
            </td>
          </tr>

          <!-- Key Insights Section -->
          <tr>
            <td class="content-padding" style="padding: 30px 40px;">
              <h2 style="color: #1a4a6e; font-size: 20px; font-weight: bold; margin: 0 0 20px 0; border-bottom: 2px solid #c9a227; padding-bottom: 10px; font-family: Georgia, Times, serif;">Key Insights</h2>
              ${insightsHtml}
            </td>
          </tr>

          <!-- Action Steps Section -->
          <tr>
            <td class="content-padding" style="padding: 30px 40px;">
              <h2 style="color: #1a4a6e; font-size: 20px; font-weight: bold; margin: 0 0 20px 0; border-bottom: 2px solid #c9a227; padding-bottom: 10px; font-family: Georgia, Times, serif;">Your Action Steps</h2>
              ${stepsHtml}
            </td>
          </tr>

          <!-- Humor Section -->
          <tr>
            <td style="background-color: #f5f3ef; padding: 30px 40px; text-align: center;">
              <h2 style="color: #1a4a6e; font-size: 20px; font-weight: bold; margin: 0 0 20px 0; font-family: Georgia, Times, serif;">A Moment of Levity</h2>
              <div style="background-color: #ffffff; padding: 20px; border-radius: 8px; border: 2px dashed #c9a227;">
                <p style="color: #718096; font-size: 14px; margin: 0 0 10px 0; font-family: Arial, sans-serif;">[Pug-themed retirement meme goes here]</p>
                <p style="color: #4a5568; font-size: 12px; margin: 0; font-family: Arial, sans-serif;">Inspired by The Pugville Chronicles</p>
              </div>
              <p style="color: #4a5568; font-size: 14px; font-style: italic; margin: 15px 0 0 0; font-family: Georgia, Times, serif;">${content.humorSection.caption}</p>
            </td>
          </tr>

          <!-- CTA Section -->
          <tr>
            <td style="background-color: #1a4a6e; padding: 40px; text-align: center;">
              <p style="color: #ffffff; font-size: 18px; margin: 0 0 20px 0; font-family: Georgia, Times, serif;">Ready to protect your retirement?</p>
              <!--[if mso]>
              <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${content.ctaButton.url}" style="height:50px;v-text-anchor:middle;width:320px;" arcsize="10%" strokecolor="#c9a227" fillcolor="#c9a227">
                <w:anchorlock/>
                <center style="color:#1a4a6e;font-family:Arial,sans-serif;font-size:16px;font-weight:bold;">${content.ctaButton.text}</center>
              </v:roundrect>
              <![endif]-->
              <!--[if !mso]><!-->
              <a href="${content.ctaButton.url}" style="background-color: #c9a227; color: #1a4a6e; padding: 15px 35px; font-size: 16px; font-weight: bold; text-decoration: none; border-radius: 5px; display: inline-block; font-family: Arial, sans-serif;">${content.ctaButton.text}</a>
              <!--<![endif]-->
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #2d3748; padding: 30px 40px; text-align: center;">
              <!-- Feedback -->
              <div style="margin-bottom: 20px;">
                <p style="color: #a0aec0; font-size: 14px; margin: 0 0 10px 0; font-family: Arial, sans-serif;">How was this newsletter?</p>
                <a href="{{FEEDBACK_POSITIVE_LINK}}" style="display: inline-block; background-color: transparent; border: 1px solid #4a5568; color: #a0aec0; padding: 8px 20px; margin: 0 5px; font-size: 20px; text-decoration: none; border-radius: 5px;">Yes</a>
                <a href="{{FEEDBACK_NEGATIVE_LINK}}" style="display: inline-block; background-color: transparent; border: 1px solid #4a5568; color: #a0aec0; padding: 8px 20px; margin: 0 5px; font-size: 20px; text-decoration: none; border-radius: 5px;">No</a>
              </div>

              <!-- Social Icons -->
              <div style="margin-bottom: 20px;">
                <a href="{{FACEBOOK_LINK}}" style="display: inline-block; width: 35px; height: 35px; background-color: #4a5568; border-radius: 50%; margin: 0 5px; line-height: 35px; color: #ffffff; text-decoration: none; font-family: Arial, sans-serif; font-size: 14px;">f</a>
                <a href="{{LINKEDIN_LINK}}" style="display: inline-block; width: 35px; height: 35px; background-color: #4a5568; border-radius: 50%; margin: 0 5px; line-height: 35px; color: #ffffff; text-decoration: none; font-family: Arial, sans-serif; font-size: 12px;">in</a>
                <a href="{{TWITTER_LINK}}" style="display: inline-block; width: 35px; height: 35px; background-color: #4a5568; border-radius: 50%; margin: 0 5px; line-height: 35px; color: #ffffff; text-decoration: none; font-family: Arial, sans-serif; font-size: 14px;">X</a>
              </div>

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
