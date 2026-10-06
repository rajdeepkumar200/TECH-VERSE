import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { submitEnquiry } from "@/services/api";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface EnquiryFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const areasOfInterest = [
  "Coding & App/Web Development",
  "AI/ML & Data Science",
  "Event Management & Leadership",
  "Cybersecurity & Forensics",
  "Designing (UI/UX, Posters, Branding)",
  "Content Creation & Social Media",
  "Other",
];

const batchesByDepartment = {
  btech: ["2021-2025", "2022-2026", "2023-2027", "2024-2028"],
  bca: ["2022-2025", "2023-2026", "2024-2027"],
};

const fieldClassName =
  "w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-ring";

export function EnquiryFormDialog({ open, onOpenChange }: EnquiryFormDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [department, setDepartment] = useState<"btech" | "bca">("btech");
  const [batch, setBatch] = useState(batchesByDepartment.btech[0]);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (selectedInterests.length === 0) {
      toast.error("Select at least one area of interest.");
      return;
    }

    const formData = new FormData(event.currentTarget);
    const otherInterest = String(formData.get("otherInterest") || "").trim();
    const interests = selectedInterests
      .filter((interest) => interest !== "Other")
      .concat(selectedInterests.includes("Other") && otherInterest ? [otherInterest] : []);

    setIsSubmitting(true);
    try {
      await submitEnquiry({
        name: String(formData.get("name") || "").trim(),
        regNumber: String(formData.get("regNumber") || "").trim(),
        contact: String(formData.get("contact") || "").trim(),
        email: String(formData.get("email") || "").trim(),
        department,
        batch: String(formData.get("batch") || ""),
        interests,
        otherInterest,
      });
      toast.success("Your enquiry has been submitted.");
      setSelectedInterests([]);
      onOpenChange(false);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Enquiry submission failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleInterest = (area: string) => {
    setSelectedInterests((current) =>
      current.includes(area)
        ? current.filter((interest) => interest !== area)
        : [...current, area],
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Send an enquiry</DialogTitle>
          <DialogDescription>
            Tell us a little about yourself and what you are interested in.
          </DialogDescription>
        </DialogHeader>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="space-y-1.5 text-sm font-medium">
              Name
              <input className={fieldClassName} name="name" minLength={2} required />
            </label>
            <label className="space-y-1.5 text-sm font-medium">
              Registration number
              <input className={fieldClassName} name="regNumber" required />
            </label>
            <label className="space-y-1.5 text-sm font-medium">
              Contact number
              <input
                className={fieldClassName}
                name="contact"
                type="tel"
                inputMode="numeric"
                pattern="[0-9]{10}"
                title="Enter a valid 10-digit contact number"
                required
              />
            </label>
            <label className="space-y-1.5 text-sm font-medium">
              Email
              <input className={fieldClassName} name="email" type="email" required />
            </label>
            <label className="space-y-1.5 text-sm font-medium">
              Department
              <select
                className={fieldClassName}
                value={department}
                onChange={(event) => {
                  const nextDepartment = event.target.value as "btech" | "bca";
                  setDepartment(nextDepartment);
                  setBatch(batchesByDepartment[nextDepartment][0]);
                }}
              >
                <option value="btech">B.Tech</option>
                <option value="bca">BCA</option>
              </select>
            </label>
            <label className="space-y-1.5 text-sm font-medium">
              Batch session
              <select
                className={fieldClassName}
                name="batch"
                value={batch}
                onChange={(event) => setBatch(event.target.value)}
                required
              >
                {batchesByDepartment[department].map((batch) => (
                  <option key={batch} value={batch}>{batch}</option>
                ))}
              </select>
            </label>
          </div>

          <fieldset className="space-y-2">
            <legend className="text-sm font-medium">Areas of interest</legend>
            <div className="grid gap-2 sm:grid-cols-2">
              {areasOfInterest.map((area) => (
                <label key={area} className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={selectedInterests.includes(area)}
                    onChange={() => toggleInterest(area)}
                  />
                  {area}
                </label>
              ))}
            </div>
          </fieldset>

          {selectedInterests.includes("Other") && (
            <label className="block space-y-1.5 text-sm font-medium">
              Other interest
              <input className={fieldClassName} name="otherInterest" />
            </label>
          )}

          <DialogFooter>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit enquiry"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}