import { createStore } from 'vuex'

// Create a new store instance.
export const store = createStore({
  state () {
    return {
      count: 0
    }
  }
})
