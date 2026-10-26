import { Avatar, Button, Card, Grid, InputAdornment, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { useMemo, useState } from 'react';
import PageHeader from '../components/PageHeader';
import SummaryTile from '../components/SummaryTile';
import { volunteers } from '../data/seed';

export default function VolunteersPage() {
  const [query, setQuery] = useState('');
  const rows = useMemo(
    () => volunteers.filter((v) => (v.name + v.email).toLowerCase().includes(query.toLowerCase())),
    [query],
  );
  const totalHours = volunteers.reduce((sum, v) => sum + v.hours, 0);

  return (
    <>
      <PageHeader
        title="Volunteers"
        subtitle="Everyone who has helped this season."
        action={
          <Button variant="contained" onClick={() => window.print()}>
            Print roster
          </Button>
        }
      />
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, sm: 4 }}>
          <SummaryTile label="Active volunteers" value={volunteers.length} />
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <SummaryTile label="Hours given" value={totalHours} />
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <SummaryTile label="Average per person" value={Math.round(totalHours / volunteers.length)} />
        </Grid>
      </Grid>
      <Card>
        <Stack sx={{ p: 2 }}>
          <TextField
            size="small"
            placeholder="Search by name or email"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            slotProps={{
              input: { startAdornment: (<InputAdornment position="start"><SearchRoundedIcon fontSize="small" /></InputAdornment>) },
              htmlInput: { 'aria-label': 'Search volunteers' },
            }}
            sx={{ maxWidth: 360 }}
          />
        </Stack>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell align="right">Hours</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((v) => (
                <TableRow key={v.id} hover>
                  <TableCell>
                    <Stack direction="row" spacing={1.5} alignItems="center">
                      <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.light', color: 'primary.dark', fontSize: 14 }}>
                        {v.name.split(' ').map((p) => p[0]).join('')}
                      </Avatar>
                      <Typography fontWeight={600}>{v.name}</Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>{v.email}</TableCell>
                  <TableCell align="right">{v.hours}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </>
  );
}
