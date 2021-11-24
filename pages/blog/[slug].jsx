import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { marked } from 'marked'
import styles from './../../styles/post.module.css'
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
		<>
			<div className={styles.navigation}>
				<ul className={styles.list}>
					<li>index</li>
					{header && header.map((subtitles, id) => <li key={id} className={`level-${subtitles.level}`}>{subtitles.title}</li>)}
				</ul>
			</div>
			<article className={styles.container}>
				<div className={styles.titleContainer}>
					<div className={styles.imageContainer}>
						<Image src={`/assets/${meta.type}.png`} width={70} height={70} />
					</div>
					<div>
						<h1 className={styles.title}>{meta.title}</h1>
						<span className={styles.details}>{meta.date}</span>
						<span className={styles.details}>{meta.author}</span>
					</div>
				</div>
				<div dangerouslySetInnerHTML={{ __html: marked(content) }}>

				</div>
			</article>
			<style jsx>{`
                ul.${styles.list} li.level-3{
                    padding-left: 20px;
                    font-size: 12px;
                    
				}
				div.highlight {
					position: relative;
					background-color:red;

				}
				code.language-javascript::befor {
					width: 32px;
					height: 32px;
					background-color:red;
					position: absolute;
					top:-12px;
					rigth: 8px;
				}
				
            `}</style>
		</>
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
	const header = [];//getHeaders(content)
	return {
		props: {
			meta,
			content,
			header,

		}
	}

}

const getHeaders = (content) => {
	const startTitle = content.search(/[#]+ [A-z0-9 ]+\n/g)
	const endTitle = content.slice(startTitle).search(/\n/g)
	const title = content.slice(startTitle, (startTitle + endTitle))
	const newContent = content.slice((startTitle + endTitle))
	const newStartTitle = newContent.search(/## [A-z0-9 ]+\n/g)
	const level = title.search(' ')
	if (newStartTitle == -1) return [{ title: title.substring(level), level }]
	const newArray = getHeaders(newContent)
	return [{ title: title.substring(level), level }, ...newArray]
}