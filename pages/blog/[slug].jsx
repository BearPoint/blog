import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { marked } from 'marked'
import Image from 'next/image'
import React, { useEffect } from 'react'
import PropTypes from 'prop-types';
import hljs from 'highlight.js';
import 'highlight.js/styles/stackoverflow-dark.css';


const PostPage = ({ meta, content, header }) => {
	useEffect(() => {
		hljs.highlightAll();
	}, [])
	return (
		<div className='post-container'>
			<article className='container'>
				<div className='titleContainer'>
					<div>
						<Image src={`/assets/${meta.type}.png`} width={70} height={70} />
					</div>
					<div>
						<h1 className='title'>{meta.title}</h1>
						<span className='details'>{meta.date}</span>
						<span className='details'>{meta.author}</span>
					</div>
				</div>
				<div dangerouslySetInnerHTML={{ __html: marked(content) }}></div>
			</article>
			<div className='navigation'>
				<ul className='list'>
					<li>index</li>
					{header && header.map((subtitles, id) => <li key={id} className={`level-${subtitles.level}`}>{subtitles.title}</li>)}
				</ul>	
			</div>
			<style jsx>{`
                ul.list li.level-3{
                    padding-left: 20px;
                    font-size: 12px;
				}
				.post-container {
					display: grid;
					grid-template-columns: .5fr 1fr .5fr;
					padding-top:50px;
					
				}
				.container {
					grid-row: 1; 
   					grid-column: 2;
					max-width: 800px;
					width: 100%;
				}
				.titleContainer {
					display: flex;
					margin-bottom: 40px;
				}
				.title {
					margin: 0;
					padding: 10px 0px;
				}
				
				.details {
					margin-right: 20px;
					font-size: 12px;
				}
				.navigation {
					grid-column: 3;
					grid-row: 1;
				}
				.list {
					list-style: none;
				}
				
				.list li {
					padding: 10px 10px;
					color: #555;
				}
			
            `}</style>
		</div>
	)
}

PostPage.propTypes = {
	meta: PropTypes.shape({
		title: PropTypes.string,
		date: PropTypes.string,
		author: PropTypes.string,
		type: PropTypes.string
	}),
	header: PropTypes.array,
	content: PropTypes.string
}

export default PostPage


export async function getStaticPaths() {
	const files = fs.readdirSync(path.join('posts'))
	const paths = files.map(file => {
		const markdoWithMeta = fs.readFileSync(path.join('posts', file), 'utf-8')
		const { data } = matter(markdoWithMeta)
		return {
			params: {
				slug: file.replace('.md', ''),
				status: data.status
			}
		}
	}).filter(({ params }) => params.status === 'published');
	return {
		paths,
		fallback: false
	}
}
export async function getStaticProps({ params: { slug } }) {
	const markdoWithMeta = fs.readFileSync(path.join('posts', slug + '.md'), 'utf8')
	const { data: meta, content } = matter(markdoWithMeta)
	const header = getHeaders(content);
	console.log({header})
	return {
		props: {
			meta,
			content,
			header,

		}
	}

}

const getHeaders = (content) => {
	const headerTitle = /[#]+ [A-z0-9 ]+\r\n/g
	const startTitle = content.search(headerTitle)
	const endTitle = content.slice(startTitle).search(/\n/g)
	const title = content.slice(startTitle, (startTitle + endTitle))
	const newContent = content.slice((startTitle + endTitle))
	const level = title.search(' ')
	console.log({startTitle,endTitle, title})
	if (startTitle == -1) return [];
	const newArray = getHeaders(newContent)
	return [{ title: title.substring(level), level }, ...newArray]
}