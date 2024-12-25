
const UserCard = ({ user }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
      <img className="w-full" src={user.image} alt={user.name} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{user.name}</div>
        <p className="text-gray-700 text-base">
          {user.bio}
        </p>
      </div>
      <div className="px-6 pt-4 pb-2">
        {user.skills.map((skill, index) => (
          <span
            key={index}
            className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
          >
            #{skill}
          </span>
        ))}
      </div>
    </div>
  );
};

export default UserCard;