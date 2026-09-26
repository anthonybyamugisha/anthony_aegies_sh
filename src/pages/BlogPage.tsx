import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, AlertCircle } from 'lucide-react';
import { request, gql } from 'graphql-request';
import SectionHeading from '../components/ui/SectionHeading';
import Reveal from '../components/ui/Reveal';

interface Post {
  title: string;
  brief: string;
  url: string;
}

const HASHNODE_HOST = String(import.meta.env.VITE_HASHNODE_HOST ?? '');
const HASHNODE_TOKEN = String(import.meta.env.VITE_HASHNODE_TOKEN ?? '');

const BlogPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(Boolean(HASHNODE_HOST));
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!HASHNODE_HOST) {
      return;
    }

    let active = true;

    const fetchPosts = async () => {
      const query = gql`
        query FetchPosts {
          publication(host: "${HASHNODE_HOST}") {
            posts(first: 12) {
              edges {
                node {
                  title
                  brief
                  url
                }
              }
            }
          }
        }
      `;

      try {
        const response = (await request('https://api.hashnode.com', query, {
          headers: HASHNODE_TOKEN ? { Authorization: HASHNODE_TOKEN } : undefined,
        })) as { publication: { posts: { edges: { node: Post }[] } } };

        if (active) {
          setPosts(response.publication.posts.edges.map((edge) => edge.node));
        }
      } catch {
        if (active) setFailed(true);
      } finally {
        if (active) setLoading(false);
      }
    };

    fetchPosts();

    return () => {
      active = false;
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="py-16"
    >
      <div className="px-6 sm:px-9">
        <div className="mx-auto max-w-5xl">
          <SectionHeading
            index="06"
            title="Blog"
            subtitle="Notes on security operations, threat hunting and analysis."
          />

          {loading && (
            <div className="flex justify-center py-16">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-neon" />
            </div>
          )}

          {!loading && (!HASHNODE_HOST || failed || posts.length === 0) && (
            <Reveal>
              <div className="hud-panel p-12 text-center max-w-xl mx-auto">
                <FileText className="w-8 h-8 text-gray-700 mx-auto mb-4" strokeWidth={1.25} />
                <p className="text-neon text-xs mb-3">&gt;_ cat ./blog</p>
                <h2 className="text-gray-200 font-semibold mb-2">No posts published yet</h2>
                <p className="text-sm text-gray-500 mb-4">
                  Set <code className="text-neon">VITE_HASHNODE_HOST</code> in your{' '}
                  <code className="text-neon">.env</code> file to pull writing from your blog.
                </p>
                {!HASHNODE_HOST && (
                  <p className="text-[11px] text-gray-700 flex items-center justify-center gap-2">
                    <AlertCircle className="w-3.5 h-3.5" strokeWidth={1.5} />
                    feed not connected
                  </p>
                )}
              </div>
            </Reveal>
          )}

          {posts.length > 0 && (
            <div className="grid md:grid-cols-2 gap-5">
              {posts.map((post, index) => (
                <Reveal key={post.url} delay={index * 0.06}>
                  <a
                    href={post.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hud-panel hud-panel-hover p-6 block h-full"
                  >
                    <p className="text-neon/70 text-[10px] mb-3">
                      POST_{String(index + 1).padStart(3, '0')}
                    </p>
                    <h3 className="text-base font-semibold text-gray-100 mb-2 hover:text-neon transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{post.brief}</p>
                  </a>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default BlogPage;
