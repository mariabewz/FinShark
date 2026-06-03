import React from "react";
import { CommentGet } from "../../Models/Comment";
import StockCommentListItem from "../StockCommentListItem/StockCommentListItem";

type Props = {
  comments: CommentGet[] | null;
};

const StockCommentList = ({ comments }: Props) => {
  return (
    <div className="w-full">
      {comments && comments.length > 0
        ? comments.map((comment) => (
            <StockCommentListItem key={comment.id} comment={comment} />
          ))
        : null}
    </div>
  );
};

export default StockCommentList;
