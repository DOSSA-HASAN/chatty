import React from 'react'

function SidebarSkeleton() {

    const skeletonMessages = new Array(8).fill(null)

  return (
    <section className='flex flex-col justify-start item-center h-screen'>
        {
            skeletonMessages.map((mssg) => (
                <main className="p-3 mt-3 mb-t-3 flex justify-evenly items-center">
                    <div className='rounded-full bg-base-300 animate-pulse w-10 h-10'></div>
                    <article className='flex flex-col justify-center items-start'>
                        <div className='w-50 rounded-md mt-2 mb-2 h-5 bg-base-300 animate-pulse'></div>
                        <div className='w-20 rounded-md mt-2 mb-2 h-5 bg-base-300 animate-pulse'></div>
                    </article>
                </main>
            ))
        }
    </section>
  )
}

export default SidebarSkeleton
