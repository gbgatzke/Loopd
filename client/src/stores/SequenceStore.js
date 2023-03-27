import { create} from 'zustand'

const useSequenceStore = create((set, get) => ({
    sequence: [],
    updateSequence: (incoming) => set((state) => state.sequence = incoming)
}))

export default useSequenceStore