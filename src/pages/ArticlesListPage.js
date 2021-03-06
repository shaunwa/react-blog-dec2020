import { Link } from 'react-router-dom'
import { articles } from './article-content';

export const ArticlesListPage = () => {
    return (
        <>
        <h1>Articles</h1>
        {articles.map(article => (
            <Link className="article-list-item" to={`/articles/${article.name}`}>
                <div key={article.name}>
                    <h3>{article.title}</h3>
                    <p>{article.content[0].substring(0, 150)}...</p>
                </div>
            </Link>
        ))}
        </>
    );
}