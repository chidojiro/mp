import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import axios, { AxiosError } from 'axios';
import { ACCESS_TOKEN_KEY } from '@/env/constants';
import { MarketingActionApis } from '@/marketing-action/apis';
import { ReportApis } from '@/report/apis';
import { ProfileApis } from '@/auth/apis';

const withPropsMap = {
  profile: ProfileApis.get,
  rfmReport: ReportApis.rfm_report,
  actions: MarketingActionApis.list,
};

const withProps =
  (...propNames: (keyof typeof withPropsMap)[]) =>
  (
    wrappedGetServerSideProps: (context: GetServerSidePropsContext, props: any) => any
  ): GetServerSideProps => {
    return async (context: GetServerSidePropsContext) => {
      const { cookie } = context.req.headers;

      const parsedCookies = Object.fromEntries(
        (cookie as string).split(/; */).map(c => {
          const [key, ...v] = c.split('=');
          return [key, decodeURIComponent(v.join('='))];
        })
      );
      // currently all endpoints requires authentication, so we redirect to login page if there is no access token
      if (!parsedCookies[ACCESS_TOKEN_KEY]) {
        return { redirect: { destination: '/login' } };
      }
      try {
        const propsMetaCollection = await Promise.all(
          propNames.map(async name => {
            try {
              const value = await withPropsMap[name]({
                headers: {
                  ...parsedCookies,
                  Authorization: `Bearer ${parsedCookies[ACCESS_TOKEN_KEY]}`,
                },
              });

              return {
                name,
                value,
              };
            } catch (e) {
              console.error('error:', JSON.stringify(e));
              if (axios.isAxiosError(e)) {
                if ((e as AxiosError).response?.status === 404) {
                  return {
                    name,
                    value: null,
                  };
                }
              }
              throw e;
            }
          })
        );

        const props = propsMetaCollection
          .filter(data => data?.value !== undefined && data?.value !== null)
          .reduce((acc, cur: any) => ({ ...acc, [cur.name]: cur.value }), {});

        return wrappedGetServerSideProps(context, { props });
      } catch (e: any) {
        console.error('Error from api:', JSON.stringify(e));
        if ([401, 403].includes(e?.response?.status)) {
          return { redirect: { destination: '/login' } };
        } else throw e;
      }
    };
  };

export const SsrUtils = {
  withProps,
};
