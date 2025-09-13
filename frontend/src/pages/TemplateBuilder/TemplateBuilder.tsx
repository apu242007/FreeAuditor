import React, { useState } from 'react';
import {
  Typography,
  Box,
  Paper,
  TextField,
  Button,
  Grid,
  FormControlLabel,
  Switch,
} from '@mui/material';
import { Save, Preview } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const TemplateBuilder: React.FC = () => {
  const [templateData, setTemplateData] = useState({
    title: '',
    description: '',
    scoringEnabled: true,
    maxScore: 100,
    passingScore: 70,
  });

  const navigate = useNavigate();

  const handleSave = () => {
    // TODO: Implement template save functionality
    console.log('Saving template:', templateData);
  };

  const handlePreview = () => {
    // TODO: Implement template preview functionality
    console.log('Previewing template:', templateData);
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Template Builder</Typography>
        <Box>
          <Button
            variant="outlined"
            startIcon={<Preview />}
            onClick={handlePreview}
            sx={{ mr: 2 }}
          >
            Preview
          </Button>
          <Button
            variant="contained"
            startIcon={<Save />}
            onClick={handleSave}
          >
            Save Template
          </Button>
        </Box>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Template Settings
            </Typography>
            
            <TextField
              fullWidth
              label="Template Title"
              value={templateData.title}
              onChange={(e) => setTemplateData({ ...templateData, title: e.target.value })}
              margin="normal"
            />
            
            <TextField
              fullWidth
              label="Description"
              multiline
              rows={3}
              value={templateData.description}
              onChange={(e) => setTemplateData({ ...templateData, description: e.target.value })}
              margin="normal"
            />

            <FormControlLabel
              control={
                <Switch
                  checked={templateData.scoringEnabled}
                  onChange={(e) => setTemplateData({ ...templateData, scoringEnabled: e.target.checked })}
                />
              }
              label="Enable Scoring"
              sx={{ mt: 2 }}
            />

            {templateData.scoringEnabled && (
              <>
                <TextField
                  fullWidth
                  label="Maximum Score"
                  type="number"
                  value={templateData.maxScore}
                  onChange={(e) => setTemplateData({ ...templateData, maxScore: Number(e.target.value) })}
                  margin="normal"
                />
                
                <TextField
                  fullWidth
                  label="Passing Score"
                  type="number"
                  value={templateData.passingScore}
                  onChange={(e) => setTemplateData({ ...templateData, passingScore: Number(e.target.value) })}
                  margin="normal"
                />
              </>
            )}
          </Paper>

          <Paper sx={{ p: 3, mt: 2 }}>
            <Typography variant="h6" gutterBottom>
              Question Types
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Drag question types from here to build your form:
            </Typography>
            
            <Box sx={{ mt: 2 }}>
              {[
                'Text Input',
                'Number',
                'Multiple Choice',
                'Checkbox',
                'Date/Time',
                'Photo',
                'Signature',
                'File Upload'
              ].map((type) => (
                <Button
                  key={type}
                  variant="outlined"
                  size="small"
                  sx={{ m: 0.5 }}
                  draggable
                >
                  {type}
                </Button>
              ))}
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, minHeight: '600px' }}>
            <Typography variant="h6" gutterBottom>
              Form Builder
            </Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              Drag and drop question types here to build your inspection form.
            </Typography>
            
            <Box
              sx={{
                border: '2px dashed #ccc',
                borderRadius: 1,
                p: 4,
                textAlign: 'center',
                minHeight: '400px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography variant="body1" color="textSecondary">
                Drop question types here to start building your form
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TemplateBuilder;