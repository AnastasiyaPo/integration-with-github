import List from "./components/List";

export default function IndexPage() {
  return (
    <div className="Index-page">
      <List list={[...Array(5).keys()]} />
    </div>
  );
}
