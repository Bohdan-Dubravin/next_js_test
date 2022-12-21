import Posts from "./Posts";
import Stories from "./Stories";

const Feed = () => {
  return (
    <main className="grid grid-cols-1 md:grid-cols-2 md:max-w-6xl xl:grid-cols-3 mx-auto">
      <section className="col-span-2">
        <Stories />
        <Posts />
      </section>
      <section></section>
    </main>
  );
};

export default Feed;
