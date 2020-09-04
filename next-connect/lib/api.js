import axios from 'axios';

export const getUser = async userId => {
    const { data } = await axios.get(`/api/users/profile/${userId}`);
    return data;
}

export const followUser = async followId => {
    const { data } = await axios.put('/api/users/follow', { followId });
}

export const unfollowUser = async followId => {
    const { data } = await axios.put('/api/users/unfollow', { followId });
}