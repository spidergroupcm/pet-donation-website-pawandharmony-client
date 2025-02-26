import React, { useState } from 'react';
import img1 from '../assets/blog-images/man-with-macaw-bird.png';
import img2 from '../assets/blog-images/man-with-rabbit.png';
import img3 from '../assets/blog-images/women-with-boxer-dog.png';
import img4 from '../assets/blog-images/women-with-goldfish.png';
import img5 from '../assets/blog-images/women-with-labrador-dog.png';
import img6 from '../assets/blog-images/women-with-persian-cat.png';

const blogs = [
    { id: 1, title: "The Joy of Adopting a Macaw", image: img1, description: "Discover the vibrant world of macaws and how adopting one can bring joy to your life.", story: "Macaws are incredibly intelligent and social birds that thrive in loving homes. They require a lot of attention and care, but their companionship is rewarding. Many rescue centers offer macaws for adoption, giving them a second chance at life." },
    { id: 2, title: "Why Rabbits Make Great Pets", image: img2, description: "Rabbits are affectionate and intelligent pets. Learn how to care for them properly.", story: "Rabbits are quiet and loving pets that can be litter-trained just like cats. They need a balanced diet, regular grooming, and safe indoor space to live happily. Adopting a rabbit means providing them with a caring forever home." },
    { id: 3, title: "Loyal and Protective Companions", image: img3, description: "Find out why Boxer dogs are known for their loyalty and playfulness.", story: "Boxer dogs are energetic, fun-loving, and great for families. They need daily exercise and a structured environment to thrive. Adopting a Boxer means having a lifetime of love and protection." },
    { id: 4, title: "Goldfish Care: A Beginner’s Guide", image: img4, description: "Learn essential tips on keeping your goldfish happy and healthy.", story: "Goldfish require a spacious tank, proper filtration, and a well-balanced diet. Many people mistakenly believe they can live in small bowls, but a proper habitat is crucial for their well-being." },
    { id: 5, title: "The Perfect Family Dog", image: img5, description: "Labradors are friendly, energetic, and loving. Here’s why they make the perfect pet.", story: "Labradors are highly trainable and loyal. They are ideal for active families and need plenty of exercise. Adopting a Labrador means having a forever friend who will always be by your side." },
    { id: 6, title: "The Elegance of Persian Cats", image: img6, description: "Persian cats are known for their beauty and calm nature. Discover how to care for them.", story: "Persian cats are affectionate and enjoy a relaxed indoor lifestyle. They require daily grooming and regular vet visits to stay healthy. Adopting a Persian cat means providing them with love and comfort." }
];

const Blog = () => {
    const [selectedBlog, setSelectedBlog] = useState(null);

    return (
        <div className="bg-gray-100 py-12 px-6 md:px-16 lg:px-24">
            <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">Our Latest Blogs</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogs.map(blog => (
                    <div key={blog.id} className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow">
                        <img src={blog.image} alt={blog.title} className="w-full h-56 object-cover" />
                        <div className="p-6">
                            <h3 className="text-xl font-semibold text-gray-800 mb-3">{blog.title}</h3>
                            <p className="text-gray-600 mb-4">{blog.description}</p>
                            <button onClick={() => setSelectedBlog(blog)} className="text-white bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg transition-colors">Read More</button>
                        </div>
                    </div>
                ))}
            </div>
            {selectedBlog && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-2xl">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">{selectedBlog.title}</h2>
                        <p className="text-gray-700 mb-4">{selectedBlog.story}</p>
                        <button onClick={() => setSelectedBlog(null)} className="text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition-colors">Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Blog;


