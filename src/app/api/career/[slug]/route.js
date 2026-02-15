import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    const resolvedParams = await params;
    const slug = resolvedParams.slug;
    const { searchParams } = new URL(request.url);
    const locale = searchParams.get("locale") || "en";

    const careers = {
        "senior-project-manager": {
            id: 1,
            slug: "senior-project-manager",
            title: "Senior Project Manager",
            title_ar: "مدير مشاريع أول",
            department: "project-management",
            department_ar: "إدارة المشاريع",
            type: "full-time",
            type_ar: "دوام كامل",
            location: "Dubai, UAE",
            location_ar: "دبي، الإمارات العربية المتحدة",
            description:
                "We are seeking an experienced Senior Project Manager to lead complex workspace and construction projects from conception to completion. The ideal candidate will have a proven track record in managing large-scale projects and coordinating multidisciplinary teams.",
            description_ar:
                "نبحث عن مدير مشاريع أول ذي خبرة لقيادة مشاريع مساحات العمل والبناء المعقدة من التصور إلى الإنجاز. يجب أن يكون المرشح المثالي لديه سجل حافل في إدارة المشاريع واسعة النطاق وتنسيق الفرق متعددة التخصصات.",
            full_description:
                "<p>As a Senior Project Manager at WASSO, you will be responsible for overseeing multiple projects simultaneously, ensuring they are delivered on time, within budget, and to the highest quality standards.</p><h3>Key Responsibilities:</h3><ul><li>Lead project planning and execution</li><li>Manage project budgets and timelines</li><li>Coordinate with clients, contractors, and stakeholders</li><li>Ensure quality control and compliance</li><li>Manage project teams and resources</li><li>Identify and mitigate project risks</li></ul><h3>Requirements:</h3><ul><li>Bachelor's degree in Project Management, Engineering, or related field</li><li>5+ years of project management experience</li><li>PMP certification preferred</li><li>Strong leadership and communication skills</li><li>Experience with project management software</li><li>Excellent problem-solving abilities</li></ul><h3>Benefits:</h3><ul><li>Competitive salary</li><li>Health insurance</li><li>Professional development opportunities</li><li>Flexible working arrangements</li></ul>",
            full_description_ar:
                "<p>كمدير مشاريع أول في واسو، ستكون مسؤولاً عن الإشراف على مشاريع متعددة في وقت واحد، وضمان تسليمها في الوقت المحدد، ضمن الميزانية، وبأعلى معايير الجودة.</p><h3>المسؤوليات الرئيسية:</h3><ul><li>قيادة تخطيط المشروع وتنفيذه</li><li>إدارة ميزانيات المشروع والجداول الزمنية</li><li>التنسيق مع العملاء والمقاولين وأصحاب المصلحة</li><li>ضمان مراقبة الجودة والامتثال</li><li>إدارة فرق المشروع والموارد</li><li>تحديد مخاطر المشروع والتخفيف منها</li></ul><h3>المتطلبات:</h3><ul><li>درجة البكالوريوس في إدارة المشاريع أو الهندسة أو مجال ذي صلة</li><li>5+ سنوات من الخبرة في إدارة المشاريع</li><li>شهادة PMP مفضلة</li><li>مهارات قيادية وتواصل قوية</li><li>خبرة في برامج إدارة المشاريع</li><li>قدرات ممتازة في حل المشكلات</li></ul><h3>المزايا:</h3><ul><li>راتب تنافسي</li><li>تأمين صحي</li><li>فرص التطوير المهني</li><li>ترتيبات عمل مرنة</li></ul>",
            experience_required: "5+ years",
            experience_required_ar: "5+ سنوات",
            education_required: "Bachelor's degree",
            education_required_ar: "درجة البكالوريوس",
            skills: [
                "Project Management",
                "Leadership",
                "Budget Management",
                "Risk Management",
                "Stakeholder Communication",
            ],
            skills_ar: [
                "إدارة المشاريع",
                "القيادة",
                "إدارة الميزانية",
                "إدارة المخاطر",
                "تواصل أصحاب المصلحة",
            ],
            posted_date: "2024-12-01",
            application_deadline: "2025-01-31",
            featured: true,
            tags: ["management", "leadership", "planning"],
            tags_ar: ["إدارة", "قيادة", "تخطيط"],
            seoTitle: "Senior Project Manager Position | WASSO Careers",
            seoTitle_ar: "منصب مدير مشاريع أول | وظائف واسو",
            seoDescription:
                "Join WASSO as a Senior Project Manager and lead exciting workspace projects.",
            seoDescription_ar:
                "انضم إلى واسو كمدير مشاريع أول وقيادة مشاريع مساحات عمل مثيرة.",
            createdAt: "2024-12-01T00:00:00Z",
            updatedAt: "2024-12-01T00:00:00Z",
        },
        "interior-designer": {
            id: 2,
            slug: "interior-designer",
            title: "Interior Designer",
            title_ar: "مصمم داخلي",
            department: "design",
            department_ar: "تصميم",
            type: "full-time",
            type_ar: "دوام كامل",
            location: "Dubai, UAE",
            location_ar: "دبي، الإمارات العربية المتحدة",
            description:
                "We are looking for a creative Interior Designer to join our design team. You will be responsible for creating innovative interior designs for commercial and office spaces.",
            description_ar:
                "نبحث عن مصمم داخلي إبداعي للانضمام إلى فريق التصميم لدينا. ستكون مسؤولاً عن إنشاء تصاميم داخلية مبتكرة للمساحات التجارية والمكتبية.",
            full_description:
                "<p>As an Interior Designer at WASSO, you will work on diverse projects, creating beautiful and functional spaces that meet client needs and reflect their brand identity.</p><h3>Key Responsibilities:</h3><ul><li>Develop design concepts and presentations</li><li>Create detailed design plans and specifications</li><li>Select materials, furniture, and fixtures</li><li>Collaborate with project managers and clients</li><li>Oversee design implementation</li></ul><h3>Requirements:</h3><ul><li>Bachelor's degree in Interior Design or related field</li><li>3+ years of interior design experience</li><li>Proficiency in design software (AutoCAD, SketchUp, etc.)</li><li>Strong creative and conceptual skills</li><li>Excellent communication and presentation skills</li></ul>",
            full_description_ar:
                "<p>كمصمم داخلي في واسو، ستعمل على مشاريع متنوعة، وإنشاء مساحات جميلة ووظيفية تلبي احتياجات العملاء وتعكس هوية علامتهم التجارية.</p><h3>المسؤوليات الرئيسية:</h3><ul><li>تطوير مفاهيم التصميم والعروض التقديمية</li><li>إنشاء خطط تصميم تفصيلية ومواصفات</li><li>اختيار المواد والأثاث والتجهيزات</li><li>التعاون مع مديري المشاريع والعملاء</li><li>الإشراف على تنفيذ التصميم</li></ul><h3>المتطلبات:</h3><ul><li>درجة البكالوريوس في التصميم الداخلي أو مجال ذي صلة</li><li>3+ سنوات من الخبرة في التصميم الداخلي</li><li>إتقان برامج التصميم (AutoCAD، SketchUp، إلخ)</li><li>مهارات إبداعية ومفاهيمية قوية</li><li>مهارات تواصل وعرض ممتازة</li></ul>",
            experience_required: "3+ years",
            experience_required_ar: "3+ سنوات",
            education_required: "Bachelor's degree",
            education_required_ar: "درجة البكالوريوس",
            skills: [
                "Interior Design",
                "Space Planning",
                "AutoCAD",
                "3D Visualization",
                "Material Selection",
            ],
            skills_ar: [
                "التصميم الداخلي",
                "تخطيط المساحات",
                "AutoCAD",
                "التصور ثلاثي الأبعاد",
                "اختيار المواد",
            ],
            posted_date: "2024-12-01",
            application_deadline: "2025-01-31",
            featured: true,
            tags: ["design", "creative", "interior"],
            tags_ar: ["تصميم", "إبداعي", "داخلي"],
            seoTitle: "Interior Designer Position | WASSO Careers",
            seoTitle_ar: "منصب مصمم داخلي | وظائف واسو",
            seoDescription:
                "Join WASSO as an Interior Designer and create beautiful workspace designs.",
            seoDescription_ar:
                "انضم إلى واسو كمصمم داخلي وأنشئ تصاميم مساحات عمل جميلة.",
            createdAt: "2024-12-01T00:00:00Z",
            updatedAt: "2024-12-01T00:00:00Z",
        },
        "workspace-consultant": {
            id: 3,
            slug: "workspace-consultant",
            title: "Workspace Consultant",
            title_ar: "استشاري مساحات العمل",
            department: "consulting",
            department_ar: "استشارات",
            type: "full-time",
            type_ar: "دوام كامل",
            location: "Abu Dhabi, UAE",
            location_ar: "أبوظبي، الإمارات العربية المتحدة",
            description:
                "Join our consulting team as a Workspace Consultant, providing expert advice to clients on workspace optimization and design solutions.",
            description_ar:
                "انضم إلى فريق الاستشارات لدينا كاستشاري مساحات عمل، وتقديم نصيحة خبيرة للعملاء حول تحسين مساحة العمل وحلول التصميم.",
            full_description:
                "<p>As a Workspace Consultant, you will work directly with clients to understand their needs and provide strategic recommendations for workspace design and optimization.</p><h3>Key Responsibilities:</h3><ul><li>Conduct workspace assessments</li><li>Develop optimization strategies</li><li>Provide design recommendations</li><li>Prepare consulting reports</li><li>Present findings to clients</li></ul><h3>Requirements:</h3><ul><li>Bachelor's degree in Architecture, Design, or related field</li><li>4+ years of consulting experience</li><li>Strong analytical skills</li><li>Excellent client-facing skills</li></ul>",
            full_description_ar:
                "<p>كاستشاري مساحات عمل، ستعمل مباشرة مع العملاء لفهم احتياجاتهم وتقديم توصيات استراتيجية لتصميم وتحسين مساحة العمل.</p><h3>المسؤوليات الرئيسية:</h3><ul><li>إجراء تقييمات مساحة العمل</li><li>تطوير استراتيجيات التحسين</li><li>تقديم توصيات التصميم</li><li>إعداد تقارير استشارية</li><li>عرض النتائج للعملاء</li></ul><h3>المتطلبات:</h3><ul><li>درجة البكالوريوس في الهندسة المعمارية أو التصميم أو مجال ذي صلة</li><li>4+ سنوات من الخبرة الاستشارية</li><li>مهارات تحليلية قوية</li><li>مهارات ممتازة في التعامل مع العملاء</li></ul>",
            experience_required: "4+ years",
            experience_required_ar: "4+ سنوات",
            education_required: "Bachelor's degree",
            education_required_ar: "درجة البكالوريوس",
            skills: [
                "Consulting",
                "Workspace Analysis",
                "Strategic Planning",
                "Client Relations",
            ],
            skills_ar: [
                "الاستشارات",
                "تحليل مساحة العمل",
                "التخطيط الاستراتيجي",
                "علاقات العملاء",
            ],
            posted_date: "2024-11-28",
            application_deadline: "2025-01-15",
            featured: false,
            tags: ["consulting", "advisory", "workspace"],
            tags_ar: ["استشارات", "استشاري", "مساحة عمل"],
            seoTitle: "Workspace Consultant Position | WASSO Careers",
            seoTitle_ar: "منصب استشاري مساحات العمل | وظائف واسو",
            seoDescription:
                "Join WASSO as a Workspace Consultant and help clients optimize their workspaces.",
            seoDescription_ar:
                "انضم إلى واسو كاستشاري مساحات العمل وساعد العملاء على تحسين مساحات عملهم.",
            createdAt: "2024-11-28T00:00:00Z",
            updatedAt: "2024-11-28T00:00:00Z",
        },
        "junior-project-coordinator": {
            id: 4,
            slug: "junior-project-coordinator",
            title: "Junior Project Coordinator",
            title_ar: "منسق مشاريع مبتدئ",
            department: "project-management",
            department_ar: "إدارة المشاريع",
            type: "full-time",
            type_ar: "دوام كامل",
            location: "Dubai, UAE",
            location_ar: "دبي، الإمارات العربية المتحدة",
            description:
                "Perfect entry-level position for someone looking to start a career in project management. Support project managers in coordinating activities.",
            description_ar:
                "منصب مثالي للمبتدئين لشخص يتطلع إلى بدء مسيرة مهنية في إدارة المشاريع. دعم مديري المشاريع في تنسيق الأنشطة.",
            full_description:
                "<p>As a Junior Project Coordinator, you will assist project managers in day-to-day project activities and learn the fundamentals of project management.</p><h3>Key Responsibilities:</h3><ul><li>Assist in project planning</li><li>Coordinate meetings and communications</li><li>Maintain project documentation</li><li>Track project progress</li><li>Support team activities</li></ul><h3>Requirements:</h3><ul><li>Bachelor's degree preferred</li><li>1+ years of relevant experience</li><li>Strong organizational skills</li><li>Good communication skills</li><li>Willingness to learn</li></ul>",
            full_description_ar:
                "<p>كمنسق مشاريع مبتدئ، ستساعد مديري المشاريع في أنشطة المشروع اليومية وتتعلم أساسيات إدارة المشاريع.</p><h3>المسؤوليات الرئيسية:</h3><ul><li>المساعدة في تخطيط المشروع</li><li>تنسيق الاجتماعات والاتصالات</li><li>الحفاظ على وثائق المشروع</li><li>تتبع تقدم المشروع</li><li>دعم أنشطة الفريق</li></ul><h3>المتطلبات:</h3><ul><li>درجة البكالوريوس مفضلة</li><li>1+ سنوات من الخبرة ذات الصلة</li><li>مهارات تنظيمية قوية</li><li>مهارات تواصل جيدة</li><li>الرغبة في التعلم</li></ul>",
            experience_required: "1+ years",
            experience_required_ar: "1+ سنوات",
            education_required: "Bachelor's degree preferred",
            education_required_ar: "درجة البكالوريوس مفضلة",
            skills: [
                "Organization",
                "Communication",
                "Project Coordination",
                "Documentation",
            ],
            skills_ar: [
                "التنظيم",
                "التواصل",
                "تنسيق المشروع",
                "التوثيق",
            ],
            posted_date: "2024-11-25",
            application_deadline: "2025-01-10",
            featured: false,
            tags: ["coordination", "support", "entry-level"],
            tags_ar: ["تنسيق", "دعم", "مستوى مبتدئ"],
            seoTitle: "Junior Project Coordinator Position | WASSO Careers",
            seoTitle_ar: "منصب منسق مشاريع مبتدئ | وظائف واسو",
            seoDescription:
                "Start your career with WASSO as a Junior Project Coordinator.",
            seoDescription_ar:
                "ابدأ مسيرتك المهنية مع واسو كمنسق مشاريع مبتدئ.",
            createdAt: "2024-11-25T00:00:00Z",
            updatedAt: "2024-11-25T00:00:00Z",
        },
        "sales-executive": {
            id: 5,
            slug: "sales-executive",
            title: "Sales Executive",
            title_ar: "منفذ مبيعات",
            department: "sales",
            department_ar: "مبيعات",
            type: "full-time",
            type_ar: "دوام كامل",
            location: "Dubai, UAE",
            location_ar: "دبي، الإمارات العربية المتحدة",
            description:
                "Drive business growth by identifying opportunities and building strong relationships with clients in the workspace and project management sector.",
            description_ar:
                "دفع نمو الأعمال من خلال تحديد الفرص وبناء علاقات قوية مع العملاء في قطاع مساحات العمل وإدارة المشاريع.",
            full_description:
                "<p>As a Sales Executive, you will be responsible for generating new business opportunities and maintaining relationships with existing clients.</p><h3>Key Responsibilities:</h3><ul><li>Identify and pursue new business opportunities</li><li>Build and maintain client relationships</li><li>Prepare proposals and presentations</li><li>Negotiate contracts</li><li>Meet sales targets</li></ul><h3>Requirements:</h3><ul><li>Bachelor's degree in Business or related field</li><li>2+ years of sales experience</li><li>Strong communication and negotiation skills</li><li>Knowledge of workspace/construction industry preferred</li></ul>",
            full_description_ar:
                "<p>كمنفذ مبيعات، ستكون مسؤولاً عن توليد فرص أعمال جديدة والحفاظ على العلاقات مع العملاء الحاليين.</p><h3>المسؤوليات الرئيسية:</h3><ul><li>تحديد ومتابعة فرص الأعمال الجديدة</li><li>بناء والحفاظ على علاقات العملاء</li><li>إعداد العروض والعروض التقديمية</li><li>تفاوض العقود</li><li>تحقيق أهداف المبيعات</li></ul><h3>المتطلبات:</h3><ul><li>درجة البكالوريوس في الأعمال أو مجال ذي صلة</li><li>2+ سنوات من الخبرة في المبيعات</li><li>مهارات تواصل وتفاوض قوية</li><li>معرفة بصناعة مساحات العمل/البناء مفضلة</li></ul>",
            experience_required: "2+ years",
            experience_required_ar: "2+ سنوات",
            education_required: "Bachelor's degree",
            education_required_ar: "درجة البكالوريوس",
            skills: [
                "Sales",
                "Business Development",
                "Client Relations",
                "Negotiation",
            ],
            skills_ar: [
                "المبيعات",
                "تطوير الأعمال",
                "علاقات العملاء",
                "التفاوض",
            ],
            posted_date: "2024-11-20",
            application_deadline: "2025-01-05",
            featured: false,
            tags: ["sales", "business", "client-relations"],
            tags_ar: ["مبيعات", "أعمال", "علاقات العملاء"],
            seoTitle: "Sales Executive Position | WASSO Careers",
            seoTitle_ar: "منصب منفذ مبيعات | وظائف واسو",
            seoDescription:
                "Join WASSO as a Sales Executive and help grow our business.",
            seoDescription_ar:
                "انضم إلى واسو كمنفذ مبيعات وساعد في نمو أعمالنا.",
            createdAt: "2024-11-20T00:00:00Z",
            updatedAt: "2024-11-20T00:00:00Z",
        },
    };

    const career = careers[slug];

    if (!career) {
        return NextResponse.json(
            {
                success: false,
                message: "Career not found",
                message_ar: "الوظيفة غير موجودة",
            },
            { status: 404 }
        );
    }

    return NextResponse.json(
        {
            success: true,
            message: "Career fetched successfully",
            message_ar: "تم جلب الوظيفة بنجاح",
            data: {
                career: career,
                // Optional: Include a hero object if page needs it from API, though typically detail page uses career content for hero
                hero: {
                    title: career.title,
                    title_ar: career.title_ar,
                },
            },
        },
        { status: 200 }
    );
}
