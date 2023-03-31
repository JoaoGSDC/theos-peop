import { useToken } from '../../utils/token';

//check if you are on the client (browser) or server
const isBrowser = () => typeof window !== 'undefined';

const ProtectedRoute = ({ router, children }: any) => {
  const token = useToken();
  const isAuthenticated = token.exists();

  let unprotectedRoutes = ['/login'];

  /**
   * @var pathIsProtected Checks if path exists in the unprotectedRoutes routes array
   */
  let pathIsProtected = unprotectedRoutes.indexOf(router.pathname) === -1;

  if (isBrowser() && !isAuthenticated && pathIsProtected) {
    router.push('/login');
  }

  return children;
};

export default ProtectedRoute;
