import { useRouter } from 'next/router';
import React from 'react';
import { LinkProps } from 'next/link';

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {
  method?: 'push' | 'replace';
  href: LinkProps['href'];
};

// eslint-disable-next-line no-empty-pattern
export const Redirect = ({ method = 'push', href }: Props) => {
  const router = useRouter();

  React.useEffect(() => {
    if (!router.isReady) return;

    if (method === 'push') router.push(href);
    if (method === 'replace') router.replace(href);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  return null;
};
