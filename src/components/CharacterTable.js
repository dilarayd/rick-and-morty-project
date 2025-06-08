import React, { useRef, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  IconButton,
  Box,
  Typography,
  Chip
} from '@mui/material';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import CharacterDetail from './CharacterDetail';

// Karakter tablosu bileşeni: Karakterleri listeler, sıralar ve detay gösterir
const CharacterTable = ({
  characters,
  onCharacterSelect,
  page,
  totalCount,
  onPageChange,
  pageSize,
  selectedCharacter,
  onSort
}) => {
  const [sortDirection, setSortDirection] = React.useState('asc');
  const detailRef = useRef(null);

  useEffect(() => {
    if (selectedCharacter && detailRef.current) {
      detailRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [selectedCharacter]);

  const handleSort = () => {                                            // Sıralama işlemini yönetir
    const newDirection = sortDirection === 'asc' ? 'desc' : 'asc';
    setSortDirection(newDirection);
    onSort('name', newDirection);
  };

  const handleChangePage = (event, newPage) => {                         // Sayfa değişimini yönetir
    onPageChange(newPage + 1); 
  };

  const getStatusColor = (status) => {                                    // Durum (alive/dead/unknown) için renk ayarları
    switch (status.toLowerCase()) {
      case 'alive':
        return {
          bgcolor: 'rgba(76, 175, 80, 0.1)',
          color: 'rgb(46, 125, 50)',
          borderColor: 'rgba(76, 175, 80, 0.3)'
        };
      case 'dead':
        return {
          bgcolor: 'rgba(244, 67, 54, 0.1)',
          color: 'rgb(211, 47, 47)',
          borderColor: 'rgba(244, 67, 54, 0.3)'
        };
      default:
        return {
          bgcolor: 'rgba(158, 158, 158, 0.1)',
          color: 'rgb(97, 97, 97)',
          borderColor: 'rgba(158, 158, 158, 0.3)'
        };
    }
  };

  if (characters.length === 0) {                                        // Karakter listesi boşsa uyarı mesajı göster
    return (
      <Box sx={{ textAlign: 'center', my: 4 }}>
        <Typography variant="h6" color="text.secondary">
          No characters found matching your filters.
        </Typography>
      </Box>
    );
  }

  return (
    <Paper sx={{ width: '100%', height: 'calc(100vh - 250px)', display: 'flex', flexDirection: 'column', mb: 4 }}>
      <TableContainer component={Paper} sx={{ 
        flex: 1, 
        display: 'flex', 
        flexDirection: 'column',
        '& .MuiTableHead-root': {
          '& .MuiTableCell-root': {
            backgroundColor: '#8FC748',
            color: 'white',
            fontWeight: 'bold'
          }
        },
        '& .MuiTableBody-root': {
          '& .MuiTableRow-root:hover': {
            backgroundColor: 'rgba(19, 152, 172, 0.1)'
          }
        }
      }}>
        <Table stickyHeader> 
          <TableHead>
            <TableRow>
              <TableCell width="80px">Image</TableCell>
              <TableCell width="20%">
                <Box display="flex" alignItems="center" gap={1}>
                  Name
                  <IconButton 
                    size="small" 
                    onClick={handleSort}
                    sx={{ 
                      ml: 1,
                      transform: sortDirection === 'desc' ? 'rotate(180deg)' : 'none',
                      transition: 'transform 0.2s'
                    }}
                  >
                    <SwapVertIcon />
                  </IconButton>
                </Box>
              </TableCell>
              <TableCell width="150px" sx={{ minWidth: '150px' }}>Status</TableCell>
              <TableCell width="200px" sx={{ minWidth: '200px' }}>Species</TableCell>
              <TableCell width="150px" sx={{ minWidth: '150px' }}>Gender</TableCell>
              <TableCell width="25%">Origin</TableCell>
              <TableCell width="25%">Location</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {characters.map((character) => (
              <React.Fragment key={character.id}>
                <TableRow
                  hover
                  onClick={() => onCharacterSelect(character)}
                  sx={{ 
                    cursor: 'pointer',
                    backgroundColor: selectedCharacter?.id === character.id ? 'rgba(19, 152, 172, 0.1)' : 'inherit'
                  }}
                >
                  <TableCell>
                    <img
                      src={character.image}
                      alt={character.name}
                      style={{ width: 50, height: 50, borderRadius: '50%' }}
                    />
                  </TableCell>
                  <TableCell>{character.name}</TableCell>
                  <TableCell sx={{ minWidth: '150px' }}>
                    <Chip
                      label={character.status}
                      size="small"
                      sx={{
                        ...getStatusColor(character.status),
                        fontWeight: 500,
                        '& .MuiChip-label': {
                          px: 1
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell sx={{ minWidth: '200px' }}>{character.species}</TableCell>
                  <TableCell sx={{ minWidth: '150px' }}>{character.gender}</TableCell>
                  <TableCell>{character.origin.name}</TableCell>
                  <TableCell>{character.location.name}</TableCell>
                </TableRow>
                {selectedCharacter?.id === character.id && (
                  <TableRow>
                    <TableCell colSpan={7} sx={{ p: 0, borderBottom: 'none', backgroundColor: 'inherit' }} ref={detailRef}>
                      <CharacterDetail
                        character={character}
                        onClose={() => onCharacterSelect(null)}
                      />
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={totalCount}
        page={page - 1}
        onPageChange={handleChangePage}
        rowsPerPage={pageSize}
        rowsPerPageOptions={[]}
      />
    </Paper>
  );
};

export default CharacterTable; 