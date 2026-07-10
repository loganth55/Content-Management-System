import Hero from "../../components/user/Hero";
import FeaturedPost from "../../components/user/FeaturedPost";
import BlogGrid from "../../components/user/BlogGrid";
import NewsLetter from "../../components/user/NewsLetter";
import Footer from "../../components/user/Footer";
import { getposts } from "../../services/blogApi";
import { useState, useEffect } from "react";

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getposts();
        setPosts(data);
      } catch (err) {
        console.log("Error fetching posts:", err);
      }
    };

    fetchPosts();
  }, []);

  return (
    <>
      <Hero />

      <FeaturedPost post={posts[0]} />

      <BlogGrid posts={posts.slice(1)} />

      <NewsLetter />

      <Footer />
    </>
  );
}

export default Home;
