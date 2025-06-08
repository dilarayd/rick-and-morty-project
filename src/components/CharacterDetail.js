import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Divider,
  IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

// Karakter detay bileşeni: Seçilen karakterin resmini ve bilgilerini gösterir
const CharacterDetail = ({ character, onClose }) => {
  if (!character) return null;

  return (
    <Paper sx={{ p: 3, mt: 2, position: 'relative' }}>
      <IconButton
        onClick={onClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: 'text.secondary',
          '&:hover': {
            color: 'text.primary'
          }
        }}
      >
        <CloseIcon />
      </IconButton>
      <Grid container spacing={3} justifyContent="center">
        {/* Sol taraf: Karakter resmi ve ismi */}
        <Grid item xs={12} md={3}>
          <Box display="flex" flexDirection="column" alignItems="center">
            <img 
              src={character.image} 
              alt={character.name}
              style={{ 
                width: '200px', 
                height: '200px', 
                borderRadius: '8px',
                marginBottom: '24px',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
              }} 
            />
            <Typography variant="h5" component="h2" gutterBottom>
              {character.name}
            </Typography>
          </Box>
        </Grid>

        {/* Dikey ayırıcı çizgi */}
        <Grid item xs={12} md={0.5}>
          <Divider orientation="vertical" flexItem sx={{ height: '100%' }} />
        </Grid>

        {/* Sağ taraf: Karakter detayları */}
        <Grid item xs={12} md={6}>
          <Box display="flex" flexDirection="column" gap={4}>
            <Grid container spacing={6}>
              <Grid item xs={12} sm={4}>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1, fontWeight: 500 }}>
                    Status
                  </Typography>
                  <Typography variant="body1" sx={{ fontSize: '1.1rem' }}>
                    {character.status}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1, fontWeight: 500 }}>
                    Species
                  </Typography>
                  <Typography variant="body1" sx={{ fontSize: '1.1rem' }}>
                    {character.species}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1, fontWeight: 500 }}>
                    Gender
                  </Typography>
                  <Typography variant="body1" sx={{ fontSize: '1.1rem' }}>
                    {character.gender}
                  </Typography>
                </Box>
              </Grid>
            </Grid>

            {/* Yatay ayırıcı çizgi */}
            <Divider sx={{ my: 3 }} />

            {/* Alt bölüm: Köken, konum, oluşturulma tarihi */}
            <Grid container spacing={6}>
              <Grid item xs={12} sm={4}>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1, fontWeight: 500 }}>
                    Origin
                  </Typography>
                  <Typography variant="body1" sx={{ fontSize: '1.1rem' }}>
                    {character.origin.name}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1, fontWeight: 500 }}>
                    Location
                  </Typography>
                  <Typography variant="body1" sx={{ fontSize: '1.1rem' }}>
                    {character.location.name}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1, fontWeight: 500 }}>
                    Created
                  </Typography>
                  <Typography variant="body1" sx={{ fontSize: '1.1rem' }}>
                    {new Date(character.created).toLocaleDateString()}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default CharacterDetail; 