import React, { useEffect, useState } from 'react';
import { getReviews, deleteReview } from '../services/service.review';
const Reviews = () => {
    const [reviews, setReviews] = useState([]);
    const fetchReviews = async () => {
        const response = await getReviews();
        console.log(response)
        setReviews(response);
    }
    useEffect(() => {
        fetchReviews();
    }, []);

    const handleDelete = async (id) => {
        const confirm = window.confirm("Are you sure you want to delete this review?");
        if (confirm) {
            const response = await deleteReview(id);
            if (response.status === 200) {
                fetchReviews();
            }
        }

    }
    return (
        <div className='w-full h-auto flex flex-col items-center justify-center'>
            <h1>Reviews</h1>
            <table className='w-full border-collapse border border-slate-500' width="100%">
                <thead>
                    <tr>
                        <th className='border border-slate-600'>User Name</th>
                        <th className='border border-slate-600'>User Email</th>
                        <th className='border border-slate-600'>Review Content</th>
                        <th className='border border-slate-600'>Rating</th>
                        <th className='border border-slate-600'>Product ID</th>
                        <th className='border border-slate-600'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {reviews.map((review) => (

                        <tr key={review._id} className='border border-slate-600'>
                            <td className='border border-slate-600'>{review.review_usr_name}</td>
                            <td className='border border-slate-600'>{review.review_usr_email}</td>
                            <td className='border border-slate-600'>{review.review_content}</td>
                            <td className='border border-slate-600'>{review.review_rating}</td>
                            <td className='border border-slate-600'>{review.review_product_id}</td>
                            <td className='border border-slate-600'>{review.review_status}</td>
                            <td className='border border-slate-600'>
                                <button className='bg-red-500 text-white p-2 rounded-lg'
                                    onClick={() => handleDelete(review._id)}
                                >Delete</button>
                            </td>
                        </tr>
                    ))}

                </tbody>
            </table>
        </div>
    );
}
export default Reviews;