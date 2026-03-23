"use client";
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogPortal,
} from "@/components/ui/dialog";
import FormSubmitResponse from "@/components/common/form-submitted-success";

export default function SuccessModal({ isOpen, onClose }) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogPortal>
        <DialogOverlay className="bg-[#000000]/50"/>
        <DialogContent
          showCloseButton={false}
          className="bg-[#212121] rounded-[10px] lg:rounded-[20px]"
        >
          <FormSubmitResponse
            imagePath="/images/form-submitted-success.svg"
            title="Your Request is Submitted"
            description="Our energy expert will contact you shortly."
          />
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
