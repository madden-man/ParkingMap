import { useEffect, useState } from 'react';

const NeedAndGive = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('https://test-denverchurch.site/wp-json/wp/v2/ng-post').then((data) =>
      data.json().then((posts) => setPosts(posts)),
    );
  }, []);

  return (
    <div>
      {posts.map((p, i) => (
        <div key={`${i}_${p.title.rendered}`}>
          <h2>{p.title.rendered}</h2>
          {p.content.rendered}
        </div>
      ))}
    </div>
  );
};
export default NeedAndGive;
