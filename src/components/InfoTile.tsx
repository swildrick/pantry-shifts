import { Card, Typography } from '@mui/material';

type Props = { title: string; text: string };

export default function InfoTile({ title, text }: Props) {
  return (
    <Card sx={{ p: 2.5, mb: 1.5 }}>
      <Typography variant="body2" color="text.secondary">
        {title}
      </Typography>
      <Typography variant="h2" component="p" sx={{ mt: 0.5 }}>
        {text}
      </Typography>
    </Card>
  );
}
