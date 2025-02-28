import { http, HttpResponse } from 'msw';

// GET

export const handlers = [
  // 해당 url 요청이 오면
  http.get('https://example.com/user', () => {
    // 아래의 가짜 응답을 반환
    return HttpResponse.json({
      id: '1',
      name: '정찬영',
      age: '28',
      email: 'hyunbo@example.com',
    });
  }),

  // POST
  // http.post(
  //   'https://devapi.photopic.site/posts/155/votes',
  //   async ({ request }) => {
  //     return HttpResponse.json(
  //       {
  //         errorCode: 'INVALID_GUEST_HEADER',
  //       },
  //       {
  //         status: 400,
  //       },
  //     );
  //   },
  // ),
];
