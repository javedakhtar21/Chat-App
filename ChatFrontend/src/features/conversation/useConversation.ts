import { ConversationService } from "./service";
import { useEffect, useState, useCallback } from "react";

const useConversation = () => {
  const [conversations, setConversations] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const fetchConversations = useCallback(async () => {
    try {
        debugger
      setError("");
      setLoading(true);
      const response = await ConversationService.getConversations();
      if (response.statusCode === 200) {
        setConversations(response.data || []);
      }
    } catch (error) {
      const err = error as Error;
      setError(err.message || "Failed to fetch conversations");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchConversations();
  }, [fetchConversations]);

  return { conversations, loading, error, fetchConversations };
};

export { useConversation };
