import { useProfile } from '@/auth/useProfile';
import { Redirect } from '@/common/Redirect';
import { useHrefs } from '@/navigation/useHrefs';

export const IndexPage = () => {
  const { data: profile } = useProfile();
  const { getDashboardHref } = useHrefs();

  if (!profile.organization_id) return null;

  return (
    <Redirect
      href={getDashboardHref({ organizationId: profile.organization_id })}
      method='replace'
    />
  );
};

export default IndexPage;
