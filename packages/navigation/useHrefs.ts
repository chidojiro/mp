import { useRouter } from 'next/router';
import React from 'react';
import { MarketingActionStatus } from '@/marketing-action/types';
import { TARGET } from '@/marketing-action/types';

type ProjectId = {
  projectId?: string;
};

type OrgId = {
  organizationId?: string;
};

export const useHrefs = () => {
  const { query } = useRouter();

  const { organizationId: organizationIdQuery, projectId: projectIdQuery } = query as Record<
    string,
    string
  >;

  const getMarketingActionListHref = React.useCallback(
    (
      config?: ProjectId &
        OrgId & {
          marketingActionName?: string;
        }
    ) => {
      const {
        organizationId = organizationIdQuery,
        projectId = projectIdQuery,
        marketingActionName = 'cart-abandoned',
      } = config ?? {};

      return {
        pathname:
          '/organizations/[organizationId]/projects/[projectId]/actions/new/[marketingActionName]',
        query: { organizationId, projectId, marketingActionName },
      };
    },
    [organizationIdQuery, projectIdQuery]
  );

  const getMarketingActionEditHref = React.useCallback(
    (
      config: ProjectId &
        OrgId & {
          marketingActionName: string;
          marketingActionId: string;
        }
    ) => {
      const {
        organizationId = organizationIdQuery,
        projectId = projectIdQuery,
        marketingActionName,
        marketingActionId,
      } = config;

      return {
        pathname:
          '/organizations/[organizationId]/projects/[projectId]/actions/edit/[marketingActionName]/[marketingActionId]',
        query: { organizationId, projectId, marketingActionName, marketingActionId },
      };
    },
    [organizationIdQuery, projectIdQuery]
  );

  const getMyMarketingActionListHref = React.useCallback(
    (
      config?: ProjectId &
        OrgId & {
          marketingActionStatus?: MarketingActionStatus;
          targets?: (TARGET | 'all')[];
          marketingActionId?: string;
        }
    ) => {
      const {
        organizationId = organizationIdQuery,
        projectId = projectIdQuery,
        marketingActionStatus = MarketingActionStatus.RUNNING,
        targets = ['all'],
        marketingActionId,
      } = config ?? {};

      return {
        pathname:
          '/organizations/[organizationId]/projects/[projectId]/actions/[marketingActionStatus]',
        query: { organizationId, projectId, marketingActionStatus, targets, marketingActionId },
      };
    },
    [organizationIdQuery, projectIdQuery]
  );

  const getDashboardHref = React.useCallback(
    (config?: OrgId) => {
      const { organizationId = organizationIdQuery } = config ?? {};

      return {
        pathname: '/organizations/[organizationId]/dashboard',
        query: { organizationId },
      };
    },
    [organizationIdQuery]
  );

  return React.useMemo(
    () => ({
      getMarketingActionEditHref,
      getMarketingActionListHref,
      getMyMarketingActionListHref,
      getDashboardHref,
    }),
    [
      getDashboardHref,
      getMarketingActionEditHref,
      getMarketingActionListHref,
      getMyMarketingActionListHref,
    ]
  );
};
