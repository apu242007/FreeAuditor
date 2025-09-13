import React, { useState, useEffect } from 'react';
import {
  Typography,
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip,
  Alert,
} from '@mui/material';
import {
  Add,
  Edit,
  FileCopy,
  Archive,
  Delete,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { Template } from '../../types';
import { templateService } from '../../services/templateService';

const Templates: React.FC = () => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    loadTemplates();
  }, []);

  const loadTemplates = async () => {
    try {
      setLoading(true);
      const data = await templateService.getAll();
      setTemplates(data);
    } catch (err: any) {
      setError('Failed to load templates');
      console.error('Error loading templates:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDuplicate = async (id: string) => {
    try {
      await templateService.duplicate(id);
      loadTemplates();
    } catch (err) {
      setError('Failed to duplicate template');
    }
  };

  const handleArchive = async (id: string) => {
    try {
      await templateService.archive(id);
      loadTemplates();
    } catch (err) {
      setError('Failed to archive template');
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this template?')) {
      try {
        await templateService.delete(id);
        loadTemplates();
      } catch (err) {
        setError('Failed to delete template');
      }
    }
  };

  if (loading) {
    return <Typography>Loading templates...</Typography>;
  }

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Templates</Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => navigate('/templates/new')}
        >
          Create Template
        </Button>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Created By</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Created</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {templates.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <Typography variant="body2" color="textSecondary">
                    No templates found. Create your first template to get started.
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              templates.map((template) => (
                <TableRow key={template.id}>
                  <TableCell>{template.title}</TableCell>
                  <TableCell>{template.description || '-'}</TableCell>
                  <TableCell>
                    {template.creator.firstName} {template.creator.lastName}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={template.isActive ? 'Active' : 'Inactive'}
                      color={template.isActive ? 'success' : 'default'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    {new Date(template.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      size="small"
                      onClick={() => navigate(`/templates/${template.id}/edit`)}
                      title="Edit"
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleDuplicate(template.id)}
                      title="Duplicate"
                    >
                      <FileCopy />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleArchive(template.id)}
                      title="Archive"
                    >
                      <Archive />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleDelete(template.id)}
                      title="Delete"
                      color="error"
                    >
                      <Delete />
                    </IconButton>
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

export default Templates;