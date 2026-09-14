// /api/odpt/railways?operator=TokyoMetro  또는  ?operator=Toei
// 프론트엔드에서는 이 주소를 fetch해서 쓰면 됨 (ODPT 토큰은 여기 서버 코드에만 존재하고 브라우저로 안 나감)

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const operator = searchParams.get('operator') || 'TokyoMetro';

  const token = process.env.ODPT_ACCESS_TOKEN;

  if (!token) {
    return Response.json(
      { error: 'ODPT_ACCESS_TOKEN이 설정되지 않았습니다. .env.local을 확인하세요.' },
      { status: 500 }
    );
  }

  const url = `https://api.odpt.org/api/v4/odpt:Railway?odpt:operator=odpt.Operator:${operator}&acl:consumerKey=${token}`;

  try {
    const res = await fetch(url);

    if (!res.ok) {
      return Response.json(
        { error: `ODPT API 호출 실패 (status: ${res.status})` },
        { status: res.status }
      );
    }

    const data = await res.json();
    return Response.json(data);
  } catch (err) {
    return Response.json(
      { error: 'ODPT API 호출 중 오류가 발생했습니다.', detail: String(err) },
      { status: 500 }
    );
  }
}
