import * as z from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_TYPES = ["image/jpeg", "image/png"];

export const PhoneNumberSchema = z
  .string()
  .regex(/^\d{9}$/, "Numer telefonu musi składać się z 9 cyfr");

const SingleFileFromFileListSchema = z
  .any()
  .refine(
    (files) => files instanceof FileList && files.length > 0,
    "Plik jest wymagany",
  )
  .transform((files) => files.item(0))
  .refine(
    (file) => ACCEPTED_TYPES.includes(file?.type),
    "Obsługiwane formaty to: .jpg, .png (tylko zdjęcia)",
  )
  .refine(
    (file) => file.size > 0 && file.size <= MAX_FILE_SIZE,
    "Plik musi być mniejszy niż 5MB",
  );

export const UserSchema = z
  .object({
    name: z.string().min(3, "Imię musi mieć co najmniej 3 znaki"),
    lastName: z.string().min(3, "Nazwisko musi mieć co najmniej 3 znaki"),
    email: z.email("Wpisz poprawny adres e-mail"),
    phone: PhoneNumberSchema,

    studyForm: z.enum(["Stacjonarna", "Online"], {
      errorMap: () => ({ message: "Wybierz formę nauki" }),
    }),

    technologies: z
      .array(z.string())
      .min(1, "Wybierz przynajmniej jedną technologię"),

    fileUpload: SingleFileFromFileListSchema,

    hasExperience: z.boolean(),

    experienceList: z.array(
      z.object({
        technology: z.string().min(1, "Wybierz technologię"),
        level: z.coerce.number().min(1, "Wybierz poziom").max(5),
      }),
    ),
  })
  .refine(
    (data) => {
      if (data.hasExperience) {
        return data.experienceList && data.experienceList.length > 0;
      }
      return true;
    },
    {
      message: "Dodaj przynajmniej jedną pozycję do listy doświadczenia",
      path: ["experienceList"],
    },
  );
