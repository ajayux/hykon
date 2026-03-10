import { notFound } from "next/navigation";
import TermsAndConditions from "@/components/blocks/terms/terms-conditions";

export default async function TermsPage() {
    let termsData = null;

    try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
        const res = await fetch(`${baseUrl}/api/terms`, {
            next: { revalidate: 60 },
        });

        if (res.ok) {
            const response = await res.json();
            termsData = response.data;
        }
    } catch (error) {
        console.error("Error fetching terms data:", error);
    }
    if (!termsData) {
        notFound();
    }

    return (
        <>
            <TermsAndConditions />
        </>
    );
}
