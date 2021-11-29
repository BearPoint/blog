import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export const Header = () => {
	return (
		<>
			<header>
				<div className='container'>
					<div  className="logo-container">
						<Link href="/">
							<a className='logo'>
								<Image src='/assets/bear.png' width={40} height={40} />
								<span>Bearpoint </span>
							</a>
						</Link>
					</div>
					{/* <nav>
							<ul className={`${styles.list} ${state ? styles.open : ''}`}>
									<li>item</li>
									<li>item</li>
									<li>item</li>
									<li>item</li>
									<li className={styles.icon} onClick={() => setState(!state)}>
											<Image src="/assets/bars-solid.svg" width={20} height={20} />
									</li>

							</ul>
					</nav> */}
				</div>
			</header>
			<style jsx>{`
				header {
					background-color: cadetblue;
				}
				.container {
					display: grid;
					grid-template-columns: .5fr 1fr .5fr;	
					height: 80px;
				}
				.logo-container {
					grid-row: 1; 
					grid-column: 2;
					display:flex;
				}
				.logo {
					display: flex;
					align-items: center;
				}

				.logo span {
					padding-left: 10px;
				}
			`}</style>
		</>
	)
}