import AvatarImage from "../../assets/images/avatar.png";

const Avatar = ({ image, className = "h-10 w-10" }) => {
  const imageUrl = image
    ? `${import.meta.env.VITE_API_URL}/storage/${image}`
    : AvatarImage;

    return (
    <div className={`bg-accent cursor-pointer rounded-full ${className}`}>
      <img className="h-full w-full rounded-full" src={imageUrl} alt="User profile" />
    </div>
  );
};

export default Avatar;
