import { Bell, Menu, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User } from "@/lib/storage";

export const Topbar = ({
  user,
  onMenuClick,
}: {
  user: User;
  onMenuClick: () => void;
}) => {
  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-border bg-background/80 px-4 backdrop-blur-md md:px-6">
      <button className="md:hidden" onClick={onMenuClick}>
        <Menu className="h-5 w-5" />
      </button>

      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search..."
          className="rounded-full border-border bg-muted/50 pl-9"
        />
      </div>

      <button className="relative flex h-10 w-10 items-center justify-center rounded-full bg-muted/50 transition-colors hover:bg-muted">
        <Bell className="h-5 w-5" />
        <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-primary" />
      </button>

      <div className="flex items-center gap-3 rounded-full border border-border bg-card p-1 pr-3 sm:pl-1">
        <Avatar className="h-9 w-9">
          <AvatarFallback className="bg-gradient-primary text-primary-foreground font-semibold">
            {initials}
          </AvatarFallback>
        </Avatar>
        <div className="hidden sm:block">
          <p className="text-sm font-medium leading-tight">{user.name}</p>
          <p className="text-xs text-muted-foreground leading-tight">{user.email}</p>
        </div>
      </div>
    </header>
  );
};
