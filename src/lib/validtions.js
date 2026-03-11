import { z } from "zod";

// ─── Dynamic Config Values ─────────────────────────────────────────────────────
const VALIDATION_CONFIG = {
  name: {
    minLength: 2,
    maxLength: 255,
  },
  phone: {
    minDigits: 7,
    maxDigits: 15,
  },
  email: {
    maxLength: 255,
  },
  message: {
    minLength: 2,
    maxLength: 5000,
  },
  place: {
    minLength: 2,
    maxLength: 100,
  },
  optionalString: {
    maxLength: 255,
  },
  coverLetter: {
    minLength: 50, // meaningful minimum — at least a sentence or two
    maxLength: 5000, // ~1 full page of text
  },

  file: {
    allowedTypes: [
      "application/pdf", // .pdf
      "application/msword", // .doc
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
      "image/jpeg", // .jpg
      "image/png", // .png
    ],
    allowedExtensions: [".pdf", ".doc", ".docx", ".jpg", ".jpeg", ".png"],
    maxSizeMB: 5, // adjust as needed
  },
};

export const commonValidations = {
  // ─── Name ────────────────────────────────────────────────────────────────────
  name: z
    .string()
    .transform((val) => val.trim())
    .pipe(
      z
        .string()
        .refine((val) => val.length > 0, {
          message: "Please enter your name",
        })
        .refine((val) => !/^\s+$/.test(val), {
          message: "Name cannot be just spaces. Please enter a valid name",
        })
        .refine((val) => !/[\t\n]/.test(val), {
          message:
            "Name cannot contain tabs or line breaks. Please enter a valid name",
        })
        .refine((val) => val.length >= VALIDATION_CONFIG.name.minLength, {
          message: `Name is too short. Please enter at least ${VALIDATION_CONFIG.name.minLength} characters`,
        })
        .refine((val) => val.length <= VALIDATION_CONFIG.name.maxLength, {
          message: `Name is too long. Please keep it under ${VALIDATION_CONFIG.name.maxLength} characters`,
        })
        .refine((val) => !/[0-9]/.test(val), {
          message: "Name should not include numbers. Please enter letters only",
        })
        .refine((val) => !/[@#!$%^&*()_+=\[\]{};:",.<>?/\\|`~]/.test(val), {
          message:
            "Name should not include symbols like @, #, or $. Please enter a valid name",
        })
        .refine((val) => !/[<>]/.test(val) && !/<\s*script/i.test(val), {
          message:
            "Name contains invalid characters. Please enter a valid name",
        })
        .refine((val) => !/javascript:/i.test(val), {
          message:
            "Name contains invalid characters. Please enter a valid name",
        })
        .refine(
          (val) =>
            !/(\'|\"|;|--|\bOR\b|\bAND\b|\bSELECT\b|\bDROP\b)/i.test(val),
          {
            message:
              "Name contains invalid characters. Please enter a valid name",
          },
        )
        .refine((val) => /^[\p{L}\p{M} '\-]+$/u.test(val), {
          message:
            "Name can only contain letters, spaces, hyphens (-), and apostrophes (')",
        }),
    ),

  // ─── Phone ───────────────────────────────────────────────────────────────────
  phone: z
    .string()
    .transform((val) => val.trim())
    .pipe(
      z
        .string()
        .refine((val) => val.length > 0, {
          message: "Please enter your phone number",
        })
        .refine((val) => !/^\s+$/.test(val), {
          message:
            "Phone number cannot be just spaces. Please enter a valid number",
        })
        .refine((val) => !/[a-zA-Z]/.test(val), {
          message:
            "Phone number should not contain letters. Please enter digits only",
        })
        .refine((val) => !/[@#!$%^&*_=\[\]{};:",.<>?/\\|`~]/.test(val), {
          message:
            "Phone number contains invalid characters. Please enter a valid number",
        })
        .refine(
          (val) => !/<\s*script/i.test(val) && !/javascript:/i.test(val),
          {
            message:
              "Phone number contains invalid characters. Please enter a valid number",
          },
        )
        .refine(
          (val) => !/(;|--|\bDROP\b|\bSELECT\b|\bOR\b|\bAND\b)/i.test(val),
          {
            message:
              "Phone number contains invalid characters. Please enter a valid number",
          },
        )
        .refine(
          (val) =>
            (val.match(/\+/g) || []).length <= 1 &&
            (val.indexOf("+") === -1 || val.startsWith("+")),
          {
            message:
              "Please enter the number in a valid format, e.g. +1 (555) 123-4567",
          },
        )
        .refine(
          (val) =>
            val.replace(/\D/g, "").length >= VALIDATION_CONFIG.phone.minDigits,
          {
            message: `Phone number is too short. Please enter at least ${VALIDATION_CONFIG.phone.minDigits} digits`,
          },
        )
        .refine(
          (val) =>
            val.replace(/\D/g, "").length <= VALIDATION_CONFIG.phone.maxDigits,
          {
            message: `Phone number is too long. Please enter no more than ${VALIDATION_CONFIG.phone.maxDigits} digits`,
          },
        )
        .refine((val) => !/^0+$/.test(val.replace(/\D/g, "")), {
          message: "Please enter a valid phone number",
        })
        .refine((val) => /^\+?[0-9\s\-\(\)]+$/.test(val), {
          message:
            "Phone number can only contain digits, spaces, and + - ( ) characters",
        }),
    ),

  // ─── Email ───────────────────────────────────────────────────────────────────
  email: z
    .string()
    .transform((val) => val.trim())
    .pipe(
      z
        .string()
        .refine((val) => val.length > 0, {
          message: "Please enter your email address",
        })
        .refine((val) => !/^\s+$/.test(val), {
          message:
            "Email address cannot be just spaces. Please enter a valid email",
        })
        .refine((val) => val.includes("@"), {
          message:
            "Email address is missing the @ symbol. Please check and try again",
        })
        .refine((val) => !/@@/.test(val), {
          message:
            "Email address contains too many @ symbols. Please enter a valid email",
        })
        .refine(
          (val) => {
            const [, domain] = val.split("@");
            return domain && domain.includes(".");
          },
          {
            message:
              "Email address is missing a valid domain (e.g. example.com). Please check and try again",
          },
        )
        .refine(
          (val) => {
            const [local] = val.split("@");
            return local && local.length > 0;
          },
          {
            message:
              "Email address is missing the part before @. Please enter a valid email",
          },
        )
        .refine(
          (val) => !/<\s*script/i.test(val) && !/javascript:/i.test(val),
          {
            message:
              "Email address contains invalid characters. Please enter a valid email",
          },
        )
        .refine(
          (val) => !/(;|--|\bDROP\b|\bSELECT\b|\bOR\b|\bAND\b)/i.test(val),
          {
            message:
              "Email address contains invalid characters. Please enter a valid email",
          },
        )
        .refine((val) => val.length <= VALIDATION_CONFIG.email.maxLength, {
          message: `Email address is too long. Please keep it under ${VALIDATION_CONFIG.email.maxLength} characters`,
        })
        .refine((val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), {
          message: "Please enter a valid email address (e.g. name@example.com)",
        }),
    ),

  // ─── Message ─────────────────────────────────────────────────────────────────
  message: z
    .string()
    .transform((val) => val.trim())
    .optional()
    .pipe(
      z
        .string()
        .refine((val) => !/^[\s\t\n]+$/.test(val), {
          message:
            "Message cannot be just spaces or blank lines. Please enter some text",
        })
        .refine((val) => val.length >= VALIDATION_CONFIG.message.minLength, {
          message: `Message is too short. Please enter at least ${VALIDATION_CONFIG.message.minLength} characters`,
        })
        .refine((val) => val.length <= VALIDATION_CONFIG.message.maxLength, {
          message: `Message is too long. Please keep it under ${VALIDATION_CONFIG.message.maxLength.toLocaleString()} characters`,
        })
        .refine((val) => !/^[@#!$%^&*()]+$/.test(val), {
          message:
            "Message cannot contain only special characters. Please enter a meaningful message",
        })
        .refine((val) => !/<\s*script[\s\S]*?>[\s\S]*?<\/script>/i.test(val), {
          message:
            "Message contains invalid content. Please enter a valid message",
        })
        .refine((val) => !/<img[\s\S]*?onerror=/i.test(val), {
          message:
            "Message contains invalid content. Please enter a valid message",
        })
        .refine((val) => !/<\s*iframe/i.test(val), {
          message:
            "Message contains invalid content. Please enter a valid message",
        })
        .refine((val) => !/\{\{.*constructor.*\}\}/i.test(val), {
          message:
            "Message contains invalid content. Please enter a valid message",
        })
        .refine(
          (val) =>
            !/(;|--|\bDROP\b|\bINSERT\b|\bSELECT\b|\bDELETE\b|\bTABLE\b)/i.test(
              val,
            ),
          {
            message:
              "Message contains invalid content. Please enter a valid message",
          },
        ),
    ),

  // ─── Place ───────────────────────────────────────────────────────────────────
  textBox: (value) =>
    z
      .string()
      .transform((val) => val.trim())
      .pipe(
        z
          .string()
          .refine((val) => val.length > 0, {
            message: `Please enter a ${value}`,
          })
          .refine((val) => !/^\s+$/.test(val), {
            message: `${value} cannot be just spaces. Please enter a valid ${value}`,
          })
          .refine((val) => val.length >= VALIDATION_CONFIG.place.minLength, {
            message: `${value} is too short. Please enter at least ${VALIDATION_CONFIG.place.minLength} characters`,
          })
          .refine((val) => val.length <= VALIDATION_CONFIG.place.maxLength, {
            message: `${value} is too long. Please keep it under ${VALIDATION_CONFIG.place.maxLength} characters`,
          })
          .refine((val) => !/[0-9]/.test(val), {
            message: `${value} should not contain numbers. Please enter a valid ${value}`,
          })
          .refine((val) => !/[@#!$%^&*_+=\[\]{};:",.<>?/\\|`~]/.test(val), {
            message: `${value} contains invalid characters. Please enter a valid ${value}`,
          })
          .refine(
            (val) => !/<\s*script/i.test(val) && !/javascript:/i.test(val),
            {
              message: `${value} contains invalid content. Please enter a valid ${value}`,
            },
          )
          .refine((val) => !/(;|--|\bDROP\b|\bSELECT\b|\bOR\b)/i.test(val), {
            message:
              "${value} contains invalid content. Please enter a valid ${value}",
          })
          .refine((val) => /^[\p{L} '\-,\.]+$/u.test(val), {
            message: `${value} can only contain letters, spaces, hyphens, apostrophes, commas, and periods`,
          }),
      ),

  // ─── Optional String ─────────────────────────────────────────────────────────
  optionalString: z
    .string()
    .optional()
    .transform((val) => (val ? val.trim() : val))
    .pipe(
      z
        .string()
        .optional()
        .refine(
          (val) =>
            !val || val.length <= VALIDATION_CONFIG.optionalString.maxLength,
          {
            message: `This field is too long. Please keep it under ${VALIDATION_CONFIG.optionalString.maxLength} characters`,
          },
        )
        .refine((val) => !val || !/^\s+$/.test(val), {
          message:
            "This field cannot be just spaces. Please enter valid text or leave it empty",
        })
        .refine(
          (val) =>
            !val || (!/<\s*script/i.test(val) && !/javascript:/i.test(val)),
          {
            message:
              "This field contains invalid content. Please enter valid text",
          },
        )
        .refine(
          (val) => !val || !/(;|--|\bDROP\b|\bSELECT\b|\bOR\b)/i.test(val),
          {
            message:
              "This field contains invalid content. Please enter valid text",
          },
        ),
    ),

  // ─── PDF Upload ──────────────────────────────────────────────────────────────
  file: (file) =>
    z
      .instanceof(File)
      .refine((file) => file !== null && file !== undefined, {
        message: `Please upload ${file}`,
      })
      .refine((file) => file.size > 0, {
        message:
          "The uploaded file appears to be empty. Please upload a valid file",
      })
      .refine(
        (file) => VALIDATION_CONFIG.file.allowedTypes.includes(file.type),
        {
          message: "Only PDF, DOC, DOCX, JPG, and PNG files are allowed",
        },
      )
      .refine(
        (file) =>
          VALIDATION_CONFIG.file.allowedExtensions.some((ext) =>
            file.name.toLowerCase().endsWith(ext),
          ),
        {
          message:
            "File must have a .pdf, .doc, .docx, .jpg, or .png extension",
        },
      )
      .refine(
        (file) => file.size <= VALIDATION_CONFIG.file.maxSizeMB * 1024 * 1024,
        {
          message: `File is too large. Please upload a file smaller than ${VALIDATION_CONFIG.file.maxSizeMB}MB`,
        },
      ),
  // ─── Optional PDF Upload ──────────────────────────────────────────────────────
  pdfUploadOptional: z
    .instanceof(File)
    .optional()
    .refine((file) => !file || file.size > 0, {
      message:
        "The uploaded file appears to be empty. Please upload a valid PDF",
    })
    .refine(
      (file) => !file || file.type === VALIDATION_CONFIG.file.allowedTypes,
      {
        message: "Only PDF files are allowed. Please upload a .pdf file",
      },
    )
    .refine((file) => !file || file.name.toLowerCase().endsWith(".pdf"), {
      message:
        "File must have a .pdf extension. Please upload a valid PDF file",
    })
    .refine(
      (file) =>
        !file || file.size <= VALIDATION_CONFIG.file.maxSizeMB * 1024 * 1024,
      {
        message: `File is too large. Please upload a PDF smaller than ${VALIDATION_CONFIG.file.maxSizeMB}MB`,
      },
    ),

  dropDown: (val) => z.string().min(1, `${val} is required`),

  coverLetter: z
    .string()
    .optional()
    .transform((val) => (val !== undefined ? val.trim() : undefined))
    .pipe(
      z
        .string()
        .optional()

        // ── Blank / whitespace-only ──────────────────────────────────────────
        .refine((val) => val === undefined || !/^[\s\t\n]+$/.test(val), {
          message:
            "Cover letter cannot be just spaces or blank lines. Please enter some text",
        })

        // ── Length ───────────────────────────────────────────────────────────
        .refine(
          (val) =>
            val === undefined ||
            val.length >= VALIDATION_CONFIG.coverLetter.minLength,
          {
            message: `Cover letter is too short. Please enter at least ${VALIDATION_CONFIG.coverLetter.minLength} characters`,
          },
        )
        .refine(
          (val) =>
            val === undefined ||
            val.length <= VALIDATION_CONFIG.coverLetter.maxLength,
          {
            message: `Cover letter is too long. Please keep it under ${VALIDATION_CONFIG.coverLetter.maxLength.toLocaleString()} characters`,
          },
        )

        // ── Must contain real words (not just symbols / numbers) ─────────────
        .refine((val) => val === undefined || /\p{L}{2,}/u.test(val), {
          message:
            "Cover letter must contain actual words. Please write a meaningful message",
        })

        // ── Reject all-caps (shouting) ────────────────────────────────────────
        .refine(
          (val) =>
            val === undefined ||
            !(
              val.replace(/[^a-zA-Z]/g, "").length > 10 &&
              val.replace(/[^a-zA-Z]/g, "") ===
                val.replace(/[^a-zA-Z]/g, "").toUpperCase()
            ),
          {
            message:
              "Cover letter should not be written entirely in capital letters",
          },
        )

        // ── Reject excessive repeated characters e.g. "helloooooo", "!!!!!!" ──
        .refine((val) => val === undefined || !/(.)\1{9,}/.test(val), {
          message:
            "Cover letter contains excessive repeated characters. Please enter a valid message",
        })

        // ── Reject excessive punctuation / symbols only lines ────────────────
        .refine((val) => val === undefined || !/^[^a-zA-Z\d]{20,}$/.test(val), {
          message:
            "Cover letter cannot consist only of symbols. Please enter a meaningful message",
        })

        // ── XSS: <script> tags ───────────────────────────────────────────────
        .refine(
          (val) =>
            val === undefined ||
            !/<\s*script[\s\S]*?>[\s\S]*?<\/script>/i.test(val),
          {
            message:
              "Cover letter contains invalid content. Please enter a valid message",
          },
        )

        // ── XSS: <img onerror> ───────────────────────────────────────────────
        .refine(
          (val) => val === undefined || !/<img[\s\S]*?onerror=/i.test(val),
          {
            message:
              "Cover letter contains invalid content. Please enter a valid message",
          },
        )

        // ── XSS: <iframe> ────────────────────────────────────────────────────
        .refine((val) => val === undefined || !/<\s*iframe/i.test(val), {
          message:
            "Cover letter contains invalid content. Please enter a valid message",
        })

        // ── XSS: javascript: protocol ────────────────────────────────────────
        .refine((val) => val === undefined || !/javascript\s*:/i.test(val), {
          message:
            "Cover letter contains invalid content. Please enter a valid message",
        })

        // ── XSS: on* event handlers e.g. onclick=, onload= ───────────────────
        .refine((val) => val === undefined || !/\bon\w+\s*=/i.test(val), {
          message:
            "Cover letter contains invalid content. Please enter a valid message",
        })

        // ── Template injection: {{...constructor...}} ─────────────────────────
        .refine(
          (val) =>
            val === undefined ||
            !/\{\{[\s\S]*constructor[\s\S]*\}\}/i.test(val),
          {
            message:
              "Cover letter contains invalid content. Please enter a valid message",
          },
        )

        // ── SQL injection ────────────────────────────────────────────────────
        .refine(
          (val) =>
            val === undefined ||
            !/(;|--|\bDROP\b|\bINSERT\b|\bSELECT\b|\bDELETE\b|\bUPDATE\b|\bTABLE\b|\bFROM\b|\bWHERE\b)/i.test(
              val,
            ),
          {
            message:
              "Cover letter contains invalid content. Please enter a valid message",
          },
        )

        // ── Path traversal ───────────────────────────────────────────────────
        .refine((val) => val === undefined || !/(\.\.\/|\.\.\\)/.test(val), {
          message:
            "Cover letter contains invalid content. Please enter a valid message",
        })

        // ── Null bytes ───────────────────────────────────────────────────────
        .refine((val) => val === undefined || !/\x00/.test(val), {
          message:
            "Cover letter contains invalid characters. Please enter a valid message",
        }),
    ),
};
