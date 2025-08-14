"use client";
import Button from "@/components/Button";
import useAuthModal from "@/hooks/useAuthModal";
import useUploadModal from "@/hooks/useUploadModal";
import { useUser } from "@/hooks/useUser";

const Page = () => {
    const authModal = useAuthModal();
    const uploadModal = useUploadModal();
    const { user } = useUser();

  const onClick = () => {
    if (!user) {
      authModal.onOpen();
    } else {
      uploadModal.onOpen();
    }
  };
  return (
    <div className="w-full flex flex-col">
      <div className="text-3xl font-semibold px-6 text-neutral-300 mt-2">
        Add your songs
      </div>
      <Button className="mx-4 text-white mt-6" onClick={onClick}>Upload Song</Button>
    </div>
  );
};

export default Page;
