import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-slate-950 text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <h2 className="text-4xl font-bold mb-4">Tech Blog</h2>

            <p className="text-slate-400 text-lg leading-relaxed max-w-lg mb-8">
              Read. Learn. Build. Discover articles about web development, AI,
              software engineering and technology.
            </p>

           
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-semibold text-lg mb-5">Navigation</h3>

            <ul className="space-y-4">
              <li>
                <Link
                  to="/"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="/blogs"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Blogs
                </Link>
              </li>

              <li>
                <Link
                  to="/contact"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Socials */}
          <div>
            <h3 className="font-semibold text-lg mb-5">Socials</h3>

            <ul className="space-y-4">
              <li className="text-slate-400 hover:text-white transition-colors cursor-pointer">
                GitHub
              </li>

              <li className="text-slate-400 hover:text-white transition-colors cursor-pointer">
                LinkedIn
              </li>

              <li className="text-slate-400 hover:text-white transition-colors cursor-pointer">
                Twitter
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500">
            © 2026 Tech Blog. All rights reserved.
          </p>

          <div className="flex gap-6 text-slate-500">
            <span>Privacy Policy</span>
            <span>Terms</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
