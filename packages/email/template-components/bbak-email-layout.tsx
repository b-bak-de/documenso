import type { ReactNode } from 'react';

import { Head, Html, Img, Link, Preview } from '../components';

export type BbakEmailLayoutProps = {
  children: ReactNode;
  previewText: string;
  assetBaseUrl: string;
};

/** The shared B-BAK table shell used by every transactional email. */
export const BbakEmailLayout = ({ children, previewText }: BbakEmailLayoutProps) => {
  return (
    <Html lang="de">
      <Head>
        <style>{darkModeStyles}</style>
      </Head>
      <Preview>{previewText}</Preview>
      <body className="body-bg" style={styles.body}>
        <div className="preheader" style={styles.preheader}>
          {previewText}
          {'\u200c\u200b'.repeat(20)}
        </div>
        <center className="body-bg" style={styles.center}>
          <table
            className="body-bg"
            role="presentation"
            border={0}
            cellPadding={0}
            cellSpacing={0}
            style={styles.outerTable}
          >
            <tbody>
              <tr>
                <td align="center" style={styles.outerCell}>
                  <table
                    className="content-card"
                    role="presentation"
                    border={0}
                    cellPadding={0}
                    cellSpacing={0}
                    style={styles.contentCard}
                  >
                    <tbody>
                      <tr>
                        <td align="center" style={styles.header}>
                          <Link href="https://b-bak.de" target="_blank" style={styles.logoLink}>
                            <Img
                              alt="B-BAK Logo"
                              className="email-logo"
                              height="102"
                              src="https://b-bak.de/assets/email-logo.png"
                              style={styles.logo}
                              width="92"
                            />
                          </Link>
                          <div style={styles.wordmark}>
                            B-BAK<span style={styles.wordmarkAccent}>.</span>
                          </div>
                          <div style={styles.tagline}>Berlin Berufs- &amp; Arbeitscoaching</div>
                        </td>
                      </tr>
                      <tr>
                        <td className="content-cell" style={styles.bodyCell}>
                          {children}
                        </td>
                      </tr>
                      <tr>
                        <td className="footer-block footer-cell" style={styles.footer}>
                          <table
                            align="center"
                            role="presentation"
                            border={0}
                            cellPadding={0}
                            cellSpacing={0}
                            style={styles.footerGrid}
                          >
                            <colgroup>
                              <col width="38%" />
                              <col width="24%" />
                              <col width="38%" />
                            </colgroup>
                            <tbody>
                              <tr>
                                <td
                                  align="center"
                                  className="contactCell"
                                  style={styles.contactCell}
                                  valign="top"
                                  width="38%"
                                >
                                  <table
                                    role="presentation"
                                    border={0}
                                    cellPadding={0}
                                    cellSpacing={0}
                                    style={styles.contactDetails}
                                    width="100%"
                                  >
                                    <tbody>
                                      <tr>
                                        <td
                                          align="center"
                                          className="footerIconCell"
                                          colSpan={2}
                                          style={styles.footerIconCell}
                                        >
                                          <Link
                                            href="https://maps.google.com/?q=Soorstr.+86,+14050+Berlin"
                                            target="_blank"
                                            style={styles.iconLink}
                                          >
                                            <Img
                                              alt="Adresse"
                                              height="48"
                                              src="https://b-bak.de/static/footer-location.png"
                                              className="footerIcon"
                                              style={styles.footerIcon}
                                              width="48"
                                            />
                                          </Link>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td
                                          align="center"
                                          className="contactText"
                                          colSpan={2}
                                          style={styles.contactText}
                                        >
                                          <span style={styles.contactCopy}>
                                            <Link
                                              href="https://maps.google.com/?q=Soorstr.+86,+14050+Berlin"
                                              target="_blank"
                                              style={styles.contactLink}
                                            >
                                              Soorstraße&nbsp;86
                                              <br />
                                              14050 Berlin
                                            </Link>
                                          </span>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                                <td
                                  align="center"
                                  className="footerSeparatorCell"
                                  style={styles.footerSeparatorCell}
                                  valign="middle"
                                  width="24%"
                                >
                                  <table
                                    role="presentation"
                                    border={0}
                                    cellPadding={0}
                                    cellSpacing={0}
                                    style={styles.footerSeparatorTable}
                                  >
                                    <tbody>
                                      <tr>
                                        <td height="48" style={styles.footerSeparator} width="1">
                                          &nbsp;
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                                <td
                                  align="center"
                                  className="contactCell"
                                  style={styles.contactCell}
                                  valign="top"
                                  width="38%"
                                >
                                  <table
                                    role="presentation"
                                    border={0}
                                    cellPadding={0}
                                    cellSpacing={0}
                                    style={styles.contactDetails}
                                    width="100%"
                                  >
                                    <tbody>
                                      <tr>
                                        <td
                                          align="center"
                                          className="footerIconCell"
                                          colSpan={2}
                                          style={styles.footerIconCell}
                                        >
                                          <Link href="tel:03032593883" style={styles.iconLink}>
                                            <Img
                                              alt="Telefon"
                                              height="48"
                                              src="https://b-bak.de/static/footer-phone.png"
                                              className="footerIcon"
                                              style={styles.footerIcon}
                                              width="48"
                                            />
                                          </Link>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td
                                          align="center"
                                          className="contactText"
                                          colSpan={2}
                                          style={styles.contactText}
                                        >
                                          <span style={styles.contactCopy}>
                                            <Link href="tel:03032593883" style={styles.contactLink}>
                                              030&nbsp;325&nbsp;938&nbsp;83
                                            </Link>
                                            <span style={styles.hours}>Mo–Fr&nbsp;09:30‑16:30</span>
                                          </span>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                              <tr>
                                <td colSpan={3} height="1" style={styles.footerDivider}>
                                  &nbsp;
                                </td>
                              </tr>
                              <tr>
                                <td align="center" style={styles.socialCell} width="33.33%">
                                  <Link href="https://b-bak.de" target="_blank" style={styles.socialLink}>
                                    <Img
                                      alt="Website"
                                      className="socialIcon"
                                      height="54"
                                      src="https://b-bak.de/static/footer-website.png"
                                      style={styles.socialIcon}
                                      width="54"
                                    />
                                  </Link>
                                </td>
                                <td align="center" style={styles.socialCell} width="33.33%">
                                  <Link
                                    href="https://www.instagram.com/bbak.de/"
                                    target="_blank"
                                    style={styles.socialLink}
                                  >
                                    <Img
                                      alt="Instagram"
                                      className="socialIcon"
                                      height="54"
                                      src="https://b-bak.de/static/footer-instagram.png"
                                      style={styles.socialIcon}
                                      width="54"
                                    />
                                  </Link>
                                </td>
                                <td align="center" style={styles.socialCell} width="33.33%">
                                  <Link href="https://t.me/b_bak_de" target="_blank" style={styles.socialLink}>
                                    <Img
                                      alt="Telegram"
                                      className="socialIcon"
                                      height="54"
                                      src="https://b-bak.de/static/footer-telegram.png"
                                      style={styles.socialIcon}
                                      width="54"
                                    />
                                  </Link>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          <div style={styles.followText}>
                            Folgen Sie uns für praktische Tipps und aktuelle Informationen
                            <br />
                            zu Beruf und Karriere in Deutschland.
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className="legal-footer" style={styles.legalFooter}>
                          <strong style={styles.legalHeading}>
                            B-BAK Berlin Berufs- &amp; Arbeitscoaching UG (haftungsbeschränkt)
                          </strong>
                          Soorstraße 86, 14050 Berlin
                          <br />
                          Geschäftsführer: Rakhshandehroo, Shahin
                          <br />
                          Registergericht: Amtsgericht Charlottenburg | Handelsregister: HRB 284510 B<br />
                          Umsatzsteuer-Identifikationsnummer (USt-IdNr.): DE461671552
                          <div style={styles.copyright}>
                            © 2026 B-BAK Berlin Berufs- &amp; Arbeitscoaching UG (haftungsbeschränkt). Alle Rechte
                            vorbehalten.
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </center>
      </body>
    </Html>
  );
};

const styles = {
  body: {
    backgroundColor: 'transparent',
    color: '#1b263b',
    fontFamily: 'Arial, sans-serif',
    height: '100%',
    margin: 0,
    padding: 0,
    width: '100%',
  },
  preheader: { display: 'none', fontSize: 0, lineHeight: 0, maxHeight: 0, maxWidth: 0, overflow: 'hidden' },
  center: { backgroundColor: 'transparent', padding: '40px 0', width: '100%' },
  outerTable: { backgroundColor: 'transparent', borderCollapse: 'collapse', width: '100%' },
  outerCell: { padding: 0 },
  contentCard: {
    backgroundColor: '#fff',
    border: 0,
    borderCollapse: 'collapse',
    borderRadius: '12px',
    borderSpacing: 0,
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
    maxWidth: '600px',
    overflow: 'hidden',
    width: '100%',
  },
  header: { backgroundColor: '#1b263b', borderBottom: '4px solid #e09f3e', padding: '30px 20px' },
  logoLink: {
    backgroundColor: '#1b263b',
    colorScheme: 'light',
    display: 'inline-block',
    forcedColorAdjust: 'none',
    textDecoration: 'none',
  },
  logo: {
    backgroundColor: '#1b263b',
    colorScheme: 'light',
    display: 'block',
    filter: 'none',
    forcedColorAdjust: 'none',
    height: '102px',
    margin: '0 auto 10px',
    width: '92px',
  },
  wordmark: {
    color: '#fff',
    fontFamily: 'Arial, sans-serif',
    fontSize: '28px',
    fontWeight: 900,
    letterSpacing: '-1px',
  },
  wordmarkAccent: { color: '#e09f3e' },
  tagline: {
    color: '#859bae',
    fontFamily: 'Arial, sans-serif',
    fontSize: '11px',
    fontWeight: 'bold',
    letterSpacing: '2px',
    paddingTop: '5px',
    textTransform: 'uppercase',
  },
  bodyCell: { padding: '40px 30px' },
  contactCell: { verticalAlign: 'top' },
  contactDetails: { margin: '0 auto', tableLayout: 'fixed', verticalAlign: 'top', width: '100%' },
  footerIconCell: { paddingBottom: '10px' },
  footerIcon: { display: 'block', height: '48px', width: '48px' },
  contactText: {
    color: '#f4f5f7',
    fontFamily: 'Arial, sans-serif',
    fontSize: '15px',
    lineHeight: '22px',
    textAlign: 'justify',
  },
  contactCopy: { display: 'inline-block', textAlign: 'justify', textAlignLast: 'justify', width: '100%' },
  contactLink: {
    color: '#f4f5f7',
    display: 'block',
    textAlign: 'justify',
    textAlignLast: 'justify',
    textDecoration: 'none',
    whiteSpace: 'nowrap',
  },
  hours: {
    display: 'block',
    fontSize: '11px',
    lineHeight: '20px',
    textAlign: 'justify',
    textAlignLast: 'justify',
    whiteSpace: 'nowrap',
  },
  iconLink: { display: 'block', textDecoration: 'none' },
  footerSeparatorCell: { padding: 0 },
  footerSeparatorTable: { width: '1px' },
  footerSeparator: { backgroundColor: '#617087', fontSize: 0, height: '48px', lineHeight: 0, padding: 0, width: '1px' },
  footer: { backgroundColor: '#1b263b', padding: '38px 55px 32px' },
  footerGrid: {
    backgroundColor: '#1b263b',
    fontFamily: 'Arial, sans-serif',
    margin: '0 auto',
    maxWidth: '300px',
    tableLayout: 'fixed',
    width: '300px',
  },
  footerDivider: {
    backgroundColor: '#1b263b',
    borderBottom: '1px solid #53637b',
    fontSize: 0,
    height: '1px',
    lineHeight: 0,
    padding: '26px 0 0',
  },
  socialCell: { paddingTop: '27px' },
  socialLink: { textDecoration: 'none' },
  socialIcon: { display: 'block', height: '54px', margin: '0 auto', width: '54px' },
  followText: {
    color: '#aab4c3',
    fontFamily: 'Arial, sans-serif',
    fontSize: '13px',
    lineHeight: '20px',
    paddingTop: '18px',
    textAlign: 'center',
  },
  legalFooter: {
    backgroundColor: '#151d2c',
    borderTop: '1px solid rgba(255,255,255,0.05)',
    color: 'rgba(255,255,255,0.45)',
    fontFamily: 'Arial, sans-serif',
    fontSize: '10px',
    lineHeight: 1.6,
    padding: '25px 30px',
  },
  legalHeading: { color: 'rgba(255,255,255,0.7)', display: 'block', fontSize: '11px', paddingBottom: '4px' },
  copyright: {
    borderTop: '1px solid rgba(255,255,255,0.05)',
    color: 'rgba(255,255,255,0.3)',
    fontSize: '10px',
    marginTop: '10px',
    paddingTop: '10px',
    textAlign: 'center',
  },
} as const;

const darkModeStyles = `
  body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
  table, td { border-collapse: collapse !important; border-spacing: 0 !important; mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
  img { -ms-interpolation-mode: bicubic; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
  .preheader { mso-hide: all; }
   .footer-block { border: 0 !important; }
   .email-logo { color-scheme: light only !important; filter: none !important; forced-color-adjust: none !important; }
  :root { color-scheme: light dark; supported-color-schemes: light dark; }
  @media (prefers-color-scheme: dark) {
     body, .body-bg { background-color: transparent !important; color: #e0e1dd !important; }
    .content-card { background-color: #1e1e1e !important; box-shadow: 0 4px 12px rgba(0,0,0,0.5) !important; }
    .text-main, .content-cell .text-foreground, .content-cell [style*="1b263b"], .content-cell [style*="1B263B"], .content-cell [style*="rgb(27,38,59)"], .content-cell [style*="rgb(27, 38, 59)"] { color: #e0e1dd !important; }
    .text-muted, .content-cell .text-muted-foreground, .content-cell [style*="415a77"], .content-cell [style*="415A77"], .content-cell [style*="rgb(65,90,119)"], .content-cell [style*="rgb(65, 90, 119)"] { color: #c2cad6 !important; }
    .content-cell .text-primary { color: #e09f3e !important; }
    .content-cell .bg-primary, .content-cell a[style*="e09f3e"], .content-cell a[style*="E09F3E"] { background-color: #e09f3e !important; color: #1b263b !important; }
    .content-cell .bg-muted, .content-cell [style*="f1f4f7"], .content-cell [style*="F1F4F7"], .content-cell [style*="rgb(241,244,247)"], .content-cell [style*="rgb(241, 244, 247)"] { background-color: #252a34 !important; }
    .content-cell .border-border { border-color: #3a4b64 !important; }
  }
  [data-ogsc] body, [data-ogsc] .body-bg { background-color: transparent !important; color: #e0e1dd !important; }
  [data-ogsc] .content-card { background-color: #1e1e1e !important; box-shadow: 0 4px 12px rgba(0,0,0,0.5) !important; }
  [data-ogsc] .text-main, [data-ogsc] .content-cell .text-foreground, [data-ogsc] .content-cell [style*="1b263b"], [data-ogsc] .content-cell [style*="1B263B"], [data-ogsc] .content-cell [style*="rgb(27,38,59)"], [data-ogsc] .content-cell [style*="rgb(27, 38, 59)"] { color: #e0e1dd !important; }
  [data-ogsc] .text-muted, [data-ogsc] .content-cell .text-muted-foreground, [data-ogsc] .content-cell [style*="415a77"], [data-ogsc] .content-cell [style*="415A77"], [data-ogsc] .content-cell [style*="rgb(65,90,119)"], [data-ogsc] .content-cell [style*="rgb(65, 90, 119)"] { color: #c2cad6 !important; }
  [data-ogsc] .content-cell .text-primary { color: #e09f3e !important; }
  [data-ogsc] .content-cell .bg-primary, [data-ogsc] .content-cell a[style*="e09f3e"], [data-ogsc] .content-cell a[style*="E09F3E"] { background-color: #e09f3e !important; color: #1b263b !important; }
  [data-ogsc] .content-cell .bg-muted, [data-ogsc] .content-cell [style*="f1f4f7"], [data-ogsc] .content-cell [style*="F1F4F7"], [data-ogsc] .content-cell [style*="rgb(241,244,247)"], [data-ogsc] .content-cell [style*="rgb(241, 244, 247)"] { background-color: #252a34 !important; }
  [data-ogsc] .content-cell .border-border { border-color: #3a4b64 !important; }
   @media only screen and (max-width: 320px) { .footerGrid { max-width: 100% !important; width: 100% !important; } }
   @media only screen and (max-width: 620px) { .content-card { width: 100% !important; } .content-cell { padding: 30px 20px !important; } .footer-cell { padding: 28px 20px !important; } .contactText { font-size: 12px !important; line-height: 17px !important; } }
   @media only screen and (max-width: 480px) { .contactText { font-size: 11px !important; line-height: 15px !important; } .footerIcon, .footerIconCell img { height: 40px !important; width: 40px !important; } .socialIcon { height: 46px !important; width: 46px !important; } .footerSeparator { height: 40px !important; } }
`;

export default BbakEmailLayout;
