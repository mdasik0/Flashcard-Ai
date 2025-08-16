import React from 'react'

export default function decksPage() {
  console.log('learning and testing code.')
  const testPromise = new Promise((resolve,reject)=> {
    setTimeout(()=> {
      const success = false;
      if(success){
        resolve('Good Job')
      } else {
        reject('You did a bad job')
      }
    },2000)
  })

  testPromise.then(r => console.log('promise fulfilled', r)).catch(err => console.log('promise rejected', err))
  return (
    <div  className="flex items-center justify-center w-full">decksPage</div>
  )
}
