import { useSelector } from "react-redux";
import { RootState } from "../../store";

function Username() {
  const username = useSelector((state: RootState) => state.user.username);

  if (!username) return null;

  return (
    <div className="hidden text-sm font-semibold md:block">{username}</div>
  );
}

export default Username;
