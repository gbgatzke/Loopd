import {create} from 'zustand'

const useBpmStore = create((set, get) => ({
    bpm: 120,
    updateBpm: (incoming) => set(() => ({bpm: incoming}))
}))

export default useBpmStore