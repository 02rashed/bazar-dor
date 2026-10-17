
"use client";
import { authClient } from "@/lib/auth-client";
import {toast} from 'react-hot-toast'

const UserDetails = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const handleSignOut = async () => {
    await authClient.signOut();
  };

  return (
    <div>
      <button className="flex justify-center items-center gap-3">
        {" "}
        <div className="avatar avatar-placeholder">
          <div className="bg-neutral text-neutral-content w-8 rounded-full">
            <span className="text-xs">{user?.name.slice(0, 2)}</span>
          </div>
        </div>{" "}
        <div>
          {user?.name} <span className="text-[10px]">▼</span>{" "}
        </div>
      </button>
      <button onClick={handleSignOut}>signout</button>
    </div>
  );
};

export default UserDetails;
