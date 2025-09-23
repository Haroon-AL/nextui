export default function Page({
  params,
}: {
  params: { slug: string };
}) {
  console.log("slug is:", params.slug);
  return <div>My Post: {params.slug}</div>;
}
 