export default async function getNotFoundPage(url: string) {
  const res = await fetch(`${url}/404`);
  return new Response(res.body, {
    headers: res.headers,
    status: 404,
  });
}
