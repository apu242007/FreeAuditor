import React from 'react';
import {
  Typography,
  Grid,
  Paper,
  Box,
  Card,
  CardContent,
  Button,
} from '@mui/material';
import {
  Assignment,
  PlaylistAddCheck,
  Assessment,
  TrendingUp,
} from '@mui/icons-material';

const Dashboard: React.FC = () => {
  const statsCards = [
    {
      title: 'Total Templates',
      value: '12',
      icon: <Assignment fontSize="large" />,
      color: '#1976d2',
    },
    {
      title: 'Active Inspections',
      value: '8',
      icon: <PlaylistAddCheck fontSize="large" />,
      color: '#388e3c',
    },
    {
      title: 'Completed This Month',
      value: '45',
      icon: <Assessment fontSize="large" />,
      color: '#f57c00',
    },
    {
      title: 'Average Score',
      value: '87%',
      icon: <TrendingUp fontSize="large" />,
      color: '#7b1fa2',
    },
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Typography variant="body1" color="textSecondary" paragraph>
        Welcome to Free AUDITOR - Your open-source audit management system
      </Typography>

      <Grid container spacing={3}>
        {statsCards.map((card, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card>
              <CardContent>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                  <Box>
                    <Typography variant="h4" component="div">
                      {card.value}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {card.title}
                    </Typography>
                  </Box>
                  <Box sx={{ color: card.color }}>
                    {card.icon}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3} sx={{ mt: 3 }}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Quick Actions
            </Typography>
            <Box display="flex" flexDirection="column" gap={2}>
              <Button variant="contained" fullWidth>
                Create New Template
              </Button>
              <Button variant="outlined" fullWidth>
                Start Inspection
              </Button>
              <Button variant="outlined" fullWidth>
                View Reports
              </Button>
            </Box>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Recent Activity
            </Typography>
            <Typography variant="body2" color="textSecondary">
              No recent activity to display.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;