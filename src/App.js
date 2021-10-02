import './App.css'
import React from "react"

const App = () => {
	const [search, setSearch] = React.useState("");
	const [results, setResults] = React.useState([]);
	const [searchInfo, setSearchInfo] = React.useState({});

	const handleSearch = async e => {
		e.preventDefault();
		if(search==='') return;
		
		const endpoint = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${search}`;
		const response = await fetch(endpoint);
		
		if(!response.ok) {
			throw Error(response.statusText);
		}
		const json = await response.json();
		setResults(json.query.search);
		setSearchInfo(json.query.searchinfo);
	}

	return (
		<div className="App">
			<header>
				<h1>Wiki Search</h1>
				<form action="" className="search-box" onSubmit={handleSearch}>
					<input value={search} onChange={(e) => setSearch(e.target.value)} type="text" placeholder="What are you looking at?" />
				</form>
				{(searchInfo.totalhits) ? <p>Search Results {searchInfo.totalhits}</p> : ''}
			</header>
			<div className="results">
				{results.map((result, index) => {
					const url = `https://en.wikipedia.org/?curid=${result.pageid}`
					return (
						<div className="result" key={index}>
							<h3>{result.title}</h3>
							<p dangerouslySetInnerHTML={{ __html: result.snippet + '...' }}></p>
							<a href={url} target="_blank" rel="nofollow">Read more</a>
						</div>
					)
				})}
			</div>
		</div>
	)
}

export default App
