import { useState } from 'react'
import { Palette, Box, RotateCcw, Layers } from 'lucide-react'

const COLORS = [
  { name: 'Ocean Blue', value: '#3b82f6' },
  { name: 'Crimson Red', value: '#ef4444' },
  { name: 'Emerald Green', value: '#10b981' },
  { name: 'Royal Purple', value: '#8b5cf6' },
  { name: 'Sunset Orange', value: '#f97316' },
  { name: 'Midnight Black', value: '#1e293b' },
  { name: 'Pearl White', value: '#f8fafc' },
  { name: 'Rose Gold', value: '#fb7185' }
]

const MATERIALS = [
  { name: 'Standard', value: 'standard', icon: Box },
  { name: 'Metallic', value: 'metallic', icon: Layers },
  { name: 'Matte', value: 'matte', icon: Box },
  { name: 'Glossy', value: 'glossy', icon: Layers }
]

export default function ControlPanel({ config, onChange }) {
  return (
    <div className="absolute right-6 top-6 bottom-6 w-80 flex flex-col gap-4">
      {/* Panel */}
      <div className="bg-surface/90 backdrop-blur-xl border border-slate-700 rounded-2xl p-6 flex flex-col gap-6 shadow-2xl">
        {/* Header */}
        <div>
          <h2 className="text-xl font-semibold flex items-center gap-2 text-white">
            <Palette className="w-5 h-5 text-blue-500" />
            Customize
          </h2>
          <p className="text-sm text-slate-400 mt-1">Make it yours</p>
        </div>

        {/* Color Selection */}
        <div>
          <label className="text-sm font-medium text-slate-300 mb-3 block">
            Color
          </label>
          <div className="grid grid-cols-4 gap-2">
            {COLORS.map((color) => (
              <button
                key={color.value}
                onClick={() => onChange({ ...config, color: color.value })}
                className={`
                  w-12 h-12 rounded-xl border-2 transition-all duration-200
                  ${config.color === color.value 
                    ? 'border-blue-500 scale-110 shadow-lg' 
                    : 'border-transparent hover:scale-105'}
                `}
                style={{ backgroundColor: color.value }}
                title={color.name}
              />
            ))}
          </div>
        </div>

        {/* Material Selection */}
        <div>
          <label className="text-sm font-medium text-slate-300 mb-3 block">
            Material
          </label>
          <div className="grid grid-cols-2 gap-2">
            {MATERIALS.map((mat) => {
              const Icon = mat.icon
              return (
                <button
                  key={mat.value}
                  onClick={() => onChange({ ...config, material: mat.value })}
                  className={`
                    flex items-center gap-2 px-4 py-3 rounded-xl border transition-all
                    ${config.material === mat.value
                      ? 'bg-blue-500/20 border-blue-500 text-blue-400'
                      : 'bg-slate-800/50 border-slate-700 hover:border-slate-500 text-slate-300'}
                  `}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{mat.name}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Scale Slider */}
        <div>
          <label className="text-sm font-medium text-slate-300 mb-3 block flex justify-between">
            <span>Size</span>
            <span className="text-blue-500">{config.scale.toFixed(1)}x</span>
          </label>
          <input
            type="range"
            min="0.5"
            max="2"
            step="0.1"
            value={config.scale}
            onChange={(e) => onChange({ ...config, scale: parseFloat(e.target.value) })}
            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
          />
        </div>

        {/* Auto Rotate Toggle */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-slate-300">Auto Rotate</span>
          <button
            onClick={() => onChange({ ...config, autoRotate: !config.autoRotate })}
            className={`
              w-12 h-6 rounded-full transition-colors relative
              ${config.autoRotate ? 'bg-blue-500' : 'bg-slate-700'}
            `}
          >
            <div className={`
              w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform
              ${config.autoRotate ? 'translate-x-6' : 'translate-x-0.5'}
            `} />
          </button>
        </div>

        {/* Reset Button */}
        <button
          onClick={() => onChange({
            color: '#3b82f6',
            material: 'standard',
            scale: 1,
            autoRotate: true
          })}
          className="flex items-center justify-center gap-2 w-full py-3 rounded-xl
                     bg-slate-800 hover:bg-slate-700 border border-slate-700
                     transition-colors text-sm font-medium text-white"
        >
          <RotateCcw className="w-4 h-4" />
          Reset to Default
        </button>
      </div>
    </div>
  )
}