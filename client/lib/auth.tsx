import { gql } from '@apollo/client';
import { useRouter, NextRouter } from 'next/router';
import { FunctionComponent, useEffect, useState } from 'react';

import { useRefreshTokenMutation } from '../generated/graphql';

interface InMemoryJwt {
  token: string;
  expiresIn: number;
}

let inMemoryJwt: undefined | InMemoryJwt;

export function getInMemoryJwt(): InMemoryJwt | null {
  return inMemoryJwt;
}

interface SetInMemoryJwtArgs {
  accessToken: string;
  accessTokenExpiresIn: number;
}

export function setInMemoryJwt({ accessToken, accessTokenExpiresIn }: SetInMemoryJwtArgs) {
  inMemoryJwt = {
    token: accessToken,
    expiresIn: accessTokenExpiresIn,
  };
}

export const REFRESH_TOKEN_MUTATION = gql`
  mutation RefreshToken {
    refreshToken {
      accessToken
      accessTokenExpiresIn
    }
  }
`;

export const subMinutes = (dt: Date, minutes: number) => new Date(dt.getTime() - minutes * 60000);

interface GetRefreshTokenArgs {
  refreshToken: Function;
  router: NextRouter;
}

async function getRefreshToken({ refreshToken, router }: GetRefreshTokenArgs) {
  try {
    if (inMemoryJwt) {
      const expiryDate = new Date(inMemoryJwt.expiresIn);

      // If we already have an in-memory token, only fetch if it's about to expire.
      if (new Date() >= subMinutes(expiryDate, 1)) {
        inMemoryJwt = null;
        const res = await refreshToken();
        inMemoryJwt = {
          token: res.data.refreshToken.accessToken,
          expiresIn: res.data.refreshToken.accessTokenExpires,
        };
      }
    } else {
      console.log('No current jwt. Getting new one...');
      const res = await refreshToken();
      inMemoryJwt = {
        token: res.data.refreshToken.accessToken,
        expiresIn: res.data.refreshToken.accessTokenExpires,
      };
    }

    return true;
  } catch {
    // If an error occurs then refreshing the token, we'll redirect them to
    // login. We assume that their token is expired or doesn't exist on server.
    router.push('/');
    return false;
  }
};

export const useRefreshToken = () => {
  const [refreshToken] = useRefreshTokenMutation();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Do this immediately as well as in interval
    getRefreshToken({ refreshToken, router }).then(() => {
      setLoading(false);
    });
    const interval = setInterval(() => getRefreshToken({ refreshToken, router }), 60000);

    return () => {
      clearInterval(interval);
    };
  }, [refreshToken, router]);

  return loading;
};

export const withRefreshToken = (WrappedComponent: FunctionComponent) => (props: Object) => {
  const loadingToken = useRefreshToken();

  if (loadingToken) {
    return <p>Authenticating...</p>;
  }

  return <WrappedComponent {...props} />;
};
