import { Img, Section, Text } from '../components';

export type TemplateBrandingLogoProps = {
  assetBaseUrl: string;
  className?: string;
};

/**
 * Renders the shared B-BAK email header for every transactional email.
 */
export const TemplateBrandingLogo = ({
  assetBaseUrl: _assetBaseUrl,
  className: _className = 'mb-4 h-6',
}: TemplateBrandingLogoProps) => {
  return (
    <Section style={styles.header}>
      <Img alt="B-BAK Logo" height="54" src="https://b-bak.de/b_bak_w.png" style={styles.logo} width="49" />
      <Text style={styles.wordmark}>
        B-BAK<span style={styles.accent}>.</span>
      </Text>
      <Text style={styles.tagline}>Berlin Berufs- &amp; Arbeitscoaching</Text>
    </Section>
  );
};

const styles = {
  header: {
    backgroundColor: '#1b263b',
    borderBottom: '4px solid #e09f3e',
    padding: '30px 20px',
    textAlign: 'center',
  },
  logo: {
    display: 'block',
    height: '54px',
    margin: '0 auto 10px',
    width: '49px',
  },
  wordmark: {
    color: '#ffffff',
    fontFamily: 'Arial, sans-serif',
    fontSize: '28px',
    fontWeight: 900,
    letterSpacing: '-1px',
    margin: 0,
  },
  accent: { color: '#e09f3e' },
  tagline: {
    color: '#859bae',
    fontFamily: 'Arial, sans-serif',
    fontSize: '11px',
    fontWeight: 'bold',
    letterSpacing: '2px',
    margin: '5px 0 0',
    textTransform: 'uppercase',
  },
} as const;

export default TemplateBrandingLogo;
