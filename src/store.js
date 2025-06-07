
// 1️⃣ Initial state
export const initialStore = () => ({
  people: [],
  vehicles: [],
  planets: [],
  favorites: []
});

// 2️⃣ Reducer
export default function storeReducer(store, action = {}) {
  switch (action.type) {

    // — Favorites toggle (already in place) —
    case "TOGGLE_FAVORITE": {
      const item = action.payload;
      const exists = store.favorites.some(
        f => f.type === item.type && f.id === item.id
      );
      return {
        ...store,
        favorites: exists
          ? store.favorites.filter(
              f => !(f.type === item.type && f.id === item.id)
            )
          : [...store.favorites, item]
      };
    }

    // — New: set data from SWAPI —
    case "SET_PEOPLE":
      return { ...store, people: action.payload };

    case "SET_VEHICLES":
      return { ...store, vehicles: action.payload };

    case "SET_PLANETS":
      return { ...store, planets: action.payload };

    // — Fallback —
    default:
      return store;
  }
}
