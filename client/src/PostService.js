import axios from "axios";

const url = 'api/posts/';

class PostService {
    // Get Posts
    static getPost() {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.get(url);
                const data = res.data;
                resolve(
                    data.map(post => ({
                        ...post,
                        createdAt: new Date(post.createdAt)
                    }))
                );
            } catch(err) {
                reject(err);
            }
        })
    }

    // Create Post 
    static insertPost(text, name, icon) {
        return axios.post(url, {
            text,
            name,
            icon
        });
    }

    // delete Post
    static deletePost(id) {
        return axios.delete(`${url}${id}`)
    }
}

export default PostService;