import { z } from "zod";
import { useZorm } from "react-zorm";
import useAxios from "axios-hooks";
import { userSchema, UserSchema } from "../schemas/userSchema";

const texts = {
  title: "Entrar",
  submit: "Enviar",
};

export function SignInForm() {
  const { ref, fields, errors, validation } = useZorm("signin", userSchema, {
    onValidSubmit(event) {
      event.preventDefault();
    },
  });

  const disabled = validation?.success === false;

  return (
    <form noValidate className="signup-form" ref={ref}>
      <h1 className="signup-title">{texts.title}</h1>
      <input
        type="email"
        placeholder="Email"
        className={`signup-field ${errors.email("error")}`}
        name={fields.email()}
      />
      {errors.email((error) => (
        <ErrorMessage message={error.message} />
      ))}
      <input
        type="password"
        placeholder="Senha"
        className={`signup-field ${errors.password("error")}`}
        name={fields.password()}
      />
      {errors.password((error) => (
        <ErrorMessage message={error.message} />
      ))}
      <button disabled={disabled} type="submit" className="signup-submit">
        {texts.submit}
      </button>
      <style jsx>{`
        .signup-form {
          max-width: 600px;
          background-color: #fff;
          border-radius: 4px;
          border: solid 1px #ccc;
          margin: auto;
          margin-top: 64px;
          padding: 16px;
        }

        .signup-title {
          text-align: center;
          margin-bottom: 16px;
        }

        .signup-field {
          width: 100%;
          display: block;
          margin-top: 6px;
          padding: 8px 16px;
          border-radius: 4px;
          border: solid 1px #2139e0;
          box-sizing: border-box;
        }

        .error {
          border-color: #f11212;
        }

        .signup-submit {
          width: 100%;
          margin-top: 6px;
          background-color: transparent;
          border-radius: 12px;
          border: solid 1px #2139e0;
          color: #2139e0;
          font-weight: 600;
          padding: 8px 16px;
          box-sizing: border-box;
          text-transform: uppercase;
        }

        .signup-submit:hover {
          background-color: rgba(0, 0, 0, 0.05);
        }

        .signup-submit:disabled {
          background-color: rgba(0, 0, 0, 0.05);
          color: #ccc;
          border-color: #ccc;
        }
      `}</style>
    </form>
  );
}

function ErrorMessage({ message }: { message: string }) {
  return (
    <span className="error">
      {message}
      <style jsx>{`
        .error {
          color: #f11212;
          font-size: 10px;
        }
      `}</style>
    </span>
  );
}
