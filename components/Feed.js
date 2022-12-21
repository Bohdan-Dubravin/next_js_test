import MiniProfile from "./MiniProfile";
import Posts from "./Posts";
import Stories from "./Stories";
import Suggestions from "./Suggestions";

const Feed = () => {
  return (
    <main className="grid grid-cols-1 md:grid-cols-3 md:max-w-6xl xl:grid-cols-3 mx-auto">
      <section className="col-span-2">
        <Stories />
        <Posts />
      </section>
      <section className="hidden md:inline-grid col-span-1 ">
        <div className="fixed top-20">
          <MiniProfile />
          <Suggestions />
        </div>
      </section>
    </main>
  );
};

export default Feed;
