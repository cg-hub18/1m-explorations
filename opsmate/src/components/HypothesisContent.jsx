import { useState } from 'react'
import { ChevronDown, ChevronUp, ExternalLink, Table2, TrendingDown, TrendingUp, Sparkles, CheckCircle2, AlertTriangle } from 'lucide-react'

export default function HypothesisContent({ content }) {
  const [expandedHypotheses, setExpandedHypotheses] = useState({})
  const [backtestView, setBacktestView] = useState('chart')

  const toggleHypothesis = (id) => {
    setExpandedHypotheses(prev => ({
      ...prev,
      [id]: !prev[id]
    }))
  }

  // Quality Summary Visual Component
  const QualitySummaryVisual = () => (
    <div className="space-y-4 pt-2">
      {/* Metrics Row */}
      <div className="grid grid-cols-3 gap-4">
        {/* Precision Last 30 Days */}
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="text-xs text-gray-500 font-medium mb-1">Precision</div>
          <div className="text-xs text-gray-400 mb-2">last 30 days</div>
          <div className="flex items-center gap-1.5">
            <span className="text-2xl font-semibold text-red-500">50%</span>
            <TrendingDown className="w-4 h-4 text-red-400" />
          </div>
        </div>

        {/* Precision if Applied */}
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="text-xs text-gray-500 font-medium mb-1">Precision</div>
          <div className="flex items-center gap-1 text-xs text-gray-400 mb-2">
            <Sparkles className="w-3 h-3" />
            <span>if recommendation applied</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-2xl font-semibold text-green-500">80%</span>
            <TrendingUp className="w-4 h-4 text-green-400" />
          </div>
        </div>

        {/* Last 30 Days Runs */}
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="text-xs text-gray-500 font-medium mb-1">Last 30 days runs</div>
          <div className="text-xs text-gray-400 mb-2">stops/runs</div>
          <div className="text-2xl font-semibold text-gray-900">20 / 100</div>
        </div>
      </div>
    </div>
  )

  // Backtesting Visual Component
  const BacktestingVisual = () => (
    <div className="space-y-4 pt-2">
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
          <span className="text-sm font-medium text-gray-900">Backtesting view</span>
          <div className="flex rounded-lg overflow-hidden border border-gray-200">
            <button 
              onClick={() => setBacktestView('chart')}
              className={`px-4 py-1.5 text-sm font-medium transition-colors ${
                backtestView === 'chart' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              Chart view
            </button>
            <button 
              onClick={() => setBacktestView('stops')}
              className={`px-4 py-1.5 text-sm font-medium transition-colors ${
                backtestView === 'stops' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              Stops view
            </button>
          </div>
        </div>

        {/* Summary text */}
        <div className="px-4 pt-4">
          <p className="text-sm text-gray-600 leading-relaxed">
            Backtesting analysis over the past 24 hours shows <span className="font-medium text-green-600">2 true positive stops</span> that 
            successfully prevented potential incidents. One <span className="font-medium text-red-600">SEV was detected</span> at 11:00 
            which correlated with an anomaly spike. The protection mechanism demonstrated <span className="font-medium">85% accuracy</span> in 
            identifying actionable events before escalation.
          </p>
        </div>

        {/* Chart Area */}
        <div className="px-4 py-4">
          <div className="relative h-48 border-l border-b border-gray-200 overflow-hidden">
            {/* Y-axis labels */}
            <div className="absolute -left-8 top-0 text-xs text-gray-500">100</div>
            <div className="absolute -left-6 top-1/4 text-xs text-gray-500">75</div>
            <div className="absolute -left-6 top-1/2 text-xs text-gray-500">50</div>
            <div className="absolute -left-6 top-3/4 text-xs text-gray-500">25</div>
            <div className="absolute -left-4 bottom-0 text-xs text-gray-500">0</div>

            {/* Grid lines */}
            <div className="absolute inset-0">
              <div className="absolute w-full border-t border-gray-100" style={{ top: '25%' }} />
              <div className="absolute w-full border-t border-gray-100" style={{ top: '50%' }} />
              <div className="absolute w-full border-t border-gray-100" style={{ top: '75%' }} />
            </div>

            {/* Highlighted region (pink area) */}
            <div className="absolute bg-red-50" style={{ left: '35%', right: '30%', top: 0, bottom: 0 }} />

            {/* Chart line (SVG) */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <polyline
                fill="none"
                stroke="#4338ca"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
                points="0,80 8,82 16,78 24,85 32,75 40,70 48,60 56,15 64,35 72,40 80,50 88,55 96,45 100,50"
              />
            </svg>

            {/* True Positive Stop marker 1 */}
            <div className="absolute" style={{ left: '35%', top: 0, bottom: 0 }}>
              <div className="w-0.5 h-full bg-green-500" />
              <div className="absolute -top-1 -left-2">
                <CheckCircle2 className="w-4 h-4 text-green-500 fill-white" />
              </div>
            </div>

            {/* SEV marker */}
            <div className="absolute" style={{ left: '55%', top: 0, bottom: 0 }}>
              <div className="w-0.5 h-full bg-red-500" />
              <div className="absolute -top-1 -left-2">
                <AlertTriangle className="w-4 h-4 text-red-500 fill-white" />
              </div>
            </div>

            {/* True Positive Stop marker 2 */}
            <div className="absolute" style={{ left: '70%', top: 0, bottom: 0 }}>
              <div className="w-0.5 h-full bg-green-500" />
              <div className="absolute -top-1 -left-2">
                <CheckCircle2 className="w-4 h-4 text-green-500 fill-white" />
              </div>
            </div>
          </div>

          {/* X-axis labels */}
          <div className="flex justify-between mt-2 text-xs text-gray-500">
            <span>07:00</span>
            <span>08:00</span>
            <span>09:00</span>
            <span>10:00</span>
            <span>11:00</span>
            <span>16:00</span>
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-6 px-4 pb-4">
          <div className="flex items-center gap-2">
            <div className="w-1 h-4 bg-green-500 rounded" />
            <span className="text-xs text-gray-600">True Positive Stops</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1 h-4 bg-gray-400 rounded" />
            <span className="text-xs text-gray-600">False Positive Stops</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1 h-4 bg-red-500 rounded" />
            <span className="text-xs text-gray-600">SEVs</span>
          </div>
        </div>
      </div>
    </div>
  )

  // Thresholds Visual Component
  const ThresholdsVisual = () => (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      <p className="text-sm text-gray-700 leading-relaxed">
        An incident task with <span className="font-semibold">High priority</span> will be assigned to{' '}
        <span className="text-blue-600">&lt;User name&gt;</span> once the difference between{' '}
        <span className="font-semibold">control vs. test is 3%</span> or more
      </p>
    </div>
  )

  // Parse and render text with SEV/diff links
  const renderTextWithLinks = (text) => {
    const linkPattern = /(SEV\s*)?(S\d+|D\d+)/g
    const parts = []
    let lastIndex = 0
    let match

    while ((match = linkPattern.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(text.slice(lastIndex, match.index))
      }
      if (match[1]) {
        parts.push(match[1])
      }
      parts.push(
        <a 
          key={match.index}
          href="#" 
          className="text-blue-600 hover:text-blue-700 hover:underline"
          onClick={(e) => e.preventDefault()}
        >
          {match[2]}
        </a>
      )
      lastIndex = match.index + match[0].length
    }
    
    if (lastIndex < text.length) {
      parts.push(text.slice(lastIndex))
    }

    return parts
  }

  const renderDetailedSteps = (steps) => {
    return (
      <div className="space-y-6 pt-4">
        {steps.map((step, index) => (
          <div key={index} className="space-y-3">
            {/* Step Header */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm font-semibold text-gray-900">
                {index + 1}. {step.title}:
              </span>
              {step.tableName && (
                <code className="px-2 py-0.5 bg-gray-100 text-gray-700 text-sm rounded font-mono">
                  {step.tableName}
                </code>
              )}
            </div>

            {/* Scuba Card */}
            {step.query && (
              <div className="border border-gray-200 rounded-lg bg-white">
                {/* Card Header */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                  <div className="flex items-center gap-2">
                    <Table2 className="w-4 h-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-700">Scuba</span>
                  </div>
                  <a 
                    href="#" 
                    className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-blue-600 transition-colors"
                    onClick={(e) => e.preventDefault()}
                  >
                    View in Scuba
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                {/* Card Content */}
                <div className="px-4 py-3 space-y-2">
                  <p className="text-sm font-semibold text-gray-900">{step.query.table}</p>
                  
                  {step.query.filters && (
                    <p className="text-sm text-gray-600">
                      <span className="text-gray-500">Filters:</span> {step.query.filters}
                    </p>
                  )}
                  
                  {step.query.groupBy && (
                    <p className="text-sm text-gray-600">
                      <span className="text-gray-500">Group by:</span> {step.query.groupBy}
                    </p>
                  )}
                  
                  {step.query.timeRange && (
                    <p className="text-sm text-gray-600">
                      <span className="text-gray-500">Time range:</span> {step.query.timeRange}
                    </p>
                  )}
                  
                  {step.query.lookFor && (
                    <p className="text-sm text-gray-600">
                      <span className="text-gray-500">Look for:</span> {step.query.lookFor}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Summary */}
      <p className="text-sm text-gray-700 leading-relaxed">
        {content.summary}
      </p>

      {/* Hypotheses */}
      <div className="space-y-6">
        {content.hypotheses.map((hypothesis, index) => (
          <div key={hypothesis.id} className="space-y-3">
            {/* Thresholds - special rendering without rationale or detailed steps */}
            {hypothesis.id === 'thresholds' ? (
              <>
                <h4 className="text-sm font-bold text-gray-900 mb-2">
                  {hypothesis.title}
                </h4>
                <ThresholdsVisual />
              </>
            ) : (
              <>
                <div>
                  <h4 className="text-sm font-bold text-gray-900 mb-2">
                    {hypothesis.title}
                  </h4>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    <span className="font-medium">Rationale</span> – {renderTextWithLinks(hypothesis.rationale)}
                  </p>
                </div>

                {/* Detailed Steps Accordion */}
                <div className="border border-gray-200 rounded-lg bg-gray-50 overflow-hidden">
                  <button
                    onClick={() => toggleHypothesis(hypothesis.id)}
                    className="flex items-center justify-between w-full px-4 py-3 hover:bg-gray-100 transition-colors"
                  >
                    <span className="text-sm font-medium text-gray-700">Detailed Steps</span>
                    {expandedHypotheses[hypothesis.id] ? (
                      <ChevronUp className="w-4 h-4 text-gray-500" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-gray-500" />
                    )}
                  </button>

                  {expandedHypotheses[hypothesis.id] && hypothesis.detailedSteps && (
                    <div className="px-4 pb-4 animate-fade-in">
                      {hypothesis.id === 'quality-summary' ? (
                        <QualitySummaryVisual />
                      ) : hypothesis.id === 'backtesting' ? (
                        <BacktestingVisual />
                      ) : (
                        renderDetailedSteps(hypothesis.detailedSteps)
                      )}
                    </div>
                  )}
                </div>
              </>
            )}

            {/* Divider between hypotheses */}
            {index < content.hypotheses.length - 1 && (
              <hr className="border-gray-200 mt-4" />
            )}
          </div>
        ))}
      </div>

      {/* Next Steps */}
      {content.nextSteps && (
        <div className="space-y-3 pt-2">
          <h4 className="text-sm font-bold text-gray-900">Next Steps</h4>
          <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
            {content.nextSteps.map((step, index) => (
              <li key={index} className="leading-relaxed">
                {renderTextWithLinks(step)}
              </li>
            ))}
          </ol>
          
          {/* Execute Protection Button */}
          <button
            className="mt-4 px-4 py-2.5 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-lg transition-colors shadow-sm"
            onClick={() => alert('Protection executed!')}
          >
            Execute Protection
          </button>
        </div>
      )}
    </div>
  )
}
