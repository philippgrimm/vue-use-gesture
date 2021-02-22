import { UseMoveConfig, Handler, EventTypes } from '../types'
import { _buildMoveConfig } from './buildConfig'
import useRecognizers from './useRecognizers'
import { RecognizersMap } from '../recognizers/Recognizer'
import { MoveRecognizer } from '../recognizers/MoveRecognizer'
import memoize from '../utils/memoize-one'
import isEqual from '../utils/react-fast-compare'
import { ref } from 'vue'

/**
 * Move hook.
 *
 * @param handler - the function fired every time the move gesture updates
 * @param [config={}] - the config object including generic options and move options
 */
export function useMove<K = EventTypes['move']>(handler: Handler<'move', K>, config: UseMoveConfig | {} = {}) {
  RecognizersMap.set('move', MoveRecognizer)
  const buildMoveConfig = ref<any>()
  if (!buildMoveConfig.value) {
    buildMoveConfig.value = memoize(_buildMoveConfig, isEqual)
  }
  return useRecognizers<UseMoveConfig>({ move: handler }, buildMoveConfig.value(config))
}
