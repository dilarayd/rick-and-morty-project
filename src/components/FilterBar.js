import React from 'react';
import {
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Grid,
  Paper
} from '@mui/material';

const FilterBar = ({ filters, onFilterChange, pageSize, onPageSizeChange }) => {              // Filtreleme çubuğu bileşeni: Kullanıcıdan filtre ve sayfa boyutu girişi alır
  const handleChange = (field) => (event) => {                                                // Filtre değişikliklerini yöneten fonksiyon
    onFilterChange({
      ...filters,
      [field]: event.target.value
    });
  };

  const speciesOptions = [                                                                     // Tür (species) seçenekleri: API'deki türleri kapsar
    { value: '', label: 'All Species' },
    { value: 'Human', label: 'Human' },
    { value: 'Alien', label: 'Alien' },
    { value: 'Humanoid', label: 'Humanoid' },
    { value: 'Mythological Creature', label: 'Mythological Creature' },
    { value: 'Animal', label: 'Animal' },
    { value: 'Robot', label: 'Robot' },
    { value: 'Cronenberg', label: 'Cronenberg' },
    { value: 'Disease', label: 'Disease' },
    { value: 'Poopybutthole', label: 'Poopybutthole' },
    { value: 'unknown', label: 'Unknown' }
  ];

  return (
    // Filtre çubuğunu çevreleyen kapsayıcı
    <Paper sx={{ 
      width: '100%', 
      mb: 3, 
      p: 2,
      maxWidth: '100%',
      boxSizing: 'border-box'
    }}>

    {/* Filtre elemanlarını düzenlemek için ızgara düzeni */}
      <Grid container spacing={2} alignItems="center">
        {/* İsim filtresi: Karakter adına göre arama */}
        <Grid item xs={12} sm={6} md={2.4}>
          <TextField
            fullWidth
            label="Search by name"
            value={filters.name}
            onChange={handleChange('name')}
            variant="outlined"
            size="small"
            sx={{ minWidth: '180px' }}
          />
        </Grid>
        
        {/* Durum filtresi: Karakterin canlı, ölü veya bilinmeyen durumu */}
        <Grid item xs={12} sm={6} md={2.4}>
          <FormControl fullWidth size="small" sx={{ minWidth: '180px' }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={filters.status}
              onChange={handleChange('status')}
              label="Status"
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 300,
                    width: '200px'
                  }
                }
              }}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="alive">Alive</MenuItem>
              <MenuItem value="dead">Dead</MenuItem>
              <MenuItem value="unknown">Unknown</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {/* Tür filtresi: Karakterin türüne göre filtreleme */}
        <Grid item xs={12} sm={6} md={2.4}>
          <FormControl fullWidth size="small" sx={{ minWidth: '180px' }}>
            <InputLabel>Species</InputLabel>
            <Select
              value={filters.species}
              onChange={handleChange('species')}
              label="Species"
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 300,
                    width: '200px'
                  }
                }
              }}
            >
              {speciesOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {/* Cinsiyet filtresi: Karakterin cinsiyetine göre filtreleme */}
        <Grid item xs={12} sm={6} md={2.4}>
          <FormControl fullWidth size="small" sx={{ minWidth: '180px' }}>
            <InputLabel>Gender</InputLabel>
            <Select
              value={filters.gender}
              onChange={handleChange('gender')}
              label="Gender"
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 300,
                    width: '200px'
                  }
                }
              }}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="female">Female</MenuItem>
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="genderless">Genderless</MenuItem>
              <MenuItem value="unknown">Unknown</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        
        {/* Sayfa boyutu filtresi: Her sayfada gösterilecek karakter sayısı */}
        <Grid item xs={12} sm={6} md={2.4}>
          <FormControl fullWidth size="small" sx={{ minWidth: '180px' }}>
            <InputLabel>Page Size</InputLabel>
            <Select
              value={pageSize}
              onChange={(e) => onPageSizeChange(e.target.value)}
              label="Page Size"
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 300,
                    width: '200px'
                  }
                }
              }}
            >
              <MenuItem value={20}>20</MenuItem>
              <MenuItem value={50}>50</MenuItem>
              <MenuItem value={100}>100</MenuItem>
              <MenuItem value={200}>200</MenuItem>
              <MenuItem value={250}>250</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default FilterBar; 