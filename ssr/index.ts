import { GetServerSideProps, GetServerSidePropsContext } from 'next';

import { ProfileApis, ReportApi, MarketingActionAPI } from '@/apis';
import { ACCESS_TOKEN_KEY } from '@/constants';

const withPropsMap = {
  profile: ProfileApis.get,
  rfmReport: ReportApi.rfm_report,
  actions: MarketingActionAPI.list,
};

const withProps =
  (...propNames: (keyof typeof withPropsMap)[]) =>
  (
    wrappedGetServerSideProps: (context: GetServerSidePropsContext, props: any) => any
  ): GetServerSideProps => {
    return async (context: GetServerSidePropsContext) => {
      try {
        const propsMetaCollection = await Promise.all(
          propNames.map(async name => {
            const { cookie } = context.req.headers;

            const parsedCookies = Object.fromEntries(
              (cookie as string).split(/; */).map(c => {
                const [key, ...v] = c.split('=');
                return [key, decodeURIComponent(v.join('='))];
              })
            );

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

export const SSR = {
  withProps,
};
