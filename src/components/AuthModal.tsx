"use client";
import useAuthModal from "@/hooks/useAuthModal";
import Modal from "./Modal";
import {
  useSessionContext,
  useSupabaseClient,
} from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeMinimal, ThemeSupa } from "@supabase/auth-ui-shared";

const AuthModal = () => {
  const supabaseClient = useSupabaseClient();
  const router = useRouter();
  const { session } = useSessionContext();
  const {onClose,isOpen}=useAuthModal();
  const onChange=(open:boolean)=>{
    if(!isOpen){
        onClose();
    }
  }
  return (
    <div>
      <Modal
        title="Welcome back"
        description="Login in to your account"
        isOpen={isOpen}
        onChange={onChange}
      >
        <Auth
          theme="dark"
          magicLink
          supabaseClient={supabaseClient}
          providers={["google", "github"]}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: "#fffffff",
                  brandAccent: "#f97316",
                },
              },
            },
          }}
        />
      </Modal>
    </div>
  );
};
export default AuthModal;
