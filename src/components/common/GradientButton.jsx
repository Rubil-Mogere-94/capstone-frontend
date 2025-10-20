import { styled } from '@mui/material/styles';
import { Button } from '@mui/material';

export const GradientButton = styled(Button)(({ theme }) => ({
  background: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.info.main})`,
  color: theme.palette.common.white,
  '&:hover': {
    background: `linear-gradient(to right, ${theme.palette.primary.dark}, ${theme.palette.info.dark})`,
  },
}));