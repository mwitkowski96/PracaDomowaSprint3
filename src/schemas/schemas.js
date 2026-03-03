import * as z from "zod";
export const PhoneNumberSchema = z.string().regex(/^\d{9}$/);

export const UserSchema = z
  .object({
    phone: z.string().regex(/^\d{9}$/),
    name: z.string().min(3),
    lastName: z.string().min(3),
    email: z.email(),
    studyForm: z.enum(["stacjonarne", "online"]),
    technologies: z
      .array(z.enum(["JavaScript", "Python", "Java", "C#", "Ruby"]))
      .min(1),
    fileUpload: z
      .file()
      .mime(["image/jpeg", "image/png"])
      .max(3 * 1024 * 1024), //Maksymalny rozmiar 3MB.
    hasExperience: z.boolean(),
    experienceList: z.array(
      z.object({
        technology: z.string().min(1, "Wpisz nazwe technologii"),
        level: z.string(["Junior", "Mid", "Senior"]),
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
