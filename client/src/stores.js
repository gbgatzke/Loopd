import { create } from 'zustand'

const URL = "/me"
const useUserStore = create((set, get) => ({
    zuUser: null,
    fetchUser: () => {
        return(fetch(URL)
        .then(r => r.json())
        .then(r => set((state) => state.zuUser = r))
    )},
    updateUser: (incoming) => set(() => ({zuUser: incoming})),
    logoutUser: () => {
        return(
            fetch('/logout', {
                method: 'DELETE'
            })
        )
    }
}))

export default useUserStore