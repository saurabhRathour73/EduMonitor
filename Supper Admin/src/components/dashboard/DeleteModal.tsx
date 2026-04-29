import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { School } from "@/lib/storage";
import { toast } from "sonner";

export const DeleteModal = ({
  school,
  onClose,
  onConfirm,
}: {
  school: School | null;
  onClose: () => void;
  onConfirm: (id: string) => void;
}) => {
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (school) setEmail("");
  }, [school]);

  const handleConfirm = () => {
    if (!school) return;
    if (email.trim().toLowerCase() !== school.email.toLowerCase()) {
      toast.error("Email does not match");
      return;
    }
    onConfirm(school.id);
    toast.success(`Deleted ${school.name}`);
    onClose();
  };

  return (
    <Dialog open={!!school} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="rounded-3xl">
        <DialogHeader>
          <DialogTitle>Delete School</DialogTitle>
          <DialogDescription>
            This action is irreversible. Type the school's email{" "}
            <span className="font-semibold text-foreground">{school?.email}</span>{" "}
            to confirm.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-2">
          <Label htmlFor="confirm-email">School Email</Label>
          <Input
            id="confirm-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter school email"
          />
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" className="rounded-full" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            className="rounded-full"
            onClick={handleConfirm}
          >
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
