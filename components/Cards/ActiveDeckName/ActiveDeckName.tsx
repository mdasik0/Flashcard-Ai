import React from 'react'

export default function ActiveDeckName({activeDeckName}: {activeDeckName: string}) {
  return (
     <div className="absolute sm:right-[16%] text-lg sm:top-[38px] top-4 text-green-500">
          {activeDeckName}
        </div>
  )
}
