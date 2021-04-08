import { useSelector } from 'react-redux'
import { AppState } from 'state'

export function useBlockNumber(): number | undefined {
    return useSelector((state: AppState) => state.app.blockNumber)
}
