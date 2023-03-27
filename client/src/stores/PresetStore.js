import {create} from 'zustand'

const URL = '/presets'
const usePresetStore = create((set, get) => ({
    presets: [],
    fetchPresets: () => {
        return (
            fetch(URL)
            .then(r => r.json())
            .then(r => set((state) => state.presets = r))
        )
    }
}))

export default usePresetStore