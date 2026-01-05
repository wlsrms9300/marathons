# React Query Hooks 사용 가이드

## 기본 사용법

### 1. 마라톤 목록 조회

```tsx
import { useMarathons } from './hooks/useMarathons';

function MarathonList() {
  const { data, isLoading, error } = useMarathons({
    type: 'domestic',
    distance: '풀코스',
    difficulty: 'easy',
  });

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러 발생: {error.message}</div>;

  return (
    <div>
      {data?.map(marathon => (
        <div key={marathon.id}>{marathon.name}</div>
      ))}
    </div>
  );
}
```

### 2. 마라톤 상세 조회

```tsx
import { useMarathon } from './hooks/useMarathons';

function MarathonDetail({ id }: { id: number }) {
  const { data, isLoading } = useMarathon(id);

  if (isLoading) return <div>로딩 중...</div>;

  return <div>{data?.name}</div>;
}
```

### 3. 마라톤 생성 (Mutation)

```tsx
import { useCreateMarathon } from './hooks/useMarathons';

function CreateMarathonForm() {
  const createMarathon = useCreateMarathon();

  const handleSubmit = async (formData: Marathon) => {
    try {
      await createMarathon.mutateAsync(formData);
      alert('생성 완료!');
    } catch (error) {
      alert('생성 실패');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* 폼 내용 */}
      <button 
        type="submit" 
        disabled={createMarathon.isPending}
      >
        {createMarathon.isPending ? '생성 중...' : '생성하기'}
      </button>
    </form>
  );
}
```

### 4. 마라톤 수정 (Mutation)

```tsx
import { useUpdateMarathon } from './hooks/useMarathons';

function UpdateMarathon({ id }: { id: number }) {
  const updateMarathon = useUpdateMarathon();

  const handleUpdate = async () => {
    try {
      await updateMarathon.mutateAsync({
        id,
        data: { name: '새로운 이름' },
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button 
      onClick={handleUpdate}
      disabled={updateMarathon.isPending}
    >
      수정하기
    </button>
  );
}
```

### 5. 마라톤 삭제 (Mutation)

```tsx
import { useDeleteMarathon } from './hooks/useMarathons';

function DeleteMarathonButton({ id }: { id: number }) {
  const deleteMarathon = useDeleteMarathon();

  const handleDelete = async () => {
    if (confirm('정말 삭제하시겠습니까?')) {
      try {
        await deleteMarathon.mutateAsync(id);
        alert('삭제 완료!');
      } catch (error) {
        alert('삭제 실패');
      }
    }
  };

  return (
    <button 
      onClick={handleDelete}
      disabled={deleteMarathon.isPending}
    >
      삭제하기
    </button>
  );
}
```

## 환경 변수 설정

`.env` 파일을 생성하고 API 베이스 URL을 설정하세요:

```
VITE_API_BASE_URL=http://localhost:3000/api
```

## Query Key 관리

모든 쿼리 키는 `marathonKeys` 객체에서 중앙 관리됩니다:

```tsx
import { marathonKeys } from './hooks/useMarathons';

// 수동으로 캐시 무효화
queryClient.invalidateQueries({ queryKey: marathonKeys.lists() });
```

