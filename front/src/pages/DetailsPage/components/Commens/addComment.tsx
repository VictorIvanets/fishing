import Flex from "src/components/Flex/Flex";
import InputField from "src/components/Input/InputField";
import useCreateComment from "src/hooks/useCreateComment";
import type { CommentT } from "src/types/comments.types";
import type { OneFishingT } from "src/types/fishing";
import { commentSchema, type CommentSchemaDataFields } from "./commentSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "src/components/Button/Button";
import { useSelector } from "react-redux";
import type { RootState } from "src/store/store";

interface AddCommentProps {
  data: OneFishingT;
}
const AddComment = ({ data }: AddCommentProps) => {
  const { create } = useCreateComment(data._id);
  const userInfo = useSelector((s: RootState) => s.auth?.userInfo);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<CommentSchemaDataFields>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      comment: "",
    },
  });

  const submit = (comm: { comment: string }) => {
    const payload: CommentT = {
      login: userInfo?.name!,
      useId: userInfo?._id!,
      setId: data._id,
      comment: comm.comment,
    };
    create(payload);
    reset();
  };

  return (
    <Flex column className='addcomment'>
      <h4 className='tacenter'>Напишіть коментар</h4>
      <form onSubmit={handleSubmit(submit)}>
        <InputField
          id='input_comment'
          {...register("comment")}
          error={errors.comment?.message}
          as='textarea'
          heightArea={80}
        />
        {userInfo && (
          <Button
            className='addcomment__btn'
            isValid={isValid}
            type='submit'
            appearence='big'
            title={"відправити"}
          />
        )}
      </form>
    </Flex>
  );
};

export default AddComment;
