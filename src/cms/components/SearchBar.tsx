import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { MdSearch } from "react-icons/md";
import { useSearchPosts } from "../hooks/useSearchPosts";

export function SearchBar() {
  const router = useRouter();
  const [searchInput, setSearchInput] = useState("");
  const { posts, searchPosts, loading } = useSearchPosts();

  useEffect(() => {
    if (searchInput.length > 0) {
      searchPosts({
        variables: {
          searchInput,
        },
      });
    }
  }, [searchInput]);

  return (
    <div className="search-bar">
      <div className="search-bar-input">
        <div className="icon">
          <MdSearch size="22px" />
        </div>
        <input
          type="search"
          placeholder="Pesquisar..."
          value={searchInput}
          onChange={(event) => setSearchInput(event.target.value)}
        />
      </div>
      {!loading && searchInput.length > 0 && (
        <div className="search-bar-results">
          <SearchResults
            results={posts.map(({ slug, title }) => ({
              link: `/posts/${slug}`,
              title,
            }))}
            onClickResult={(result) => {
              router.push(result.link);
              setSearchInput("");
            }}
          />
        </div>
      )}
      <style jsx>{`
        .search-bar {
          position: relative;
        }

        .search-bar-input {
          z-index: 1002;
          position: relative;
          background-color: #f0f0f0;
          display: flex;
          padding: 6px 12px;
          border-radius: 6px;
        }

        .icon {
          display: flex;
          align-items: center;
          margin-right: 8px;
        }

        input {
          border: 0;
          outline: none;
          width: 100%;
          background-color: transparent;
        }
      `}</style>
    </div>
  );
}

type SearchResult = {
  title: string;
  link: string;
};

type SearchResultsProps = {
  results: SearchResult[];
  onClickResult: (searchResult: SearchResult) => void;
};

function SearchResults({ results, onClickResult }: SearchResultsProps) {
  return (
    <div className="search-results">
      {results.map((result) => (
        <div className="result-item" key={result.link}>
          <a
            href={result.link}
            onClick={(event) => {
              event.preventDefault();
              onClickResult(result);
            }}
          >
            {result.title}
          </a>
        </div>
      ))}
      <style jsx>{`
        a:hover {
          text-decoration: none;
        }

        .search-results {
          z-index: 1001;
          position: absolute;
          top: calc(100% - 4px);
          padding-top: 4px;
          left: 0;
          width: 100%;
          box-sizing: border-box;
          background-color: #fff;
          border: solid 1px #f0f0f0;
        }

        .search-results,
        .result-item:last-child {
          border-bottom-left-radius: 8px;
          border-bottom-right-radius: 8px;
        }

        .result-item {
          padding: 12px;
          font-weight: bold;
        }

        .result-item:not(:last-child) {
          border-bottom: solid 1px #f0f0f0;
        }

        .result-item:hover {
          background-color: #f0f0f0;
        }
      `}</style>
    </div>
  );
}
