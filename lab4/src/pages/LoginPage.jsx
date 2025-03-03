import LoginForm from "../components/LoginForm";

export default function LoginPage() {
    const handleLoginSuccess = (data) => {

        console.log("Логин успешен, данные пользователя:", data);
        window.location.href = "/dashboard";
    };

    return (
        <div className="login_page">
            <LoginForm onLoginSuccess={handleLoginSuccess} />
        </div>
    );
}

