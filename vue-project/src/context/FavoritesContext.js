import { reactive, readonly, inject, provide } from 'vue'

const FavoritesSymbol = Symbol('FavoritesContext')

export function provideFavorites() {
  const state = reactive({
    favorites: JSON.parse(localStorage.getItem('favorites') || '[]')
  })

  function addToFavorites(movie) {
    if (!state.favorites.some(m => m.id === movie.id)) {
      state.favorites.push(movie)
      localStorage.setItem('favorites', JSON.stringify(state.favorites))
    }
  }

  function removeFromFavorites(id) {
    state.favorites = state.favorites.filter(m => m.id !== id)
    localStorage.setItem('favorites', JSON.stringify(state.favorites))
  }

  function isFavorite(id) {
    return state.favorites.some(m => m.id === id)
  }

  provide(FavoritesSymbol, {
    favorites: readonly(state.favorites),
    addToFavorites,
    removeFromFavorites,
    isFavorite,
  })
}

export function useFavorites() {
  return inject(FavoritesSymbol)
}
