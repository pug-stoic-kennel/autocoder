import { Play, Square, Loader2 } from 'lucide-react'
import {
  useStartAgent,
  useStopAgent,
  useSettings,
} from '../hooks/useProjects'
import type { AgentStatus } from '../lib/types'

interface AgentControlProps {
  projectName: string
  status: AgentStatus
}

export function AgentControl({ projectName, status }: AgentControlProps) {
  const { data: settings } = useSettings()
  const yoloMode = settings?.yolo_mode ?? false

  const startAgent = useStartAgent(projectName)
  const stopAgent = useStopAgent(projectName)

  const isLoading = startAgent.isPending || stopAgent.isPending

  const handleStart = () => startAgent.mutate(yoloMode)
  const handleStop = () => stopAgent.mutate()

  // Simplified: either show Start (when stopped/crashed) or Stop (when running/paused)
  const isStopped = status === 'stopped' || status === 'crashed'

  return (
    <div className="flex items-center">
      {isStopped ? (
        <button
          onClick={handleStart}
          disabled={isLoading}
          className={`neo-btn text-sm py-2 px-3 ${
            yoloMode ? 'neo-btn-yolo' : 'neo-btn-success'
          }`}
          title={yoloMode ? 'Start Agent (YOLO Mode)' : 'Start Agent'}
          aria-label={yoloMode ? 'Start Agent in YOLO Mode' : 'Start Agent'}
        >
          {isLoading ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            <Play size={18} />
          )}
        </button>
      ) : (
        <button
          onClick={handleStop}
          disabled={isLoading}
          className={`neo-btn text-sm py-2 px-3 ${
            yoloMode ? 'neo-btn-yolo' : 'neo-btn-danger'
          }`}
          title={yoloMode ? 'Stop Agent (YOLO Mode)' : 'Stop Agent'}
          aria-label={yoloMode ? 'Stop Agent in YOLO Mode' : 'Stop Agent'}
        >
          {isLoading ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            <Square size={18} />
          )}
        </button>
      )}
    </div>
  )
}
