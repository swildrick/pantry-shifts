import { Box, Button, Card, CardActions, CardContent, Chip, LinearProgress, Stack, Typography } from '@mui/material';
import EventRoundedIcon from '@mui/icons-material/EventRounded';
import PlaceRoundedIcon from '@mui/icons-material/PlaceRounded';
import type { Shift } from '../data/seed';
import { formatTimeRange } from '../utils/time';
import StatusChip from './StatusChip';

type Props = {
  shift: Shift;
  signedUp: boolean;
  onSignUp: (shift: Shift) => void;
  onCancel: (shift: Shift) => void;
};

function formatDate(iso: string) {
  return new Date(iso + 'T00:00:00').toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
}

export default function ShiftCard({ shift, signedUp, onSignUp, onCancel }: Props) {
  const filled = shift.volunteerIds.length;
  const spotsLeft = shift.capacity - filled;

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', borderLeft: 4, borderLeftColor: 'primary.main' }}>
      <CardContent sx={{ flexGrow: 1, p: 2.5 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={1} sx={{ mb: 1.5 }}>
          <Chip size="small" label={shift.role} sx={{ bgcolor: 'primary.light', color: 'primary.dark' }} />
          <StatusChip spotsLeft={spotsLeft} />
        </Stack>
        <Typography variant="h3" component="h2" sx={{ mb: 1 }}>
          {shift.title}
        </Typography>
        <Stack spacing={0.75} sx={{ mb: 2 }}>
          <Stack direction="row" spacing={1} alignItems="center" color="text.secondary">
            <EventRoundedIcon fontSize="small" />
            <Typography variant="body2">
              {formatDate(shift.date)} · {formatTimeRange(shift.start, shift.end)}
            </Typography>
          </Stack>
          <Stack direction="row" spacing={1} alignItems="center" color="text.secondary">
            <PlaceRoundedIcon fontSize="small" />
            <Typography variant="body2">{shift.location}</Typography>
          </Stack>
        </Stack>
        <Box>
          <LinearProgress variant="determinate" value={(filled / shift.capacity) * 100} sx={{ height: 8, borderRadius: 4 }} />
          <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
            {filled} of {shift.capacity} volunteers
          </Typography>
        </Box>
      </CardContent>
      <CardActions sx={{ px: 2.5, pb: 2 }}>
        {signedUp ? (
          <Button variant="outlined" color="primary" onClick={() => onCancel(shift)}>
            Cancel my spot
          </Button>
        ) : (
          <Button variant="contained" disabled={spotsLeft === 0} onClick={() => onSignUp(shift)}>
            Sign up
          </Button>
        )}
      </CardActions>
    </Card>
  );
}
