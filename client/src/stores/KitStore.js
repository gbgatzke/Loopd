import {create} from 'zustand'

const useKitStore = create((set, get) => ({
    currentKit: 'soundMap1',
    updateKit: (incoming) => set(() => ({currentKit: incoming}))
}))

export default useKitStore