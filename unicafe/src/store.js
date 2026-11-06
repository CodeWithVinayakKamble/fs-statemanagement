import { create } from 'zustand'

const useUniCafeStore = create(set => ({
    good: 0,
    neutral: 0,
    bad: 0,
    // all: 0,
    actions: {
        good: () => (set(state => ({
            good: state.good + 1,
        }))),
        neutral: () => (set(state => ({
            neutral: state.neutral + 1,
        }))),
        bad: () => (set(state => ({
            bad: state.bad + 1,
        }))),
    }
}))

export const useGood = () => useUniCafeStore(state => state.good)
export const useNeutral = () => useUniCafeStore(state => state.neutral)
export const useBad = () => useUniCafeStore(state => state.bad)


export const useRatingController = () => useUniCafeStore(state => state.actions)