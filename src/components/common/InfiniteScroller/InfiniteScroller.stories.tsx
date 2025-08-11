import { useState, useCallback } from 'react';
import InfiniteScroller from './InfiniteScroller';
import type { Meta, StoryObj } from '@storybook/react';
import Loading from '@/components/common/Loading';

const meta: Meta<typeof InfiniteScroller> = {
  title: 'Common/InfiniteScroller',
  component: InfiniteScroller,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    threshold: {
      control: { type: 'range', min: 0, max: 1, step: 0.1 },
      description: 'Intersection Observer threshold 값',
    },
    rootMargin: {
      control: 'text',
      description: 'Intersection Observer rootMargin 값',
    },
    hasNextPage: {
      control: 'boolean',
      description: '다음 페이지 존재 여부',
    },
    isFetchingNextPage: {
      control: 'boolean',
      description: '다음 페이지 로딩 상태',
    },
    isLoading: {
      control: 'boolean',
      description: '초기 로딩 상태',
    },
  },
};

export default meta;
type Story<T = unknown> = StoryObj<typeof InfiniteScroller<T>>;

// 예시 데이터 타입
interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
}

interface Comment {
  commentId: number;
  content: string;
  author: string;
  createdAt: string;
}

// 기본 데이터
const mockPosts: Post[] = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  title: `게시글 ${i + 1}`,
  content: `이것은 ${i + 1}번째 게시글의 내용입니다. 무한스크롤 테스트를 위한 샘플 데이터입니다.`,
  author: `작성자${i + 1}`,
}));

const mockComments: Comment[] = Array.from({ length: 5 }, (_, i) => ({
  commentId: i + 1,
  content: `이것은 ${i + 1}번째 댓글입니다. 무한스크롤 테스트를 위한 샘플 댓글입니다.`,
  author: `사용자${i + 1}`,
  createdAt: `2024-01-${String(i + 1).padStart(2, '0')}`,
}));

// 무한스크롤 테스트용 컴포넌트
function InfiniteScrollerTest() {
  const [posts, setPosts] = useState<Post[]>(mockPosts);
  const [isFetchingNextPage, setIsFetchingNextPage] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [page, setPage] = useState(1);

  const fetchNextPage = useCallback(async () => {
    if (isFetchingNextPage || !hasNextPage) return;

    setIsFetchingNextPage(true);

    // 1초 지연으로 로딩 시뮬레이션
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // 새로운 데이터 생성
    const newPosts: Post[] = Array.from({ length: 5 }, (_, i) => ({
      id: posts.length + i + 1,
      title: `게시글 ${posts.length + i + 1}`,
      content: `이것은 ${posts.length + i + 1}번째 게시글의 내용입니다. 페이지 ${page + 1}에서 로드된 데이터입니다.`,
      author: `작성자${posts.length + i + 1}`,
    }));

    setPosts((prev) => [...prev, ...newPosts]);
    setPage((prev) => prev + 1);
    setIsFetchingNextPage(false);

    // 5페이지 후에는 더 이상 데이터가 없다고 가정
    if (page >= 5) {
      setHasNextPage(false);
    }
  }, [posts.length, page, isFetchingNextPage, hasNextPage]);

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-4 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-bold mb-2">무한스크롤 테스트</h3>
        <p className="text-sm text-gray-600">
          스크롤을 내려서 무한스크롤을 테스트해보세요! 현재 {posts.length}개의
          게시글이 로드되었습니다.
        </p>
        <div className="mt-2 text-xs text-gray-500">
          로딩 중: {isFetchingNextPage ? '예' : '아니오'} | 다음 페이지:{' '}
          {hasNextPage ? '있음' : '없음'}
        </div>
      </div>

      <InfiniteScroller<Post>
        data={posts}
        renderItem={(post: Post) => (
          <div className="p-4 border rounded mb-2 bg-white shadow-sm">
            <h3 className="font-bold text-lg mb-2">{post.title}</h3>
            <p className="text-gray-600 mb-2">{post.content}</p>
            <p className="text-sm text-gray-500">작성자: {post.author}</p>
          </div>
        )}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        isLoading={false}
        nextPageLoadingComponent={
          <div className="flex items-center justify-center py-4">
            <Loading />
          </div>
        }
        keyExtractor={(post: Post, index: number) => `${post.id}-${index}`}
      />
    </div>
  );
}

// 기본 스토리
export const Default: Story<Post> = {
  args: {
    data: mockPosts,
    renderItem: (post: Post) => (
      <div className="p-4 border rounded mb-2 bg-white">
        <h3 className="font-bold text-lg mb-2">{post.title}</h3>
        <p className="text-gray-600 mb-2">{post.content}</p>
        <p className="text-sm text-gray-500">작성자: {post.author}</p>
      </div>
    ),
    fetchNextPage: () => console.log('다음 페이지 로드'),
    hasNextPage: true,
    isFetchingNextPage: false,
    isLoading: false,
    keyExtractor: (post: Post, index: number) => `${post.id}-${index}`,
  },
};

// 무한스크롤 테스트 스토리
export const InteractiveTest: Story = {
  render: () => <InfiniteScrollerTest />,
  parameters: {
    docs: {
      description: {
        story:
          '실제로 스크롤을 내려서 무한스크롤을 테스트할 수 있습니다. 1초 지연 후 새로운 데이터가 로드되며, 5페이지 후에는 더 이상 데이터가 없습니다.',
      },
    },
  },
};

// 로딩 상태 스토리
export const LoadingStory: Story<Post> = {
  args: {
    ...Default.args,
    isLoading: true,
  },
};

// 다음 페이지 로딩 상태 스토리
export const LoadingNextPage: Story<Post> = {
  args: {
    ...Default.args,
    isFetchingNextPage: true,
  },
};

// 커스텀 로딩 컴포넌트 스토리
export const CustomLoading: Story<Post> = {
  args: {
    ...Default.args,
    isFetchingNextPage: true,
    initialLoadingComponent: (
      <div className="flex items-center justify-center h-64">
        <div className="text-blue-500 text-lg">게시글을 불러오는 중...</div>
      </div>
    ),
    nextPageLoadingComponent: (
      <div className="flex items-center justify-center py-4">
        <div className="text-sm text-gray-500">
          더 많은 게시글을 불러오는 중...
        </div>
      </div>
    ),
  },
};

// 댓글 스타일 스토리
export const Comments: Story<Comment> = {
  args: {
    data: mockComments,
    renderItem: (comment: Comment) => (
      <div className="p-3 border-l-4 border-blue-500 mb-2 bg-white">
        <p className="mb-2">{comment.content}</p>
        <p className="text-sm text-gray-500">
          {comment.author} • {comment.createdAt}
        </p>
      </div>
    ),
    fetchNextPage: () => console.log('댓글 더 로드'),
    hasNextPage: true,
    isFetchingNextPage: false,
    isLoading: false,
    keyExtractor: (comment: Comment) => comment.commentId,
  },
};

// 빈 상태 스토리
export const Empty: Story<Post> = {
  args: {
    data: [],
    renderItem: (post: Post) => (
      <div className="p-4 border rounded mb-2">
        <h3>{post.title}</h3>
        <p>{post.content}</p>
      </div>
    ),
    fetchNextPage: () => console.log('다음 페이지 로드'),
    hasNextPage: false,
    isFetchingNextPage: false,
    isLoading: false,
    emptyComponent: (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">📝</div>
        <h3 className="text-xl font-bold mb-2">게시글이 없습니다</h3>
        <p className="text-gray-500">첫 번째 게시글을 작성해보세요!</p>
      </div>
    ),
    keyExtractor: (post: Post, index: number) => `${post.id}-${index}`,
  },
};

// 커스텀 threshold 스토리
export const CustomThreshold: Story<Post> = {
  args: {
    ...Default.args,
    threshold: 0.5, // 요소의 50%가 보이면 감지
    rootMargin: '100px', // 하단에서 100px 전에 감지
  },
  parameters: {
    docs: {
      description: {
        story:
          'threshold를 0.5로 설정하여 요소의 50%가 보일 때 다음 페이지를 로드하고, rootMargin을 100px로 설정하여 하단에서 100px 전에 감지합니다.',
      },
    },
  },
};

// 카드 스타일 스토리
export const CardStyle: Story<Post> = {
  args: {
    ...Default.args,
    renderItem: (post: Post) => (
      <div className="p-6 border rounded-lg mb-4 bg-white shadow-sm hover:shadow-md transition-shadow">
        <h3 className="font-bold text-xl mb-3 text-gray-800">{post.title}</h3>
        <p className="text-gray-600 mb-4 leading-relaxed">{post.content}</p>
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">작성자: {post.author}</p>
          <span className="text-xs text-gray-400">2024-01-01</span>
        </div>
      </div>
    ),
    className: 'max-w-2xl mx-auto',
  },
};

// 리스트 스타일 스토리
export const ListStyle: Story<Post> = {
  args: {
    ...Default.args,
    renderItem: (post: Post) => (
      <div className="flex items-center p-4 border-b border-gray-200 hover:bg-gray-50">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900">{post.title}</h3>
          <p className="text-sm text-gray-600 mt-1">{post.content}</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">{post.author}</p>
        </div>
      </div>
    ),
    className: 'bg-white border border-gray-200 rounded-lg',
  },
};
