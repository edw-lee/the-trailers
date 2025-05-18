import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";

type CastAvatarProps = {
  imageUrl: string;
  name: string;
};

export default function CastAvatar({ imageUrl, name }: CastAvatarProps) {
  return (
    <div className="flex flex-col items-center gap-2 w-20">
      <Avatar className="w-16 h-16">
        <AvatarImage
          src={imageUrl}
          className="object-cover object-top"
          alt={`${name} avatar`}
        />
        <AvatarFallback>{name}</AvatarFallback>
      </Avatar>
      <p className="text-center text-sm">{name}</p>
    </div>
  );
}
