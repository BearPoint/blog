import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export const Header = () => {
	return (
		<>
			<header>
				<div className='container'>
					<div >
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
				.container {
						padding: 10px;
						display: flex;
						justify-content: space-between;
						algin-items: center;
						height: 80px;
						max-width: 800px;
						margin: 0 auto;
				}
				header {
						background-color: cadetblue;
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