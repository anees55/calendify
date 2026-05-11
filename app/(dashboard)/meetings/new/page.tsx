"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Calendar as CalendarIcon,
  Clock,
  Users,
  Info,
  Link as LinkIcon,
  Copy,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { motion, AnimatePresence } from "motion/react";

export default function CreateMeeting() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState("");
  const [participants, setParticipants] = useState("");

  const [isCreated, setIsCreated] = useState(false);
  const [meetingUrl, setMeetingUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !date || !time) {
      toast.error("Please fill required fields");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/meetings/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          date,
          time,
          participants: participants
            .split(",")
            .map((e) => e.trim())
            .filter(Boolean),
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed");

      setMeetingUrl(data.meetingLink);
      setIsCreated(true);
      toast.success("Meeting created successfully!");
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(meetingUrl);
    toast.success("Copied!");
  };

  return (
    <div className="max-w-3xl mx-auto animate-in slide-in-from-bottom duration-500">
      <Button
        variant="ghost"
        onClick={() => router.push("/dashboard")}
        className="mb-8 gap-2"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </Button>

      <AnimatePresence mode="wait">
        {!isCreated ? (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div>
              <Label>Meeting Title *</Label>
              <Input value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>

            <div>
              <Label>Description</Label>
              <textarea
                className="w-full border p-2 rounded"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Popover>
                <PopoverTrigger>
                  <Button
                    variant="outline"
                    type="button"
                    className={cn(
                      "w-full h-12 justify-start text-left font-normal bg-muted/30 border-border",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <Calendar mode="single" selected={date} onSelect={setDate} />
                </PopoverContent>
              </Popover>

              <Input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>

            <div>
              <Label>Participants</Label>
              <Input
                value={participants}
                onChange={(e) => setParticipants(e.target.value)}
              />
            </div>

            <Button type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create Meeting"}
            </Button>
          </motion.form>
        ) : (
          <motion.div className="text-center space-y-6">
            <Check className="mx-auto text-green-500 w-10 h-10" />
            <h2>Meeting Created!</h2>

            <div className="flex items-center gap-2 justify-center">
              <LinkIcon />
              <span className="truncate">{meetingUrl}</span>
              <Button size="icon" onClick={handleCopy}>
                <Copy />
              </Button>
            </div>

            <Button onClick={() => router.push("/dashboard")}>
              Back to Dashboard
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}