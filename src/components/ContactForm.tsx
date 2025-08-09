import "../CSS/App.css";
import { useForm, type FieldErrors } from "react-hook-form";
import { useEffect } from "react";

type FormValue = {
  Name: string;
  Email: string;
  Message: string;
};

export const ContactForm = () => {
  const form = useForm<FormValue>({
    defaultValues: {
      Name: "",
      Email: "",
    },
    mode: "onSubmit",
  });
  const { register, handleSubmit, formState, reset } = form;

  const { errors, isDirty, isValid, isSubmitting, isSubmitSuccessful } =
    formState;

  const onSubmit = (data: FormValue) => {
    console.log("Form Data", data);
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  const onError = (errors: FieldErrors<FormValue>) => {
    console.log("form error", errors);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
        <div className="header">
          <h2>Contact Form</h2>
        </div>

        <div className="userData">
          <label htmlFor="Name">Name</label>
          <input
            type="text"
            id="Name"
            {...register("Name", {
              required: {
                value: true,
                message: "Name is Required",
              },
            })}
            placeholder="Enter your name"
          />
          <p>{errors.Name?.message}</p>
        </div>

        <div className="userData">
          <label htmlFor="Email">Email</label>
          <input
            type="email"
            id="Email"
            {...register("Email", {
              required: {
                value: true,
                message: "Email is required",
              },
              pattern: {
                value: /[a-zA-Z0-9.!#$%&*_%+-]+@[a-z0-9.-]+.[a-z]{2,}$/,
                message: "Invalid email",
              },
            })}
            placeholder="Enter your email"
          />
          <p>{errors.Email?.message}</p>
        </div>

        <div className="userMessage">
          <div className="textArea">
            <label htmlFor="Email">Message</label>
            <textarea
              id="Message"
              {...register("Message", {
                required: {
                  value: true,
                  message: "Message is required",
                },
              })}
              placeholder="Enter your message here"
            />
          </div>

          <p>{errors.Message?.message}</p>
        </div>

        <button disabled={!isDirty} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};
