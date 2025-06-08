import React, { useState, useEffect, useCallback } from 'react';
import { 
  Container, 
  Box, 
  Typography, 
  CircularProgress,
  Alert
} from '@mui/material';
import CharacterTable from './components/CharacterTable';
import FilterBar from './components/FilterBar';
import axios from 'axios';
import rickAndMortyLogo from './rick-and-morty-31013.png';

// Ana uygulama bileşeni: Karakterleri çeker, filtreler ve sıralar
function App() {
  const [characters, setCharacters] = useState([]);                                     // API'den çekilen karakterleri tutan durum (state)
  const [loading, setLoading] = useState(true);                                         // Yükleme durumunu takip eden durum (yüklenirken true)
  const [error, setError] = useState(null);                                             // Hata mesajlarını tutan durum
  const [selectedCharacter, setSelectedCharacter] = useState(null);                     // Detay görünümü için seçilen karakteri tutan durum
  const [filters, setFilters] = useState({                                              // Filtre değerlerini (isim, durum, tür, cinsiyet) tutan durum
    name: '',
    status: '',
    species: '',
    gender: ''
  });
  const [page, setPage] = useState(1);                                                  // Geçerli sayfa numarasını tutan durum
  const [totalPages, setTotalPages] = useState(0);                                      // Toplam sayfa sayısını tutan durum
  const [totalCount, setTotalCount] = useState(0);                                      // Toplam karakter sayısını tutan durum  
  const [pageSize, setPageSize] = useState(250);                                        // Her sayfada gösterilecek karakter sayısını tutan durum (varsayılan 250)            
  const [sortConfig, setSortConfig] = useState({ field: 'name', direction: 'asc' });    // Sıralama ayarlarını (alan ve yön) tutan durum
  
  const fetchCharacters = useCallback(async () => {                                      // Karakterleri API'den çeken asenkron fonksiyon

    try {
      setLoading(true);
      setError(null);
      
      const queryParams = new URLSearchParams();                                         // API sorgusu için parametreleri oluştur
      Object.entries(filters).forEach(([key, value]) => {                                // Filtreleri döngüyle kontrol et ve geçerli olanları ekle
        if (value && value !== '' && value !== 'all') {
          const lowerValue = value.toLowerCase();
          queryParams.append(key, lowerValue);
        }
      });
      queryParams.append('page', page);

      const url = `https://rickandmortyapi.com/api/character/?${queryParams}`;            // API URL'sini oluştur
      const response = await axios.get(url);                                              // İlk API isteğini yap
      if (!response.data.results || response.data.results.length === 0) {                 // Eğer sonuç yoksa, durumları sıfırla ve çık
        setCharacters([]);
        setTotalPages(0);
        setTotalCount(0);
        return;
      }

      const allCharacters = [...response.data.results];                                  //Tüm karakter kayıtlarını al
      if (response.data.info.pages > 1) {                                                // Eğer birden fazla sayfa varsa, hepsini çek
        for (let i = 2; i <= response.data.info.pages; i++) {
          const nextPageParams = new URLSearchParams(queryParams);                        // Yeni parametreler
          nextPageParams.set('page', i);                                                  // Sonraki sayfayı ayarla
          const nextUrl = `https://rickandmortyapi.com/api/character/?${nextPageParams}`;
          const nextResponse = await axios.get(nextUrl);
          allCharacters.push(...nextResponse.data.results);
        }
      }

      setTotalCount(allCharacters.length);                                               // Toplam karakter sayısını ayarla

      const totalPages = Math.ceil(allCharacters.length / pageSize);                     // Toplam sayfa sayısını, pageSize'a göre hesapla

      setTotalPages(totalPages);
      
      const startIndex = (page - 1) * pageSize;                                          // Geçerli sayfa için karakter dilimini al
      const endIndex = startIndex + pageSize;
      const pageCharacters = allCharacters.slice(startIndex, endIndex);
      setCharacters(pageCharacters);
    } catch (err) {
      if (err.response?.status === 404) {                                                // Hata yönetimi
        setCharacters([]);
        setTotalPages(0);
        setTotalCount(0);
      } else {
        setError('Failed to fetch characters. Please try again later.');                 // Diğer hatalar için mesaj göster
      }
    } finally {
      setLoading(false);
    }
  }, [page, filters, pageSize]);

  useEffect(() => {                                                                        // Karakterleri çekmek için useEffect, fetchCharacters her değiştiğinde çalıştır

    fetchCharacters();
  }, [fetchCharacters]);

  const handleFilterChange = (newFilters) => {                                              // Filtre değişikliklerini yönet, yeni filtreleri ayarla, filtre değiştiğinde ilk sayfaya dön
    setFilters(newFilters);
    setPage(1); 
  };

  const handleCharacterSelect = (character) => {                                              // Karakter seçimini yönet
    setSelectedCharacter(character);
  };

  const handleSort = (field, direction) => {                                                   // Sıralama işlemini yönet
    setSortConfig({ field, direction });
    const sortedCharacters = [...characters].sort((a, b) => {
      if (direction === 'asc') {
        return a[field].localeCompare(b[field]);
      } else {
        return b[field].localeCompare(a[field]);
      }
    });
    setCharacters(sortedCharacters);
  };

  return (
    <Container maxWidth="xl" sx={{ height: '100vh', py: 2, pb: 8 }}>
      <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', mb: 4 }}>
        {/* Uygulama logosu */}
        <Box 
          component="img"
          src={rickAndMortyLogo}
          alt="Rick and Morty"
          sx={{ 
            height: 'auto',
            maxWidth: '200px',
            margin: '0 auto',
            mb: 3
          }}
        />

        {/* Filtreleme çubuğu */}
        <FilterBar 
          filters={filters} 
          onFilterChange={handleFilterChange}
          pageSize={pageSize}
          onPageSizeChange={setPageSize}
        />

        {/* Hata mesajı gösterimi */}
        {error && (
          <Alert severity="error" sx={{ my: 2 }}>
            {error}
          </Alert>
        )}

        {/* Yükleme durumu */}
        {loading ? (
          <Box display="flex" justifyContent="center" my={4}>
            <CircularProgress />
          </Box>
        ) : (
          <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <CharacterTable 
              characters={characters}
              onCharacterSelect={handleCharacterSelect}
              page={page}
              totalPages={totalPages}
              totalCount={totalCount}
              onPageChange={setPage}
              pageSize={pageSize}
              selectedCharacter={selectedCharacter}
              onSort={handleSort}
            />
          </Box>
        )}
      </Box>
    </Container>
  );
}

export default App;
