import { useEffect } from "react";

const API_URL = "http://localhost:3000/users/tokens";

let access_token;
let refresh_token = localStorage.getItem("refresh_token");
let resource_owner;

function UserForm() {
  useEffect(() => {
    function getUser() {
      let stored_resource = localStorage.getItem("resource_owner"); //was macht getItem und was ist resource_owner
      resource_owner = JSON.parse(stored_resource);
    }

    async function userSession() {
      // was sind userSession
      await refreshToken(); // was macht await und was ist ein refreshToken und woher bekomm ich den
      await requestNewAccessToken(); // was macht das
      if (nullOrUndefined(access_token)) {
        //wofür genau ist diese if schleife? ich verstehe nicht was style.display macht
        document.querySelector("#sign_in_form").style.display = "block";
        document.querySelector("#sign_up_form").style.display = "block";
        document.querySelector("#sign_out").style.display = "none";
      } else {
        document.querySelector("#sign_in_form").style.display = "none";
        document.querySelector("#sign_up_form").style.display = "none";
        document.querySelector("#sign_out").style.display = "block";
      }
      getUser();
    }

    function resetTokens() {
      // was sind token?
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("resource_owner");
      access_token = null;
      refresh_token = null;
      resource_owner = null;
    }

    function nullOrUndefined(itemToCheck) {
      return itemToCheck == null || itemToCheck === "undefined";
    }

    async function handleAuthResponse(response) {
      const data = await response.json();
      localStorage.setItem(
        "resource_owner",
        JSON.stringify(data.resource_owner)
      );
      localStorage.setItem("refresh_token", data.refresh_token);
      access_token = data.token;
      refresh_token = data.refresh_token;
      resource_owner = data.resource_owner;
    }

    async function refreshToken() {
      refresh_token = localStorage.getItem("refresh_token");
      if (nullOrUndefined(refresh_token)) {
        return;
      }
      try {
        let response = await fetch(`${API_URL}/refresh`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${refresh_token}`,
          },
        });
        if (!response.ok) {
          if (response.status === 401) {
          } else {
            throw new Error(response.statusText);
          }
        }
        let data = await response.json();
        localStorage.setItem(
          "resource_owner",
          JSON.stringify(data.resource_owner)
        );
        localStorage.setItem("refresh_token", data.refresh_token);
        access_token = data.token;
        refresh_token = data.refresh_token;
        resource_owner = data.resource_owner;
      } catch (err) {
        resetTokens();
        userSession();
      }
    }

    async function requestNewAccessToken() {
      if (nullOrUndefined(refresh_token)) {
        return;
      }
      if (access_token) {
        return;
      }
      try {
        const response = await fetch(`${API_URL}/refresh`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${refresh_token}`,
          },
        });
        handleAuthResponse(response);
      } catch (err) {
        resetTokens();
        userSession();
      }
    }

    const signupForm = document.querySelector("#sign_up_form");
    const signinForm = document.querySelector("#sign_in_form");
    const signoutButton = document.querySelector("#sign_out");

    if (signupForm) {
      signupForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const email = document.querySelector("#signup-email").value;
        const password = document.querySelector("#signup-password").value;
        const password_confirm = document.querySelector(
          "#signup-password-confirm"
        ).value;

        if (password !== password_confirm) {
          alert("Passwords do not match");
          return;
        }

        const response = await fetch(`${API_URL}/sign_up`, {
          method: "POST",
          body: JSON.stringify({ email, password }),
          headers: { "Content-Type": "application/json" },
        });
        await handleAuthResponse(response);
        userSession();
      });
    }

    if (signinForm) {
      signinForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const email = document.querySelector("#signin-email").value;
        const password = document.querySelector("#signin-password").value;

        const response = await fetch(`${API_URL}/sign_in`, {
          method: "POST",
          body: JSON.stringify({ email, password }),
          headers: { "Content-Type": "application/json" },
        });
        await handleAuthResponse(response);
        userSession();
      });
    }

    if (signoutButton) {
      signoutButton.addEventListener("click", (e) => {
        e.preventDefault();
        resetTokens();
        userSession();
      });
    }

    userSession();

    return () => {
      if (signupForm) signupForm.removeEventListener("submit", () => {});
      if (signinForm) signinForm.removeEventListener("submit", () => {});
      if (signoutButton) signoutButton.removeEventListener("click", () => {});
    };
  }, []);
  return (
    <>
      <h1>Hi! {resource_owner ? resource_owner.email : "Gast"}</h1>
      <form id="sign_up_form">
        <input type="text" id="signup-email" placeholder="Email" />
        <input type="password" id="signup-password" placeholder="Password" />
        <input
          type="password"
          id="signup-password-confirm"
          placeholder="Confirm Password"
        />
        <button type="submit" id="Sign Up">
          Submit
        </button>
      </form>

      <form id="sign_in_form">
        <input type="text" id="signin-email" placeholder="Email" />
        <input type="password" id="signin-password" placeholder="Password" />
        <button type="submit" id="Login">
          Submit
        </button>
      </form>

      <button id="sign_out">Logout</button>
    </>
  );
}

export default UserForm;
