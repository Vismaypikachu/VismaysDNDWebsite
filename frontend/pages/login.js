import Redirect from "@components/Redirect";
import AuthLayout from "@layouts/AuthLayout";
import ExternalLayout from "@layouts/ExternalLayout";

export default function Login() {
    return <Redirect to="/classes" />;
}

Login.getLayout = (page) => <AuthLayout>{page}</AuthLayout>;
