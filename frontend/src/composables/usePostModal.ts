import { ref } from 'vue';
import { usePostsStore } from '../stores/usePostsStore';
import type { Post } from '../type/type';

/**
 * 게시글 모달 UI 상태 및 수정 로직을 관리하는 컴포저블
 * - 모달 열기/닫기
 * - 선택된 게시글 관리
 * - 게시글 수정 처리
 */
export function usePostModal() {
  const showModal = ref(false);
  const selectedPost = ref<Post | null>(null);
  const saving = ref(false);
  
  const postsStore = usePostsStore();

  const openModal = (post: Post) => {
    selectedPost.value = post;
    showModal.value = true;
  };

  const closeModal = () => {
    showModal.value = false;
    selectedPost.value = null;
  };

  /**
   * 게시글 수정을 처리하고 모달의 selectedPost를 업데이트
   */
  const handleSave = async (data: { title: string; content: string }): Promise<{ success: boolean; message: string }> => {
    if (!selectedPost.value) {
      return { success: false, message: '선택된 게시글이 없습니다' };
    }
    
    const postId = selectedPost.value.id;
    
    try {
      saving.value = true;
      await postsStore.update(postId, data);
      
      // 스토어에서 업데이트된 게시글 가져오기
      const updatedPost = postsStore.findById(postId);
      if (updatedPost) {
        selectedPost.value = { ...updatedPost };
      }
      
      return { success: true, message: '수정되었습니다' };
    } catch (error) {
      console.error('수정 실패:', error);
      return { success: false, message: '수정에 실패했습니다' };
    } finally {
      saving.value = false;
    }
  };

  return {
    showModal,
    selectedPost,
    saving,
    openModal,
    closeModal,
    handleSave
  };
}