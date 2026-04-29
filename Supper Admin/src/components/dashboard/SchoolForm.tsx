import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { School } from "@/lib/storage";
import { toast } from "sonner";

export const SchoolForm = ({
  onCreate,
}: {
  onCreate: (school: School) => void;
}) => {
  const [open, setOpen] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);

  // =========================
  // CREATE SCHOOL API
  // =========================
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim()) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      // 🔥 FIXED API CALL
      const response = await fetch(
        "http://localhost:3000/auth/superAdmin/createSchool",
        {
          method: "POST",

          // 🔥 VERY IMPORTANT (COOKIE SEND HOGA AB)
          credentials: "include",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            name: name.trim(),
            email: email.trim(),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Failed to create school");
        return;
      }

      const newSchool: School = {
        id: data.school?.schoolCode || data.school?.id,
        name: data.school?.name || name.trim(),
        email: data.school?.email || email.trim(),
        status: data.school?.status || "Active",
        createdAt: data.school?.createdAt || new Date().toISOString(),
      };

      onCreate(newSchool);

      toast.success(`School created successfully! Code: ${newSchool.id}`);

      setName("");
      setEmail("");
      setOpen(false);

    } catch (error) {
      console.error("Create School Error:", error);
      toast.error("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="rounded-full bg-gradient-primary shadow-glow transition-transform hover:scale-105">
          <Plus className="mr-1 h-4 w-4" /> Create School
        </Button>
      </DialogTrigger>

      <DialogContent className="rounded-3xl">
        <DialogHeader>
          <DialogTitle>Create New School</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">

          <div className="space-y-2">
            <Label htmlFor="school-name">School Name</Label>
            <Input
              id="school-name"
              placeholder="Greenwood High"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="school-email">School Email</Label>
            <Input
              id="school-email"
              type="email"
              placeholder="info@greenwood.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-gradient-primary shadow-glow"
          >
            {loading ? "Creating School..." : "Create School"}
          </Button>

        </form>
      </DialogContent>
    </Dialog>
  );
};