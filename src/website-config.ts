export interface WebsiteConfig {
  title: string;
  description: string;
  logo: string;
  /**
   * Specifying a valid BCP 47 language helps screen readers announce text properly.
   * See: https://dequeuniversity.com/rules/axe/2.2/valid-lang
   */
  lang: string;
  /**
   * blog full path, no ending slash!
   */
  siteUrl: string;
  /**
   * full url, no username
   */
  facebook?: string;
  /**
   * full url, no username
   */
  twitter?: string;
  github?: string;
  /**
   * Meta tag for Google Webmaster Tools
   */
  googleSiteVerification?: string;
  /**
   * Appears alongside the footer, after the credits
   */
  footer?: string;
  organization?: string;
  orgDescription?: string;
  orgImage?: string;
}

const config: WebsiteConfig = {
  title: 'つくってみよう会',
  description: 'いろいろと作っていきま～す',
  logo: 'img/logo.fin.png',
  lang: 'ja',
  siteUrl: 'https://fujiya228.com',
  facebook: 'https://www.facebook.com/Fujiya0xE2',
  twitter: 'https://twitter.com/Fujiya0xE2',
  github: 'https://github.com/fujiya228',
  googleSiteVerification: 'GoogleCode',
  footer: 'is based on Gatsby',
  organization: 'Fujiya',
  orgDescription: 'novice web engineer',
  orgImage: 'img/organization.png',
};

export default config;
