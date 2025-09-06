"use client";
import Modal from "./Modal";
import useUploadModal from "@/hooks/useUploadModal";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Input from "./Input";
import Button from "./Button";
import { useUser } from "@/hooks/useUser";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";
import Spinner from "@/components/Spinner";
const UploadModal = () => {
  const uploadModal = useUploadModal();
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUser();
  const supabaseClient = useSupabaseClient();
  const router = useRouter();

  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: {
      author: "",
      title: "",
      song: null,
      image: null,
    },
  });

  const onChange = (open: boolean) => {
    reset();
    if (!open) {
      uploadModal.onClose();
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      setIsLoading(true);
      const imageFile = values.image?.[0];
      const songFile = values.song?.[0];

      if (!imageFile || !songFile || !user) {
        await toast.error("Missing Fields !");
        setIsLoading(false);
        return;
      }
      const uniqueID = uuidv4();
      const { data: songData, error: songError } = await supabaseClient.storage
        .from("songs")
        .upload(`song-${values.title}-${uniqueID}`, songFile, {
          cacheControl: "3600",
          upsert: false,
        });
      if (songError) {
        setIsLoading(false);
        return toast.error("song upload failed  ");
      }
      const { data: imageData, error: imageError } =
        await supabaseClient.storage
          .from("images")
          .upload(`image-${values.title}-${uniqueID}`, imageFile, {
            cacheControl: "3600",
            upsert: false,
          });
      if (imageError) {
        setIsLoading(false);
        return toast.error("Image upload failed");
      }
      const { error: supabaseerror } = await supabaseClient
        .from("songs")
        .insert({
          user_id: user.id,
          title: values.title,
          author: values.author,
          image_path: imageData.path,
          song_path: songData.path,
        });
      if (supabaseerror) {
        setIsLoading(false);
        return toast.error(supabaseerror.message);
      }
      router.refresh();
      setIsLoading(false);
      toast.success("Song Created");
      reset();
      uploadModal.onClose();
    } catch (error) {
      alert(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      title="Add your own music"
      description="Please upload a mp3 file"
      isOpen={uploadModal.isOpen}
      onChange={onChange}
      className="z-50"
    >
      {isLoading ? (
        <div className="flex flex-col items-center py-8">
          <Spinner />
          <div className="mt-4 text-neutral-400 font-semibold">Uploading...</div>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <Input
            id="title"
            disabled={isLoading}
            {...register("title", { required: true })}
            placeholder="Song title"
          />
          <Input
            id="author"
            disabled={isLoading}
            {...register("author", { required: true })}
            placeholder="Artist"
          />
          <div>
            <div className="pb-1">Select a song file</div>
            <Input
              id="song"
              type="file"
              disabled={isLoading}
              accept=".mp3"
              {...register("song", { required: true })}
            />
          </div>
          <div>
            <div className="pb-1">Select Cover Image</div>
            <Input
              id="image"
              type="file"
              disabled={isLoading}
              accept="image/*"
              {...register("image", { required: true })}
            />
          </div>
          <Button type={"submit"} className="border-white text-white" disabled={isLoading}>
            Create Song
          </Button>
        </form>
      )}
    </Modal>
  );
};

export default UploadModal;
