import * as React from 'react';
import { AppBar as MuiAppBar, Box, Toolbar, Typography, IconButton, Tooltip } from '@mui/material';
import { GitHub as GitHubIcon, Settings as SettingsIcon } from '@mui/icons-material';

export default function AppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <MuiAppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            awfel
          </Typography>
          <Tooltip title="Settings">
            <IconButton color="inherit">
              <SettingsIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="GitHub">
            <IconButton color="inherit" href='https://github.com/iscle' target='_blank' rel='noopener noreferrer'>
              <GitHubIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </MuiAppBar>
    </Box>
  );
}
