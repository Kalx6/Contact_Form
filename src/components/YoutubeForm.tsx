import { useEffect } from "react";
import { useForm, useFieldArray, set, type FieldErrors } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

type FormValues = {
  username: string;
  email: string;
  channel: string;
  social: {
    tiktok: string;
    instagram: string;
  };
  phoneNumber: string[];
  phNumbers: {
    number: string;
  }[];
  age: number;
  dob: Date;
};

export const YoutubeForm = () => {
  const form = useForm<FormValues>({
    defaultValues: {
      username: "khalid",
      email: "@kalma",
      channel: "",
      social: {
        tiktok: "",
        instagram: "",
      },
      phoneNumber: ["", ""],
      phNumbers: [{ number: "" }],
      age: 0,
      dob: new Date(),
    },
    mode: "all",
  });
  const {
    register,
    control,
    handleSubmit,
    formState,
    watch,
    getValues,
    setValue,
    reset,
    trigger,
  } = form;
  const {
    errors,
    touchedFields,
    dirtyFields,
    isDirty,
    isValid,
    isSubmitSuccessful,
    submitCount,
    isSubmitting,
  } = formState;

  const { fields, append, remove } = useFieldArray({
    name: "phNumbers",
    control,
  });

  console.log({ isSubmitSuccessful, submitCount });

  const onSubmit = (data: FormValues) => {
    console.log("Form Submitted", data);
  };

  const handleGetValues = () => {
    console.log("getValue", getValues());
  };

  const handleSetValues = () => {
    setValue("username", "", {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  console.log({ touchedFields, dirtyFields, isDirty });

  const onError = (errors: FieldErrors<FormValues>) => {
    console.log("form error", errors);
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  // useEffect(() => {
  //   const subscription = watch((value) => {
  //     console.log(value);
  //   });
  //   return () => subscription.unsubscribe();
  // }, [watch]);
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
        <label htmlFor="username">username</label>
        <input
          type="text"
          id="username"
          {...register("username", {
            required: {
              value: true,
              message: "username is required",
            },
          })}
        />
        <p className="error">{errors.username?.message}</p>

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          {...register("email", {
            pattern: {
              value: /[a-zA-Z0-9.!#$%&*_%+-]+@[a-z0-9.-]+.[a-z]{2,}$/,
              message: "Invalid email format",
            },
            validate: {
              notAdmin: (fieldValue) => {
                return (
                  fieldValue !== "admin@example.com" || "enter another email"
                );
              },
              notBlackListed: (fieldValue) => {
                return (
                  !fieldValue.endsWith("baddomain.com") ||
                  "this email is not supported"
                );
              },
              emailAvailable: async (fieldValue) => {
                const response = await fetch(
                  `https://jsonplaceholder.typicode.com/users/?email=${fieldValue}`
                );
                const data = await response.json();

                return data.length == 0 || "ante jel lela email asgeba";
              },
            },
          })}
        />
        <p className="error">{errors.email?.message}</p>

        <label htmlFor="channel">Channel</label>
        <input
          type="text"
          id="channel"
          {...register("channel", { required: "Channel name is required" })}
        />
        <p className="error">{errors.channel?.message}</p>

        <label htmlFor="titok">Tiktok</label>
        <input type="text" id="tiktok" {...register("social.tiktok")} />

        <label htmlFor="instagram">Instagram</label>
        <input type="text" id="instagram" {...register("social.instagram")} />

        <label htmlFor="fristPhoneNumber">fristPhoneNumber</label>
        <input
          type="text"
          id="fristPhoneNumber"
          {...register("phoneNumber.0", {
            required: {
              value: true,
              message: "entr your phone number",
            },
          })}
        />
        <p className="error">{errors.phoneNumber?.[0]?.message}</p>

        <label htmlFor="secondPhoneNumber">secondPhoneNumber</label>
        <input
          type="text"
          id="secondPhoneNumber"
          {...register("phoneNumber.1")}
        />
        <div>
          <label>List of phone numbers</label>

          <div>
            {fields.map((field, index) => {
              return (
                <div className="formControl" key={field.id}>
                  <input
                    type="text"
                    {...register(`phNumbers.${index}.number` as const)}
                  />
                  {index > 0 && (
                    <button type="button" onClick={() => remove(index)}>
                      Remove
                    </button>
                  )}
                </div>
              );
            })}
            <button type="button" onClick={() => append({ number: "" })}>
              Add phone number
            </button>
          </div>
        </div>
        <label htmlFor="age">Age</label>
        <input
          type="number"
          id="age"
          {...register("age", {
            disabled: watch("username") === "",
            valueAsNumber: true,
            required: {
              value: true,
              message: "Age is required",
            },
          })}
        />
        <p className="error">{errors.age?.message}</p>
        <label htmlFor="dob">Date</label>
        <input
          type="date"
          id="dob"
          {...register("dob", {
            valueAsDate: true,
            required: {
              value: true,
              message: "Date of birth is required",
            },
          })}
        />
        <p className="error">{errors.dob?.message}</p>

        <button disabled={!isDirty || isSubmitting}>Submit</button>

        <button type="button" onClick={handleGetValues}>
          Get Values
        </button>

        <button type="button" onClick={handleSetValues}>
          Set Values
        </button>

        <button type="button" onClick={() => trigger("email")}>
          Validate
        </button>
      </form>
      <DevTool control={control} />
    </div>
  );
};
