import { Chip } from '@mui/material';

type Props = { spotsLeft: number };

export default function StatusChip({ spotsLeft }: Props) {
  if (spotsLeft === 0) {
    return <Chip size="small" label="Full" sx={{ bgcolor: 'secondary.light', color: 'secondary.main' }} />;
  }
  return <Chip size="small" color="primary" variant="outlined" label={`${spotsLeft} spot${spotsLeft === 1 ? '' : 's'} left`} />;
}
