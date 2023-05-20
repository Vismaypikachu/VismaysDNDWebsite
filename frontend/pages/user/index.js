import AuthLayout from "@layouts/AuthLayout";
import LoginLayout from "@layouts/LoginLayout";
import { useUser } from "lib/context";

export default function Home() {
    return <LoginLayout />;
}
