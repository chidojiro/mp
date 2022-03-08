import React from 'react';
import { Children } from 'types';

export type ServerSidePropNames = 'profile';

export type ServerSidePropsState = Partial<Record<ServerSidePropNames, any>>;

type ServerSidePropsProviderValue = {
  props: ServerSidePropsState;
  registerProps: (props: ServerSidePropsState) => void;
};

export const ServerSidePropsContext = React.createContext<ServerSidePropsProviderValue>(
  null as any
);

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = Children & {};

export const ServerSidePropsProvider = ({ children }: Props) => {
  const [serverSideProps, setServerSideProps] = React.useState<ServerSidePropsState>({});

  const registerProps = React.useCallback((props: Partial<ServerSidePropsState>) => {
    setServerSideProps(prev => ({ ...prev, ...props }));
  }, []);

  const value = React.useMemo(
    () => ({ registerProps, props: serverSideProps }),
    [registerProps, serverSideProps]
  );

  return (
    <ServerSidePropsContext.Provider value={value}>{children}</ServerSidePropsContext.Provider>
  );
};

export const useServerSidePropsContext = (serverSideProps?: any) => {
  const { registerProps, props } = React.useContext(ServerSidePropsContext);

  React.useEffect(() => {
    if (serverSideProps) {
      registerProps(serverSideProps);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return React.useMemo(() => ({ props }), [props]);
};
