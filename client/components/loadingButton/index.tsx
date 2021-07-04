import { Button, CircularProgress } from '@material-ui/core';

const LoadingButton = ({ children, loading, ...rest }) => (
  <Button {...rest}>
    {children}
    {loading && <CircularProgress size={20} style={{ alignSelf: 'right' }} />}
  </Button>
);

export default LoadingButton;
