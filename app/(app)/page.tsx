"use client";

import { assistantAtom, userThreadAtom } from "@/atoms";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useAtom } from "jotai";
import { Run } from "openai/resources/beta/threads/index.mjs";
// import { Run, ThreadMessage } from "openai/resources/beta/threads/index.mjs";
import React, { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

const POLLING_FREQUENCY_MS = 1000;

function ChatPage() {
  // Atom State
  const [userThread] = useAtom(userThreadAtom);
  const [assistant] = useAtom(assistantAtom);

  // State
  const [fetching, setFetching] = useState(false);
  const [messages, setMessages] = useState<any>([]);
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [pollingRun, setPollingRun] = useState(false);

  const fetchMessages = useCallback(async () => {
    if (!userThread) return;

    setFetching(true);

    try {
      const response = await axios.post<{
        success: boolean;
        error?: string;
        messages?: any;
      }>("/api/message/list", { threadId: userThread.threadId });

      // Validation
      if (!response.data.success || !response.data.messages) {
        console.error(response.data.error ?? "Unknown error.");
        return;
      }

      let newMessages = response.data.messages;

      // Sort in descending order
      newMessages = newMessages
        .sort((a: any, b: any) => {
          return (
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
          );
        })
        .filter(
          (message: any) =>
            message.content[0].type === "text" &&
            message.content[0].text.value.trim() !== ""
        );

      setMessages(newMessages);
    } catch (error) {
      console.error(error);
      setMessages([]);
    } finally {
      setFetching(false);
    }
  }, [userThread]);

  useEffect(() => {
    const intervalId = setInterval(fetchMessages, POLLING_FREQUENCY_MS);

    // Clean up on unmount
    return () => clearInterval(intervalId);
  }, [fetchMessages]);

  const startRun = async (
    threadId: string,
    assistantId: string
  ): Promise<string> => {
    // api/run/create
    try {
      const {
        data: { success, run, error },
      } = await axios.post<{
        success: boolean;
        error?: string;
        run?: Run;
      }>("api/run/create", {
        threadId,
        assistantId,
      });

      if (!success || !run) {
        console.error(error);
        toast.error("Failed to start run.");
        return "";
      }

      return run.id;
    } catch (error) {
      console.error(error);
      toast.error("Failed to start run.");
      return "";
    }
  };

  const pollRunStatus = async (threadId: string, runId: string) => {
    // api/run/retrieve
    setPollingRun(true);

    const intervalId = setInterval(async () => {
      try {
        const {
          data: { run, success, error },
        } = await axios.post<{
          success: boolean;
          error?: string;
          run?: Run;
        }>("/api/run/retrieve", {
          threadId,
          runId,
        });

        if (!success || !run) {
          console.error(error);
          toast.error("Failed to poll run status.");
          return;
        }

        // console.log("run", run);

        if (run.status === "completed") {
          clearInterval(intervalId);
          setPollingRun(false);
          fetchMessages();
          return;
        } else if (run.status === "failed") {
          clearInterval(intervalId);
          setPollingRun(false);
          toast.error("Run failed.");
          return;
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to poll run status.");
        clearInterval(intervalId);
      }
    }, POLLING_FREQUENCY_MS);

    // Clean up on unmount
    return () => clearInterval(intervalId);
  };

  const sendMessage = async () => {
    // Validation
    if (!userThread || sending || !assistant) {
      toast.error("Failed to send message. Invalid state.");
      return;
    }

    setSending(true);

    // Send message /api/message/create
    try {
      const {
        data: { message: newMessages },
      } = await axios.post<{
        success: boolean;
        message?: any;
        error?: string;
      }>("/api/message/create", {
        message,
        threadId: userThread.threadId,
        fromUser: "true",
      });

      // Update ours messages with our new response
      if (!newMessages) {
        console.error("No message returned.");
        toast.error("Failed to send message. Please try again.");
        return;
      }

      setMessages((prev: any) => [...prev, newMessages]);
      setMessage("");
      toast.success("Message sent.");
      // Start a run and then we are going to start polling.
      const runId = await startRun(userThread.threadId, assistant.assistantId);
      if (!runId) {
        toast.error("Failed to start run.");
        return;
      }
      pollRunStatus(userThread.threadId, runId);
    } catch (error) {
      console.error(error);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="w-screen h-[calc(100vh-64px)] flex flex-col text-white">
      {/* MESSAGES */}
      <div className="flex-grow overflow-y-scroll p-8 space-y-2">
        {/* 1. FETCHING MESSAGES */}
        {fetching && messages.length === 0 && (
          <div className="text-center font-bold">Fetching...</div>
        )}
        {/* 2. NO MESSAGES */}
        {messages.length === 0 && !fetching && (
          <div className="text-center font-bold">No messages.</div>
        )}
        {/* 3. LISTING OUT THE MESSAGES */}
        {messages.map((message: any) => (
          <div
            key={message.id}
            className={`px-4 py-2 mb-3 rounded-lg w-fit text-sm  ${
              ["true", "True"].includes(
                (message.metadata as { fromUser?: string }).fromUser ?? ""
              )
                ? "bg-purpleSecondary-600 ml-auto"
                : "bg-gray-100"
            }`}
          >
            {message.content[0].type === "text"
              ? message.content[0].text.value
                  .split("\n")
                  .map(
                    (
                      text: string | null,
                      index: React.Key | null | undefined
                    ) => (
                      <p
                        key={index}
                        className={` ${
                          ["true", "True"].includes(
                            (message.metadata as { fromUser?: string })
                              .fromUser ?? ""
                          )
                            ? "text-gray-20"
                            : ""
                        }`}
                      >
                        {text}
                      </p>
                    )
                  )
              : null}
          </div>
        ))}
      </div>

      {/* INPUT */}
      <div className="mt-auto p-4 ">
        <div className="flex items-center bg-gray-100 rounded-lg p-2">
          <input
            type="text"
            className="flex-grow bg-transparent  focus:outline-none placeholder:text-gray-20"
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button
            disabled={
              !userThread?.threadId || !assistant || sending || !message.trim()
            }
            className="bg-gray-500 text-gray-20 rounded-full focus:outline-none disabled:bg-gray-500 m-0"
            onClick={sendMessage}
          >
            {sending ? "Sending..." : pollingRun ? "Polling Run..." : "Send"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ChatPage;
