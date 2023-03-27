import { create } from 'zustand'

const URL = '/me'

const useUserSeqStore = create((set, get) => ({
    userSeqs: [],
    fetchSeqs: () => {
        return(fetch(URL)
        .then(r => r.json())
        .then(r => set((state) => state.userSeqs = r.sequences))
        )
    },
    updateSeqs: (incoming) => set((state) => state.useSeqs = incoming),
    deleteSequence: (id) => {
        return(
            fetch(`/sequences/${id}`, {
                method: "DELETE",
              })
        )
        }
}))

export default useUserSeqStore