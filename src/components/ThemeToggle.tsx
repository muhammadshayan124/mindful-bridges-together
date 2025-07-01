
import { Moon, Sun, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useTheme } from './ThemeProvider';

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="interactive-button bg-gradient-to-r from-white/90 to-calm-50/90 dark:from-serenity-800/90 dark:to-serenity-700/90 backdrop-blur-sm border-calm-300 dark:border-serenity-500 hover:from-calm-100 hover:to-lavender-100 dark:hover:from-serenity-700 dark:hover:to-serenity-600 transition-all duration-300 hover:shadow-lg hover:scale-110"
        >
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-amber-500 drop-shadow-sm" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-indigo-400 drop-shadow-sm" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="dropdown-content border-calm-200 dark:border-serenity-600 animate-in fade-in-0 zoom-in-95 slide-in-from-top-2"
      >
        <DropdownMenuItem 
          onClick={() => setTheme('light')} 
          className={`cursor-pointer transition-all duration-200 hover:bg-amber-50 dark:hover:bg-amber-900/20 ${theme === 'light' ? 'bg-amber-100 dark:bg-amber-900/30' : ''}`}
        >
          <Sun className="mr-3 h-4 w-4 text-amber-500" />
          <span className="font-medium">Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setTheme('dark')} 
          className={`cursor-pointer transition-all duration-200 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 ${theme === 'dark' ? 'bg-indigo-100 dark:bg-indigo-900/30' : ''}`}
        >
          <Moon className="mr-3 h-4 w-4 text-indigo-400" />
          <span className="font-medium">Dark</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setTheme('system')} 
          className={`cursor-pointer transition-all duration-200 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 ${theme === 'system' ? 'bg-emerald-100 dark:bg-emerald-900/30' : ''}`}
        >
          <Palette className="mr-3 h-4 w-4 text-emerald-500" />
          <span className="font-medium">System</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
