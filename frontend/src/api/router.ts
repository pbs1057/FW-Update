export const getStats = async <T = unknown>(): Promise<T> => {
  try {
    const url: string = '/api/stats';
    console.log('Fetching from:', url);

    const response: Response = await fetch(url);
    console.log('Response status:', response.status);
    console.log('Response URL:', response.url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: unknown = await response.json();
    console.log('Received data:', data);
    return data as T;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error fetching stats:', error.message);
    } else {
      console.error('Error fetching stats:', error);
    }
    throw error;
  }
};

// 게시판 API
export const getPosts = async <T = unknown>(): Promise<T> => {
  try {
    const url: string = '/api/posts';
    const response: Response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: unknown = await response.json();
    return data as T;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error fetching posts:', error.message);
    }
    throw error;
  }
};

// 게시판 API
export const getRecentPosts = async <T = unknown>(): Promise<T> => {
  try {
    const url: string = '/api/posts/recent';
    const response: Response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: unknown = await response.json();
    return data as T;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error fetching recent posts:', error.message);
    }
    throw error;
  }
};

export const createPost = async (post: { title: string; content: string; author: string }) => {
  try {
    const url: string = '/api/posts';
    const response: Response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(post),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: unknown = await response.json();
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error creating post:', error.message);
    }
    throw error;
  }
};

export const deletePost = async (id: number) => {
  try {
    const url: string = `/api/posts/${id}`;
    const response: Response = await fetch(url, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: unknown = await response.json();
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error deleting post:', error.message);
    }
    throw error;
  }
};

export const updatePost = async (id: number, post: { title: string; content: string }) => {
  try {
    const url: string = `/api/posts/${id}`;
    const response: Response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(post),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: unknown = await response.json();
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error updating post:', error.message);
    }
    throw error;
  }
};

export const markPostAsRead = async (id: number) => {
  try {
    const url: string = `/api/posts/${id}/read`;
    const response: Response = await fetch(url, {
      method: 'PATCH',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: unknown = await response.json();
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error marking post as read:', error.message);
    }
    throw error;
  }
};