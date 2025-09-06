import React, { useState, FormEvent } from 'react'
import styles from './CitySearch.module.css'

interface CitySearchProps {
  onSearch: (city: string) => void
  loading: boolean
}

const CitySearch: React.FC<CitySearchProps> = ({ onSearch, loading }) => {
  const [city, setCity] = useState('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (city.trim() && !loading) {
      onSearch(city.trim())
    }
  }

  return (
    <div className={styles.searchContainer}>
      <form onSubmit={handleSubmit} className={styles.searchForm}>
        <div className={styles.inputGroup}>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city name (e.g., London, New York)"
            className={styles.input}
            disabled={loading}
            aria-label="City name"
          />
          <button 
            type="submit" 
            disabled={!city.trim() || loading}
            className={styles.button}
            aria-label="Search weather"
          >
            {loading ? '🔍' : '🔍'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default CitySearch