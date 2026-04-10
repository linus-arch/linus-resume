'use client'

import React from 'react'

interface ChaosphereLogoProps {
  size?: number
  className?: string
}

export default function ChaosphereLogo({ size = 40, className = '' }: ChaosphereLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Central circle */}
      <circle
        cx="50"
        cy="50"
        r="8"
        fill="url(#gradient1)"
        stroke="url(#gradient2)"
        strokeWidth="2"
      />
      
      {/* 8 arrows pointing outward in all directions */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, index) => {
        const radians = (angle * Math.PI) / 180
        const startX = 50 + Math.cos(radians) * 12
        const startY = 50 + Math.sin(radians) * 12
        const endX = 50 + Math.cos(radians) * 45
        const endY = 50 + Math.sin(radians) * 45
        
        // Arrow tip points
        const arrowSize = 8
        const arrowAngle1 = radians + (2.8 * Math.PI) / 4
        const arrowAngle2 = radians - (2.8 * Math.PI) / 4
        const tip1X = endX + Math.cos(arrowAngle1) * arrowSize
        const tip1Y = endY + Math.sin(arrowAngle1) * arrowSize
        const tip2X = endX + Math.cos(arrowAngle2) * arrowSize
        const tip2Y = endY + Math.sin(arrowAngle2) * arrowSize
        
        return (
          <g key={angle}>
            {/* Arrow shaft */}
            <line
              x1={startX}
              y1={startY}
              x2={endX}
              y2={endY}
              stroke={`url(#gradient${(index % 4) + 3})`}
              strokeWidth="3"
              strokeLinecap="round"
            />
            
            {/* Arrow head */}
            <polygon
              points={`${endX},${endY} ${tip1X},${tip1Y} ${tip2X},${tip2Y}`}
              fill={`url(#gradient${(index % 4) + 3})`}
            />
            
            {/* Small circle at arrow end */}
            <circle
              cx={endX}
              cy={endY}
              r="3"
              fill={`url(#gradient${(index % 4) + 3})`}
            />
          </g>
        )
      })}
      
      {/* Gradients for psychedelic colors */}
      <defs>
        <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF6B9D" />
          <stop offset="100%" stopColor="#FFA07A" />
        </linearGradient>
        
        <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#9D50BB" />
          <stop offset="100%" stopColor="#6E48AA" />
        </linearGradient>
        
        <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4FACFE" />
          <stop offset="100%" stopColor="#00F2FE" />
        </linearGradient>
        
        <linearGradient id="gradient4" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFB75E" />
          <stop offset="100%" stopColor="#ED8F03" />
        </linearGradient>
        
        <linearGradient id="gradient5" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#A8EDEA" />
          <stop offset="100%" stopColor="#FED6E3" />
        </linearGradient>
        
        <linearGradient id="gradient6" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#C471F5" />
          <stop offset="100%" stopColor="#FA71CD" />
        </linearGradient>
      </defs>
    </svg>
  )
}
