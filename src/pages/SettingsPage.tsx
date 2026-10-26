import { Alert, Box, Button, Card, FormControlLabel, Snackbar, Stack, Switch, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import InfoTile from '../components/InfoTile';
import PageHeader from '../components/PageHeader';
import { volunteers, CURRENT_VOLUNTEER_ID } from '../data/seed';

export default function SettingsPage() {
  const me = volunteers.find((v) => v.id === CURRENT_VOLUNTEER_ID)!;
  const [name, setName] = useState(me.name);
  const [email, setEmail] = useState(me.email);
  const [reminders, setReminders] = useState(true);
  const [digest, setDigest] = useState(false);
  const [saved, setSaved] = useState(false);

  return (
    <>
      <PageHeader title="My profile" subtitle="How the coordinators reach you." />
      <Box sx={{ maxWidth: 560 }}>
        <InfoTile title="Hours this season" text={`${me.hours} hours`} />
        <Card sx={{ p: 3 }}>
          <Stack spacing={2.5}>
            <TextField label="Full name" value={name} onChange={(e) => setName(e.target.value)} fullWidth />
            <TextField label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth />
            <Typography variant="h3">Notifications</Typography>
            <FormControlLabel
              control={<Switch checked={reminders} onChange={(e) => setReminders(e.target.checked)} />}
              label="Shift reminders"
            />
            <FormControlLabel
              control={<Switch checked={digest} onChange={(e) => setDigest(e.target.checked)} />}
              label="Weekly digest of open shifts"
            />
            <Typography variant="body2" color="text.secondary">
              We only email about shifts you signed up for.
            </Typography>
            <Box>
              <Button variant="contained" onClick={() => setSaved(true)}>
                Save changes
              </Button>
            </Box>
          </Stack>
        </Card>
      </Box>
      <Snackbar open={saved} autoHideDuration={2500} onClose={() => setSaved(false)}>
        <Alert severity="success" variant="filled" onClose={() => setSaved(false)}>
          Profile saved
        </Alert>
      </Snackbar>
    </>
  );
}
