import { Link } from "react-router-dom";
import { LogOut, User as UserIcon, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";

const UserMenu = () => {
  const { user, signOut } = useAuth();
  const { t } = useLanguage();

  if (!user) {
    return (
      <Link to="/auth">
        <Button variant="outline" size="sm">
          {t("auth.signIn")}
        </Button>
      </Link>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <UserIcon className="w-4 h-4" />
          <span className="hidden sm:inline max-w-[120px] truncate">
            {user.email?.split("@")[0]}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem asChild>
          <Link to="/get-help" className="flex items-center gap-2 cursor-pointer">
            <MessageSquare className="w-4 h-4" />
            {t("nav.getLegalHelp")}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={signOut} className="text-destructive cursor-pointer">
          <LogOut className="w-4 h-4 mr-2" />
          {t("auth.signOut")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
