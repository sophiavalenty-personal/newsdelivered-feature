import React from 'react';

interface NewsletterTemplateProps {
  logoUrl?: string;
  content: NewsletterContent;
  onContentChange?: (content: NewsletterContent) => void;
  editable?: boolean;
}

export interface NewsletterContent {
  firmName: string;
  preparedFor: string;
  contactEmail: string;
  contactPhone: string;
  websiteUrl: string;
  headlines: { title: string; description: string }[];
  story: {
    title: string;
    content: string;
  };
  keyInsights: string[];
  actionSteps: string[];
  humorSection: {
    imageUrl: string;
    caption: string;
    altText: string;
  };
  ctaButton: {
    text: string;
    url: string;
  };
  footer: {
    disclaimer: string;
    unsubscribeUrl: string;
  };
}

export const defaultContent: NewsletterContent = {
  firmName: "Kevin Thompson, CPAs and Advisors",
  preparedFor: "Kevin Thompson, CPAs and Advisors",
  contactEmail: "kthompson@harikthompsoncpas.com",
  contactPhone: "(310) 378-9911",
  websiteUrl: "https://www.harikthompsoncpas.com/",
  headlines: [
    {
      title: "Trump Tax Accounts Update",
      description: "New guidance on retirement savings vehicles may impact your 2026 tax planning strategy."
    },
    {
      title: "RMD Rules for Inherited IRAs",
      description: "SECURE Act 2.0 brings major changes to required minimum distributions for beneficiaries."
    },
    {
      title: "Wildfire Personal Casualty Loss",
      description: "Important tax relief provisions available for those affected by recent California wildfires."
    }
  ],
  story: {
    title: "The $47,000 Mistake Sarah Almost Made",
    content: `Sarah inherited her father's IRA in 2022. At 45, she thought she had decades before worrying about withdrawals. Wrong.

Under the new SECURE Act rules, most non-spouse beneficiaries must now empty inherited IRAs within 10 years. But here's what caught Sarah off guard: she also needs to take annual RMDs during those 10 years.

Sarah came to us in January, panicked. She'd missed her 2024 RMD entirely—a 25% penalty on the amount she should have withdrawn.

We acted fast. Using the IRS's new reasonable error waiver, we helped Sarah request penalty relief. We then created a 10-year withdrawal strategy that minimizes her tax burden while meeting all requirements.

The result? Sarah avoided the penalty and now has a clear roadmap. She's withdrawing in her lower-income years before retirement, saving an estimated $47,000 in taxes over the decade.

Don't let inherited IRA rules catch you off guard. The 10-year clock is ticking.`
  },
  keyInsights: [
    "Non-spouse beneficiaries must empty inherited IRAs within 10 years under SECURE Act rules—AND take annual RMDs during that period.",
    "Missing an RMD triggers a 25% penalty, but the IRS may waive it for reasonable errors if you act quickly.",
    "Strategic withdrawal timing can save tens of thousands in taxes—consider pulling more in lower-income years."
  ],
  actionSteps: [
    "Review any inherited IRAs you hold and confirm your 10-year deadline date. Mark your calendar for the final distribution year.",
    "Calculate your required annual RMD using IRS life expectancy tables. Ensure this year's withdrawal is scheduled before December 31st.",
    "Schedule a tax planning session to create a 10-year withdrawal strategy optimized for your income situation and tax brackets."
  ],
  humorSection: {
    imageUrl: "{{HUMOR_IMAGE_URL}}",
    caption: "When your financial advisor explains RMDs but you're still thinking about retirement beach walks with your pug",
    altText: "Retirement humor illustration"
  },
  ctaButton: {
    text: "Book Your Tax Savings Strategy Session →",
    url: "{{CTA_LINK}}"
  },
  footer: {
    disclaimer: "This newsletter is for informational purposes only and does not constitute tax, legal, or financial advice. Please consult with a qualified professional regarding your specific situation.",
    unsubscribeUrl: "{{UNSUBSCRIBE_LINK}}"
  }
};

// Email-safe inline styles
const styles = {
  wrapper: {
    backgroundColor: '#f5f3ef',
    padding: '20px',
    fontFamily: 'Georgia, Times, serif'
  },
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    backgroundColor: '#ffffff'
  },
  header: {
    backgroundColor: '#1a4a6e',
    padding: '30px 40px',
    textAlign: 'center' as const
  },
  headerText: {
    color: '#ffffff',
    margin: '0',
    fontSize: '14px',
    fontFamily: 'Arial, sans-serif',
    textTransform: 'uppercase' as const,
    letterSpacing: '2px'
  },
  firmName: {
    color: '#ffffff',
    margin: '10px 0 0 0',
    fontSize: '24px',
    fontWeight: 'bold' as const
  },
  contactBar: {
    backgroundColor: '#86C733',
    padding: '12px 40px',
    textAlign: 'center' as const
  },
  contactText: {
    color: '#1a4a6e',
    margin: '0',
    fontSize: '13px',
    fontFamily: 'Arial, sans-serif'
  },
  contactLink: {
    color: '#1a4a6e',
    textDecoration: 'none'
  },
  section: {
    padding: '30px 40px'
  },
  sectionTitle: {
    color: '#1a4a6e',
    fontSize: '20px',
    fontWeight: 'bold' as const,
    marginBottom: '20px',
    borderBottom: '2px solid #86C733',
    paddingBottom: '10px'
  },
  headline: {
    marginBottom: '15px'
  },
  headlineTitle: {
    color: '#1a4a6e',
    fontSize: '16px',
    fontWeight: 'bold' as const,
    margin: '0 0 5px 0'
  },
  headlineDesc: {
    color: '#4a5568',
    fontSize: '14px',
    margin: '0',
    lineHeight: '1.5'
  },
  storyTitle: {
    color: '#1a4a6e',
    fontSize: '22px',
    fontWeight: 'bold' as const,
    marginBottom: '15px'
  },
  storyContent: {
    color: '#2d3748',
    fontSize: '15px',
    lineHeight: '1.7',
    whiteSpace: 'pre-line' as const
  },
  insightBox: {
    backgroundColor: '#f5f3ef',
    padding: '20px 25px',
    marginBottom: '10px',
    borderLeft: '4px solid #86C733'
  },
  insightText: {
    color: '#2d3748',
    fontSize: '14px',
    margin: '0',
    lineHeight: '1.6'
  },
  actionStep: {
    display: 'flex',
    marginBottom: '15px'
  },
  stepNumber: {
    backgroundColor: '#1a4a6e',
    color: '#ffffff',
    width: '28px',
    height: '28px',
    borderRadius: '50%',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '14px',
    fontWeight: 'bold' as const,
    marginRight: '15px',
    flexShrink: 0
  },
  stepText: {
    color: '#2d3748',
    fontSize: '14px',
    lineHeight: '1.6',
    margin: '0'
  },
  humorSection: {
    backgroundColor: '#f5f3ef',
    padding: '30px 40px',
    textAlign: 'center' as const
  },
  humorImage: {
    maxWidth: '100%',
    height: 'auto',
    marginBottom: '15px'
  },
  humorCaption: {
    color: '#4a5568',
    fontSize: '14px',
    fontStyle: 'italic' as const,
    margin: '0'
  },
  ctaSection: {
    padding: '40px',
    textAlign: 'center' as const,
    backgroundColor: '#1a4a6e'
  },
  ctaButton: {
    backgroundColor: '#86C733',
    color: '#1a4a6e',
    padding: '15px 35px',
    fontSize: '16px',
    fontWeight: 'bold' as const,
    textDecoration: 'none',
    borderRadius: '5px',
    display: 'inline-block',
    fontFamily: 'Arial, sans-serif'
  },
  footer: {
    backgroundColor: '#2d3748',
    padding: '30px 40px',
    textAlign: 'center' as const
  },
  feedbackSection: {
    marginBottom: '20px'
  },
  feedbackText: {
    color: '#a0aec0',
    fontSize: '14px',
    margin: '0 0 10px 0'
  },
  feedbackButtons: {
    display: 'inline-block'
  },
  feedbackButton: {
    backgroundColor: 'transparent',
    border: '1px solid #4a5568',
    color: '#a0aec0',
    padding: '8px 20px',
    margin: '0 5px',
    fontSize: '20px',
    cursor: 'pointer',
    borderRadius: '5px',
    textDecoration: 'none'
  },
  socialIcons: {
    marginBottom: '20px'
  },
  socialIcon: {
    display: 'inline-block',
    width: '35px',
    height: '35px',
    backgroundColor: '#4a5568',
    borderRadius: '50%',
    margin: '0 5px',
    lineHeight: '35px',
    color: '#ffffff',
    textDecoration: 'none'
  },
  disclaimer: {
    color: '#718096',
    fontSize: '11px',
    lineHeight: '1.5',
    margin: '0 0 15px 0'
  },
  unsubscribe: {
    color: '#a0aec0',
    fontSize: '12px'
  },
  unsubscribeLink: {
    color: '#a0aec0'
  }
};

const EditableText: React.FC<{
  value: string;
  onChange?: (value: string) => void;
  editable?: boolean;
  style?: React.CSSProperties;
  as?: keyof JSX.IntrinsicElements;
  multiline?: boolean;
}> = ({ value, onChange, editable, style, as: Component = 'span', multiline }) => {
  if (!editable) {
    if (Component === 'p' || Component === 'div') {
      return <Component style={style}>{value}</Component>;
    }
    return <Component style={style}>{value}</Component>;
  }

  if (multiline) {
    return (
      <textarea
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        style={{
          ...style,
          width: '100%',
          minHeight: '150px',
          border: '1px dashed #86C733',
          background: 'rgba(134, 199, 51, 0.05)',
          resize: 'vertical'
        }}
      />
    );
  }

  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      style={{
        ...style,
        width: '100%',
        border: '1px dashed #86C733',
        background: 'rgba(134, 199, 51, 0.05)'
      }}
    />
  );
};

export const NewsletterTemplate: React.FC<NewsletterTemplateProps> = ({
  logoUrl,
  content,
  onContentChange,
  editable = false
}) => {
  const updateContent = (updates: Partial<NewsletterContent>) => {
    if (onContentChange) {
      onContentChange({ ...content, ...updates });
    }
  };

  const updateHeadline = (index: number, field: 'title' | 'description', value: string) => {
    const newHeadlines = [...content.headlines];
    newHeadlines[index] = { ...newHeadlines[index], [field]: value };
    updateContent({ headlines: newHeadlines });
  };

  const updateInsight = (index: number, value: string) => {
    const newInsights = [...content.keyInsights];
    newInsights[index] = value;
    updateContent({ keyInsights: newInsights });
  };

  const updateActionStep = (index: number, value: string) => {
    const newSteps = [...content.actionSteps];
    newSteps[index] = value;
    updateContent({ actionSteps: newSteps });
  };

  return (
    <div style={styles.wrapper}>
      <table cellPadding="0" cellSpacing="0" style={styles.container} role="presentation">
        <tbody>
          {/* Header */}
          <tr>
            <td style={styles.header}>
              <img src={logoUrl || "/images/ht-logo-stacked-sm.jpg"} alt={content.firmName} style={{ maxWidth: '250px', display: 'block', marginLeft: 'auto', marginRight: 'auto' }} />
            </td>
          </tr>

          {/* Contact Bar */}
          <tr>
            <td style={styles.contactBar}>
              <p style={styles.contactText}>
                <a href={`mailto:${content.contactEmail}`} style={styles.contactLink}>{content.contactEmail}</a>
                {' | '}
                <a href={`tel:${content.contactPhone.replace(/[^0-9]/g, '')}`} style={styles.contactLink}>{content.contactPhone}</a>
                {' | '}
                <a href={content.websiteUrl} style={styles.contactLink}>Visit Website</a>
              </p>
            </td>
          </tr>

          {/* Headlines Section */}
          <tr>
            <td style={styles.section}>
              <h2 style={styles.sectionTitle}>Featured</h2>
              {content.headlines.map((headline, index) => (
                <div key={index} style={styles.headline}>
                  <EditableText
                    value={headline.title}
                    onChange={(v) => updateHeadline(index, 'title', v)}
                    editable={editable}
                    style={styles.headlineTitle}
                    as="h3"
                  />
                  <EditableText
                    value={headline.description}
                    onChange={(v) => updateHeadline(index, 'description', v)}
                    editable={editable}
                    style={styles.headlineDesc}
                    as="p"
                  />
                </div>
              ))}
            </td>
          </tr>

          {/* Divider */}
          <tr>
            <td style={{ padding: '0 40px' }}>
              <hr style={{ border: 'none', borderTop: '1px solid #d4e8c0', margin: '0' }} />
            </td>
          </tr>

          {/* Story Section */}
          <tr>
            <td style={styles.section}>
              <h2 style={styles.sectionTitle}>Real-World Scenario</h2>
              <EditableText
                value={content.story.title}
                onChange={(v) => updateContent({ story: { ...content.story, title: v } })}
                editable={editable}
                style={styles.storyTitle}
                as="h3"
              />
              <EditableText
                value={content.story.content}
                onChange={(v) => updateContent({ story: { ...content.story, content: v } })}
                editable={editable}
                style={styles.storyContent}
                as="div"
                multiline
              />
            </td>
          </tr>

          {/* Key Insights Section */}
          <tr>
            <td style={styles.section}>
              <h2 style={styles.sectionTitle}>Key Insights</h2>
              {content.keyInsights.map((insight, index) => (
                <div key={index} style={styles.insightBox}>
                  <EditableText
                    value={insight}
                    onChange={(v) => updateInsight(index, v)}
                    editable={editable}
                    style={styles.insightText}
                    as="p"
                  />
                </div>
              ))}
            </td>
          </tr>

          {/* Action Steps Section */}
          <tr>
            <td style={styles.section}>
              <h2 style={styles.sectionTitle}>Your Action Steps</h2>
              {content.actionSteps.map((step, index) => (
                <table key={index} cellPadding="0" cellSpacing="0" style={{ marginBottom: '15px', width: '100%' }} role="presentation">
                  <tbody>
                    <tr>
                      <td style={{ width: '43px', verticalAlign: 'top' }}>
                        <div style={styles.stepNumber}>{index + 1}</div>
                      </td>
                      <td style={{ verticalAlign: 'top' }}>
                        <EditableText
                          value={step}
                          onChange={(v) => updateActionStep(index, v)}
                          editable={editable}
                          style={styles.stepText}
                          as="p"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              ))}
            </td>
          </tr>

          {/* Humor Section */}
          <tr>
            <td style={styles.humorSection}>
              <h2 style={{ ...styles.sectionTitle, textAlign: 'center', borderBottom: 'none' }}>A Moment of Levity</h2>
              <div style={{ 
                backgroundColor: '#ffffff', 
                padding: '20px', 
                borderRadius: '8px',
                border: '2px dashed #86C733',
                textAlign: 'center' as const
              }}>
                <img 
                  src="/images/pug-taxes.jpg" 
                  alt="Pug tax meme - When you do your taxes alone vs when HarikThompson takes care of it"
                  style={{ maxWidth: '100%', height: 'auto', borderRadius: '6px' }}
                />
                <p style={{ color: '#4a5568', fontSize: '12px', margin: '10px 0 0 0' }}>
                  Inspired by The Pugville Chronicles
                </p>
              </div>
              <EditableText
                value={content.humorSection.caption}
                onChange={(v) => updateContent({ humorSection: { ...content.humorSection, caption: v } })}
                editable={editable}
                style={{ ...styles.humorCaption, marginTop: '15px', display: 'block' }}
                as="p"
              />
            </td>
          </tr>

          {/* CTA Section */}
          <tr>
            <td style={styles.ctaSection}>
              <p style={{ color: '#ffffff', fontSize: '18px', margin: '0 0 20px 0' }}>
                Ready to protect your retirement?
              </p>
              <a href={content.ctaButton.url} style={styles.ctaButton}>
                {content.ctaButton.text}
              </a>
            </td>
          </tr>

          {/* Footer */}
          <tr>
            <td style={styles.footer}>
              {/* Feedback */}
              <div style={styles.feedbackSection}>
                <p style={styles.feedbackText}>Was this info helpful?</p>
                <div style={styles.feedbackButtons}>
                  <a href="{{FEEDBACK_POSITIVE_LINK}}" style={styles.feedbackButton}>Yes</a>
                  <a href="{{FEEDBACK_NEGATIVE_LINK}}" style={styles.feedbackButton}>No</a>
                </div>
              </div>

              {/* Social Icons Placeholder */}
              <div style={styles.socialIcons}>
                <a href="{{FACEBOOK_LINK}}" style={styles.socialIcon}>f</a>
                <a href="{{LINKEDIN_LINK}}" style={styles.socialIcon}>in</a>
                <a href="{{TWITTER_LINK}}" style={styles.socialIcon}>X</a>
              </div>

              {/* Disclaimer */}
              <p style={styles.disclaimer}>{content.footer.disclaimer}</p>

              {/* Unsubscribe */}
              <p style={styles.unsubscribe}>
                <a href={content.footer.unsubscribeUrl} style={styles.unsubscribeLink}>Unsubscribe</a>
                {' | '}
                <a href="{{PREFERENCES_LINK}}" style={styles.unsubscribeLink}>Update Preferences</a>
              </p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default NewsletterTemplate;
