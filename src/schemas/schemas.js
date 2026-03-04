import * as z from "zod";

export const PhoneNumberSchema = z.string().regex(/^\d{9}$/);

const SingleFileFromFileListSchema = z
  .instanceof(FileList)
  .refine((files) => files.length > 0, {
    message: "File is required",
  })
  .transform((files) => files.item(0))
  .pipe(
    z
      .file()
      .min(10_000) // minimum .size (bytes)
      .max(1_000_000) // maximum .size (bytes)
      .mime(["image/jpeg", "image/png"]), // MIME type
  );

export const UserSchema = z
  .object({
    phone: PhoneNumberSchema,
    name: z.string().min(3),
    lastName: z.string().min(3),
    email: z.email(),
    studyForm: z.enum(["Stacjonarna", "Online"]),
    technologies: z
      .array(z.enum(["React", "Node.js", "HTML", "CSS", "Next.js"]))
      .min(1),

    // accepts FileList input, validates the first File
    fileUpload: SingleFileFromFileListSchema,

    hasExperience: z.boolean(),
    experienceList: z.array(
      z.object({
        technology: z.string().min(1, "Wpisz nazwe technologii"),
        level: z.coerce.number().min(1).max(5),
      }),
    ),
  })
  .refine(
    (data) => {
      if (data.hasExperience) {
        return data.experienceList.length > 0;
      }
      return true;
    },
    {
      message:
        "Jeśli masz doświadczenie, musisz podać przynajmniej jedno doświadczenie",
      path: ["experienceList"],
    },
  );
