import parse from "html-react-parser";
import { Heading, Text } from "@/components/utils/typography";

const defaultData = {
    title: "Terms & Conditions",
    text: "Energy solutions and cutting-edge Lithium-ion battery manufacturing. As a top-ranked Indian manu",
    content:
        `<h5>1. About Hykon</h5>
        <p>Hykon is a provider of power and energy solutions designed for residential, commercial, industrial, and electric vehicle (EV) ecosystems. Our offerings may include power backup systems, energy storage solutions, EV charging infrastructure, related hardware, software integrations, and associated services. All products and services are subject to availability and may vary based on location, regulations, and technical feasibility.</p>
        <h5>2. Acceptance of Terms</h5>
        <p>By using this website or engaging with any Hykon service, you confirm that:</p>
        <ul>
        <li>You are at least 18 years of age or have legal authority to enter into a binding agreement</li>
        <li>You have read, understood, and agreed to these Terms.</li>
        <li>You agree to comply with all applicable laws, regulations, and guidelines.</li>
        </ul>
        <p>Hykon reserves the right to modify or update these Terms at any time without prior notice. Continued use of the website after changes are posted constitutes acceptance of the revised Terms.</p>
        <h5>3. Website Use and Access</h5>
        <p>You agree to use the Hykon website for lawful purposes only. While accessing the website, you must not:</p>
        <ul>
            <li>Engage in activities that disrupt or interfere with website functionality</li>
            <li>Use the website to transmit false, misleading, or unlawful information</li>
            <li>You agree to comply with all applicable laws, regulations, and guidelines.</li>
            <li>Upload or transmit malicious code, viruses, or harmful conten</li>
            <li>You have read, understood, and agreed to these Terms.</li>
            <li>Attempt unauthorized access to systems, servers, or data</li>
        </ul>
        <p>Hykon reserves th infrastructure, related hardware, software integrations, and associated services. All products and services are subject to availability and may vary based on location, regulations, ae right to modify or update these Terms at any time without prior notice.</p>
        <h5>4. Product Information and Accuracy</h5>
        <p>While Hykon strives to ensure that all product descriptions, specifications, images, and pricing displayed on the website are accurate, errors or omissions may occur. Product visuals are for illustrative purposes only and may differ from the actual product.Hykon is a provider of power and energy solutions designed for residential, commercial, industrial, and electric vehicle (EV) ecosystems. Our offerings may include power backup systems, energy storage solutions, EV charging infrastructure, related hardware, software integrations, and associated services. All products and services are subject to availability and may vary based on location, regulations, and technical feasibility.</p>
        <p>Hykon does not warrant that product descriptions or other content on the website are complete, reliable, or error-free. We reserve the right to correct errors, update information, or discontinue products at any time.</p>
        <h5>5. Limitation of Liability</h5>
        <p>To the maximum extent permitted by law, Hykon shall not be liable for:</p>
        <ul>
        <li>Any indirect, incidental, special, or consequential damages</li>
        <li>Loss of profits, data, or business opportunities</li>
        <li>Damages arising from power failures, system downtime, or third-party service interruptions</li>
        </ul>
        <h5>6. Third-Party Links and Services</h5>
        <p>The website may contain links to third-party websites or services for convenience or informational purposes. Hykon does not control or endorse these third-party platforms and is not responsible for their content, policies, or practices. Accessing third-party services is at your own risk.</p>
        <h5>7. Data Protection and Privacy</h5>
        <p>Hykon is a provHykon values your privacy. Any personal or business information collected through the website is handled in accordance with our Privacy Policy. By using our services, you consent to the collection, use, and processing of information as outlined in the Privacy Policy.ider of power and energy solutions designed for residential, commercial, industrial, and electric vehicle (EV) ecosystems. Our offerings may include power backup systems, energy storage solutions, EV charging infrastructure, related hardware, software integrations, and associated services. All products and services are subject to availability and may vary based on location, regulations, and technical feasibility.</p>
        <h5>8. Governing Law and Jurisdiction</h5>
        <p>These Terms shall be governed by and construed in accordance with the lawPolicy.ider of power and energy solutions designed for residential, commercial, industrial, ands of India. Any disputes arising out of or related to these Terms shall be subject to the exclusive jurisdiction of the courts</p>
        `,
};

export default function TermsAndConditions({ data = defaultData }) {
    return ( 
        <section className="w-full h-auto block py-[var(--header-y)] bg-[linear-gradient(0deg,_rgba(24,24,24,1)_0%,_rgba(24,24,24,1)_58%,_rgba(19,51,68,1)_100%)] overflow-hidden">
            <div className="container">
                <div className="typography w-full block mb-4 xl:mb-6 2xl:mb-7 3xl:mb-9">
                    <Heading
                        as="h1"
                        size="h1"
                        className="leading-tight font-normal text-white mb-4"
                    >
                        {parse(data?.title || "")}
                    </Heading>
                    <div className="typography [--text-color:#fff] mb-4 lg:mb-8 xl:mb-10 2xl:mb-12 3xl:mb-14">
                        {parse(data?.text || "")}
                    </div>
                    
                    <div className="typography [--text-color:#fff] [&_h5]:mt-[15px] sm:[&_h5]:mt-[18px] xl:[&_h5]:mt-[22px] 2xl:[&_h5]:mt-[28px] 3xl:[&_h5]:mt-[35px]">
                        {parse(data?.content || "")}
                    </div>
                </div>
            </div>
        </section>
    );
}
