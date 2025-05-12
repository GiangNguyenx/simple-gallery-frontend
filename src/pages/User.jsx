import UserDetail from "../components/UserDetail";
import BackButton from "../components/BackButton";

const User = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <BackButton />
      </div>
      <UserDetail />
    </div>
  );
};

export default User;