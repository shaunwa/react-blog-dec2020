import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { articles } from './article-content';

export const ArticlePage = () => {
    const { articleName } = useParams();
    const matchingArticle = articles.find(article => article.name === articleName);
    const [isLoading, setIsLoading] = useState(true);
    const [articleInfo, setArticleInfo] = useState({ upvotes: 0, comments: [] });
    const [commentName, setCommentName] = useState('');
    const [commentText, setCommentText] = useState('');
    
    useEffect(() => {
        const loadArticleInfo = async () => {
            const response = await fetch(`/api/articles/${articleName}`);
            const articleInfo = await response.json();
            setArticleInfo(articleInfo);
            setIsLoading(false);
        }

        loadArticleInfo();
    }, [articleName]);

    const upvoteArticle = async () => {
        const response = await fetch(`/api/articles/${articleName}/upvotes`, {
            method: 'post',
        });
        const updatedArticleInfo = await response.json();
        setArticleInfo(updatedArticleInfo);
    }

    const addComment = async () => {
        const response = await fetch(`/api/articles/${articleName}/comments`, {
            method: 'post',
            body: JSON.stringify({
                postedBy: commentName,
                text: commentText,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const updatedArticleInfo = await response.json();
        setArticleInfo(updatedArticleInfo);
        setCommentName('');
        setCommentText('');
    }

    if (isLoading) {
        return <p>Loading...</p>;
    }

    return (
        <>
        <h1>{matchingArticle.title}</h1>
        <div id="upvotes-section">
            <button onClick={upvoteArticle}>Upvote</button>
            <p>This article has {articleInfo.upvotes} upvotes</p>
        </div>
        {matchingArticle.content.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
        ))}
        <div id="add-comment-form">
            <h3>Add a Comment:</h3>
            <label>
                Name:
                <input
                    value={commentName}
                    onChange={e => setCommentName(e.target.value)}
                    type="text" />
            </label>
            <label>
                Comment:
                <textarea
                    value={commentText}
                    onChange={e => setCommentText(e.target.value)}
                    rows="4"
                    cols="50" />
            </label>
            <button onClick={addComment}>Add Comment</button>
        </div>
        <h3>Comments:</h3>
        {articleInfo.comments.map((comment, i) => (
            <div className="comment" key={i}>
                <h4>{comment.postedBy}</h4>
                <p>{comment.text}</p>
            </div>
        ))}
        </>
    );
}