import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import { AboutPage } from './pages/AboutPage';
import { ArticlePage } from './pages/ArticlePage';
import { ArticlesListPage } from './pages/ArticlesListPage';
import { HomePage } from './pages/HomePage';
import { NavBar } from './components/NavBar';
import './App.css';

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <NavBar />
                <div id="page-body">
                    <Switch>
                        <Route path="/" exact>
                            <HomePage />
                        </Route>
                        <Route path="/about">
                            <AboutPage />
                        </Route>
                        <Route path="/articles" exact>
                            <ArticlesListPage />
                        </Route>
                        <Route path="/articles/:articleName">
                            <ArticlePage />
                        </Route>
                        <Route>
                            <h1>This Page Doesn't Exist!</h1>
                            <p>Maybe you meant:</p>
                            <ul>
                                <li>
                                    <Link to="/">Home</Link>
                                </li>
                                <li>
                                    <Link to="/about">About</Link>
                                </li>
                                <li>
                                    <Link to="/articles">Articles</Link>
                                </li>
                            </ul>
                        </Route>
                    </Switch>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
