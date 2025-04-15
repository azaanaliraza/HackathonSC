"use client"

import { useState } from 'react';
import { HeartPulse, Image, Paperclip, Send, X, Heart, MessageSquare } from "lucide-react";
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

// Sample Posts Data
const initialPosts = [
  {
    id: 1,
    author: "Dr. Sarah Chen",
    authorImage: "/api/placeholder/100/100",
    authorRole: "Cardiologist",
    headline: "Understanding Heart Palpitations",
    body: "Heart palpitations can feel like your heart is racing, fluttering, or skipping beats. While often harmless, they can sometimes indicate an underlying condition. If you experience them frequently with dizziness or chest pain, consult your doctor immediately.",
    attachments: [{name: "heart-rhythm-chart.jpg", type: "image"}],
    likes: 24,
    comments: [
      {
        id: 1,
        author: "Jane Smith",
        authorImage: "/api/placeholder/100/100",
        text: "I experienced this last year and was diagnosed with anxiety. Meditation helped a lot!",
        time: "1 hour ago"
      },
      {
        id: 2,
        author: "Mark Johnson",
        authorImage: "/api/placeholder/100/100",
        text: "Thank you for this informative post, Dr. Chen. Would caffeine reduction help?",
        time: "30 minutes ago"
      }
    ],
    time: "2 hours ago"
  },
  {
    id: 2,
    author: "Michael Torres",
    authorImage: "/api/placeholder/100/100",
    authorRole: "Patient Advocate",
    headline: "My Journey With Chronic Migraine",
    body: "After years of suffering from debilitating migraines, I finally found relief through a combination of lifestyle changes and proper medication. I'm sharing my experience to help others who might be going through similar struggles.",
    likes: 37,
    comments: [
      {
        id: 1,
        author: "Dr. Lisa Wong",
        authorImage: "/api/placeholder/100/100",
        text: "Thank you for sharing your journey, Michael. What specific lifestyle changes made the biggest difference for you?",
        time: "5 hours ago"
      }
    ],
    time: "Yesterday"
  }
];

export default function MainFeed() {
  const [posts, setPosts] = useState(initialPosts);
  const [newPost, setNewPost] = useState({
    headline: '',
    body: '',
    author: '',
    authorRole: '',
    attachments: []
  });
  const [showForm, setShowForm] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [fileNames, setFileNames] = useState([]);
  const [commentText, setCommentText] = useState({});
  const [showComments, setShowComments] = useState({});
  const [likedPosts, setLikedPosts] = useState({});
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!newPost.headline || !newPost.body || !newPost.author) {
      return;
    }
    
    const post = {
      id: posts.length + 1,
      ...newPost,
      likes: 0,
      comments: [],
      time: "Just now",
      authorImage: "/api/placeholder/100/100"
    };
    
    setPosts([post, ...posts]);
    setNewPost({ headline: '', body: '', author: '', authorRole: '', attachments: [] });
    setFileNames([]);
    setSuccessMessage('Post published successfully!');
    
    setTimeout(() => {
      setSuccessMessage('');
      setShowForm(false);
    }, 3000);
  };
  
  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files).map(file => ({
        name: file.name,
        type: file.type.startsWith('image/') ? 'image' : 'file'
      }));
      
      setNewPost({
        ...newPost,
        attachments: [...newPost.attachments, ...newFiles]
      });
      
      setFileNames([...fileNames, ...Array.from(e.target.files).map(file => file.name)]);
    }
  };
  
  const removeFile = (index) => {
    const updatedFiles = [...fileNames];
    updatedFiles.splice(index, 1);
    setFileNames(updatedFiles);
    
    const updatedAttachments = [...newPost.attachments];
    updatedAttachments.splice(index, 1);
    setNewPost({
      ...newPost,
      attachments: updatedAttachments
    });
  };

  const handleLike = (postId) => {
    // Check if already liked
    if (likedPosts[postId]) {
      // Unlike the post
      setPosts(posts.map(post => {
        if (post.id === postId) {
          return {...post, likes: Math.max(0, post.likes - 1)};
        }
        return post;
      }));
      
      setLikedPosts(prev => ({
        ...prev,
        [postId]: false
      }));
    } else {
      // Like the post
      setPosts(posts.map(post => {
        if (post.id === postId) {
          return {...post, likes: post.likes + 1};
        }
        return post;
      }));
      
      setLikedPosts(prev => ({
        ...prev,
        [postId]: true
      }));
    }
  };

  const toggleComments = (postId) => {
    setShowComments(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  const handleCommentChange = (postId, value) => {
    setCommentText(prev => ({
      ...prev,
      [postId]: value
    }));
  };

  const addComment = (postId) => {
    if (!commentText[postId]?.trim()) return;
    
    setPosts(posts.map(post => {
      if (post.id === postId) {
        const newComment = {
          id: (post.comments?.length || 0) + 1,
          author: "You",
          authorImage: "/api/placeholder/100/100",
          text: commentText[postId],
          time: "Just now"
        };
        return {
          ...post,
          comments: [...(post.comments || []), newComment]
        };
      }
      return post;
    }));
    
    setCommentText(prev => ({
      ...prev,
      [postId]: ''
    }));
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-red-50 to-white text-red-700 flex">
      {/* === Main Feed === */}
      <section className="flex-1 px-4 py-6 flex flex-col items-center">
        {/* === Header / Hero Section === */}
        <div className="w-full bg-gradient-to-r from-red-100 to-red-200 rounded-2xl shadow-lg px-10 py-8 mb-8 flex items-center justify-between max-w-5xl">
          <div className="flex items-center space-x-4">
            <HeartPulse className="text-red-500 w-10 h-10" />
            <div>
              <h1 className="text-4xl font-extrabold text-red-800">
                SymptoCheck
              </h1>
              <p className="text-sm text-gray-700">
                Your AI-powered health companion
              </p>
            </div>
          </div>
          <Button 
            className="bg-red-600 hover:bg-red-700 text-white" 
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? 'Cancel' : 'Share Experience'}
          </Button>
        </div>
        
        {/* === Post Form === */}
        {showForm && (
          <div className="w-full max-w-3xl mb-8 bg-white rounded-2xl p-6 shadow-lg border border-red-100">
            <h2 className="text-xl font-bold text-red-800 mb-4">Share Your Health Experience</h2>
            
            {successMessage && (
              <Alert className="mb-4 bg-green-50 text-green-800 border-green-200">
                <AlertDescription>{successMessage}</AlertDescription>
              </Alert>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Name
                  </label>
                  <Input
                    id="author"
                    value={newPost.author}
                    onChange={(e) => setNewPost({...newPost, author: e.target.value})}
                    placeholder="Enter your name"
                    className="border-red-200 focus:border-red-500 focus:ring-red-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Role (optional)
                  </label>
                  <Input
                    id="role"
                    value={newPost.authorRole}
                    onChange={(e) => setNewPost({...newPost, authorRole: e.target.value})}
                    placeholder="Doctor, Patient, Nurse, etc."
                    className="border-red-200 focus:border-red-500 focus:ring-red-500"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="headline" className="block text-sm font-medium text-gray-700 mb-1">
                  Headline
                </label>
                <Input
                  id="headline"
                  value={newPost.headline}
                  onChange={(e) => setNewPost({...newPost, headline: e.target.value})}
                  placeholder="Enter a headline for your post"
                  className="border-red-200 focus:border-red-500 focus:ring-red-500"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="body" className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <Textarea
                  id="body"
                  value={newPost.body}
                  onChange={(e) => setNewPost({...newPost, body: e.target.value})}
                  placeholder="Share your health experience, question, or insight..."
                  className="border-red-200 focus:border-red-500 focus:ring-red-500 min-h-32"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Attachments
                </label>
                <div className="flex items-center">
                  <label className="flex items-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 px-4 py-2 rounded-lg cursor-pointer">
                    <Paperclip className="w-4 h-4" />
                    <span>Add Files</span>
                    <input
                      type="file"
                      className="hidden"
                      multiple
                      onChange={handleFileChange}
                    />
                  </label>
                </div>
                
                {fileNames.length > 0 && (
                  <div className="mt-2 space-y-2">
                    {fileNames.map((name, index) => (
                      <div key={index} className="flex items-center justify-between bg-red-50 px-3 py-2 rounded">
                        <span className="text-sm text-gray-700 truncate">{name}</span>
                        <button
                          type="button"
                          onClick={() => removeFile(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="flex justify-end">
                <Button 
                  type="submit" 
                  className="bg-red-600 hover:bg-red-700 text-white"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Post
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* === Posts Feed === */}
        <div className="w-full max-w-3xl space-y-6">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all border border-red-100"
            >
              {/* Author info */}
              <div className="flex items-center space-x-3 mb-4">
                <Avatar>
                  <AvatarImage src={post.authorImage} alt={post.author} />
                  <AvatarFallback className="bg-red-200 text-red-700">
                    {post.author.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium text-gray-900">{post.author}</div>
                  {post.authorRole && (
                    <div className="text-sm text-gray-500">{post.authorRole}</div>
                  )}
                </div>
                <div className="text-xs text-gray-500 ml-auto">{post.time}</div>
              </div>
              
              {/* Post content */}
              <h3 className="text-xl font-bold text-red-800 mb-2">{post.headline}</h3>
              <p className="text-gray-700 mb-4">{post.body}</p>
              
              {/* Attachments */}
              {post.attachments && post.attachments.length > 0 && (
                <div className="mb-4">
                  <div className="grid grid-cols-2 gap-2">
                    {post.attachments.map((attachment, idx) => (
                      attachment.type === 'image' ? (
                        <div key={idx} className="rounded-lg overflow-hidden bg-red-50 aspect-video flex items-center justify-center">
                          <Image className="w-8 h-8 text-red-300" />
                        </div>
                      ) : (
                        <div key={idx} className="rounded-lg overflow-hidden bg-red-50 p-3 flex items-center">
                          <Paperclip className="w-4 h-4 text-red-400 mr-2" />
                          <span className="text-sm text-gray-700 truncate">{attachment.name}</span>
                        </div>
                      )
                    ))}
                  </div>
                </div>
              )}
              
              {/* Engagement */}
              <div className="flex items-center space-x-6 text-sm text-gray-500 border-t border-red-50 pt-4">
                <button 
                  className="flex items-center space-x-2 group"
                  onClick={() => handleLike(post.id)}
                  aria-label={likedPosts[post.id] ? "Unlike" : "Like"}
                >
                  <div className="relative">
                    <Heart 
                      className={`w-6 h-6 transition-all duration-300 transform group-hover:scale-110 ${likedPosts[post.id] ? "text-red-500 fill-red-500" : "text-red-300 group-hover:text-red-500"}`} 
                    />
                    {!likedPosts[post.id] && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                        <Heart className="w-2 h-2 text-red-500 fill-red-500" />
                      </div>
                    )}
                  </div>
                  <div className="flex items-center">
                    <span className={likedPosts[post.id] ? "text-red-500 font-medium" : ""}>
                      {post.likes}
                    </span>
                    {likedPosts[post.id] && (
                      <span className="ml-1 text-red-500 font-medium">• Liked</span>
                    )}
                  </div>
                </button>
                
                <button 
                  className="flex items-center space-x-2 hover:text-red-600 group"
                  onClick={() => toggleComments(post.id)}
                >
                  <MessageSquare className="w-5 h-5 group-hover:text-red-500 transition-colors" />
                  <span>{post.comments?.length || 0} Comments</span>
                </button>
              </div>
              
              {/* Comments Section */}
              {showComments[post.id] && (
                <div className="mt-4 border-t border-red-50 pt-4">
                  <div className="space-y-4">
                    {/* Existing comments */}
                    {post.comments && post.comments.length > 0 ? (
                      <div className="space-y-3">
                        {post.comments.map((comment) => (
                          <div key={comment.id} className="flex space-x-3">
                            <Avatar className="w-8 h-8">
                              <AvatarImage src={comment.authorImage} alt={comment.author} />
                              <AvatarFallback className="bg-red-100 text-red-600 text-xs">
                                {comment.author.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="bg-red-50 rounded-xl p-3 inline-block">
                                <div className="font-medium text-sm text-gray-900">{comment.author}</div>
                                <div className="text-gray-700">{comment.text}</div>
                              </div>
                              <div className="text-xs text-gray-500 mt-1">{comment.time}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-4 text-gray-500">
                        Be the first to comment on this post
                      </div>
                    )}
                    
                    {/* Add comment form */}
                    <div className="flex space-x-3 mt-2">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="bg-red-100 text-red-600 text-xs">
                          YOU
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 relative">
                        <Textarea
                          value={commentText[post.id] || ''}
                          onChange={(e) => handleCommentChange(post.id, e.target.value)}
                          placeholder="Write a comment..."
                          className="pr-12 min-h-16 bg-red-50 border-red-100 focus:border-red-300 rounded-xl resize-none"
                        />
                        <Button 
                          className="absolute right-2 bottom-2 bg-red-500 hover:bg-red-600 text-white h-8 w-8 rounded-full p-0 flex items-center justify-center shadow-md"
                          onClick={() => addComment(post.id)}
                          disabled={!commentText[post.id]?.trim()}
                        >
                          <Send className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}