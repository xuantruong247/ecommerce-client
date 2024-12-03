import React, { useEffect, useState } from "react";
import { Dialog, DialogContent } from "../ui/dialog";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { StarIcon } from "lucide-react";
import { Input } from "../ui/input";

const ShoppingProductDetail = ({ open, setOpen, product }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState(""); 

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          setError("You need to log in first.");
          return;
        }

        const response = await fetch(
          `http://localhost:3000/api/v1/comment/${product?._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, 
            },
          }
        );

        const data = await response.json();
        if (response.ok) {
          setComments(data.data?.data || []);
        } else {
          setError(data.message || "Failed to fetch comments.");
        }
      } catch (error) {
        console.error("Error fetching comments:", error);
        setError("An error occurred while fetching comments.");
      }
    };

    if (product?._id) {
      fetchComments();
    }
  }, [product?._id]);

  const handleSubmit = async () => {
    if (!newComment.trim()) {
      setError("Comment cannot be empty.");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("accessToken");
      if (!token) {
        setError("You need to log in first.");
        setLoading(false);
        return;
      }

      const response = await fetch(
        `http://localhost:3000/api/v1/comment/${product?._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            message: newComment, // Gửi message mới
          }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        setComments((prevComments) => [
          ...prevComments,
          { message: newComment, userID: "You", _id: Date.now() }, // Thêm bình luận mới vào danh sách
        ]);
        setNewComment(""); // Làm sạch trường input
      } else {
        setError(data.message || "Failed to post comment.");
      }
    } catch (error) {
      console.error("Error posting comment:", error);
      setError("An error occurred while posting the comment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="grid grid-cols-2 gap-8 sm:p-12 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw]">
        <div className="relative overflow-hidden rounded-lg">
          <img
            src={product?.img}
            alt={product?.name}
            width={600}
            height={600}
            className="aspect-square w-full object-cover"
          />
        </div>
        <div className="flex flex-col gap-4">
          <div>
            <h1 className="text-3xl font-extrabold">{product?.name}</h1>
            <p className="text-muted">{product?.description}</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-3xl font-bold">{product?.price} VND</p>
            <button
              onClick={() => setOpen(false)}
              className="px-4 py-2 bg-red-500 text-white rounded-lg"
            >
              Đóng
            </button>
          </div>
          <div className="flex items-center gap-1">
            <div className="flex items-center gap-0.5">
              <StarIcon className="w-5 h-5 fill-yellow-400" />
              <StarIcon className="w-5 h-5 fill-yellow-400" />
              <StarIcon className="w-5 h-5 fill-yellow-400" />
              <StarIcon className="w-5 h-5 fill-yellow-400" />
              <StarIcon className="w-5 h-5 fill-yellow-400" />
            </div>
            <p className="text-muted">(4.5)</p>
          </div>
          <Button className="w-full" onClick={handleSubmit} disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </Button>
          {error && <p className="text-red-500 mt-2">{error}</p>}
          <Separator />
          <div className="max-h-[300px] overflow-auto">
            <h2 className="text-xl font-bold mb-4">Reviews</h2>
            <div className="grid gap-6">
              {comments.length > 0 ? (
                comments.map((comment) => (
                  <div key={comment._id} className="flex gap-4">
                    <Avatar className="h-10 w-10 border">
                      <AvatarFallback>{comment.userID.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold">{comment.userID}</h3>
                      </div>
                      <div className="flex items-center gap-0.5">
                        <StarIcon className="w-5 h-5 fill-yellow-400" />
                        <StarIcon className="w-5 h-5 fill-yellow-400" />
                        <StarIcon className="w-5 h-5 fill-yellow-400" />
                        <StarIcon className="w-5 h-5 fill-yellow-400" />
                        <StarIcon className="w-5 h-5 fill-yellow-400" />
                      </div>
                      <p className="text-muted">{comment.message}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p>No reviews yet.</p>
              )}
            </div>
            <div className="mt-6 flex gap-2">
              <Input
                placeholder="Write a review..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)} // Cập nhật nội dung bình luận
              />
              <Button onClick={handleSubmit} disabled={loading}>
                Submit
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShoppingProductDetail;
