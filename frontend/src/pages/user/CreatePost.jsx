import CreatePostHero from "../../components/user/CreatePostHero";
import CreatePostForm from "../../components/user/CreatePostForm";
import ImageUploader from "../../components/user/ImageUploader";
function CreatePost() {
  return (
    <>
      <section className="max-w-5xl mx-auto px-6 py-10">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 md:p-10">
          <CreatePostHero />
          <CreatePostForm />
        
        </div>
      </section>
    </>
  );
}

export default CreatePost;

