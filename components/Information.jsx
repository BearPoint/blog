import Image from 'next/image'
import React from 'react'

export const Information = () => {
	return (
		<>
			<div className="container">
				<Image src={'/assets/javascript.png'} width={50} height={50} className='infoImage' />
				<div>francisco Villarreal</div>
			</div>
			<style jsx>{`
                .container{
                    background-color: red
                }
                .infoImage{
                    margin:o auto
                }
        `}</style>
		</>
	)
}