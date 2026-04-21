import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SiteShell } from "@/components/SiteShell";
import NotFound from "@/pages/not-found";
import Landing from "@/pages/Landing";
import ChatHub from "@/pages/ChatHub";
import CommentsHub from "@/pages/CommentsHub";
import About from "@/pages/About";
import Privacy from "@/pages/Privacy";
import WhatsAppPage from "@/pages/chats/WhatsAppPage";
import IMessagePage from "@/pages/chats/IMessagePage";
import InstagramPage from "@/pages/chats/InstagramPage";
import MessengerPage from "@/pages/chats/MessengerPage";
import TelegramPage from "@/pages/chats/TelegramPage";
import DiscordPage from "@/pages/chats/DiscordPage";
import YouTubePage from "@/pages/comments/YouTubePage";
import InstagramCommentsPage from "@/pages/comments/InstagramCommentsPage";
import TwitterPage from "@/pages/comments/TwitterPage";
import TikTokPage from "@/pages/comments/TikTokPage";
import FacebookPage from "@/pages/comments/FacebookPage";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Landing} />
      <Route path="/chat" component={ChatHub} />
      <Route path="/chat/whatsapp" component={WhatsAppPage} />
      <Route path="/chat/imessage" component={IMessagePage} />
      <Route path="/chat/instagram" component={InstagramPage} />
      <Route path="/chat/messenger" component={MessengerPage} />
      <Route path="/chat/telegram" component={TelegramPage} />
      <Route path="/chat/discord" component={DiscordPage} />
      <Route path="/comments" component={CommentsHub} />
      <Route path="/comments/youtube" component={YouTubePage} />
      <Route path="/comments/instagram" component={InstagramCommentsPage} />
      <Route path="/comments/twitter" component={TwitterPage} />
      <Route path="/comments/tiktok" component={TikTokPage} />
      <Route path="/comments/facebook" component={FacebookPage} />
      <Route path="/about" component={About} />
      <Route path="/privacy" component={Privacy} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <SiteShell>
            <Router />
          </SiteShell>
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
