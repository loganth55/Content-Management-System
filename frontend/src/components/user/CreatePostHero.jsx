function CreatePostHero() {
  return (
    <section className="bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6 py-20 text-center">
        <span className="inline-flex items-center px-4 py-2 rounded-full bg-slate-100 text-slate-700 text-sm font-medium">
          ✍️ Share Your Knowledge
        </span>

        <h1 className="mt-6 text-5xl md:text-6xl font-bold tracking-tight text-slate-900">
          Write Your Next Blog
        </h1>

        <p className="mt-6 max-w-3xl mx-auto text-lg leading-8 text-slate-600">
          Share your ideas, tutorials, experiences, and knowledge with the Tech
          Blog community. Inspire developers around the world with your content.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <div className="px-5 py-3 rounded-xl bg-slate-100 text-slate-700 font-medium">
            🚀 Easy to Publish
          </div>

          <div className="px-5 py-3 rounded-xl bg-slate-100 text-slate-700 font-medium">
            📚 Developer Friendly
          </div>

          <div className="px-5 py-3 rounded-xl bg-slate-100 text-slate-700 font-medium">
            🌍 Share Worldwide
          </div>
        </div>
      </div>
    </section>
  );
}

export default CreatePostHero;
