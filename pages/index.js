import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { Tag } from './../components';


const Home = ({ posts }) => {
	return (
		<>
			<section className='container'>
				<div className='posts'>
					<div className="">Ultimos Articulos</div>
					{posts.map((post, id) =>
						<div key={id} className='list'>
							<div>
								<Image src={`/assets/${post.data.type}.png`} width={70} height={70} />
							</div>
							<div className='infoContainer'>
								<Link href={`/blog/${post.slug}`}>
									<a>
										<div>
											{post.data.title}
										</div>
										<div className='subtitle'>
											{post.data.date}
										</div>
									</a>
								</Link>
							</div>
						</div>)}
				</div>
				<div className="tag">
					<Tag/>
				</div>
			</section>
			<style jsx>{`
				section.container {
					max-width: 800px;
					width: 100%;
					margin: 0 auto;
					display: grid;
					grid-template-columns: auto 2fr .5fr;
    			grid-template-rows: 50px auto;
					padding: 20px;
					width: 800px;
				} 
				.posts {
					grid-row: 1;
					grid-column: 2;
				}
				.tag {
					grid-row: 1;
					grid-column:3
				}
				.title {
					margin-top:50px;		
				}
        .list{
					color: #000;
					display:flex;
					font-size:24px;
        }
        .list .subtitle {
          font-size:14px;
        }
        .infoContainer{
          padding: 10px 0;
          margin-left: 10px;
        }
      `}</style>

		</>
	)
}

Home.propTypes = {
	posts: PropTypes.array
}


export default Home

export async function getStaticProps() {
	const files = fs.readdirSync(path.join('posts'))
	const posts = files.map(file => {
		const slug = file.replace('.md', '')
		const markdoWithMeta = fs.readFileSync(path.join('posts', file), 'utf-8')
		const { data } = matter(markdoWithMeta)
		return {
			slug,
			data
		}
	}).filter(({ data }) => data.status === 'published').sort((a, b) => moment(a.data.date).isBefore(b.data.date) ? 1 : -1)
	return {
		props: {
			posts
		}
	}
}
