import Image from 'next/image'
import React from 'react'


export const Tag = () => {
	return (
		<>
			<div className="container">
				<Image src={'/assets/javascript.png'} width={50} height={50} className='infoImage' />
				<div>francisco Villarreal</div>
			</div>
			<style jsx>{`
                .container{
                }
                .infoImage{
					text-align: center;
                    margin: 0 auto;
					border-radius: 50%;
                }
        `}</style>
		</>
	)
}