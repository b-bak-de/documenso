import { Trans } from '@lingui/react/macro';

import { Img, Link, Section, Text } from '../components';

export type TemplateFooterProps = {
  isDocument?: boolean;
  reportUrl?: string;
};

export const TemplateFooter = ({ isDocument = true }: TemplateFooterProps) => {
  return (
    <>
      <Section style={styles.footer}>
        {isDocument && (
          <Text style={styles.text}>
            <Trans>This document was sent by B-BAK Berlin Berufs- &amp; Arbeitscoaching.</Trans>
          </Text>
        )}

        <table border={0} cellPadding={0} cellSpacing={0} role="presentation" style={styles.fullWidth}>
          <tbody>
            <tr>
              <td style={styles.footerColumn} width="60%">
                <div style={styles.heading}>Kontakt &amp; Anfahrt</div>
                <div style={styles.footerLine}>
                  📍{' '}
                  <Link href="https://maps.google.com/?q=Soorstr.+86,+14050+Berlin" style={styles.link}>
                    Soorstr. 86, 14050 Berlin
                  </Link>
                </div>
                <div style={styles.footerLine}>
                  📞{' '}
                  <Link href="tel:+493032593883" style={styles.link}>
                    030 32 59 38 83
                  </Link>
                </div>
                <div style={styles.footerLine}>
                  ✉️{' '}
                  <Link href="mailto:info@b-bak.de" style={styles.link}>
                    info@b-bak.de
                  </Link>
                </div>
              </td>
              <td style={styles.footerColumn} width="40%">
                <div style={styles.heading}>Online Kanäle</div>
                <div style={styles.footerLine}>
                  🌐{' '}
                  <Link href="https://b-bak.de" style={styles.link}>
                    b-bak.de
                  </Link>
                </div>
                <div style={styles.footerLine}>
                  <Img
                    alt="Instagram"
                    height="13"
                    src="https://b-bak.de/static/footer-instagram.png"
                    style={styles.instagram}
                    width="13"
                  />{' '}
                  <Link href="https://www.instagram.com/bbak.de/" style={styles.link}>
                    @bbak.de
                  </Link>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </Section>

      <Section style={styles.legalFooter}>
        <strong style={styles.legalHeading}>B-BAK Berlin Berufs- &amp; Arbeitscoaching UG (haftungsbeschränkt)</strong>
        Soorstraße 86, 14050 Berlin
        <br />
        Geschäftsführer: Rakhshandehroo, Shahin
        <br />
        Registergericht: Amtsgericht Charlottenburg | Handelsregister: HRB 284510 B<br />
        Umsatzsteuer-Identifikationsnummer (USt-IdNr.): DE461671552
        <br />
        <br />
        <span style={styles.certification}>
          <strong>Zertifizierung:</strong> B-BAK Berlin ist ein nach AZAV (Akkreditierungs- und Zulassungsverordnung
          Arbeitsförderung) staatlich anerkannter und zertifizierter Bildungsträger.
        </span>
        <div style={styles.copyright}>
          &copy; 2026 B-BAK Berlin Berufs- &amp; Arbeitscoaching UG (haftungsbeschränkt). Alle Rechte vorbehalten.
        </div>
      </Section>
    </>
  );
};

const styles = {
  footer: {
    backgroundColor: '#1b263b',
    border: '0',
    borderTop: '0',
    color: '#ffffff',
    padding: '35px 25px 25px',
  },
  fullWidth: {
    border: '0',
    borderCollapse: 'collapse',
    borderSpacing: 0,
    width: '100%',
  },
  footerColumn: {
    color: 'rgba(255,255,255,0.8)',
    fontFamily: 'Arial, sans-serif',
    fontSize: '13px',
    paddingLeft: '15px',
    verticalAlign: 'top',
  },
  footerLine: { color: 'rgba(255,255,255,0.8)', paddingBottom: '15px' },
  text: {
    color: 'rgba(255,255,255,0.8)',
    fontFamily: 'Arial, sans-serif',
    fontSize: '13px',
    lineHeight: 1.6,
  },
  heading: {
    color: 'rgba(255,255,255,0.7)',
    display: 'block',
    fontSize: '11px',
    letterSpacing: '1px',
    marginBottom: '8px',
    textTransform: 'uppercase',
  },
  link: { color: '#e09f3e', textDecoration: 'none' },
  instagram: {
    display: 'inline-block',
    marginRight: '4px',
    verticalAlign: 'middle',
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
  legalHeading: {
    color: 'rgba(255,255,255,0.7)',
    display: 'block',
    fontSize: '11px',
    paddingBottom: '4px',
  },
  certification: {
    color: 'rgba(255,255,255,0.3)',
    display: 'block',
    fontSize: '9px',
    paddingBottom: '15px',
  },
  copyright: {
    borderTop: '1px solid rgba(255,255,255,0.05)',
    color: 'rgba(255,255,255,0.3)',
    fontSize: '10px',
    marginTop: '10px',
    paddingTop: '10px',
    textAlign: 'center',
  },
} as const;

export default TemplateFooter;
