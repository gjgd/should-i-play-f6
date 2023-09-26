/* eslint-disable no-undef */
import { StaticSite } from 'sst/constructs';
import { Certificate } from 'aws-cdk-lib/aws-certificatemanager';

const Website = ({ stack }) => {
  const site = new StaticSite(stack, 'Site', {
    path: '.',
    buildOutput: 'build',
    buildCommand: "npm run build",
    customDomain: {
      domainName: 'should-i-play-f6.gjgd.xyz',
      hostedZone: 'gjgd.xyz',
      cdk: {
        certificate: Certificate.fromCertificateArn(
          stack,
          'gjgdXyzCert',
          process.env.CERTIFICATE_ARN,
        ),
      },
    },
  });

  stack.addOutputs({
    AppUrl: site.url,
    Url: site.customDomainUrl || site.url,
  });
};

export default {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  config(_input) {
    return {
      name: 'should-i-play-f6',
      region: 'us-east-1',
      profile: 'sst',
    };
  },
  stacks(app) {
    app.stack(Website);
  },
};
