import React,{useEffect,useState} from "react";

const App = () => {
  const [news,setNews] =useState([]);
  const [searchQuery,setSearchQuery]=useState("react");
  const [url,setUrl]=useState("https://hn.algolia.com/api/v1/search?query=react");
  const [loading,setLoading] = useState(false);
  //fetch news
  const fetchNews =()=> {
    setLoading(true);
    fetch(url)
    .then( data => data.json())
    .then(data => {
      setNews(data.hits);
      setLoading(false);})
    .catch(err => console.log(err));
  };
  
  useEffect(()=>{fetchNews()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[url])

  const handleChange = e => {
    setSearchQuery(e.target.value);
  };
  const handleSubmit = e => {
    e.preventDefault();
    setUrl(`http://hn.algolia.com/api/v1/search?query=${searchQuery}`);
  }
  const showLoading = () => (loading ? <h2>LOADING....</h2> : " ");

  const searchForm =() => (
    <form onSubmit={handleSubmit}>
    <input type="text" value={searchQuery} onChange={handleChange}/>
    <button>Search</button>
    </form>
  );
  const showNews = () => news.map((n,i) =>(
  <div>
    <h2>{n.title}</h2>
    <a href={n.url}>Link</a>
    <p key={i}>{n.author}</p>
  </div>));
  return(
    <div>
      <h2>News</h2>
      {showLoading()}
      {searchForm()}
      {showNews()}
    </div>
  );
}

export default App;
