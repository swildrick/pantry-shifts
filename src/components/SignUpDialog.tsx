import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControlLabel, TextField } from '@mui/material';
import { useState } from 'react';
import type { Shift } from '../data/seed';
import { formatTimeRange } from '../utils/time';

type Props = { shift: Shift | null; onClose: () => void; onConfirm: (shift: Shift) => void };

export default function SignUpDialog({ shift, onClose, onConfirm }: Props) {
  const [note, setNote] = useState('');
  const [reminder, setReminder] = useState(true);

  if (!shift) return null;

  return (
    <Dialog open onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>Sign up for this shift</DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ mb: 2 }}>
          {shift.title} · {formatTimeRange(shift.start, shift.end)} at {shift.location}
        </DialogContentText>
        <TextField
          label="Note for the coordinator"
          placeholder="Allergies, mobility needs, or a friend joining you"
          multiline
          minRows={3}
          fullWidth
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
        <FormControlLabel
          sx={{ mt: 1 }}
          control={<Checkbox checked={reminder} onChange={(e) => setReminder(e.target.checked)} />}
          label="Email me a reminder the day before"
        />
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose}>Not now</Button>
        <Button variant="contained" color="secondary" onClick={() => onConfirm(shift)}>
          Confirm sign up
        </Button>
      </DialogActions>
    </Dialog>
  );
}
