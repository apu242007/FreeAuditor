import React from 'react';
import {
  Typography,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Button,
} from '@mui/material';
import { Add, PlayArrow } from '@mui/icons-material';

const Inspections: React.FC = () => {
  // Mock data for demonstration
  const inspections = [
    {
      id: '1',
      title: 'Monthly Safety Inspection',
      template: 'Safety Checklist v2.0',
      status: 'COMPLETED',
      score: 85,
      conductor: 'John Doe',
      date: '2024-01-15',
    },
    {
      id: '2',
      title: 'Equipment Check',
      template: 'Equipment Inspection',
      status: 'IN_PROGRESS',
      score: null,
      conductor: 'Jane Smith',
      date: '2024-01-16',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return 'success';
      case 'IN_PROGRESS':
        return 'warning';
      case 'DRAFT':
        return 'default';
      default:
        return 'default';
    }
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Inspections</Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
        >
          Start New Inspection
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Template</TableCell>
              <TableCell>Conductor</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Score</TableCell>
              <TableCell>Date</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {inspections.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  <Typography variant="body2" color="textSecondary">
                    No inspections found. Start your first inspection to get started.
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              inspections.map((inspection) => (
                <TableRow key={inspection.id}>
                  <TableCell>{inspection.title}</TableCell>
                  <TableCell>{inspection.template}</TableCell>
                  <TableCell>{inspection.conductor}</TableCell>
                  <TableCell>
                    <Chip
                      label={inspection.status}
                      color={getStatusColor(inspection.status) as any}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    {inspection.score ? `${inspection.score}%` : '-'}
                  </TableCell>
                  <TableCell>
                    {new Date(inspection.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      size="small"
                      startIcon={<PlayArrow />}
                      variant="outlined"
                    >
                      {inspection.status === 'COMPLETED' ? 'View' : 'Continue'}
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Inspections;