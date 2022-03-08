import React from 'react';
import { Children } from 'types';

export type ServerSidePropNames = 'profile';

export type ServerSidePropsState = Partial<Record<ServerSidePropNames, any>>;

type ServerSidePropsProviderValue = {
  props: ServerSidePropsState;
};

export const ServerSidePropsContext = React.createContext<ServerSidePropsProviderValue>({
  props: {},
});

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = Children & { props: Partial<ServerSidePropsState> };

export const ServerSidePropsProvider = ({ children, props = {} }: Props) => {
  const value = React.useMemo(() => ({ props }), [props]);

  return (
    <ServerSidePropsContext.Provider value={value}>{children}</ServerSidePropsContext.Provider>
  );
};

export const useServerSidePropsContext = () => React.useContext(ServerSidePropsContext);
