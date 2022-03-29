import { ProfileApis, ReportApi } from '@/apis';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';

const withPropsMap = {
  profile: ProfileApis.get,
  rfmReport: ReportApi.rfm_report,
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

            const value = await withPropsMap[name]({
              headers: {
                cookie: cookie as string,
                'X-Organization-Id': '00000000000040008000000000000000',
                'X-Project-Id': '00000000000040008000000000000000',
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
        if ([401, 403].includes(e?.response?.status)) {
          return { redirect: { destination: '/login' } };
        } else throw e;
      }
    };
  };

export const SSR = {
  withProps,
};
